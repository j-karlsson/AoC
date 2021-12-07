"""Advent of code 2021 - Day 4."""
import os
import sys

INPUT = os.path.join(sys.path[0], 'input.txt')

bingonum = None
card = []
cards = []
with open(INPUT) as file:
    bingonum = [int(number) for number in file.readline().rstrip().split(",")]
    cards = []
    while file.readline():
        card = []
        for i in range(5):
            card.extend([int(x) for x in file.readline().strip('\n').split(' ') if x != ''])
        cards.append(card)


def IsWinner(card):
    """Check if we have a bingo horizontally or vertically."""
    # Horizontal rows
    start = 0
    for i in range(5):
        if card[start] + card[start+1] + card[start+2] + card[start+3] + card[start+4] == 500:
            return True
        start += 5

    # Vertical columns
    start = 0
    for i in range(5):
        if card[start] + card[start+5] + card[start+10] + card[start+15] + card[start+20] == 500:
            return True
        start += 1

    # No bingo
    return False


def part1(bingonum, cards):
    """Part1."""
    found = False
    total = 0
    number = 0
    while found is False:
        number = bingonum[0]
        bingonum = bingonum[1:]
        for card in cards:
            for i in range(len(card)):
                if card[i] == number:
                    card[i] = 100
        for card in cards:
            if IsWinner(card):
                total = sum([x for x in card if x != 100])
                found = True

    return total * number


def part2(bingonum, cards):
    """Part2."""
    found = False
    number = 0
    index = 0
    while found is False:
        number = bingonum[0]
        bingonum = bingonum[1:]
        for index in range(len(cards)):
            for i in range(len(cards[index])):
                if cards[index][i] == number:
                    cards[index][i] = 100
        index = 0
        while index < len(cards):
            if IsWinner(cards[index]):
                if len(cards) > 1:
                    cards.pop(index)
                else:
                    found = True
                    break

            index += 1
    total = sum([x for x in cards[index] if x != 100])
    return total * number


print(f"part one: {part1(bingonum,cards)}")
print(f"part two: {part2(bingonum,cards)}")
