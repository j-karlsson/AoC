const { readFileSync } = require("fs")

const YEAR = 2022
const DAY = 4
const FILE = "input"

// Read input data and split by line breaks, commas and then by dash. Format as number.
function syncReadFile(filename) {
	let contents = readFileSync(filename, "utf-8")
		.split(/\r?\n/)
		.map(v1 => v1.split(",")
			.map(v2 => (v2.split('-')
				.map(Number))))

	return contents
}

// Create array of numbers ranging from - to given inputs.
function getRange(from_val, to_val) {
	let range = []
	for (let i = from_val; i <= to_val; i++) {
		range.push(i)
	}

	return range
}

function part1(input) {
	let score = 0
	for (let row of input) {

		let p1full = getRange(row[0][0], row[0][1])
		let p2full = getRange(row[1][0], row[1][1])

		let p1matches = p1full.filter(number => p2full.includes(number)).length
		let p2matches = p2full.filter(number => p1full.includes(number)).length

		// Full overlap from one of the two ranges.
		if (p1matches == p1full.length || p2matches == p2full.length) score++
	}
	return score
}

function part2(input) {
	let score = 0
	for (let row of input) {

		let p1full = getRange(row[0][0], row[0][1])
		let p2full = getRange(row[1][0], row[1][1])

		let p1matches = p1full.filter(number => p2full.includes(number)).length
		let p2matches = p2full.filter(number => p1full.includes(number)).length

		// Any overlapping numbers in the two ranges.
		if (p1matches || p2matches) score++
	}
	return score
}


function main(year, day, file) {
	const input = syncReadFile(`./${year}-js/${day}/${file}.txt`)

	console.log(`Results part 1: ${part1(input)}`)
	// 2
	// 602

	console.log(`Results part 2: ${part2(input)}`)
	// 4
	// 891
}

main(YEAR, DAY, FILE)
