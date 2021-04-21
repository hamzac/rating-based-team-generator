'use strict'

const mockPlayerData = JSON.parse(`[
  { "name": "hamza", "rating": "10" },
  { "name": "mp", "rating": "1" },
  { "name": "muj", "rating": "8" },
  { "name": "ali", "rating": "9" },
  { "name": "ibzy", "rating": "4" },
  { "name": "kassir", "rating": "6" },
  { "name": "biram", "rating": "4" },
  { "name": "fahim", "rating": "5" },
  { "name": "akram", "rating": "6" },
  { "name": "dbsi", "rating": "8" }
]`)

function generateCombinations (numOfPlayers, numOfTeams, currentArray, result) {
  if (currentArray.length === numOfPlayers) {
    result.push(currentArray)
    return currentArray
  }

  for (let i = 0; i < numOfTeams; i++) {
    generateCombinations(numOfPlayers, numOfTeams, [...currentArray, i], result)
  }

  return result
}

function generatePossibleTeams (playerData, numOfTeams) {
  const numOfPlayers = playerData.length
  const combinations = generateCombinations(numOfPlayers, numOfTeams, [], [])

  console.log(combinations)
}

// generatePossibleTeams(mockPlayerData, 2)
