"""Advent of code 2021 - Day 2."""
import os
import sys

INPUT = os.path.join(sys.path[0], 'input.txt')

with open(INPUT) as file:
    input_values = [line.rstrip().split(" ") for line in file]


def part1(values):
    """Part1."""
    horizontal = 0
    depth = 0

    for line in values:
        direction = line[0]
        units = int(line[1])

        if direction == "forward":
            horizontal += units
            continue

        if direction == "down":
            depth += units
            continue

        if direction == "up":
            depth -= units

    return horizontal * depth


def part2(values):
    """Part2."""
    horizontal = 0
    depth = 0
    aim = 0

    for line in values:
        direction = line[0]
        units = int(line[1])

        if direction == "forward":
            horizontal += units
            depth += (aim * units)
            continue

        if direction == "down":
            aim += units
            continue

        if direction == "up":
            aim -= units

    return horizontal * depth


print(f"part one: {part1(input_values)}")
print(f"part two: {part2(input_values)}")
