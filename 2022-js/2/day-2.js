const { readFileSync } = require("fs")

const YEAR = 2022
const DAY = 2
const FILE = "input"

const VALUE = { rock: 1, paper: 2, scissors: 3 }
const TYPE = {
	A: "rock",
	B: "paper",
	C: "scissors",
	X: "rock",
	Y: "paper",
	Z: "scissors",
}

function syncReadFile(filename) {
	let contents = readFileSync(filename, "utf-8")
		.split(/\r?\n/)
		.map((value) => value.split(" "))
	return contents
}

function playMatch_v1(row) {
	let p1 = TYPE[row[0]]
	let p2 = TYPE[row[1]]
	let p2_points = VALUE[p2]

	// Draw
	if (p1 == p2) return p2_points + 3

	// Win
	if (
		(p1 == "scissors" && p2 == "rock") ||
		(p1 == "paper" && p2 == "scissors") ||
		(p1 == "rock" && p2 == "paper")
	)
		return p2_points + 6

	// Lose
	return p2_points
}

function playMatch_v2(row) {
	let p1 = TYPE[row[0]]
	let p1_points = VALUE[p1]

	// Draw
	if (row[1] == "Y") return p1_points + 3

	// Lose
	if (row[1] == "X") {
		if (p1 == "rock") return VALUE["scissors"]
		if (p1 == "paper") return VALUE["rock"]
		if (p1 == "scissors") return VALUE["paper"]
	}

	// Win
	if (row[1] == "Z") {
		if (p1 == "rock") return VALUE["paper"] + 6
		if (p1 == "paper") return VALUE["scissors"] + 6
		if (p1 == "scissors") return VALUE["rock"] + 6
	}
}

function part1(input) {
	let score = 0
	for (let row of input) {
		score += playMatch_v1(row)
	}
	return score
}

function part2(input) {
	let score = 0
	for (let row of input) {
		score += playMatch_v2(row)
	}
	return score
}

function main(year, day, file) {
	const input = syncReadFile(`./${year}-js/${day}/${file}.txt`)

	console.log(`Results part 1: ${part1(input)}`)
	// 15
	// 15691

	console.log(`Results part 2: ${part2(input)}`)
	// 12
	// 12989
}

main(YEAR, DAY, FILE)
