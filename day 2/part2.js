const fs = require('fs');
try {
    const txt = fs.readFileSync('./input.txt', 'utf8');
    const elves = txt.split('\n')
    let total = 0;
    let rgb = ["red", "green", "blue"];

    for (let elv of elves) {
        let max = [];
        max['red'] = max['green'] = max['blue'] = 0;
        let tmp = elv.split(":");
        let rounds = tmp[1].trim().split(";");
        for (let round of rounds) {
            let cubes = round.split(",");
            for (let cube of cubes) {
                let [num, color] = cube.trim().split(" ");
                if (max[color] < parseInt(num)) {
                    max[color] = num;
                }
            }
        }
        let tmpSum = 1;
        for (let col of rgb) {
            tmpSum *= max[col];
        }
        total += tmpSum;
    }
    console.log(total)
} catch (err) {
    console.error("error", err);
}