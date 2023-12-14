const { Console } = require('console');
const fs = require('fs');
try {
    const txt = fs.readFileSync('./input1.txt', 'utf8');
    const lines = txt.split('\n');
    let matrix = [];
    for(let line of lines) {
        matrix.push(line.split(""));
    }


    for(let i=1;i<matrix.length;i++) {
        for(let j=i;j>0;j--) {
            for(let k=0;k<matrix[0].length;k++) {
                if(matrix[j][k] == "O") {
                    if(matrix[j-1][k] == ".") {
                        matrix[j-1][k] = "O";
                        matrix[j][k] = ".";
                    }
                }
            }
        }
    }

    let total = 0;
    let height = matrix.length;
    for(let i=0;i<matrix.length;i++) {
        let count = 0;
            for(let k=0;k<matrix[0].length;k++) {
                if(matrix[i][k] == "O") {
                    count++;
                }
            }
        total += height * count;
        height--;
    }
    console.log(total);
} catch (err) {
    console.error("error", err);
}