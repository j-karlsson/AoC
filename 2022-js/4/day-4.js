const { readFileSync } = require("fs")

const YEAR = 2022
const DAY = 4
const FILE = "input"

function syncReadFile(filename) {
	let contents = readFileSync(filename, "utf-8")
		.split(/\r?\n/)
		.map((value) => value.split(","))
	return contents
}

function getFullRange(from,to){
	let range=[]
	for(let i = from; i<= to;i++){
		range.push(i)
	}
	return range
}

function part1(input) {
	let score = 0
	for(let row of input){
		let p1 = row[0].split("-")
		let p2 = row[1].split("-")

		let p1full = getFullRange(parseInt(p1[0]),parseInt(p1[1]))
		let p2full = getFullRange(parseInt(p2[0]),parseInt(p2[1]))

		let p1match = p1full.filter(number => p2full.includes(number))
		let p2match = p2full.filter(number => p1full.includes(number))

		if(p1match.length == p1full.length || p2match.length == p2full.length) score ++
	}
	return score
}

function part2(input) {
	let score = 0
	for(let row of input){
		let p1 = row[0].split("-")
		let p2 = row[1].split("-")

		let p1full = getFullRange(parseInt(p1[0]),parseInt(p1[1]))
		let p2full = getFullRange(parseInt(p2[0]),parseInt(p2[1]))

		let p1match = p1full.filter(number => p2full.includes(number))
		let p2match = p2full.filter(number => p1full.includes(number))

		if(p1match.length >0 || p2match.length >0 ) score ++
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
