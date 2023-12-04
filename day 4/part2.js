const fs = require('fs');
try {
    const txt = fs.readFileSync('./input1.txt', 'utf8');
    const cards = txt.split('\n')
    let counter = new Array(cards.length).fill(1);
    let total = 0;
    let row = 0;
    for (let card of cards) {
        let matchCount = 0;
        let tmp = card.split(":")[1].split("|");
        let winningNumbers = tmp[0].trim().split(/\s+/);
        let myNumbers = tmp[1].trim().split(/\s+/);

        var common = myNumbers.filter(function (n) {
            return winningNumbers.indexOf(n) !== -1;
        });

        matchCount = common.length;

        for (let x = 0; x < matchCount; x++) {
            counter[x + row + 1] += counter[row];
        }
        row++;
    }
    total = counter.reduce((a, c) => a + c, 0,);
    console.log(total)
} catch (err) {
    console.error("error", err);
}