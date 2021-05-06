import React, { Component } from 'react'
// function Player (props) {
class Player extends Component {
  render () {
    return (
      <div className='player-div my-2'>
        <input
          type='text'
          idx={this.props.idx}
          placeholder={`Player ${this.props.idx}`}
          value={this.props.player.name}
          className='player-field w-3/5 mr-2 py-2 px-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
          onChange={e => this.props.onChange(e, this.props.idx)}
        />
        <input
          type='number'
          min='1'
          max={this.props.data.max}
          value={this.props.player.rating}
          idx={this.props.idx}
          className='rating-field w-16 py-2 pl-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
          style={{ display: this.props.data.display ? '' : 'none' }}
          onChange={e => this.props.onChange(e, this.props.idx)}
        />
      </div>
    )
  }
}

export default Player
