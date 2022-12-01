
const { readFileSync } = require('fs');

const DAY = 3
const FILE = 'input'

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8')
    const lines = contents.split(/\r?\n/)

    return lines
}

function get_bits(input, invert) {
    let breakpoint = input.length / 2
    let result = ''

    for (let i = 0; i < input[0].length; i++) {
        let col_sum = 0

        input.forEach(element => col_sum += parseInt(element[i]))

        if (!invert) {
            result += col_sum >= breakpoint ? '1' : '0'
        } else {
            result += col_sum >= breakpoint ? '0' : '1'
        }
    }
    return result
}

function get_rating(input, invert) {
    let pos = input.length

    for (let i = 0; i < pos; i++) {
        let input_tmp = []
        let bits = get_bits(input, invert)

        input.forEach((row, index) => {
            if (row[i] == bits[i]) {
                input_tmp.push(row)
            }
        })

        if (input_tmp.length == 1) {
            return parseInt(input_tmp[0], 2)
        }

        input = input_tmp
    }
}

function part1(input) {
    let gamma = get_bits(input, false)
    let epsilon = get_bits(input, true)

    return (parseInt(gamma, 2) * parseInt(epsilon, 2))
}

function part2(input) {
    let oxygen = get_rating(input, false)
    let co2 = get_rating(input, true)

    return oxygen * co2
}

function main(day, file) {
    const inputdata = syncReadFile(`./${day}/${file}.txt`)

    console.log(`Results part 1: ${part1(inputdata)}`)
    console.log(`Results part 2: ${part2(inputdata)}`)

    // Results part 1: 2954600
    // Results part 2: 1662846
}



main(DAY, FILE)