const { Console } = require('console');
const fs = require('fs');
try {
    const txt = fs.readFileSync('./input.txt', 'utf8');
    const lines = txt.split('\n');
    let start = [];
    for(let y = 0; y < lines.length; y++) {
        let line = lines[y];
        for(let x = 0; x < line.length; x++) {
            if(line[x] === 'S') {
                start = [ x, y ];
            }
        }
    }
    console.log(start);
    //todo: calculate the connections for the start instead of looking at the input manually
    let x = start[0];
    let y = start[1] + 1;
    let path = [start, { x, y }];
    let steps = 1;
    let dir = 'S';

    while(lines[y][x] !== 'S') {
        let deltaX = 0;
        let deltaY = 0;
        switch(lines[y][x] + dir) {
            case '|S':
            case '7E':
            case 'FW':
                deltaY = 1;
                break;
            case '|N':
            case 'LW':
            case 'JE':
                deltaY = -1;
                break;
            case '-E':
            case 'LS':
            case 'FN':
                deltaX = 1;
                break;
            case '-W':
            case 'JS':
            case '7N':
                deltaX = -1;
                break;
            default:
                throw 'unrecognized ' + lines[y][x] + dir;
        }
        if(deltaY === 1) {
            dir = 'S';
        }
        else if(deltaY === -1) {
            dir = 'N';
        }
        else if(deltaX === -1) {
            dir = 'W';
        }
        else {
            dir = 'E';
        }
        x += deltaX;
        y += deltaY;
        steps++;
        path.push({ x, y });
    }
    //console.log(path);
    console.log(steps / 2);
} catch (err) {
    console.error("error", err);
}