'use strict'

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

for (let i = 0; i < 10; i++) {
  const playersContainer = document.getElementsByClassName('players-container')[0]
  playersContainer.appendChild(createPlayerAndRatingFields())
}

function populateSelects () {
  const playersSelect = document.getElementById('players-select')
  const teamsSelect = document.getElementById('teams-select')

  for (let i = 2; i <= 100; i++) {
    const option = document.createElement('option')
    option.innerText = i
    option.value = i
    playersSelect.appendChild(option)
  }

  for (let i = 2; i <= 10; i++) {
    const option = document.createElement('option')
    option.innerText = i
    option.value = i
    teamsSelect.appendChild(option)
  }
}

populateSelects()
