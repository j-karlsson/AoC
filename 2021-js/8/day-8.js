const { readFileSync } = require('fs');

const DAY = 8
const FILE = 'input'

function syncReadFile(filename) {
    let contents = readFileSync(filename, 'utf-8')
        .split(/\r?\n/)
        .map(value => value.split(' | '))


    return contents
}


function part1(input) {

    const digits = input.map(value => value[1].split(' '))


    const find_length = [2, 3, 4, 7]
    let results = 0

    for (let row of digits) {
        for (let digit of row) {
            if (find_length.includes(digit.length)) {
                results++
            }
        }
    }
    return results
}


function part2(input) {

    const digit_point = [42, 17, 34, 39, 30, 37, 41, 25, 49, 45] // Each digit has a unique point
    let results = 0

    for (let row of input) {
        row = row.map(value => value.split(' ')) // Split the content of left and right to separate "words"
        const [allnum, codes] = row  // Allnum = all numbers - left, Codes = right side

        let letter_val = new Map() // Map to store points per letter

        for (let num of allnum) {  // Count letters and assign point per letter (left part)
            for (let letter of num) {
                letter_val.set(letter, letter_val.get(letter) + 1 || 1)
            }
        }

        let row_code = ''
        for (let code of codes) {   // Loop through the codes (right side)
            let code_points = 0
            for (let letter of code) {   // Look up the letter value and summarize to identify each digit
                code_points += letter_val.get(letter)
            }
            row_code += digit_point.indexOf(code_points)
        }

        results += parseInt(row_code)
    }

    return results


    // Proof to get points per code, only needed to get total points reference for 0-9 really.
    // let code_val = new Map()
    // for (let num of allnum) {  // Summarize the points per unique number (left part)
    //     num_sort = num.split('').sort().join('')
    //     for (let letter of num) {
    //         code_val.set(num_sort, code_val.get(num_sort) + letter_val.get(letter) || letter_val.get(letter))
    //     }
    // }
    // console.log(code_val)
}


function main(day, file) {

    const input = syncReadFile(`./${day}/${file}.txt`)

    console.log(`Results part 1: ${part1(input)}`)
    // 26
    // 445

    console.log(`Results part 2: ${part2(input)}`)
    // 61229
    // 1043101

}

main(DAY, FILE)