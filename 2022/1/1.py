"""Advent of code 2022 - Day 1."""
import os
import sys

INPUT = os.path.join(sys.path[0], 'input.txt')


with open(INPUT) as file:
    input = file.read()

input_values = [value.split('\n') for value in input.split('\n\n')]

def part1(values):
    """Part1 - Find the elve with the greatest sum of calories."""
    max_sum = 0
    for elve in values:
        sum_elve = sum(int(cal) for cal in elve)
        if sum_elve > max_sum:
            max_sum = sum_elve
    return max_sum
    

def part2(values):
    """Part2 - Find the top three elves with greatest sum of calories."""
    """Improvement potential, only work with top three at all times instead of one big array."""
    sums = []
    for elve in values:
        sum_elve = sum(int(cal) for cal in elve)
        sums.append(sum_elve)
    sums.sort(reverse=True)
    return  sum(sums[:3])

print(f"part one: {part1(input_values)}")
print(f"part two: {part2(input_values)}")
