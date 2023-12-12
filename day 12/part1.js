const { Console } = require('console');
const fs = require('fs');
try {
    const txt = fs.readFileSync('./input1.txt', 'utf8');
    const lines = txt.split('\n');
    let total = 0;
    const DAMAGED = "#";
    const WORKING = ".";
    const UNKNOWN = "?";
    let map = new Map();

    const solvePlacement = (springs, groups, current = 0, local = 0, processed = 0) => {
        let mapkey = current + "_" + local + "_" + processed;
        if (map.has(mapkey)) return map.get(mapkey);

        //console.log(springs, groups, current, local, processed);
        if (current == springs.length) {
            if (local == groups.length - 1 && processed == groups[local]) { local++; processed = 0; }
            if (groups.length == local && processed == 0)
                return 1;
            return 0;
        }

        let result = 0;

        if (springs[current] == WORKING || springs[current] == UNKNOWN) // ...operational
        {
            if (processed == 0)
                result += solvePlacement(springs, groups, current + 1, local, 0);
            else if (local < groups.length && processed == groups[local])
                result += solvePlacement(springs, groups, current + 1, local + 1, 0);
        }

        if (springs[current] == DAMAGED || springs[current] == UNKNOWN) {
            result += solvePlacement(springs, groups, current + 1, local, processed + 1);
        }

        map.set(mapkey, result);
        return result;
    }

    for (let line of lines) {
        let tmp = line.split(" ");
        total += solvePlacement(tmp[0].trim(), tmp[1].split(",").map(Number));
        map = new Map();
    }
    console.log(total);
} catch (err) {
    console.error("error", err);
}