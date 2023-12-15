const { Console } = require('console');
const fs = require('fs');
try {
    const txt = fs.readFileSync('./input1.txt', 'utf8');
    const lines = txt.split('\n');
    let strings = [];
    for (let line of lines) {
        let words = line.split(",");
        for (let word of words) {
            strings.push(word.trim());
        }
    }

    const getHashVal = (str) => {
        let currentValue = 0;
        for (let i = 0; i < str.length; i++) {
            currentValue += str.charCodeAt(i);
            currentValue *= 17;
            currentValue = currentValue % 256;
        }
        return currentValue;
    }
    let totalValue = 0;
    let map = new Map();
    for (let word of strings) {
        let currentValue = 0;
        let boxChar = "";
        let count = 0;
        if (word.endsWith("-")) {
            boxChar = word.substring(0, word.length - 1);
        } else {
            [boxChar, count] = word.split("=");
        }
        currentValue = getHashVal(boxChar);
        if (map.has(currentValue)) {
            let arr = map.get(currentValue);
            let modified = false;
            for (let j = 0; j < arr.length; j++) {
                let entry = arr[j];
                if (word.endsWith("-")) {
                    if (entry && entry.startsWith(boxChar)) {
                        arr[j] = null;
                        modified = true;
                    }
                } else {
                    if (entry && entry.startsWith(boxChar) && count) {
                        arr[j] = boxChar + " " + count;
                        modified = true;
                    }
                }
            }
            if (modified == false && count)
                arr.push(boxChar + " " + count);
            map.set(currentValue, arr);
        } else {
            if (!word.endsWith("-") && count) {
                map.set(currentValue, [boxChar + " " + count]);
            }
        }
    }
    for (let [key, values] of map) {
        let counter = 1;
        values = values.filter(a=>a);
        for (let val of values) {
            if (val) {
                let [lense, focalLength] = val.split(" ");
                totalValue += ((key + 1) * counter * focalLength);
                counter++;
            }
        }
    }
    console.log(totalValue);
} catch (err) {
    console.error("error", err);
}