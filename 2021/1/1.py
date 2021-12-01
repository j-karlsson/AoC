"""Advent of code 2021 - Day 1."""
import os
import sys

INPUT = os.path.join(sys.path[0], 'input.txt')

with open(INPUT) as file:
    input_values = [int(line.rstrip()) for line in file]


def part1(values):
    """Identify the amount of increases in values compared to previous."""
    increases = 0

    for i, value in enumerate(values):
        if i != 0 and value > values[i-1]:
            increases += 1

    return increases


def part2(values):
    """Identify increases in 3-group window compared to last 3-group window."""
    window = []
    increases = 0

    for i, value in enumerate(values):

        if i < len(values) - 2:
            window.append(value + values[i+1] + values[i+2])

            if len(window) > 1 and window[-1] > window[-2]:
                increases += 1

    return increases


print(f"part one increases: {part1(input_values)}")
print(f"part two increases: {part2(input_values)}")
