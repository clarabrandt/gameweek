import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const ADD_GAME = 'ADD_GAME'
export const UPDATE_GAME = 'UPDATE_GAME'
export const UPDATE_GAMES = 'UPDATE_GAMES'
export const JOIN_GAME_SUCCESS = 'JOIN_GAME_SUCCESS'
export const UPDATE_GAME_SUCCESS = 'UPDATE_GAME_SUCCESS'
export const MOVE_PLAYER1 = 'MOVE_PLAYER1'
export const MOVE_PLAYER2 = 'MOVE_PLAYER2'
export const PLAYER1MOVE = 'PLAYER1MOVE'
export const PLAYER2MOVE = 'PLAYER2MOVE'

const updateGames = games => ({
  type: UPDATE_GAMES,
  payload: games
})

const addGame = game => ({
  type: ADD_GAME,
  payload: game
})

const updateGameSuccess = () => ({
  type: UPDATE_GAME_SUCCESS
})

const joinGameSuccess = () => ({
  type: JOIN_GAME_SUCCESS
})

const playerMove = (move, playerSymbol) => {
  let MOVE_PLAYER;
  if (playerSymbol === "x") MOVE_PLAYER = MOVE_PLAYER1
  else MOVE_PLAYER = MOVE_PLAYER2
  return {
  type: MOVE_PLAYER,
  payload: move
}}

// const opponentMove = move => ({
//   type: PLAYER1MOVE,
//   payload: move
// })
// const opponentMove = move => ({
//   type: PLAYER2MOVE,
//   payload: move
// })


export const getGames = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/games`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(updateGames(result.body)))
    .catch(err => console.error(err))
}

export const joinGame = (gameId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/games/${gameId}/players`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(_ => dispatch(joinGameSuccess()))
    .catch(err => console.error(err))
}

export const createGame = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/games`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(addGame(result.body)))
    .catch(err => console.error(err))
}

export const updateGame = (gameId, newMove) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  const playerSymbol = state.games[gameId].turn;

  if (isExpired(jwt)) return dispatch(logout())

  request
    .patch(`${baseUrl}/games/${gameId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(newMove)
    .then(_ => dispatch(playerMove(newMove, playerSymbol)))
    .then(_ => dispatch(updateGameSuccess()))
    .catch(err => console.error(err))
}
// export const movePlayer = (playerId, board) => (dispatch, getState) => {
//   const state = getState()
//   const jwt = state.currentUser.jwt

//   if (isExpired(jwt)) return dispatch(logout())

//   request
//     .patch(`${baseUrl}/games/${gameId}`)
//     .set('Authorization', `Bearer ${jwt}`)
//     .send({ board })
//     .then(_ => dispatch(updateGameSuccess()))
//     .catch(err => console.error(err))
// }


