const { readFileSync } = require("fs")

const YEAR = 2022
const DAY = 6
const FILE = "input"

// Read input data and split by line breaks, commas and then by dash. Format as number.
function syncReadFile(filename) {
	let contents = readFileSync(filename, "utf-8").split("")

	return contents
}

function part(input, targetLength) {
	let result = 0

	for (position = targetLength-1 ; position < input.length; position++) {
		let uniqueChars = new Set()

		// Loop the number of characters back in the array and add them to the set.
		for (i = 0; i < targetLength; i++) {
			uniqueChars.add(input[position - i])
		}

		// If the length of the set (unique values) match the target length of chars, we are done.
		if (uniqueChars.size == targetLength && result == 0) {
			return position + 1
		}
	}
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
