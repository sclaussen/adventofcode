'use strict'

const fs = require('fs');
const p = require('./util');


main(process.argv);


function main(args) {
    day004a();
}


// To ensure security, a valid passphrase must contain no duplicate words.
//
// For example:
// aa bb cc dd ee is valid.
// aa bb cc dd aa is not valid - the word aa appears more than once.
// aa bb cc dd aaa is valid - aa and aaa count as different words.
//
// How many passphrases are valid?
function day004a() {
    let validCount = 0;
    for (let line of fs.readFileSync('./input/2017-004.txt', 'utf-8').split(/\r?\n/)) {
        if (line === '') {
            continue;
        }

        let phrases = [];
        let valid = true;
        for (let phrase of line.split(' ')) {
            if (!phrases.includes(phrase)) {
                phrases.push(phrase);
            } else {
                valid = false;
                break;
            }
        }

        if (valid) {
            validCount++;
        }
    }

    p('Valid: ' + validCount);
}
