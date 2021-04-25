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

function findPartition (array, k) {
  const set = [...array]
  set.sort((a, b) => b - a)

  const a = []
  const b = []
  let sumA = 0
  let sumB = 0
  for (const n of set) {
    if (sumA < sumB) {
      a.push(n)
      sumA += n
    } else {
      b.push(n)
      sumB += n
    }
  }

  return [a, b]
}

console.log(findPartition([5, 7, 4, 8, 6], 2))
