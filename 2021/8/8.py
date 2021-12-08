"""Advent of code 2021 - Day 8."""
import os
import sys

INPUT = os.path.join(sys.path[0], 'input.txt')


num_length = {
             7: 8,
             3: 7,
             4: 4,
             2: 1
}

with open(INPUT) as file:
    input_values = []
    for line in file:
        value = [x for x in list(digits.split() for digits in line.rstrip().split(" | "))]
        input_values.append(value)


def part1(values):
    """Part1."""
    digit_length = [0] * 10

    for line in values:
        for digit in line[1]:
            if len(digit) in num_length:
                digit_length[len(digit)] += 1

    return(sum(digit_length))


def _decode(line):
    left, right = line
    key = {
        num_length[len(signal)]: set(signal)
        for signal in left + right
        if len(signal) in num_length
    }

    for pattern in left + right:
        cur = set(pattern)
        if len(pattern) == 6:
            if len(cur - key[4]) == 2:
                key[9] = cur
            elif len(cur - key[1]) == 4:
                key[0] = cur
            else:
                key[6] = cur
        if len(pattern) == 5:
            if len(cur - key[1]) == 3:
                key[3] = cur
            elif len(cur - key[4]) == 2:
                key[5] = cur
            else:
                key[2] = cur
    return key


def _signal_to_num(key):
    res = {}
    for k, v in key.items():
        nk = ''.join(sorted(v))
        res[nk] = k
    return res


def part2(values):
    """Part2."""
    sum_output = 0
    for line in values:
        _, right = line
        key = _decode(line)
        convert = _signal_to_num(key)
        cur = 0
        for pattern in right:
            sig = ''.join(sorted(pattern))
            cur = cur * 10 + convert[sig]
        sum_output += cur

    return sum_output


print(f"part one: {part1(input_values)}")
print(f"part two: {part2(input_values)}")
