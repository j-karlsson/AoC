const { readFileSync } = require("fs")

const YEAR = 2022
const DAY = 3
const FILE = "input"

function syncReadFile(filename) {
	let contents = readFileSync(filename, "utf-8")
		.split(/\r?\n/)
	return contents
}

function getUniqueChars(characters){
	// Gives a set with unique characters from inputstring.
	let uniqueset = new Set(characters.split(""))
	return (uniqueset)
}

function getLetterScore(letter) {
	// Lowercase item types a through z have priorities 1 through 26.
	// Uppercase item types A through Z have priorities 27 through 52.
	if(letter.toUpperCase() == letter) return letter.codePointAt() - 38
	return letter.codePointAt() - 96
}

function part1(input) {
	input = input.map((value) => [value.slice(0, value.length / 2), value.slice(value.length / 2)])
	let score = 0
	for (let row of input) {
		let uniqueset = getUniqueChars(row[0])

		uniqueset.forEach(letter => {
			if(row[1].indexOf(letter) > -1) {
				score += getLetterScore(letter)
			}
		})
	}
	return score
}

function part2(input) {
	let score = 0
	for (let groupid = 0; groupid < input.length; groupid += 3) {
		let uniqueset = getUniqueChars(input[groupid])
		uniqueset.forEach(letter => {
			if(input[groupid+1].indexOf(letter) > -1 &&
			   input[groupid+2].indexOf(letter) > -1) {
			   score += getLetterScore(letter)
			}
		})
	}
	return score
}

function main(year, day, file) {
	const input = syncReadFile(`./${year}-js/${day}/${file}.txt`)

	console.log(`Results part 1: ${part1(input)}`)
	// 157
	// 7826

	console.log(`Results part 2: ${part2(input)}`)
	// 70
	// 2577
}

main(YEAR, DAY, FILE)
