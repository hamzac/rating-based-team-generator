import React, { Component } from 'react'
import { generateRandomTeams, generateTeams } from '../teams'

import Player from './Player'
import Team from './Team'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      numOfTeams: 2,
      ratingSystem: '1-10',
      ratingFields: {
        max: 10,
        display: true
      },
      players: [...Array(10)].map(() => {
        return { name: '', rating: '' }
      }),
      teams: []
    }

    this.handlePlayerFieldsChange = this.handlePlayerFieldsChange.bind(this)
  }

  addPlayer () {
    this.setState(prevState => {
      const prevPlayers = [...prevState.players]
      prevPlayers.push({ name: '', rating: '' })
      return {
        players: prevPlayers
      }
    })
  }

  removePlayer () {
    this.setState(prevState => {
      const prevPlayers = [...prevState.players]
      prevPlayers.pop()
      return {
        players: prevPlayers
      }
    })
  }

  handlePlayerFieldsChange (e, idx) {
    if (e.target.classList.contains('player-field')) {
      this.setState(prevState => {
        const newPlayers = [...prevState.players]
        newPlayers[idx - 1] = { name: e.target.value, rating: newPlayers[idx - 1].rating }
        return { players: newPlayers }
      })
    } else if (e.target.classList.contains('rating-field')) {
      this.setState(prevState => {
        const newPlayers = [...prevState.players]
        newPlayers[idx - 1] = { name: newPlayers[idx - 1].name, rating: e.target.value }
        return { players: newPlayers }
      })
    }
  }

  handlePlayersSelectChange (e) {
    const numOfPlayersDiff = +e.target.value - this.state.players.length
    if (numOfPlayersDiff > 0) {
      for (let i = 0; i < numOfPlayersDiff; i++) this.addPlayer()
    } else if (numOfPlayersDiff < 0) {
      for (let i = 0; i < -numOfPlayersDiff; i++) this.removePlayer()
    }
  }

  handleTeamsSelectChange (e) {
    this.setState({ numOfTeams: +e.target.value })
  }

  handleRatingSelectChange (e) {
    this.setState(prevState => {
      if (e.target.value === 'None') {
        return {
          ratingSystem: e.target.value,
          ratingFields: {
            max: prevState.ratingFields.max,
            display: false
          }
        }
      }

      let max
      if (e.target.value === '1-10') max = 10
      if (e.target.value === '1-100') max = 100

      return {
        ratingSystem: e.target.value,
        ratingFields: {
          max: max,
          display: true
        }
      }
    })
  }

  handleAddPlayerClick () {
    this.addPlayer()
  }

  handleRemovePlayerClick () {
    if (this.state.players.length > 2) {
      this.removePlayer()
    }
  }

  handleGenerateTeamsClick () {
    const players = this.state.players.filter((player) => player.name !== '')

    for (const player of players) {
      const under1 = (+player.rating < 1)
      const over10 = (+player.rating > 10) && (this.state.ratingSystem === '1-10')
      const over100 = (+player.rating > 100) && (this.state.ratingSystem === '1-100')
      if (under1 || over10 || over100) return window.alert('Make sure ratings are valid!')
    }

    if (players.length === 0) return window.alert('There are no players!')

    let result
    if (this.state.ratingSystem === 'None') {
      result = { teams: generateRandomTeams(players.length, this.state.numOfTeams, players) }
    } else {
      const emptyRatings = players.filter(player => player.rating === '')
      if (emptyRatings.length > 0) return window.alert('Some players are missing ratings!')
      result = generateTeams(players.length, this.state.numOfTeams, players)
    }

    this.setState({ teams: result.teams })
  }

  render () {
    return (
      <div className='container flex flex-wrap mx-auto my-16 w-2/5 text-gray-800'>
        <div className='w-3/5'>
          <p className='text-2xl mb-4'>Players</p>
          <div id='players-container'>
            {this.state.players.map((player, idx) => {
              return (
                <Player
                  key={idx}
                  idx={idx + 1}
                  data={this.state.ratingFields}
                  player={player}
                  onChange={this.handlePlayerFieldsChange}
                />
              )
            })}
          </div>

          <div className='block w-full mb-2 space-x-1'>
            <button
              className='button bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'
              onClick={() => this.handleAddPlayerClick()}
            >
              Add Player
            </button>
            <button
              className='button bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded'
              onClick={() => this.handleRemovePlayerClick()}
            >
              Remove Player
            </button>
          </div>
          <div className='block w-full mb-8'>
            <button
              className='button bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'
              onClick={() => this.handleGenerateTeamsClick()}
            >
              Generate Teams
            </button>
          </div>
        </div>

        <div className='w-2/5'>
          <p className='text-2xl mb-4'>Settings</p>
          <div id='settings-container' className='flex flex-wrap'>
            <div className='mr-8'>
              <span>Rating System</span>
              <select
                className='block w-20 mt-2 px-2 py-2 bg-white border border-gray-300 hover:border-gray-400 rounded'
                value={this.state.ratingSystem}
                onChange={e => this.handleRatingSelectChange(e)}
              >
                <option value='None'>None</option>
                <option value='1-10'>1-10</option>
                <option value='1-100'>1-100</option>
              </select>
            </div>
            <div className='mr-8'>
              <span>Players</span>
              <select
                className='block w-20 mt-1 mb-4 px-2 py-2 bg-white border border-gray-300 hover:border-gray-400 rounded'
                value={this.state.players.length}
                onChange={e => this.handlePlayersSelectChange(e)}
              >
                {[...Array(99)].map((val, idx) => {
                  return (
                    <option key={idx}>{idx + 2}</option>
                  )
                })}
              </select>
            </div>
            <div className='mr-8'>
              <span>Teams</span>
              <select
                className='block w-20 mt-1 mb-4 px-2 py-2 bg-white border border-gray-300 hover:border-gray-400 rounded'
                value={this.state.numOfTeams}
                onChange={e => this.handleTeamsSelectChange(e)}
              >
                {[...Array(9)].map((val, idx) => {
                  return (
                    <option key={idx}>{idx + 2}</option>
                  )
                })}
              </select>
            </div>
          </div>
        </div>

        <p className='text-2xl mb-4'>Teams</p>
        <div id='teams-container' className='container w-full flex flex-wrap'>
          {this.state.teams.map((team, idx) => {
            return <Team key={idx} players={team} ratingSystem={this.state.ratingSystem} />
          })}
        </div>

      </div>
    )
  }
}

export default App
