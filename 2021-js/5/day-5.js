const { readFileSync } = require('fs');

const DAY = 5
const FILE = 'input'

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8')
    const lines = contents.split(/\r?\n/)

    return lines
}


function part1(vectors) {
    let vents = new Map()
    let results = 0
    for (let line of vectors) {
        let x1 = parseInt(line[0][0])
        let y1 = parseInt(line[0][1])
        let x2 = parseInt(line[1][0])
        let y2 = parseInt(line[1][1])



        if (x1 == x2 || y1 == y2) {
            for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
                for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
                    vents.set(`${x},${y}`, vents.get(`${x},${y}`) + 1 || 1)
                }

            }
        }

    }
    vents.forEach(function (value, key) {
        if (value > 1) results++
    }
    )
    return results

}


function part2(vectors) {
    let vents = new Map()
    let results = 0
    for (let line of vectors) {
        let x1 = parseInt(line[0][0])
        let y1 = parseInt(line[0][1])
        let x2 = parseInt(line[1][0])
        let y2 = parseInt(line[1][1])

        if (x1 == x2 || y1 == y2) {
            for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
                for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
                    vents.set(`${x},${y}`, vents.get(`${x},${y}`) + 1 || 1)
                }

            }
        } else {

            let yinc = y1 < y2 ? 1 : -1
            let y = y1
            if (x1 < x2) {
                for (let x = x1; x <= x2; x++) {
                    vents.set(`${x},${y}`, vents.get(`${x},${y}`) + 1 || 1)
                    y += yinc

                }
            } else {
                for (let x = x1; x2 <= x; x--) {
                    vents.set(`${x},${y}`, vents.get(`${x},${y}`) + 1 || 1)
                    y += yinc
                }
            }
        }


    }

    vents.forEach(function (value, key) {
        if (value > 1) results++
    }
    )

    return results

}


function main(day, file) {
    const lines = syncReadFile(`./${day}/${file}.txt`)

    let vectors = []
    for (let line of lines) {
        let vector = []
        line.split(' -> ').forEach(value => {
            vector.push(value.split(','))
        });
        vectors.push(vector)
    }


    console.log(`Results part 1: ${part1(vectors)}`)
    // 5
    // 5280

    console.log(`Results part 2: ${part2(vectors)}`)
    // 12
    // 16716

}



main(DAY, FILE)