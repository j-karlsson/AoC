const { readFileSync } = require("fs")

const YEAR = 2022
const DAY = 6
const FILE = "input"

// Read input data and split by line breaks, commas and then by dash. Format as number.
function syncReadFile(filename) {
  let contents = readFileSync(filename, "utf-8").split("")

  return contents
}

function part(input, chars) {
  let result = 0

  for (index = 0;index < input.length; index++) {
    let uniqueChars = new Set()

	// Start running from the expected starting point given in chars (e.g. 4 or 14).
	// Loop the number of characters back in the array and add them to the set.
    if (index > chars - 1) {
		for (i = 0; i < chars; i++) {
        	uniqueChars.add(input[index - i])
    	}
    }

	// If the length of the set (unique values) match the given length of chars, we are done.
    if (uniqueChars.size == chars && result == 0) {
      result = index + 1
      break
    }
  }

  return result
}

function main(year, day, file) {
  const input = syncReadFile(`./${year}-js/${day}/${file}.txt`)

  console.log(`Results part 1: ${part(input, 4)}`)
  // 7
  // 1175

  console.log(`Results part 2: ${part(input, 14)}`)
  // 19
  // 3217
}

main(YEAR, DAY, FILE)
