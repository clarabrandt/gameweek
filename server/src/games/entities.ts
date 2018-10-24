import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index,
  OneToMany,
  ManyToOne
} from "typeorm";
import User from "../users/entity";


export type Symbol = "x" | "o";
export type Row = any[];
export type Board = Row[];
export type pastPositions = Position[];
export type allowedMoves = Position[];

export interface Move {
  position: {
    x: number;
    y: number;
  };
  vector: {
    x: number;
    y: number;
  };
}

export interface Position {
  x: number;
  y: number;
}

type Status = "pending" | "started" | "finished";

const boardSize: number = 50;

const createBoard = (boardSize: number) => {
  //Create a row the length of boardSize
  const row: Row = [];
  for (let i = 0; i < boardSize; i++) {
    row.push(null);
  }
  //Create board containing boardSize number of rows
  const board: Board = [];
  for (let i = 0; i < boardSize; i++) {
    board.push(row);
  }

  return board;
};

const emptyBoard: Board = createBoard(boardSize);

@Entity()
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("json", { default: emptyBoard })
  board: Board;

  @Column("json", {
    default: [
      {
        x: 5,
        y: 5
      }
    ],
    nullable: true
  })
  pastPositionsPlayer1: pastPositions;

  @Column("json", {
    default: [
      {
        x: 5,
        y: 5
      }
    ],
    nullable: true
  })
  pastPositionsPlayer2: pastPositions;

  @Column("json", {
    default: [
      null
    ],
    nullable: true
  })
  allowedMoves: allowedMoves;

  @Column("char", { length: 1, default: "x" })
  turn: Symbol;

  @Column("char", { length: 1, nullable: true })
  winner: Symbol;

  @Column("text", { default: "pending" })
  status: Status;

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, { eager: true })
  players: Player[];
}

@Entity()
@Index(["game", "user", "symbol"], { unique: true })
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(_ => User, user => user.players)
  user: User;

  @ManyToOne(_ => Game, game => game.players)
  game: Game;

  @Column()
  userId: number;

  @Column("char", { length: 1 })
  symbol: Symbol;
}
