'use strict'

import { generateRandomTeams, generateTeams } from './teams.js'

// Create and populate UI elements

function createPlayerAndRatingFields () {
  const container = document.createElement('div')
  container.className = 'player-div'

  const playerField = document.createElement('input')
  playerField.type = 'text'
  playerField.className = 'player-field'
  container.appendChild(playerField)

  const ratingField = document.createElement('input')
  ratingField.className = 'rating-field'
  ratingField.type = 'number'
  ratingField.min = 1
  const ratingSystem = document.getElementById('rating-select').value
  if (ratingSystem === '1-10') ratingField.max = 10
  if (ratingSystem === '1-100') ratingField.max = 100
  container.appendChild(ratingField)

  return container
}

function appendPlayerAndRatingField () {
  const playersContainer = document.getElementsByClassName('players-container')[0]
  playersContainer.appendChild(createPlayerAndRatingFields())
}

function createTeamElement (team, teamNumber, useRatings) {
  const container = document.createElement('div')
  container.className = 'team-container'

  const teamName = document.createElement('p')
  teamName.innerText = `Team ${teamNumber}`
  container.appendChild(teamName)

  if (useRatings) {
    const ratingSum = team.reduce((sum, player) => sum + +player.rating, 0)

    const teamRating = document.createElement('p')
    teamRating.innerText = `Team rating: ${ratingSum}`
    container.appendChild(teamRating)
  }

  for (const player of team) {
    const playerHTML = document.createElement('p')
    playerHTML.innerText = `${player.name} `
    if (useRatings) playerHTML.innerText += `${player.rating}`
    container.appendChild(playerHTML)
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
  if (ratingSystem === 'None') document.getElementsByClassName('players-container')[0].lastChild.lastChild.style.display = 'none'
}

function playersSelectUpdate () {
  console.log('players select update')
  const playersContainer = document.getElementsByClassName('players-container')[0]
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
    for (let i = 0; i < -playersAmountDifference; i++) playersContainer.removeChild(playersContainer.lastChild)
  }
}

function addPlayerListener () {
  console.log('add player')

  appendPlayerAndRatingField()
  hideNewRatingField()

  const playersSelect = document.getElementById('players-select')
  playersSelect.value = +playersSelect.value + 1
}

function generateTeamsListener () {
  console.log('generate teams')
  // clear any team elements if there are any
  const teamsContainer = document.getElementsByClassName('teams-container')[0]
  while (teamsContainer.firstChild) teamsContainer.removeChild(teamsContainer.firstChild)

  const playerFields = document.getElementsByClassName('player-field')
  const ratingSystem = document.getElementById('rating-select').value
  const numOfTeams = document.getElementById('teams-select').value

  const players = []
  for (const field of playerFields) {
    const player = field.value
    if (player !== '') {
      const rating = field.nextSibling.value
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
    document.getElementsByClassName('teams-container')[0].appendChild(teamElement)
  }
}

// Main Execution

const ratingSelect = document.getElementById('rating-select')
const playersSelect = document.getElementById('players-select')
const teamsSelect = document.getElementById('teams-select')
const addPlayerButton = document.getElementById('add-player-button')
const generateTeamsButton = document.getElementById('generate-teams-button')

ratingSelect.addEventListener('change', ratingSelectUpdate)
playersSelect.addEventListener('change', playersSelectUpdate)
addPlayerButton.addEventListener('click', addPlayerListener)
generateTeamsButton.addEventListener('click', generateTeamsListener)

populateSelects()

for (let i = 0; i < 10; i++) appendPlayerAndRatingField()
