'use strict'



const fs = require('fs')



main(process.argv);



function main(args) {
    day1();
}


function day1() {
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
                process.exit(0);
            }
        }
    }
}
