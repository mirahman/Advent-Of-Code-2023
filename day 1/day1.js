const fs = require('fs');
try {
    const txt = fs.readFileSync('./input2.txt', 'utf8');
    const elves = txt.split('\n')
    let totalPoints = 0;
    let count = 1;
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
                    if (numeric.includes('one')) {
                        digit = 1;
                        if (numeric.endsWith('one')) {
                            lastDigit = 1;
                        }
                    }
                    if (numeric.includes('two')) {
                        digit = 2;
                        if (numeric.endsWith('two')) {
                            lastDigit = 2;
                        }
                    }
                    if (numeric.includes('three')) {
                        digit = 3;
                        if (numeric.endsWith('three')) {
                            lastDigit = 3;
                        }
                    }
                    if (numeric.includes('four')) {
                        digit = 4;
                        if (numeric.endsWith('four')) {
                            lastDigit = 4;
                        }
                    }
                    if (numeric.includes('five')) {
                        digit = 5;
                        if (numeric.endsWith('five')) {
                            lastDigit = 5;
                        }
                    }
                    if (numeric.includes('six')) {
                        digit = 6;
                        if (numeric.endsWith('six')) {
                            lastDigit = 6;
                        }
                    }
                    if (numeric.includes('seven')) {
                        digit = 7;
                        if (numeric.endsWith('seven')) {
                            lastDigit = 7;
                        }
                    }
                    if (numeric.includes('eight')) {
                        digit = 8;
                        if (numeric.endsWith('eight')) {
                            lastDigit = 8;
                        }
                    }
                    if (numeric.includes('nine')) {
                        digit = 9;
                        if (numeric.endsWith('nine')) {
                            lastDigit = 9;
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
        console.log(count++, firstDigit + "" + lastDigit);
        totalPoints += parseInt(firstDigit + "" + lastDigit)
    }
    console.log(totalPoints)
} catch (err) {
    console.error("error", err);
}