import {
  JsonController,
  Authorized,
  CurrentUser,
  Post,
  Param,
  BadRequestError,
  HttpCode,
  NotFoundError,
  ForbiddenError,
  Get,
  Body,
  Patch
} from "routing-controllers";
import User from "../users/entity";
import { Position, Game, Player } from "./entities";
import { io } from "../index";
import { getAllowedMoves, calculateWinner } from "./logic";

@JsonController()
export default class GameController {
  @Authorized()
  @Post("/games")
  @HttpCode(201)
  async createGame(@CurrentUser() user: User) {
    const entity = await Game.create().save();

    await Player.create({
      game: entity,
      user,
      symbol: "x"
    }).save();

    const game = await Game.findOneById(entity.id);

    io.emit("action", {
      type: "ADD_GAME",
      payload: game
    });

    return game;
  }

  @Authorized()
  @Post("/games/:id([0-9]+)/players")
  @HttpCode(201)
  async joinGame(@CurrentUser() user: User, @Param("id") gameId: number) {
    const game = await Game.findOneById(gameId);
    if (!game) throw new BadRequestError(`Game does not exist`);
    if (game.status !== "pending")
      throw new BadRequestError(`Game is already started`);

    game.status = "started";
    await game.save();

    const player = await Player.create({
      game,
      user,
      symbol: "o"
    }).save();

    io.emit("action", {
      type: "UPDATE_GAME",
      payload: await Game.findOneById(game.id)
    });

    return player;
  }

  @Authorized()
  // the reason that we're using patch here is because this request is not idempotent
  // http://restcookbook.com/HTTP%20Methods/idempotency/
  // try to fire the same requests twice, see what happens
  @Patch("/games/:id([0-9]+)")
  async updateGame(
    @CurrentUser() user: User,
    @Param("id") gameId: number,
    @Body() update: Position
  ) {
    const game = await Game.findOneById(gameId);
    if (!game) throw new NotFoundError(`Game does not exist`);

    const player = await Player.findOne({ user, game });

    if (!player) throw new ForbiddenError(`You are not part of this game`);
    if (game.status !== "started")
      throw new BadRequestError(`The game is not started yet`);
    if (player.symbol !== game.turn)
      throw new BadRequestError(`It's not your turn`);
 
    if (game.turn === "x" && game.pastPositionsPlayer2.length > 1) {
      game.pastPositionsPlayer1.push(update);
      game.allowedMoves = getAllowedMoves(
        game.pastPositionsPlayer2[game.pastPositionsPlayer2.length - 1],
        game.pastPositionsPlayer2[game.pastPositionsPlayer2.length - 2]
      );
    }
    if (game.turn === "x" && game.pastPositionsPlayer2.length <= 1) {
      game.pastPositionsPlayer1.push(update);
      game.allowedMoves  = getAllowedMoves(
        game.pastPositionsPlayer2[game.pastPositionsPlayer2.length - 1],
        game.pastPositionsPlayer2[game.pastPositionsPlayer2.length - 1]
      );
    }

    if (game.turn === "o" && game.pastPositionsPlayer1.length > 1) {
      game.pastPositionsPlayer2.push(update);
      game.allowedMoves  = getAllowedMoves(
        game.pastPositionsPlayer1[game.pastPositionsPlayer1.length - 1],
        game.pastPositionsPlayer1[game.pastPositionsPlayer1.length - 2]
      );
    }
    if (game.turn === "o" && game.pastPositionsPlayer1.length <= 1) {
      game.pastPositionsPlayer2.push(update);
      game.allowedMoves  = getAllowedMoves(
        game.pastPositionsPlayer1[game.pastPositionsPlayer1.length - 1],
        game.pastPositionsPlayer1[game.pastPositionsPlayer1.length - 1]
      );
    }

    game.winner = calculateWinner(game.board, game.allowedMoves, game.turn, game.pastPositionsPlayer1, game.pastPositionsPlayer2);

    game.turn = player.symbol === "x" ? "o" : "x";

    await game.save();

    await io.emit("action", {
      type: "UPDATE_GAME",
      payload: game
    });

    return game;
  }

  @Authorized()
  @Get("/games/:id([0-9]+)")
  getGame(@Param("id") id: number) {
    return Game.findOneById(id);
  }

  @Authorized()
  @Get("/games")
  getGames() {
    return Game.find();
  }
}
