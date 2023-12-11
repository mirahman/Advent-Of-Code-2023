const { Console } = require('console');
const fs = require('fs');
try {
    const txt = fs.readFileSync('./input1.txt', 'utf8');
    const lines = txt.split('\n');
    let matrix = [];
    for(let line of lines) {
            matrix.push(line.split(""));
    }

    let coordinates = [];
    
    for(let i =0;i<matrix.length;i++) {
        for(let j =0;j<matrix[i].length;j++) {
            if(matrix[i][j] == "#") {
                coordinates.push([i, j]);
            }
        }
    }

    const emptyRows = Array(matrix.length).fill(true);
    const emptyCols = Array(matrix[0].length).fill(true);

    for (const p of coordinates) {
        emptyRows[p[0]] = false;
        emptyCols[p[1]] = false;
    }

    const getDistance = (one, two) => {
        let r1 = Math.min(one[0], two[0]), r2 = Math.max(one[0], two[0]);
        let c1 = Math.min(one[1], two[1]), c2 = Math.max(one[1], two[1]);

        let result = (r2 - r1) + (c2 - c1);
        for (let r = r1; r < r2; r++) if (emptyRows[r]) result++;
        for (let c = c1; c < c2; c++) if (emptyCols[c]) result++;

        return result;
    }
    let totalDistance = 0;
    let count = 1;
    console.log(coordinates.length);
    for(let i = 0;i<coordinates.length;i++) {
        for(let j = i+1;j<coordinates.length;j++) {
            let tmp = getDistance(coordinates[i], coordinates[j]);
            totalDistance += tmp;
        }
    }
    console.log(totalDistance);
} catch (err) {
    console.error("error", err);
}