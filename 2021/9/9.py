"""Advent of code 2021 - Day 9."""
import os
import sys

INPUT = os.path.join(sys.path[0], 'input.txt')

input_values = []
with open(INPUT) as file:
    for line in file:
        value = [int(x) for x in line.rstrip()]
        input_values.append(value)


def get_values(input_values, x, y):
    """Validate out of bounds and return neighbour value."""
    if x < 0 or x >= len(input_values):
        return 10
    if y < 0 or y >= len(input_values[0]):
        return 10

    return input_values[x][y]


def part1(values):
    """Part1."""
    output = 0
    for x, line in enumerate(input_values):
        print(line)
        for y, digit in enumerate(line):
            sum = 0
            neighbours = [[x+1, y], [x-1, y], [x, y+1], [x, y-1]]

            for neighbour in neighbours:
                if input_values[x][y] < get_values(input_values, neighbour[0], neighbour[1]):
                    sum += 1
            if sum == 4:
                output += digit+1

    return output


def part2(values):
    """Part2."""
    pass


print(f"part one: {part1(input_values)}")
# print(f"part two: {part2(input_values)}")
