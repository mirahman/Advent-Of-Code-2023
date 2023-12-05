const fs = require('fs');
try {
    const txt = fs.readFileSync('./input1.txt', 'utf8');
    const blocks = txt.split('\n\n')
    let total = 0;
    let seedArr = [];
    let mapArray = [];
    for (let i = 1; i < blocks.length; i++) {
        mapArray[i] = [];
    }
    let tmp = blocks[0].split(":");
    seedArr = tmp[1].trim().split(/\s+/);
    let mapName = "";
    for (let i = 1; i < blocks.length; i++) {
        let block = blocks[i];
        let lines = block.split('\n');
        for (let j = 1; j < lines.length; j++) {
            let nums = lines[j].trim().split(/\s+/);
            let tmpArr = [];
            tmpArr[0] = parseInt(nums[1]);
            tmpArr[1] = parseInt(nums[1])+parseInt(nums[2]);
            tmpArr[2] = parseInt(nums[0]);
            tmpArr[3] = parseInt(nums[0])+parseInt(nums[2]);
            mapArray[i].push(tmpArr);
        }
        mapArray[i].sort((a, b) => { return a[0] - b[0] });
    }
    let min = Infinity;
    for (let i = 0; i < seedArr.length; i++) {
        let src = seedArr[i];
        for (let j = 1; j < mapArray.length; j++) {
            let found = false;
            for(let range of mapArray[j]) {
                if(range[0]<=src && range[1]>=src) {
                    found = true;
                    src = range[2] - (range[0]-src);
                    break;
                }
            }
        }
        if (parseInt(src) < min) {
            min = src;
        }
    }
    console.log(min);
} catch (err) {
    console.error("error", err);
}