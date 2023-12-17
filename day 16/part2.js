const { Console } = require('console');
const fs = require('fs');
const { exit } = require('process');
try {
    const input = fs.readFileSync('./input1.txt', 'utf8');

const D = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3 
}

const dirs = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0]
]

const addVect = (a, b) => a.map((v, c) => v+b[c]);
const key = v => [...v.pos, v.dir].join('_');

const getMoves = (dir, v) => {
    switch (v) {
        case '.': return [dir];
        case '-': return [D.LEFT, D.RIGHT].includes(dir) ? [dir] : [D.LEFT, D.RIGHT];
        case '|': return [D.LEFT, D.RIGHT].includes(dir) ? [D.UP, D.DOWN] : [dir];
        case '/': switch (dir) {
                case D.RIGHT: return [D.UP];
                case D.LEFT: return [D.DOWN];
                case D.UP: return [D.RIGHT];
                case D.DOWN: return [D.LEFT];
            }
        case '\\': switch (dir) {
                case D.RIGHT: return [D.DOWN];
                case D.LEFT: return [D.UP];
                case D.UP: return [D.LEFT];
                case D.DOWN: return [D.RIGHT];
            }
    }
}

const run = (startPos, startDir) => {
    let stack = [{pos: startPos, dir: startDir}],
        energized = {}, seen = {};

    while (cur = stack.pop()) {
        let k = key(cur);

        if (seen[k] !== undefined) continue;

        if (!map[cur.pos[1]] || !map[cur.pos[1]][cur.pos[0]]) continue; // out of map

        seen[k] = 1;
        energized[cur.pos] = 1;

        getMoves(cur.dir, map[cur.pos[1]][cur.pos[0]]).forEach(dir => stack.push({
            dir: dir,
            pos: addVect(cur.pos, dirs[dir]),
        }))
        console.log(stack);
        break;
    }

    return Object.keys(energized).length;
}

let map = input.split("\n").map(line => line.split('')),
    max = 0;
    
for (let i = 0; i < map.length; i++) {
    let max1 = run([i, 0], D.DOWN);
    let max2 = run([i, map.length-1], D.UP);
    let max3 = run([0, i], D.RIGHT);
    let max4 = run([map.length-1, i], D.LEFT);
    max = Math.max(max,max1, max2, max3, max4)
    console.log(i, max, max1, max2, max3, max4);
}

console.log('p2', max);

} catch (err) {
    console.error("error", err);
}