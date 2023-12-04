const fs = require('fs');
try {
    const txt = fs.readFileSync('./input1.txt', 'utf8');
    const cards = txt.split('\n')
    let total = 0;
    for (let card of cards) {
        let map = new Map();
        let matchCount = 0;
        let tmp = card.split(":")[1].split("|");
        let winningNumbers = tmp[0].trim().split(/\s+/);
        let myNumbers = tmp[1].trim().split(/\s+/);

        for (let num of winningNumbers) {
            map.set(num);
        }

        for (let num of myNumbers) {
            if (map.has(num)) {
                matchCount++;
            }
        }

        if (matchCount) {
            total += Math.pow(2, matchCount - 1);
        }
    }
    console.log(total)
} catch (err) {
    console.error("error", err);
}