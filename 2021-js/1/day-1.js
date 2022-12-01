
const { readFileSync } = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8')
    const lines = contents.split(/\r?\n/)

    return lines
}



function part1(input) {
    let measurements = 0

    input.forEach((value, index) => {
        if (index > 0 && (parseInt(value) > parseInt(input[index - 1]))) {
            measurements++
        }
    })

    return measurements
}

function part2(input) {
    measurements = 0
    lastsum = 0
    input.forEach((value, index) => {
        if (index > 1) {
            var value_1 = parseInt(input[index - 1])
            var value_2 = parseInt(input[index - 2])
            var sum = parseInt(value) + value_1 + value_2

            if (index > 2 && (sum > lastsum)) {
                measurements++
            }
            lastsum = sum
        }
    })
    return measurements

}

// const inputdata = syncReadFile('./1/test.txt')
const inputdata = syncReadFile('./1/input.txt')

console.log(`Results part 1: ${part1(inputdata)}`)
console.log(`Results part 2: ${part2(inputdata)}`)