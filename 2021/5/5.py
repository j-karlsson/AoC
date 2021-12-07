"""Advent of code 2021 - Day 5."""
from collections import Counter
import os
import sys
import itertools

INPUT = os.path.join(sys.path[0], 'input.txt')

with open(INPUT) as file:
    input_values = []
    for line in file:
        value = [(int(x), int(y)) for (x, y) in tuple(point.split(",") for point in line.split(" -> "))]
        input_values.append(value)

def vec_to_pts(vector, include_diagonals):
    ((x1, y1), (x2, y2)) = vector

    if x1 == x2:
        return [(x1, y) for y in (range(y1, y2+1) if y1 < y2 else range(y2, y1+1))]
    elif y2 == y1:
        return [(x, y1) for x in (range(x1, x2+1) if x1 < x2 else range(x2, x1+1))]
    elif include_diagonals:
        slope = round((y2-y1) / (x2-x1))
        intercept = y2-slope*x2
        return [(x, round(slope*x+intercept)) for x in (range(x1, x2+1) if x1 < x2 else range(x2, x1+1))]
    else:
        return []


def find_overlap_pts(vectors, include_diagonals):
    all_points = itertools.chain(*[vec_to_pts(vector, include_diagonals) for vector in vectors])
    occurrences = Counter(all_points)
    return [(point, count) for (point, count) in occurrences.items() if count > 1]


def part1(values):
    """Part1."""
    pt1_overlapped_points = find_overlap_pts(values, include_diagonals=False)
    return len(pt1_overlapped_points)


def part2(values):
    """Part2."""
    pt2_overlapped_points = find_overlap_pts(values, include_diagonals=True)
    return len(pt2_overlapped_points)

print(f"part one: {part1(input_values)}")
print(f"part two: {part2(input_values)}")
