const { readFileSync } = require("fs")

const YEAR = 2022
const DAY = 7
const FILE = "input"

// Read input data and split by line breaks.
function syncReadFile(filename) {
	let contents = readFileSync(filename, "utf-8").split(/\r?\n/)

	return contents
}

function parseFileSystem(lines) {

	const fileSystem = {
		'/': {
			files: [],
			dirs: []
		}
	}

	let currentDir = '/'
	for (let i = 0; i < lines.length; i++) {
		const words = lines[i].split(' ')

		if (words[0] == '$') {
			if (words[1] == 'cd') {
				if (words[2] == '..') {
					currentDir = currentDir.substring(0, currentDir.lastIndexOf('/'))
				}
				else if (words[2] === '/') {
					currentDir = '/'
				}
				else {
					currentDir = currentDir != '/' ? currentDir + '/' + words[2] : currentDir + words[2]
				}
			}
			else if (words[1] == 'ls') {
				continue
			}
		}
		else {
			if (!(currentDir in fileSystem)) {
				fileSystem[currentDir] = {
					files: [],
					dirs: []
				}
			}

			if (words[0].startsWith('dir')) {
				fileSystem[currentDir].dirs.push(words[1])
			}
			else {
				fileSystem[currentDir].files.push({
					name: words[1],
					size: parseInt(words[0])
				})
			}
		}
	}
	return fileSystem
}


const calculateTotalSize = (fileSystem, dir) => {
	let totalSize = fileSystem[dir].files.reduce((sum, file) => sum + file.size, 0)

	for (let i = 0; i < fileSystem[dir].dirs.length; i++) {
		if (dir != '/') {
			totalSize += calculateTotalSize(fileSystem, dir + '/' + fileSystem[dir].dirs[i])
		} else {
			totalSize += calculateTotalSize(fileSystem, dir + fileSystem[dir].dirs[i])
		}

	}
	return totalSize
}


function part1(input) {
	let result = 0
	let fileSystem = parseFileSystem(input)

	for (dir in fileSystem) {
		let dirSum = calculateTotalSize(fileSystem, dir)
		if (dirSum < 100000) result += dirSum
	}

	return result
}

function part2(input) {
	let result = 0
	let fileSystem = parseFileSystem(input)

	let usedSpace = calculateTotalSize(fileSystem, '/')

	let neededSpace = 30000000 - (70000000 - usedSpace)

	for (dir in fileSystem) {
		let dirSum = calculateTotalSize(fileSystem, dir)
		if (dirSum >= neededSpace && (dirSum < result || result == 0)) result = dirSum
	}

	return result
}


function main(year, day, file) {
	const input = syncReadFile(`./${year}-js/${day}/${file}.txt`)

	console.log(`Results part 1: ${part1(input)}`)
	// 7
	// 1443806

	console.log(`Results part 2: ${part2(input)}`)
	// 19
	// 942298
}

main(YEAR, DAY, FILE)
