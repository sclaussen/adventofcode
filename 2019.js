'use strict'

const fs = require('fs')


main(process.argv);

function main(args) {
    day1a(args);
    day1b(args);
}


function day1a(args) {
    console.log('\n2019-001a');

    let totalFuel = 0;
    for (let line of fs.readFileSync('./input/2019-001.txt', 'utf8').split(/\r?\n/)) {
        if (line === '') {
            continue;
        }

        totalFuel += Math.floor(parseInt(line) / 3) - 2;
    }

    console.log(totalFuel);
}



function day1b(args) {
    console.log('\n2019-001b');

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

    console.log(totalFuel);
}
