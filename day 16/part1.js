const { Console } = require('console');
const fs = require('fs');
try {
    const txt = fs.readFileSync('./input1.txt', 'utf8');
    const lines = txt.split('\n');
    let matrix = [];
    for (let line of lines) {
        matrix.push(line.split(""));
    }

    const dirs = [
        [0, -1], // up
        [0, 1], // right
        [-1, 0], // left
        [1, 0] // down
    ]

    const run = (startX, startY, delX, delY) => {
        let Queue = [];
        Queue.push([startX, startY, delX, delY]);
        let map = new Map();
        map.set(startX + "_" + startY + "_" + delX + "_" + delY);

        let energized = {}
        energized[[startX, startY]] = 1;

        while (Queue.length) {
            let [x, y, dx, dy] = Queue.pop();
            let nextX = x + dx;
            let nextY = y + dy;

            if (nextX >= 0 && nextX < matrix[0].length && nextY >= 0 && nextY < matrix.length) {
                let key = nextX + "_" + nextY + "_" + dx + "_" + dy;

                if (map.has(key)) {
                    continue;
                }

                map.set(key);

                energized[[nextX, nextY]] = 1;

                if (matrix[nextX][nextY] == ".") {
                    Queue.push([nextX, nextY, dx, dy]);
                } else if (matrix[nextX][nextY] == "|") {
                    if (dx == 0) { // horizontal
                        Queue.push([nextX, nextY, 1, 0]);
                        Queue.push([nextX, nextY, -1, 0]);
                    } else {
                        Queue.push([nextX, nextY, dx, dy]);
                    }
                } else if (matrix[nextX][nextY] == "-") {
                    if (dy == 0) { // horizontal
                        Queue.push([nextX, nextY, 0, 1]);
                        Queue.push([nextX, nextY, 0, -1]);
                    } else {
                        Queue.push([nextX, nextY, dx, dy]);
                    }
                } else if (matrix[nextX][nextY] == "/") {
                    if (dy == 1)
                        Queue.push([nextX, nextY, -1, 0]);
                    else if (dy == -1)
                        Queue.push([nextX, nextY, 1, 0]);
                    else if (dx == -1)
                        Queue.push([nextX, nextY, 0, 1]);
                    else if (dx == 1)
                        Queue.push([nextX, nextY, 0, -1]);

                } else if (matrix[nextX][nextY] == "\\") {
                    if (dy == 1)
                        Queue.push([nextX, nextY, 1, 0]);
                    else if (dy == -1)
                        Queue.push([nextX, nextY, -1, 0]);
                    else if (dx == 1)
                        Queue.push([nextX, nextY, 0, 1]);
                    else if (dx == -1)
                        Queue.push([nextX, nextY, 0, -1]);
                }
            }
        }
        return Object.keys(energized).length;
    }

    console.log(run(0, 0, ...dirs[3]))

} catch (err) {
    console.error("error", err);
}