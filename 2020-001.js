'use strict'

const fs = require('fs')
const p = require('./util');


main(process.argv);


function main(args) {
    day1a(args);
    day1b(args);
}


// Find the two entries that sum to 2020 and then multiply those two
// numbers together.
function day1a(args) {
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
