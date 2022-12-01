const { readFileSync } = require('fs');

const DAY = 6
const FILE = 'input'

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8')
    return contents
}


function part1(spawntimes, days) {

    for (let day = 0; day < days; day++) {

        let day_spawntimes = new Map()
        for (i = 0; i <= 8; i++) { day_spawntimes.set(i, 0) }

        for (let i = 0; i <= 8; i++) {
            if (spawntimes.get(i) == 0) continue

            if (i == 0) {
                day_spawntimes.set(6, spawntimes.get(i))
                day_spawntimes.set(8, spawntimes.get(i))
                continue
            }

            day_spawntimes.set(i - 1, day_spawntimes.get(i - 1) + spawntimes.get(i))
        }
        spawntimes = day_spawntimes

    }

    let results = 0
    spawntimes.forEach(value => { results += value })
    return results
}


function part2(vectors) {
    return

}


function main(day, file) {

    const input = syncReadFile(`./${day}/${file}.txt`)
    let fishes = input.split(',').map(Number)
    let spawntimes = new Map()

    for (i = 0; i <= 8; i++) { spawntimes.set(i, 0) }

    for (let fish of fishes) {
        spawntimes.set(fish, spawntimes.get(fish) + 1)
    }

    console.log(`Results part 1: ${part1(spawntimes, 80)}`)
    // 5934
    // 358214

    console.log(`Results part 2: ${part1(spawntimes, 256)}`)
    // 26984457539
    // 1622533344325

}

main(DAY, FILE)