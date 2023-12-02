const fs = require('fs');
try {
    const txt = fs.readFileSync('./input1.txt', 'utf8');
    const elves = txt.split('\n')
    let total = 0;
    let row = 1;
    let rgb = ["red", "green", "blue"];
    let target = [];
    target['red'] = 12;
    target['green'] = 13;
    target['blue'] = 14;

    for (let elv of elves) {
        let count = [];
        let max = [];
        let isPossible = true;
        count['red'] = count['green'] = count['blue'] = 0;
        max['red'] = max['green'] = max['blue'] = 0;
        let tmp = elv.split(":");
        let rounds = tmp[1].trim().split(";");
        //console.log(rounds);
        for(let round of rounds) {
            let cubes = round.split(",");
            for(let cube of cubes) {
                let [num, color] = cube.trim().split(" ");
                //console.log(color, num, max[color]);
                // part one
                if(target[color]<num) {
                    isPossible = false;
                }

                if(max[color]<parseInt(num)) {
                    //console.log('setting max: ', color, num);
                    max[color] = num;
                }
            }
        }
        //console.log(row, max);
        let tmpSum = 1;
        for(let col of rgb) {
            tmpSum *= max[col];
        }
        total += row;

        /*
        if(isPossible) {
            console.log("Yes ", row);
            total += row;
        }
        */
        row++;
    }
    console.log(total)
} catch (err) {
    console.error("error", err);
}