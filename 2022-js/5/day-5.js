const { table } = require("console")
const { readFileSync } = require("fs")

const YEAR = 2022
const DAY = 5
const FILE = "input"

// Read input data and split by line breaks, commas and then by dash. Format as number.
function syncReadFile(filename) {
	let contents = readFileSync(filename, "utf-8").split(/\r?\n\r?\n/)

	return contents
}

function getTabledata(tableRows) {
	let tableInput = tableRows.split(/\r?\n/).reverse()
	let numberOfColumns = parseInt(tableInput[0].trim().split(" ").slice(-1))

	// Find character positions based on position of numbers.
	let positions = []
	for (let i = 1; i <= numberOfColumns; i++) {
		positions.push(tableInput[0].indexOf(i))
	}

	// Remove numbers.
	tableInput.shift()

	//Loop through each postion and gather letters in that stack.
	let tableOutput = []
	for (let position of positions) {
		let stack = []
		for (let row of tableInput) {
			if (row.charAt(position) != " ") {
				stack.push(row.charAt(position))
			}
		}
		tableOutput.push(stack)
	}

	return tableOutput
}

function getMoves(rawMoves) {
	let moves = rawMoves.split(/\r?\n/).map((v1) => v1.split(" "))
	let movesOut = []

	// Get the numbers from string.
	for (let move of moves) {
		let moveRow = []
		for (let position of move) {
			if (!isNaN(position)) moveRow.push(position)
		}
		movesOut.push(moveRow)
	}
	return movesOut
}

function part1(input) {
	let boxes = getTabledata(input[0])
	let moves = getMoves(input[1])
	let numberOfBoxes = move[0]

	// Start moving boxes one by one.
	for (let move of moves) {
		let fromStack = move[1] - 1
		let toStack = move[2] - 1

		for (let i = 0; i < numberOfBoxes; i++) {
			boxes[fromStack].push(boxes[toStack].pop())
		}
	}

	// Get the letter of the box in the top of each stack.
	let result = []
	for (box of boxes) {
		result.push(box.pop())
	}

	return result.join("")
}

function part2(input) {
	let boxes = getTabledata(input[0])
	let moves = getMoves(input[1])
	let numberOfBoxes = move[0]

	// Start moving boxes many at once.
	for (let move of moves) {
		let fromStack = move[1] - 1
		let toStack = move[2] - 1

		// Concatenate existing array with removed elements.
		boxes[toStack] = boxes[toStack].concat(
			boxes[fromStack].splice(-numberOfBoxes)
		)
	}

	// Get the letter of the box in the top of each stack.
	let result = []
	for (box of boxes) {
		result.push(box.pop())
	}

	return result.join("")
}

function main(year, day, file) {
	const input = syncReadFile(`./${year}-js/${day}/${file}.txt`)

	console.log(`Results part 1: ${part1(input)}`)
	// CMZ
	// ZRLJGSCTR

	console.log(`Results part 2: ${part2(input)}`)
	// MCD
	// PRTTGRFPB
}

main(YEAR, DAY, FILE)
