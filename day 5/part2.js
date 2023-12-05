const fs = require('fs');
const { exit } = require('process');
try {
    const txt = fs.readFileSync('./input1.txt', 'utf8');
    const blocks = txt.split('\n\n')
    let total = 0;
    let seedArr = [];
    let mapArray = [];
    let memo = new Set();
    for (let i = 1; i < blocks.length; i++) {
        mapArray[i] = [];
    }
    let tmp = blocks[0].split(":");
    let tmpSeed = tmp[1].trim().split(/\s+/);
    for (let i = 0; i < tmpSeed.length; i += 2) {
        seedArr.push([parseInt(tmpSeed[i]), parseInt(tmpSeed[i]) + parseInt(tmpSeed[i + 1]) - 1]);
    }

    for (let i = 1; i < blocks.length; i++) {
        let block = blocks[i];
        let lines = block.split('\n');
        for (let j = 1; j < lines.length; j++) {
            let nums = lines[j].trim().split(/\s+/).map(Number);
            mapArray[i].push(nums);
        }
    }

    function getLocationofSeed(seed) {
        let loc = seed
        for (let i = 1; i < mapArray.length; i++) {
            for (let nums of mapArray[i]) {
                const [to, from, range] = nums
                if (loc >= from && loc <= from + range - 1) {
                    loc = to + (loc - from)
                    break;
                }
            }
        }
        return loc
    }

    // block search using 10K block chunk
    let minLocInPair = []
    for (const [seed1, seed2] of seedArr) {
        let minLoc = Infinity
        let minLocSeed = seed1
        for (let i = seed1; i <= seed2; i += 10000) {
            const loc = getLocationofSeed(i)
            if (loc < minLoc) {
                minLoc = loc
                minLocSeed = i
            }
        }
        minLocInPair.push([minLoc, minLocSeed, seed1, seed2])
        //console.log("FINSIHED A PAIR")
    }

    //get the min seed
    let minLoc = Infinity
    let range = [0, 0, 0]
    //foor
    for (const [loc, seed, seed1, seed2] of minLocInPair) {
        if (loc < minLoc) {
            minLoc = loc
            range = [seed, seed1, seed2]
        }
    }

    let delta = 100000
    let minSearch = Math.max(range[0] - delta, range[1])
    let maxSearch = Math.min(range[0] + delta, range[2])

    let minLocSeed = minSearch
    let minLocSeedLoc = Infinity
    for (let i = minSearch; i <= maxSearch; i++) {
        const loc = getLocationofSeed(i)
        if (loc < minLocSeedLoc) {
            minLocSeedLoc = loc
            minLocSeed = i
        }
    }
    console.log(getLocationofSeed(minLocSeed))
} catch (err) {
    console.error("error", err);
}