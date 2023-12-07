const { Console } = require('console');
const fs = require('fs');
try {
    const txt = fs.readFileSync('./input1.txt', 'utf8');
    const lines = txt.split('\n');
    let memo = new Map();
    let scores = new Map();
    let sToHand = new Map();
    let total = 0;
    let tempSort = [];
    for (let i = 0; i < 9; i++) {
        tempSort[i] = [];
    }

    const getCardTotalValue = (hands) => {
        let sum = 0;
        let counter = new Map();
        let chars = "AKQT98765432J";
        let len = hands.length;
        for (let i = 0; i < hands.length; i++) {
            sum += (13 - chars.indexOf(hands[i])).toString().padStart(2, '0');
            if (counter.has(hands[i]))
                counter.set(hands[i], counter.get(hands[i]) + 1);
            else
                counter.set(hands[i], 1);
        }

        let matched = false;
        let values = [...counter].sort((a, b) => { return b[1] - a[1] });

        let [char, count] = values.shift();

        let pos = 1;
        if (char != 'J' && hands.indexOf('J') >= 0) {
            count += counter.get('J'); // adding J to top one
        } if (char == 'J') { // J is the top count
            if (values.length > 0) {
                let [charx, countx] = values[0];
                count += countx;
            }
        }

        //console.log(hands, count, hands.indexOf('J'), counter.get('J'));
        if (count == 5) {
            tempSort[8].push(hands);
            matched = true;
        } else if (count == 4) {
            tempSort[7].push(hands);
            matched = true;
        } else if (count == 3) {
            let [nextchar, tmp] = values.shift();
            if (tmp == 2) {
                tempSort[6].push(hands);
            }
            else {
                tempSort[5].push(hands);
            }

            matched = true;
        } else if (count == 2) {
            let [nextchar, tmp] = values.shift()
            if (tmp == 2) {
                tempSort[4].push(hands);
            }
            else {
                tempSort[3].push(hands);
            }

            matched = true;
        }

        if (!matched) {
            if (hands.indexOf('J') >= 0)
                tempSort[2].push(hands);
            else
                tempSort[1].push(hands);
        }


        return parseInt(sum, 10);
    }

    for (let line of lines) {
        let [hands, bid] = line.split(" ");
        memo.set(hands, bid); // for future use
        let val = getCardTotalValue(hands);
        scores.set(hands, val);
        sToHand.set(val, hands);
        //total *= localResult;
    }
    //console.log("score: ", sToHand.size)
    //console.log(scores);
    let rank = 1;
    let strLog = "";
    for (let i = 0; i < tempSort.length; i++) {
        //console.log(i, tempSort[i].length)
        if (tempSort[i].length > 0) {
            if (tempSort[i].length > 1) {
                // 
                let tmp = [];
                for (let hand of tempSort[i]) {
                    //console.log(hand,scores.get(hand) );
                    tmp.push(scores.get(hand));
                }
                tmp.sort((a, b) => { return a - b });
                for (let score of tmp) {
                    strLog = (1000 - rank + 1) + " " + sToHand.get(score) + " " + memo.get(sToHand.get(score)) + "\n" + strLog
                    //console.log(rank, sToHand.get(score), memo.get(sToHand.get(score)))
                    total += parseInt(rank * memo.get(sToHand.get(score)));
                    rank++;
                }

            } else {
                //console.log("single ", rank, tempSort[i], memo.get(tempSort[i][0]))
                total += parseInt(rank * memo.get(tempSort[i][0]))
                rank++;
            }

        }
    }
    //console.log(strLog);
    console.log(total);
} catch (err) {
    console.error("error", err);
}