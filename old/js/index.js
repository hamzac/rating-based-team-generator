'use strict'

import { generateRandomTeams, generateTeams } from './teams.js'

// Create and populate UI elements

function createPlayerAndRatingFields () {
  const container = document.createElement('div')
  container.className = 'player-div my-2'

  const playerField = document.createElement('input')
  playerField.type = 'text'
  playerField.placeholder = 'Player'
  playerField.className = 'player-field w-3/5 mr-2 py-2 px-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
  container.appendChild(playerField)

  const ratingField = document.createElement('input')
  ratingField.className = 'rating-field w-16 py-2 pl-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
  ratingField.type = 'number'
  ratingField.min = 1
  const ratingSystem = document.getElementById('rating-select').value
  if (ratingSystem === '1-10') ratingField.max = 10
  if (ratingSystem === '1-100') ratingField.max = 100
  container.appendChild(ratingField)

  return container
}

function appendPlayerAndRatingField () {
  const playersContainer = document.getElementById('players-container')
  playersContainer.appendChild(createPlayerAndRatingFields())
}

function removeLastPlayer () {
  const playersContainer = document.getElementById('players-container')
  playersContainer.removeChild(playersContainer.lastElementChild)
}

function createTeamElement (team, teamNumber, useRatings) {
  const container = document.createElement('div')
  container.className = 'w-1/2 mb-4 px-2'
  container.innerHTML = `
  <div class="container py-4 px-6 border border-gray-200 rounded leading-tight">
    <p class="text-lg">Team 1</p>
    <div class="w-full mt-2 divide-y divide-gray-100">
    </div>
  </div>`

  const containerContent = container.getElementsByClassName('w-full mt-2 divide-y divide-gray-100')[0]

  for (const player of team) {
    const div = document.createElement('div')
    div.className = 'block w-full py-2'
    div.innerHTML = `<span>${player.name}</span>`
    if (useRatings) div.innerHTML += `<span class="float-right">${player.rating}</span>`
    containerContent.appendChild(div)
  }

  if (useRatings) {
    const teamRating = team.reduce((sum, player) => sum + +player.rating, 0)

    const div = document.createElement('div')
    div.className = 'w-full pt-2 text-gray-400'
    div.innerHTML = `<span>Team Rating</span><span class="float-right">${teamRating}</span>`
    containerContent.appendChild(div)
  }

  return container
}

function populateSelects () {
  const playersSelect = document.getElementById('players-select')
  const teamsSelect = document.getElementById('teams-select')

  for (let i = 2; i <= 100; i++) {
    const option = document.createElement('option')
    option.innerText = i
    option.value = i
    if (i === 10) option.selected = 'selected'
    playersSelect.appendChild(option)
  }

  for (let i = 2; i <= 10; i++) {
    const option = document.createElement('option')
    option.innerText = i
    option.value = i
    teamsSelect.appendChild(option)
  }
}

// UI event listeners and functions

function ratingSelectUpdate () {
  const ratingSystem = this.value
  const ratingFields = document.getElementsByClassName('rating-field')
  for (const ratingField of ratingFields) {
    ratingField.style.display = (ratingSystem === 'None') ? 'none' : ''
    // update max values
    if (ratingSystem === '1-10') ratingField.max = 10
    if (ratingSystem === '1-100') ratingField.max = 100
  }
}

function hideNewRatingField () {
  const ratingSystem = document.getElementById('rating-select').value
  if (ratingSystem === 'None') document.getElementById('players-container').lastElementChild.lastElementChild.style.display = 'none'
}

function playersSelectUpdate () {
  console.log('players select update')
  const playerAndRatingFields = document.getElementsByClassName('player-div')
  const currentPlayersAmount = playerAndRatingFields.length
  const newPlayersAmount = this.value
  const playersAmountDifference = newPlayersAmount - currentPlayersAmount

  if (playersAmountDifference > 0) {
    for (let i = 0; i < playersAmountDifference; i++) {
      appendPlayerAndRatingField()
      hideNewRatingField()
    }
  }
  if (playersAmountDifference < 0) {
    for (let i = 0; i < -playersAmountDifference; i++) removeLastPlayer()
  }
}

function addPlayerListener () {
  console.log('add player')

  appendPlayerAndRatingField()
  hideNewRatingField()

  const playersSelect = document.getElementById('players-select')
  playersSelect.value = +playersSelect.value + 1
}

function removePlayerListener () {
  console.log('remove player')

  const playersContainer = document.getElementById('players-container')
  const playersSelect = document.getElementById('players-select')

  if (playersContainer.childElementCount > 2) {
    removeLastPlayer()
    playersSelect.value = +playersSelect.value - 1
  }
}

function generateTeamsListener () {
  console.log('generate teams')
  // clear any team elements if there are any
  const teamsContainer = document.getElementById('teams-container')
  while (teamsContainer.firstChild) teamsContainer.removeChild(teamsContainer.firstChild)

  const playerFields = document.getElementsByClassName('player-field')
  const ratingSystem = document.getElementById('rating-select').value
  const numOfTeams = document.getElementById('teams-select').value

  const players = []
  for (const field of playerFields) {
    const player = field.value
    if (player !== '') {
      const rating = field.nextElementSibling.value
      // make sure ratings are within specified range
      if (((+rating < 1) || ((+rating > 10) && (ratingSystem === '1-10')) || ((+rating > 100) && (ratingSystem === '1-100')))) {
        return window.alert('Make sure ratings are valid!')
      }

      players.push({ name: player, rating: rating })
    }
  }

  // alert if no player names have been entered
  if (players.length === 0) return window.alert('There are no players!')

  let teams
  if (ratingSystem === 'None') teams = { teams: generateRandomTeams(players.length, numOfTeams, players) }
  else {
    const emptyRatings = players.filter(player => player.rating === '')
    if (emptyRatings.length > 0) return window.alert('Some players are missing ratings!')
    teams = generateTeams(players.length, numOfTeams, players)
  }

  for (let i = 0; i < teams.teams.length; i++) {
    const teamElement = createTeamElement(teams.teams[i], i + 1, (ratingSystem !== 'None'))
    teamsContainer.appendChild(teamElement)
  }
}

// Main Execution

const ratingSelect = document.getElementById('rating-select')
const playersSelect = document.getElementById('players-select')
const teamsSelect = document.getElementById('teams-select')
const addPlayerButton = document.getElementById('add-player-button')
const removePlayerButton = document.getElementById('remove-player-button')
const generateTeamsButton = document.getElementById('generate-teams-button')

ratingSelect.addEventListener('change', ratingSelectUpdate)
playersSelect.addEventListener('change', playersSelectUpdate)
addPlayerButton.addEventListener('click', addPlayerListener)
removePlayerButton.addEventListener('click', removePlayerListener)
generateTeamsButton.addEventListener('click', generateTeamsListener)

populateSelects()
