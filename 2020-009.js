'use strict'

const fs = require('fs')
const p = require('./util');


main(process.argv);


function main(args) {
    day9a(args);
    day9b(args);
}


// XMAS starts by transmitting a preamble of 25 numbers. After that,
// each number you receive should be the sum of any two of the 25
// immediately previous numbers. The two numbers will have different
// values, and there might be more than one such pair.
//
// For example, suppose your preamble consists of the numbers 1
// through 25 in a random order. To be valid, the next number must be
// the sum of two of those numbers:
//
// 26 would be a valid next number, as it could be 1 plus 25 (or many
// other pairs, like 2 and 24).
//
// 49 would be a valid next number, as it is the sum of 24 and 25.
//
// 100 would not be valid; no two of the previous 25 numbers sum to
// 100.
//
// 50 would also not be valid; although 25 appears in the previous 25
// numbers, the two numbers in the pair must be different.
//
// Suppose the 26th number is 45, and the first number (no longer an
// option, as it is more than 25 numbers ago) was 20. Now, for the
// next number to be valid, there needs to be some pair of numbers
// among 1-19, 21-25, or 45 that add up to it:
//
// 26 would still be a valid next number, as 1 and 25 are still within
// the previous 25 numbers.
//
// 65 would not be valid, as no two of the available numbers sum to
// it.
//
// 64 and 66 would both be valid, as they are the result of 19+45 and
// 21+45 respectively.
function day9a(args) {
    let preambleSize = 25;
    let firstPosition = 0;
    let numbers = [];

    for (let line of fs.readFileSync('./input/2020-009.txt', 'utf8').split(/\r?\n/)) {
        if (line == '') {
            continue;
        }

        numbers.push(parseInt(line));
        if (numbers.length <= preambleSize) {
            continue;
        }

        let found = false;
        for (let position = firstPosition; position < (numbers.length - 1); position++) {
            if (add(numbers, position)) {
                found = true;
                break;
            }
        }

        if (!found) {
            p('Answer: ' + numbers[numbers.length - 1]);
            return;
        }

        firstPosition++;
    }
}


function add(numbers, position) {
    let firstNumber = numbers[position];
    let goalNumber = numbers[numbers.length - 1];
    for (let i = position + 1; i < (numbers.length - 1); i++) {
        if ((firstNumber + numbers[i]) === goalNumber) {
            return true;
        }
    }

    return false;
}


// The final step in breaking the XMAS encryption relies on the
// invalid number you just found: you must find a contiguous set of at
// least two numbers in your list which sum to the invalid number from
// step 1.
//
// Again consider the above example:
//
// 35 20 15 25 47 40 62 55 65 95 102 117 150 182 127 219 299 277 309
// 576
//
// In this list, adding up all of the numbers from 15 through 40
// produces the invalid number from step 1, 127. (Of course, the
// contiguous set of numbers in your actual list might be much
// longer.)
//
// To find the encryption weakness, add together the smallest and
// largest number in this contiguous range; in this example, these are
// 15 and 47, producing 62.
function day9b(args) {
    let goal = 177777905;
    let numbers = [];
    for (let line of fs.readFileSync('./input/2020-009.txt', 'utf8').split(/\r?\n/)) {
        if (line == '') {
            continue;
        }

        numbers.push(parseInt(line));
    }

    for (let i = 0; i < numbers.length; i++) {
        let response = addContig(numbers, i, goal);
        if (response.length > 0) {
            console.log('Answer: ' + sumMinMax(numbers, response[0], response[1]));
            return;
        }
    }
}


function addContig(numbers, position, goal) {
    let sum = 0;
    for (let i = position; i < numbers.length; i++) {
        sum += numbers[i];
        if (sum === goal) {
            return [ position, i ];
        }
    }

    return [];
}



function sumMinMax(numbers, start, end) {
    let min = -1;
    let max = -1;
    for (let i = start; i <= end; i++) {
        if (min === -1 || numbers[i] < min) {
            min = numbers[i];
        }
        if (max === -1 || numbers[i] > max) {
            max = numbers[i];
        }
    }

    return min + max;
}
