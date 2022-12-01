
const { readFileSync } = require('fs');

const DAY = 7
const FILE = 'test'

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8').split(',').map(Number)

    return contents
}


function part1(crabs) {
    let min_crab = Math.min(...crabs)
    let max_crab = Math.max(...crabs)

    let fuel = null
    for (let i = min_crab; i <= max_crab; i++) {
        let sum = 0
        for (let crab of crabs) {
            sum += Math.abs(crab - i)
        }
        if (fuel == null || sum < fuel) fuel = sum
    }

    return fuel
}


function part2(crabs) {
    let min_crab = Math.min(...crabs)
    let max_crab = Math.max(...crabs)

    let fuel = null
    let optimal = null

    for (let i = min_crab; i <= max_crab; i++) {
        let sum = 0
        for (let crab of crabs) {
            let steps = Math.abs(crab - i)

            for (let i = 1; i <= steps; i++) {
                sum += i
            }
        }

        if (fuel == null || sum < fuel) {
            fuel = sum
            optimal = i
        }
    }

    // for (let crab of crabs) {
    //     let steps = Math.abs(crab - optimal)

    //     for (let i = 1; i < steps; i++) {
    //         fuel += i
    //     }
    // }

    console.log(fuel, optimal)

    return fuel
}

function main(day, file) {

    const input = syncReadFile(`./${day}/${file}.txt`)

    console.log(`Results part 1: ${part1(input)}`)
    // 37
    // 342641

    console.log(`Results part 2: ${part2(input)}`)
    // 168
    // 93006301

}

main(DAY, FILE)