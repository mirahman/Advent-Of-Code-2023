const fs = require('fs');
try {
    const txt = fs.readFileSync('./input.txt', 'utf8');
    const elves = txt.split('\n')
    let totalPoints = 0;
    let count = 1;
    let keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let values = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

    for (let elv of elves) {
        let firstDigit = "";
        let lastDigit = "";
        let numeric = "";
        let digit = -1;
        for (let i = 0; i < elv.length; i++) {
            if (elv[i] >= '1' && elv[i] <= '9') {
                numeric = "";
                digit = -1;
                if (firstDigit == '') {
                    firstDigit = elv[i];
                }
                lastDigit = elv[i];
            } else {
                numeric = numeric + "" + elv[i];
                if (numeric.length >= 3) {
                    let matched = false;
                    for (let x = 0; x < keys.length; x++) {
                        if (numeric.includes(values[x])) {
                            digit = keys[x];
                            if (numeric.endsWith(values[x])) {
                                lastDigit = keys[x];
                            }
                        }
                    }
                }
                if (digit > 0) {
                    if (firstDigit == '') {
                        firstDigit = digit;
                    }
                    if (lastDigit == "") {
                        lastDigit = digit;
                    }
                    digit = -1;
                }
            }
        }
        //console.log(count++, firstDigit + "" + lastDigit);
        totalPoints += parseInt(firstDigit + "" + lastDigit)
    }
    console.log(totalPoints)
} catch (err) {
    console.error("error", err);
}