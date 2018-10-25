import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import Paper from 'material-ui/Paper'
import Board from './Board'
import './GameDetails.css'

class GameDetails extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  makeMove = (toRow, toCell) => {
    console.log(`Clicked on cel ${toCell} of row ${toRow}`);
    const {game, updateGame} = this.props;
    const move = {x: toRow, y: toCell}
    updateGame(game.id, move);
  }

  // createArrow = (x1, x2, y1, y2) => {
  //   // the distance between the 2 points
  //   const distance= Math.sqrt((x1-x2)*(x1-x2)*12*12 + (y1-y2)*(y1-y2)*12*12)

  //   //mid-point for rotation center
  //   const xMid = (x1+x2)/2
  //   const yMid = (y1+y2)/2

  //   //
  //   const radians= Math.atan2(y1-y2, x1-x2)
  //   const degrees= (radians * 180) / Math.PI;
  //   return {
  //     backgroundColor: "red",
  //     overflow: "visible",
  //     width : `${distance}px`,
  //     height: "2px",
  //     position: "absolute",
  //     top: yMid,
  //     left: `${xMid - distance/2}px`,
  //     transform: `rotate(${degrees}deg)`

  //   }
  // }

  render() {
    const {game, users, authenticated, userId} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)

    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0]

    return (
      <Paper className="outer-paper">
        <h1>Game #{game.id}</h1>

        <p>Status: {game.status}</p>

        {
          game.status === 'started' &&
          player && player.symbol === game.turn &&
          <div>It's your turn!</div>
        }

        {
          game.status === 'pending' &&
          game.players.map(p => p.userId).indexOf(userId) === -1 &&
          <button onClick={this.joinGame}>Join Game</button>
        }

        {
          winner &&
          <p>Winner: {users[winner].firstName}</p>
        }

        <hr />

        {
          game.status !== 'pending' &&
          <Board board={game.board} makeMove={this.makeMove} game={this.props.game} createArrow={this.createArrow}/>
        }
      </Paper>
    )
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
