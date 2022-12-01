
const { readFileSync } = require('fs');

const DAY = 4
const FILE = 'input'

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8')
    const data = contents.split(/\r?\n\r?\n/)

    return data
}

function checkBingo(board) {

    for (let col = 0; col < 5; col++) {
        let column = []

        for (let row = 0; row < 5; row++) {
            if (board[row].filter(num => num == '0x0').length == 5) return true // Row has bingo

            column.push(board[row][col])
        }


        if (column.filter(num => num == '0x0').length == 5) return true  // Column has bingo
    }
    return false
}

function part1(draw_num, boards) {
    for (num of draw_num) {
        for (board of boards) {
            for (row of board) {
                for (let i = 0; i < row.length; i++) {
                    if (parseInt(row[i]) == num) row[i] = '0x0'
                }
            }

            if (checkBingo(board)) {
                let board_sum = 0
                for (row of board) {
                    board_sum += row.reduce((sum, val) => sum += parseInt(val), 0)
                }
                return board_sum * num
            }
        }
    }
}


function part2(draw_num, boards) {
    let bingo_boards = []
    let bingo_value = 0
    for (num of draw_num) {
        let board_index = 0
        for (board of boards) {

            for (row of board) {
                for (let i = 0; i < row.length; i++) {
                    if (parseInt(row[i]) == num) row[i] = '0x0'
                }
            }

            if (checkBingo(board) && bingo_boards.indexOf(board_index) == -1) {
                let board_sum = 0
                for (row of board) {
                    board_sum += row.reduce((sum, val) => sum += parseInt(val), 0)
                }
                bingo_boards.push(board_index)
                bingo_value = board_sum * num
            }

            board_index++
        }
    }
    return bingo_value
}


function main(day, file) {
    const inputdata = syncReadFile(`./${day}/${file}.txt`)

    let draw_num = []
    inputdata.splice(0, 1)[0].split(',').forEach(num => draw_num.push(parseInt(num)))
    // console.log(draw_num)
    let boards = []
    for (entities of inputdata) {
        let board = []
        for (entity of entities.split(/\r?\n/)) {
            board.push(entity.trim().split(/\s+/))
        }
        boards.push(board)
    }

    console.log(`Results part 1: ${part1(draw_num, boards)}`)
    // 4512

    console.log(`Results part 2: ${part2(draw_num, boards)}`)
    //1924


}



main(DAY, FILE)