'use strict'

const fs = require('fs')
const p = require('./util');


main(process.argv);


function main(args) {
    day3a(args);
    day3b(args);
}


// Starting at the top-left corner of your map and following a slope
// of right 3 and down 1, how many trees would you encounter?
function day3a(args) {
    let trees = [];
    for (let line of fs.readFileSync('./input/2020-003.txt', 'utf8').split(/\r?\n/)) {
        if (line == '') {
            continue;
        }
        trees.push(line.split(''));
    }

    let collisions = findCollisions(trees, 3, 1);

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
    let total = 1;
    for (let slope of  [ [ 1, 1 ], [ 3, 1 ], [ 5, 1 ], [ 7, 1 ], [ 1, 2 ] ]) {
        let trees = [];
        for (let line of fs.readFileSync('./input/2020-003.txt', 'utf8').split(/\r?\n/)) {
            if (line == '') {
                continue;
            }
            trees.push(line.split(''));
        }
        let collisions = findCollisions(trees, slope[0], slope[1]);
        console.log(collisions);
        total *= collisions;
    }

    p('Collision multiplication total: ' + total);
}


function findCollisions(trees, colChange, rowChange) {
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

    return collisions;
}
