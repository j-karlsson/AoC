const { table } = require("console")
const { readFileSync } = require("fs")

const YEAR = 2022
const DAY = 5
const FILE = "input"
const TABLECOLS = 9


// Read input data and split by line breaks, commas and then by dash. Format as number.
function syncReadFile(filename) {
	let contents = readFileSync(filename, "utf-8")
		.split(/\r?\n\r?\n/)

	return contents
}

function getTabledata(tableRows) {

	let tableInput = tableRows.split(/\r?\n/).reverse()
	let positions = []
	
	for(let i=1; i<= TABLECOLS; i++){
		positions.push(tableInput[0].indexOf(i))
	}

	tableInput.shift()
	let tableOutput = []
	for(let position of positions) {
		let stack = []
		for(let row of tableInput){
			if(row.charAt(position) != ' '){
			stack.push(row.charAt(position))
			}
		}
		tableOutput.push(stack)
	}

	return tableOutput
	
}

function getMoves (rawMoves) {
	let moves = rawMoves.split(/\r?\n/)
						 .map(v1 => v1.split(" "))
	let movesOut = []
	for(let move of moves) {
		let moveRow = []
		for(let position of move) {
			if(!isNaN(position)) moveRow.push(position)

		}
		movesOut.push(moveRow)
	}
	return(movesOut)
}

function part1(input) {
	let boxes = getTabledata(input[0])
	let moves = getMoves(input[1])

	for(let move of moves) {
		for(let i=0;i < move[0]; i++){
			boxes[move[2]-1].push(boxes[move[1]-1].pop())
		}
	}

	let result = []
	for(box of boxes) {
		result.push(box.pop())
	}
	

	return result.join("")
}

function part2(input) {
	let boxes = getTabledata(input[0])
	let moves = getMoves(input[1])
	
	for(let move of moves) {
		boxes[move[2]-1] = boxes[move[2]-1].concat(boxes[move[1]-1].splice(-move[0]))
	}

	let result = []
	for(box of boxes) {
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
