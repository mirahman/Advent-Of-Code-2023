const { Console } = require('console');
const fs = require('fs');
try {
    const txt = fs.readFileSync('./input1.txt', 'utf8');
    const lines = txt.split('\n');
    let sum = 0;
    for (let line of lines) {
        let nums = line.trim().split(/\s+/).map(Number);
        let stack = [];
        stack.push(nums);
        while (stack.length) {
            let tmpNums = [];
            let row = stack[stack.length - 1];
            for (let i = 0; i < row.length - 1; i++) {
                tmpNums.push(row[i + 1] - row[i]);
            }
            let total = tmpNums.filter((num) => num == 0);
            if (total.length == tmpNums.length) break;
            stack.push(tmpNums);
        }
        let lastCell = 0;
        while (stack.length) {
            let row = stack.pop();
            lastCell = row[0] - lastCell; // first cell for reverse
        }
        sum += lastCell;
    }
    console.log(sum);
} catch (err) {
    console.error("error", err);
}