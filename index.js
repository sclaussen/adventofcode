'use strict'



const fs = require('fs')



main(process.argv);



function main(args) {
    day1a();
    day1b();
    day2a();
    day2b();
}


function day1a() {
    console.log('\n2020-001a');

    let data = fs.readFileSync('./2020-001', 'utf8')
    let lines = data.split(/\r?\n/);

    let indexedLines = {};
    let i = 0;
    for (let line of lines) {
        if (line == '') {
            continue;
        }
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
    console.log('\n2020-001b');
    let data = fs.readFileSync('./2020-001', 'utf8')
    let lines = data.split(/\r?\n/);

    let indexedLines = {};
    let i = 0;
    for (let line of lines) {
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
                    console.log(indexedLines[i] + ' + ' + indexedLines[j] + ' + ' + indexedLines[k] + ' = ' + (indexedLines[i] + indexedLines[j] + indexedLines[k]));
                    console.log(indexedLines[i] + ' * ' + indexedLines[j] + ' * ' + indexedLines[k] + ' = ' + (indexedLines[i] * indexedLines[j] * indexedLines[k]));
                    return;
                }
            }
        }
    }
}



function day2a() {
    console.log('\n2020-002a');

    let validPasswords = 0;

    let data = fs.readFileSync('./2020-002', 'utf8')
    let lines = data.split(/\r?\n/);

    for (let line of lines) {
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

    console.log('Valid passwords: ' + validPasswords);
}


function day2b() {
    console.log('\n2020-002b');

    let validPasswords = 0;

    let data = fs.readFileSync('./2020-002', 'utf8')
    let lines = data.split(/\r?\n/);

    for (let line of lines) {
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

    console.log('Valid passwords: ' + validPasswords);
}
