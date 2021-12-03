"""Advent of code 2021 - Day 3."""
import os
import sys

INPUT = os.path.join(sys.path[0], 'input.txt')

with open(INPUT) as file:
    input_values = [line.rstrip() for line in file]


def part1(values: list) -> int:
    """Part1."""
    gamma = ""
    epsilon = ""

    for position in range(0, len(values[0])):
        sum_position = 0

        for line in values:
            sum_position += int(line[position])

        if sum_position > len(values) / 2:
            gamma += "1"
            epsilon += "0"
            continue

        gamma += "0"
        epsilon += "1"

    return int(gamma, 2) * int(epsilon, 2)


def find_values(values: list, byte: bool, position: int = 0) -> str:
    """Recursive loop function for part 2."""
    if len(values) == 1:
        return values[0]

    ones = 0
    zeros = 0

    for line in values:
        if line[position] == "1":
            ones += 1
        else:
            zeros += 1

    if byte:
        out_values = [line for line in values if (ones >= zeros and line[position] == "1") or (ones < zeros and line[position] == "0")]
    else:
        out_values = [line for line in values if (ones < zeros and line[position] == "1") or (ones >= zeros and line[position] == "0")]

    return find_values(out_values, byte, position+1)


def part2(values: list) -> int:
    """Part2."""
    oxygen = find_values(values, True)
    co2 = find_values(values, False)

    return int(oxygen, 2) * int(co2, 2)


print(f"part one: {part1(input_values)}")
print(f"part two: {part2(input_values)}")
