'use strict'

const fs = require('fs')
const p = require('./util');


main(process.argv);


function main(args) {
    day2a(args);
    day2b(args);
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
