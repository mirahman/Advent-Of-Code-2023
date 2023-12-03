const fs = require('fs');
try {
    const txt = fs.readFileSync('./input1.txt', 'utf8');
    const elves = txt.split('\n')
    let total = 0;
    let row = 1;
    let matrix = [];

    for (let elv of elves) {
        matrix.push(elv);
    }

    const isDigit = (digit) => {
        return digit >= '0' && digit <= '9'
    }

    const isSymbol = (char) => {
        return char != '.' && !isDigit(char)
    }

    const isValidPart = (i, j, left, right, num) => {
        let isValid = false;
        if (i > 0) {
            for (let x = left; x <= right; x++) {
                if (isSymbol(matrix[i - 1][x])) {
                    isValid = true;
                }
            }
        }
        if (isSymbol(matrix[i][left]) && left != 0) {
            isValid = true;
        }

        if (isSymbol(matrix[i][right]) && right != (matrix[i].length - 1)) {
            isValid = true;
        }

        if (i < matrix.length - 1) {
            for (let x = left; x <= right; x++) {
                if (isSymbol(matrix[i + 1][x])) {
                    isValid = true;
                }
            }
        }
        return isValid;
    }

    for (let i = 0; i < matrix.length; i++) {
        let num = "";
        let start = 0;
        for (let j = 0; j < matrix[i].length; j++) {
            if (isDigit(matrix[i][j])) {
                if (num == "") start = j;
                num += "" + matrix[i][j];
            } else {
                if (num.length > 0) {
                    let left = Math.max(0, start - 1);
                    let right = j;

                    let isValid = isValidPart(i, j, left, right, num);

                    if (isValid) {
                        total += parseInt(num);
                    }
                }
                num = "";
            }
        }
        // last number of the row
        if (num != "") {
            let isValid = isValidPart(i, matrix[i].length - 1, start - 1, matrix[i].length - 1, num);
            if (isValid) {
                total += parseInt(num);
            }
        }
    }
    console.log(total)
} catch (err) {
    console.error("error", err);
}