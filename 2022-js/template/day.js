const { spawn } = require('child_process');
const { readFileSync } = require('fs');

const DAY = x
const FILE = 'test'

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8') //.split(/\r?\n/)

    return contents
}


function part1(input) {


    return
}


function part2(input) {
    return

}


function main(day, file) {

    const input = syncReadFile(`./${day}/${file}.txt`)


    console.log(`Results part 1: ${part1(input)}`)
    //
    //

    console.log(`Results part 2: ${part2(input)}`)
    //
    //

}

main(DAY, FILE)