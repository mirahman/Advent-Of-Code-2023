const { Console } = require('console');
const fs = require('fs');
try {
    const txt = fs.readFileSync('./input1.txt', 'utf8');
    const lines = txt.split('\n');
    let strings = [];
    for(let line of lines) {
        let words = line.split(",");
        for(let word of words) {
            strings.push(word.trim());
        }
    }

    let totalValue = 0;

    for(let word of strings) {
        let currentValue = 0;
        for(let i =0;i<word.length;i++) {
                currentValue += word.charCodeAt(i);
            currentValue *= 17;
            currentValue = currentValue % 256;
        }
        console.log(word, currentValue);
        totalValue += currentValue;
    }
    console.log(totalValue);
} catch (err) {
    console.error("error", err);
}