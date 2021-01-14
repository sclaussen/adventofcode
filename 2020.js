'use strict'

const fs = require('fs')
const p = require('./util');

main(process.argv);


function main(args) {
    // day1a(args);
    // day1b(args);
    // day2a(args);
    // day2b(args);
    // day3a(args);
    // day3b(args);
}


// Specifically, they need you to find the two entries that sum to
// 2020 and then multiply those two numbers together.
function day1a(args) {
    p('\n2020-001a');

    let indexedLines = {};
    let i = 0;
    for (let line of fs.readFileSync('./input/2020-001.txt', 'utf8').split(/\r?\n/)) {
        if (line == '') {
            continue;
        }

        indexedLines[i] = parseInt(line);
        i++;
    }

    for (let i = 0; i < Object.keys(indexedLines).length; i++) {
        for (let j = i + 1; j < Object.keys(indexedLines).length; j++) {
            if (indexedLines[i] + indexedLines[j] === 2020) {
                p(indexedLines[i] + ' + ' + indexedLines[j] + ' = ' + (indexedLines[i] + indexedLines[j]));
                p(indexedLines[i] + ' * ' + indexedLines[j] + ' = ' + (indexedLines[i] * indexedLines[j]));
                return;
            }
        }
    }
}


// What is the product of the three entries that sum to 2020
function day1b(args) {
    p('\n2020-001b');

    let indexedLines = {};
    let i = 0;
    for (let line of fs.readFileSync('./input/2020-001.txt', 'utf8').split(/\r?\n/)) {
        if (line == '') {
            continue;
        }

        indexedLines[i] = parseInt(line);
        i++;
    }

    for (let i = 0; i < Object.keys(indexedLines).length; i++) {
        for (let j = i + 1; j < Object.keys(indexedLines).length; j++) {
            for (let k = 0; k < Object.keys(indexedLines).length; k++) {
                if (k === i || k === j) {
                    continue;
                }

                if (indexedLines[i] + indexedLines[j] + indexedLines[k] === 2020) {
                    p(indexedLines[i] + ' + ' + indexedLines[j] + ' + ' + indexedLines[k] + ' = ' + (indexedLines[i] + indexedLines[j] + indexedLines[k]));
                    p(indexedLines[i] + ' * ' + indexedLines[j] + ' * ' + indexedLines[k] + ' = ' + (indexedLines[i] * indexedLines[j] * indexedLines[k]));
                    return;
                }
            }
        }
    }
}


// Suppose you have the following list:
//
// 1-3 a: abcde
// 1-3 b: cdefg
// 2-9 c: ccccccccc
//
// Each line gives the password policy and then the password. The
// password policy indicates the lowest and highest number of times a
// given letter must appear for the password to be valid.
//
// How many passwords are valid?
function day2a(args) {
    p('\n2020-002a');

    let validPasswords = 0;
    for (let line of fs.readFileSync('./input/2020-002.txt', 'utf8').split(/\r?\n/)) {
        if (line == '') {
            continue;
        }

        // This could be more optimized, but I opted for simplicity
        // over speed
        let min = parseInt(line.split(/-/)[0]);
        let max = parseInt(line.split(/-/)[1].split(' ')[0]);
        let letter = line.split(/ /)[1].split(':')[0];
        let password = line.split(/ /)[2];

        let chCount =  0;
        for (let ch of password) {
            if (ch === letter) {
                chCount++;
                if (chCount > max) {
                    break;
                }
            }
        }

        if (chCount >= min && chCount <= max) {
            validPasswords++;
        }
    }

    p('Valid passwords: ' + validPasswords);
}


// Each policy actually describes two positions in the password, where
// 1 means the first character, 2 means the second character, and so
// on. Exactly one of these positions must contain the given letter.
// How many passwords are valid
function day2b(args) {
    p('\n2020-002b');

    let validPasswords = 0;

    for (let line of fs.readFileSync('./input/2020-002.txt', 'utf8').split(/\r?\n/)) {
        if (line == '') {
            continue;
        }

        // This could be more optimized, but I opted for simplicity
        // over speed
        let position1 = parseInt(line.split(/-/)[0]);
        let position2 = parseInt(line.split(/-/)[1].split(' ')[0]);
        let letter = line.split(/ /)[1].split(':')[0];
        let password = line.split(/ /)[2];

        let position = 1;
        let occurrences = 0;
        for (let ch of password) {
            if (position === position1 && ch === letter) {
                occurrences++;
            }

            if (position === position2 && ch === letter) {
                occurrences++;
                break;
            }

            if (position > position2) {
                break;
            }

            position++;
        }

        if (occurrences === 1) {
            validPasswords++;
        }
    }

    p('Valid passwords: ' + validPasswords);
}


// Starting at the top-left corner of your map and following a slope
// of right 3 and down 1, how many trees would you encounter?
function day3a(args) {
    p('\n2020-003a');

    let trees = [];
    for (let line of fs.readFileSync('./input/2020-003.txt', 'utf8').split(/\r?\n/)) {
        if (line == '') {
            continue;
        }
        trees.push(line.split(''));
    }

    let collisions = day3Helper(trees, 3, 1);

    // trees.forEach(row => {
    //     p(row.join(' '));
    // });

    p('Collisions: ' + collisions);
}


// Right 1, down 1.
// Right 3, down 1. (This is the slope you already checked.)
// Right 5, down 1.
// Right 7, down 1.
// Right 1, down 2.
//
// What do you get if you multiply together the number of trees
// encountered on each of the listed slopes?
function day3b(args) {
    p('\n2020-003b');

    let total = 1;
    for (let slope of  [ [ 1, 1 ], [ 3, 1 ], [ 5, 1 ], [ 7, 1 ], [ 1, 2 ] ]) {
        let trees = [];
        for (let line of fs.readFileSync('./input/2020-003.txt', 'utf8').split(/\r?\n/)) {
            if (line == '') {
                continue;
            }
            trees.push(line.split(''));
        }
        let collisions = day3Helper(trees, slope[0], slope[1]);
        console.log(collisions);
        total *= collisions;
    }
    p('Collision multiplication total: ' + total);
}


function day3Helper(trees, colChange, rowChange) {
    let collisions = 0, row = 0, col = 0;
    while (true) {
        col += colChange;
        col %= trees[row].length;
        row += rowChange;

        if (row > (trees.length - 1)) {
            break;
        }

        if (trees[row][col] === '#') {
            trees[row][col] = 'X';
            collisions++;
        } else {
            trees[row][col] = 'O';
        }
    }

    // console.log('\nPost: ' + colChange, rowChange);
    // trees.forEach(row => {
    //     p(row.join(' '));
    // });

    return collisions;
}
