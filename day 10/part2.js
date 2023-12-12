const { Console } = require('console');
const fs = require('fs');
try {
    const txt = fs.readFileSync('./input.txt', 'utf8');
    const lines = txt.split('\n');
    let start = [];
    let isLoop = [];
    for(let y = 0; y < lines.length; y++) {
        let line = lines[y];
        isLoop[y] = [];
        for(let x = 0; x < line.length; x++) {
            if(line[x] === 'S') {
                start = [ x, y ];
            }
        }
    }

    let x = start[0];
    let y = start[1] + 1;
    let path = [start, { x, y }];
    let steps = 1;
    let dir = 'S';
    isLoop[start[1]][start[0]] = true;
    isLoop[y][x] = true;

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
        isLoop[y] = isLoop[y] || [];
        isLoop[y][x] = true;
        steps++;
        path.push({ x, y });

    }

    // flood fill idea 
    console.log(isLoop);
    let count  = 0;
    for(let i = 0; i < lines.length; i++) {
        let crosses = 0;
        let line = lines[i];
        let corner = false;
        for(let j = 0; j < line.length; j++) {
            if(isLoop[i][j]) {
                let current = lines[i][j];
                if(current === '|') {
                    crosses++;
                }
                else if(current !== '-') {
                    if(corner) {
                        if(corner === 'L' && current === '7') {
                            crosses++;
                        }
                        else if(corner === 'F' && current === 'J') {
                            crosses++;
                        }
                        corner = false;
                    }
                    else {
                        corner = current;
                    }
                }
            }
            else if(crosses % 2 == 1) {
                count++;
            }
        }
    }
    console.log(count);
    //console.log(path);
    console.log(steps / 2);
} catch (err) {
    console.error("error", err);
}