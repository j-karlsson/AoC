const { readFileSync } = require("fs")

const YEAR = 2022
const DAY = 3
const FILE = "input"

const VALUE = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

function syncReadFile(filename) {
	let contents = readFileSync(filename, "utf-8")
		.split(/\r?\n/)
	return contents
}


function part1(input) {
	input = input.map((value) => [value.slice(0, value.length / 2), value.slice(value.length / 2)])
	let score = 0
	for (let row of input) {
		for (let letter = 0; letter < VALUE.length; letter++) {
			let char = VALUE[letter]
			if (row[0].indexOf(char) > -1 && row[1].indexOf(char) > -1) {
				score += letter + 1
			}
		}
	}
	return score
}

function part2(input) {
	let score = 0
	for (let groupid = 0; groupid < input.length; groupid += 3) {
		for (let letter = 0; letter < VALUE.length; letter++) {
			let char = VALUE[letter]
			if (input[groupid].indexOf(char) > -1 &&
				input[groupid + 1].indexOf(char) > -1 &&
				input[groupid + 2].indexOf(char) > -1) {
				score += letter + 1
			}
		}
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
