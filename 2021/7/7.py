"""Advent of code 2021 - Day 5."""
import os
import sys

INPUT = os.path.join(sys.path[0], 'input.txt')

with open(INPUT) as file:
    start_values = [int(number) for number in file.readline().split(",")]


def part1(values):
    """Part1."""
    min_fuel = None

    for position in range(min(values), max(values)+1):
        fuel = 0
        for value in values:
            fuel += abs(value - position)

        if min_fuel is None or fuel < min_fuel:
            min_fuel = fuel

    return min_fuel


def part2(values: list):
    """Part2."""
    min_fuel = None
    values.sort()

    for position in range(min(values), max(values)+1):
        fuel = 0
        for value in values:
            fuel += sum(range(0, abs(value - position)+1))

        if min_fuel is None or fuel < min_fuel:
            min_fuel = fuel

    return min_fuel


print(f"part one: {part1(start_values)}")
print(f"part two: {part2(start_values)}")
