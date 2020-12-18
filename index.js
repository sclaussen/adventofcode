'use strict'



const fs = require('fs')



main(process.argv);



function main(args) {
    day1a();
    day1b();
}


function day1a() {
    console.log('\nDay 1 Part 1');

    let data = fs.readFileSync('./input.day1', 'utf8')
    let lines = data.split(/\r?\n/);

    let indexedLines = {};
    let i = 0;
    for (let line of lines) {
        indexedLines[i] = parseInt(line);
        i++;
    }

    for (let i = 0; i < Object.keys(indexedLines).length; i++) {
        for (let j = i + 1; j < Object.keys(indexedLines).length; j++) {
            if (indexedLines[i] + indexedLines[j] === 2020) {
                console.log(indexedLines[i] + ' + ' + indexedLines[j] + ' = ' + (indexedLines[i] + indexedLines[j]));
                console.log(indexedLines[i] + ' * ' + indexedLines[j] + ' = ' + (indexedLines[i] * indexedLines[j]));
                return;
            }
        }
    }
}


function day1b() {
    console.log('\nDay 1 Part 2');
    let data = fs.readFileSync('./input.day1', 'utf8')
    let lines = data.split(/\r?\n/);

    let indexedLines = {};
    let i = 0;
    for (let line of lines) {
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
                    console.log(indexedLines[i] + ' + ' + indexedLines[j] + ' + ' + indexedLines[k] + ' = ' + (indexedLines[i] + indexedLines[j] + indexedLines[k]));
                    console.log(indexedLines[i] + ' * ' + indexedLines[j] + ' * ' + indexedLines[k] + ' = ' + (indexedLines[i] * indexedLines[j] * indexedLines[k]));
                    return;
                }
            }
        }
    }
}
