
const { readFileSync } = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8')
    const lines = contents.split(/\r?\n/)

    return lines
}


function part1(input) {
    let horizontal = 0, depth = 0

    input.forEach(element => {
        let values = element.split(' ')
        let direction = values[0]
        let steps = parseInt(values[1])

        if (direction == 'down') depth = depth + steps
        if (direction == 'up') depth = depth - steps
        if (direction == 'forward') horizontal = horizontal + steps

    })

    return horizontal * depth
}

function part2(input) {
    let horizontal = 0, aim = 0, depth = 0

    input.forEach(element => {
        let values = element.split(' ')
        let direction = values[0]
        let steps = parseInt(values[1])

        if (direction == 'down') aim = aim + steps
        if (direction == 'up') aim = aim - steps
        if (direction == 'forward') {
            horizontal = horizontal + steps
            depth = depth + (steps * aim)
        };

    })

    return horizontal * depth
}

// const inputdata = syncReadFile('./2/test.txt')
const inputdata = syncReadFile('./2/input.txt')

console.log(`Results part 1: ${part1(inputdata)}`)
console.log(`Results part 2: ${part2(inputdata)}`)