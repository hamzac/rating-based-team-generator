'use strict'

function generateRandomTeams (numOfPlayers, numOfTeams, playerData) {
  const teams = []
  for (let i = 0; i < numOfTeams; i++) teams.push([])
  // randomly distribute players into teams
  for (let i = 0; i < numOfPlayers; i++) {
    const randomIdx = Math.floor(Math.random() * playerData.length)
    teams[i % numOfTeams].push(playerData[randomIdx])
    playerData.splice(randomIdx, 1)
  }

  return teams
}

function generateTeams (numOfPlayers, numOfTeams, playerData) {
  const teams = generateRandomTeams(numOfPlayers, numOfTeams, playerData)

  const games = []
  // each iteration, swap a random player from highest rated team with random player from lowest rated team
  // for (let k = 0; k < numOfPlayers ** 2; k++) {
  for (let k = 0; k < 1; k++) {
    const ratings = teams.map((team) => {
      return team.reduce((sum, player) => sum + +player.rating, 0)
    })
    // find index of team with highest rating, find team with lowest
    const highestRatedTeamIdx = ratings.indexOf(Math.max(...ratings))
    const lowestRatedTeamIdx = ratings.indexOf(Math.min(...ratings))
    // if highest and lowest rated teams have same rating, then leave teams unchanged
    if (highestRatedTeamIdx !== lowestRatedTeamIdx) {
      const highestRatedTeamRandomIdx = Math.floor(Math.random() * teams[highestRatedTeamIdx].length)
      const lowestRatedTeamRandomIdx = Math.floor(Math.random() * teams[lowestRatedTeamIdx].length)
      const randomPlayer1 = teams[highestRatedTeamIdx][highestRatedTeamRandomIdx]
      const randomPlayer2 = teams[lowestRatedTeamIdx][lowestRatedTeamRandomIdx]
      teams[highestRatedTeamIdx].splice(highestRatedTeamRandomIdx, 1)
      teams[lowestRatedTeamIdx].splice(lowestRatedTeamRandomIdx, 1)
      teams[highestRatedTeamIdx].push(randomPlayer2)
      teams[lowestRatedTeamIdx].push(randomPlayer1)
    }

    const newRatings = teams.map((team) => {
      return team.reduce((sum, player) => sum + +player.rating, 0)
    })

    const game = {
      teams: JSON.parse(JSON.stringify(teams)),
      ratings: newRatings,
      ratingDifference: Math.max(...newRatings) - Math.min(...newRatings)
    }

    games.push(game)
  }

  let bestTeams = games[0]
  for (const game of games) {
    if (game.ratingDifference < bestTeams.ratingDifference) bestTeams = game
  }

  return bestTeams
}

export { generateRandomTeams, generateTeams }

// const mockPlayerData = JSON.parse(`[
//   { "name": "hamza", "rating": "10" },
//   { "name": "mp", "rating": "1" },
//   { "name": "muj", "rating": "8" },
//   { "name": "ali", "rating": "9" },
//   { "name": "ibzy", "rating": "4" },
//   { "name": "kassir", "rating": "6" },
//   { "name": "biram", "rating": "4" },
//   { "name": "fahim", "rating": "5" },
//   { "name": "akram", "rating": "6" },
//   { "name": "dbsi", "rating": "8" }
// ]`)