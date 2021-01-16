'use strict'

const fs = require('fs')
const p = require('util')


main(process.argv);


function main(args) {
    day1a(args);
    day1b(args);
}



function day1a(args) {
    let frequency = 0;
    for (let line of fs.readFileSync('./input/2019-001.txt', 'utf8').split(/\r?\n/)) {
        if (line === '') {
            continue;
        }
        frequency += parseInt(line);
    }
    p(frequency);
}


function day1b(args) {
    let lines = fs.readFileSync('./input/2018-001.txt', 'utf8').split(/\r?\n/);

    let frequencyList = [];
    let currentFrequency = 0;
    while (true) {
        for (let line of lines) {
            if (line === '') {
                continue;
            }

            currentFrequency += parseInt(line);
            if (frequencyList.includes(currentFrequency)) {
                console.log(currentFrequency + ' ' + i);
                return;
            }

            frequencyList.push(currentFrequency);
        }
    }
}
