'use strict'

// Create and populate UI elements

function createPlayerAndRatingFields () {
  const container = document.createElement('div')
  container.className = 'player-div'

  const playerField = document.createElement('input')
  playerField.type = 'text'
  playerField.className = 'player-field'

  const ratingField = document.createElement('input')
  ratingField.type = 'text'
  ratingField.className = 'rating-field'
  ratingField.placeholder = 5

  container.appendChild(playerField)
  container.appendChild(ratingField)
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

    if (i === 2) option.seleced = 'selected'

    teamsSelect.appendChild(option)
  }
}

for (let i = 0; i < 10; i++) {
  const playersContainer = document.getElementsByClassName('players-container')[0]
  playersContainer.appendChild(createPlayerAndRatingFields())
}

populateSelects()

// UI event listeners and functions

function ratingSelectUpdate () {
  console.log('rating select update')
}

function playersSelectUpdate () {
  console.log('players select update')
}

function teamsSelectUpdate () {
  console.log('teams select update')
}

function addPlayer () {
  console.log('add player')
}

function generateTeams () {
  console.log('generate teams')
  const playerFields = document.getElementsByClassName('player-field')
  const players = []

  for (const field of playerFields) {
    const player = field.value
    if (player !== '') {
      const rating = field.nextSibling.value
      players.push({ name: player, rating: rating })
    }
  }

  console.log(players)
}

const ratingSelect = document.getElementById('rating-select')
const playersSelect = document.getElementById('players-select')
const teamsSelect = document.getElementById('teams-select')
const addPlayerButton = document.getElementById('add-player-button')
const generateTeamsButton = document.getElementById('generate-teams-button')

ratingSelect.addEventListener('change', ratingSelectUpdate)
playersSelect.addEventListener('change', playersSelectUpdate)
teamsSelect.addEventListener('change', teamsSelectUpdate)
addPlayerButton.addEventListener('click', addPlayer)
generateTeamsButton.addEventListener('click', generateTeams)
