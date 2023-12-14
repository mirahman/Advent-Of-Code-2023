const { Console } = require('console');
const fs = require('fs');
try {
    const txt = fs.readFileSync('./input1.txt', 'utf8');
    const lines = txt.split('\n');
    let matrix = [];
    for (let line of lines) {
        matrix.push(line.split(""));
    }

    const moveNorth = (matrix) => {
        for (let i = 1; i < matrix.length; i++) {
            for (let j = i; j > 0; j--) {
                for (let k = 0; k < matrix[0].length; k++) {
                    if (matrix[j][k] == "O") {
                        if (matrix[j - 1][k] == ".") {
                            matrix[j - 1][k] = "O";
                            matrix[j][k] = ".";
                        }
                    }
                }
            }
        }
        return matrix;
    }

    const moveWest = (matrix) => {
        for (let i = 1; i < matrix[0].length; i++) {
            for (let j = i; j > 0; j--) {
                for (let k = 0; k < matrix.length; k++) {
                    if (matrix[k][j] == "O") {
                        if (matrix[k][j - 1] == ".") {
                            matrix[k][j - 1] = "O";
                            matrix[k][j] = ".";
                        }
                    }
                }
            }
        }
        return matrix;
    }

    const moveSouth = (matrix) => {
        for (let i = matrix.length - 2; i >= 0; i--) {
            for (let j = i; j < matrix.length - 1; j++) {
                for (let k = 0; k < matrix[0].length; k++) {
                    if (matrix[j][k] == "O") {
                        if (matrix[j + 1][k] == ".") {
                            matrix[j + 1][k] = "O";
                            matrix[j][k] = ".";
                        }
                    }
                }
            }
        }
        return matrix;
    }

    const moveEast = (matrix) => {
        for (let i = matrix[0].length - 2; i >= 0; i--) {
            for (let j = i; j < matrix.length; j++) {
                for (let k = 0; k < matrix.length; k++) {
                    if (matrix[k][j] == "O") {
                        if (matrix[k][j + 1] == ".") {
                            matrix[k][j + 1] = "O";
                            matrix[k][j] = ".";
                        }
                    }
                }
            }
        }
        return matrix;
    }
    let map = new Map();
    let maxCycle = 1000000000 % 13000; // every 13k cycle repeats
    for (let i = 1; i <= maxCycle; i++) {
        matrix = moveNorth(matrix);
        matrix = moveWest(matrix);
        matrix = moveSouth(matrix);
        matrix = moveEast(matrix);
        let str = "";
        for (let line of matrix) {
            str += line.join("");
        }

        if (!map.has(str)) {
            map.set(str, i);
        }
    }

    let total = 0;
    let height = matrix.length;
    for (let i = 0; i < matrix.length; i++) {
        let count = 0;
        for (let k = 0; k < matrix[0].length; k++) {
            if (matrix[i][k] == "O") {
                count++;
            }
        }
        total += height * count;
        height--;
    }

    //console.log(matrix);


    console.log(total);
} catch (err) {
    console.error("error", err);
}