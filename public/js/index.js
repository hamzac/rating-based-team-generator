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
