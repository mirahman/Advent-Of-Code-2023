const fs = require('fs');
try {
    const txt = fs.readFileSync('./input.txt', 'utf8');
    const elves = txt.split('\n')
    let total = 0;
    let row = 1;
    let rgb = ["red", "green", "blue"];
    let target = [];
    target['red'] = 12;
    target['green'] = 13;
    target['blue'] = 14;

    for (let elv of elves) {
        let isPossible = true;
        let tmp = elv.split(":");
        let rounds = tmp[1].trim().split(";");
        for (let round of rounds) {
            let cubes = round.split(",");
            for (let cube of cubes) {
                let [num, color] = cube.trim().split(" ");
                if (target[color] < num) {
                    isPossible = false;
                }
            }
        }
        if (isPossible) {
            total += row;
        }
        row++;
    }
    console.log(total)
} catch (err) {
    console.error("error", err);
}