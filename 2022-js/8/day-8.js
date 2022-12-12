const { readFileSync } = require("fs")

const YEAR = 2022
const DAY = 8
const FILE = "input"

// Read input data and split by line breaks.
function syncReadFile(filename) {
	let contents = readFileSync(filename, "utf-8").split(/\r?\n/)
		.map(row => row.split("")
			.map(Number))

	return contents
}


function part1(input) {
	let result = input[0].length * 2 + (input.length - 2) * 2
	// let result = 0
	let visibleTrees = new Set
	for (let rowIndex = 1; rowIndex < input.length - 1; rowIndex++) {

		for (let colIndex = 1; colIndex < input[rowIndex].length - 1; colIndex++) {
			let currentTree = input[rowIndex][colIndex]
			let up = [], down = [], left = [], right = []
			// Up
			for (let i = rowIndex; i > 0; i--) {
				up.push(input[i - 1][colIndex])
			}
			if (up.every(x => x < currentTree)) visibleTrees.add(rowIndex + '-' + colIndex)

			//Down
			for (let i = rowIndex; i < input.length - 1; i++) {
				down.push(input[i + 1][colIndex])
			}
			if (down.every(x => x < currentTree)) visibleTrees.add(rowIndex + '-' + colIndex)

			//Left
			for (let i = colIndex; i > 0; i--) {
				left.push(input[rowIndex][i - 1])
			}
			if (left.every(x => x < currentTree)) visibleTrees.add(rowIndex + '-' + colIndex)

			//Right
			for (let i = colIndex; i < input[0].length - 1; i++) {
				right.push(input[rowIndex][i + 1])
			}
			if (right.every(x => x < currentTree)) visibleTrees.add(rowIndex + '-' + colIndex)


		}
	}
	return (result += visibleTrees.size)
}

function countPoints(trees, currentTree) {
	let points = 0

	for (let i = 0; i < trees.length; i++) {
		if (trees[i] >= currentTree) {
			points++
			break
		}
		points++
	}
	return points
}

function part2(input) {
	let result = 0

	for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
		for (let colIndex = 0; colIndex < input[rowIndex].length; colIndex++) {
			let currentTree = input[rowIndex][colIndex]
			let up = [], down = [], left = [], right = []

			for (let i = rowIndex; i > 0; i--) {
				up.push(input[i - 1][colIndex])
			}

			let upCount = countPoints(up, currentTree)

			//Down
			for (let i = rowIndex; i < input.length - 1; i++) {
				down.push(input[i + 1][colIndex])
			}
			let downCount = countPoints(down, currentTree)

			//Left
			for (let i = colIndex; i > 0; i--) {
				left.push(input[rowIndex][i - 1])
			}
			let leftCount = countPoints(left, currentTree)

			//Right
			for (let i = colIndex; i < input[0].length - 1; i++) {
				right.push(input[rowIndex][i + 1])
			}
			let rightCount = countPoints(right, currentTree)

			let positionResult = upCount * leftCount * downCount * rightCount
			if (positionResult > result) result = positionResult

		}
	}
	return (result)
}


function main(year, day, file) {
	const input = syncReadFile(`./${year}-js/${day}/${file}.txt`)

	console.log(`Results part 1: ${part1(input)}`)
	// 21
	// 1823

	console.log(`Results part 2: ${part2(input)}`)
	// 8
	// 211680
}

main(YEAR, DAY, FILE)
