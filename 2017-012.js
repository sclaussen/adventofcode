'use strict'

const fs = require('fs');
const p = require('./util');


main(process.argv);


function main(args) {
    day012a();
    day012b();
}


function day012a() {
    let pipes = {};
    for (let line of fs.readFileSync('./input/2017-012.txt', 'utf-8').split(/\r?\n/)) {
        if (line === '') {
            continue;
        }

        line.replace(',');
        let tokens = line.split(' ');
        for (let i in tokens) {
            i = parseInt(i);
            if (tokens[i] === '<->') {
                continue;
            }

            if (i === 0) {
                pipes[tokens[0]] = [];
            } else {
                pipes[tokens[0]].push(parseInt(tokens[i]));
            }
        }
    }

    let connections = [ 0 ];
    traverse(pipes, pipes[0], connections);
    p(connections.length);
}


function day012b() {
    let pipes = {};
    for (let line of fs.readFileSync('./input/2017-012.txt', 'utf-8').split(/\r?\n/)) {
        if (line === '') {
            continue;
        }

        line.replace(',');
        let tokens = line.split(' ');
        for (let i in tokens) {
            i = parseInt(i);
            if (tokens[i] === '<->') {
                continue;
            }

            if (i === 0) {
                pipes[tokens[0]] = [];
            } else {
                pipes[tokens[0]].push(parseInt(tokens[i]));
            }
        }
    }

    let groups = {};
    for (let pipe of Object.keys(pipes)) {
        pipe = parseInt(pipe);

        let connections = [ pipe ]
        traverse(pipes, pipes[pipe], connections);
        connections.sort();

        if (!groups[connections[0]]) {
            groups[connections[0]] = connections;
        }
    }

    p(Object.keys(groups).length);
}


function traverse(pipes, nodes, connections) {
    for (let node of nodes) {
        if (connections.includes(node)) {
            continue;
        }
        connections.push(node);
        traverse(pipes, pipes[node], connections);
    }
}
