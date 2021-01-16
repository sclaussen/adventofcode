'use strict'

const fs = require('fs')
const p = require('./util')


main(process.argv);


function main(args) {
    day1a(args);
    day1b(args);
}


function day1a(args) {
    let totalFuel = 0;
    for (let line of fs.readFileSync('./input/2019-001.txt', 'utf8').split(/\r?\n/)) {
        if (line === '') {
            continue;
        }

        totalFuel += Math.floor(parseInt(line) / 3) - 2;
    }

    p(totalFuel);
}



function day1b(args) {
    let totalFuel = 0;
    for (let line of fs.readFileSync('./input/2019-001.txt', 'utf8').split(/\r?\n/)) {
        if (line === '') {
            continue;
        }

        let fuel = Math.floor(parseInt(line) / 3) - 2;
        while (fuel > 0) {
            totalFuel += fuel;
            fuel = Math.floor(fuel / 3) - 2;
        }
    }

    p(totalFuel);
}
