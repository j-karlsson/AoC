const { spawn } = require('child_process');
const { readFileSync } = require('fs');

const DAY = __dirname.split('/').at(-1)
const FILE = 'test'

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8')
        .split(/\r?\n/)
        .map(row => row.split('')
            .map(Number))

    return contents
}


function part1(input) {
    let results = 0

    input.forEach((row, y) => {
        row.forEach((num, x) => {
            let adjacents = get_neighbours(input, x, y)

            let lowpoint = adjacents.map(adjacent => num < adjacent)
            if (!lowpoint.includes(false)) results += num + 1

        })

    })

    return results
}

function get_neighbours(input, x, y) {
    let left = x == 0 ? 9 : input[y][x - 1]
    let right = x == input[y].length - 1 ? 9 : input[y][x + 1]
    let above = y == 0 ? 9 : input[y - 1][x]
    let below = y == input.length - 1 ? 9 : input[y + 1][x]

    return [left, right, above, below]

}

function findBasin(input, x, y) {
    if (input[y][x] == 9) return []

    return
}

function part2(input) {
    let results = 0

    input.forEach((row, y) => {
        row.forEach((num, x) => {


            let adjacents = get_neighbours(input, x, y)

            let lowpoint = adjacents.map(adjacent => num < adjacent)
            if (!lowpoint.includes(false)) {
                findBasin(input, x, y)
            }

        })

    })

    return results
}


function main(day, file) {

    const input = syncReadFile(`./${day}/${file}.txt`)


    console.log(`Results part 1: ${part1(input)}`)
    // 15
    //

    console.log(`Results part 2: ${part2(input)}`)
    //
    //

}

main(DAY, FILE)