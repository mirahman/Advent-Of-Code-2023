const { Console } = require('console');
const fs = require('fs');
try {
    const txt = fs.readFileSync('./input1.txt', 'utf8');
    const lines = txt.split('\n');
    let memo = new Map();
    let scores = new Map();
    let sToHand = new Map();
    let total = 0;
    let tempSort =[];
    for(let i =0;i<9;i++) {
        tempSort[i] = [];
    }

    const getCardTotalValue = (hands) => {
        let sum = 0;
        let counter = new Map();
        let chars = "AKQJT98765432"; 
        let len = hands.length;
        for(let i = 0;i<hands.length;i++) {
            sum += (13 - chars.indexOf(hands[i])).toString().padStart(2, '0');
            counter.set(hands[i], (counter.get(hands[i]) || 0 )+1);
        }

        let matched = false;
        let values = Array.from(counter.values()).sort((a, b) => {return b - a});

        let count = values.shift();
            if(count == 5) {
                    tempSort[8].push(hands);
                    matched = true;
            } else if(count == 4) {
                    tempSort[7].push(hands);
                    matched = true;
            } else if(count == 3) {
                let tmp = values.shift();
                if(tmp == 2)
                    tempSort[6].push(hands);
                else 
                    tempSort[5].push(hands);

                    matched = true;
            } else if(count == 2) {
                let tmp = values.shift();
                if(tmp == 2)
                    tempSort[4].push(hands);
                else 
                    tempSort[3].push(hands);

                    matched = true;
            }
        
        if(! matched) {
            tempSort[1].push(hands);
        }


        return sum;
    }

    for (let line of lines) {
        let [hands, bid] = line.split(" ");
        memo.set(hands, bid); // for future use
        let val = getCardTotalValue(hands);
        scores.set(hands, val);
        sToHand.set(val, hands);
        //total *= localResult;
    }
    console.log("score: ", sToHand.size)
    //console.log(tempSort);
    let rank = 1;
    for(let i = 0; i< tempSort.length;i++) {
        console.log(i, tempSort[i].length)
        if(tempSort[i].length > 0) {
            if(tempSort[i].length > 1) {
                // 
                let tmp = [];
                for(let hand of tempSort[i]) {
                    //console.log(hand,scores.get(hand) );
                    tmp.push(scores.get(hand));
                }
                tmp.sort((a, b) => {return a - b});
                for(let score of tmp) {
                    console.log(rank, sToHand.get(score), memo.get(sToHand.get(score)))
                    total += parseInt(rank * memo.get(sToHand.get(score)));
                    rank++; 
                }

            } else {
                console.log("single ", rank, tempSort[i], memo.get(tempSort[i][0]))
                total += parseInt(rank * memo.get(tempSort[i][0])) 
                rank++;
            }

        }
    }

    console.log(total);
} catch (err) {
    console.error("error", err);
}