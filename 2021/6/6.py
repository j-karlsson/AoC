"""Advent of code 2021 - Day 5."""
import os
import sys

INPUT = os.path.join(sys.path[0], 'input.txt')
DAYS = 256

with open(INPUT) as file:
    start_values = [int(number) for number in file.readline().split(",")]

# Disabled Part 1 since it is ineffecient above ~150 days and can be
# solved better in part 2.
#
# def part1(values, days):
#     """Part1."""
#     for day in range(0,days):
#         tmp_values = []
#         for value in values:
#             if value == 0:
#                 tmp_values.append(6)
#                 tmp_values.append(8)
#                 continue
#             tmp_values.append(value-1)
#         values = tmp_values
#     return(len(values))


def part2(values: list, days: int):
    """Part2."""
    # Initialize list for counting of each age 0-8.
    age_num = [0] * 9

    # Add counts for initial input values.
    for value in values:
        age_num[value] += 1

    # Increase counters for each day.
    for _ in range(0, days):
        age_num.append(age_num.pop(0))  # Rotate list.
        age_num[6] += age_num[8]        # Increase age 6 as many as new (8).

    return sum(age_num)


# print(f"part one: {part1(start_values, days)}")
print(f"part two: {part2(start_values, DAYS)}")
