const { Console } = require('console');
const fs = require('fs');
try {
    const txt = fs.readFileSync('./input1.txt', 'utf8');
    const lines = txt.split('\n');
    let steps = lines[0].trim();
    let graph = new Map();
    let start = [];
    for (let i = 2; i < lines.length; i++) {
        let tmp = lines[i].split("=");
        let a = tmp[0].trim();
        tmp[1] = tmp[1].replace("(", "");
        tmp[1] = tmp[1].replace(")", "");
        if (a.endsWith("A")) {
            start.push(a);
        }
        let [b, c] = tmp[1].trim().split(",");
        graph.set(a, [b.trim(), c.trim()])
    }
    let count = 0;
    let i = 0;
    let result = [];
    for (let x = 0; x < start.length; x++) {
        root = start[x];
        count = 0;
        i = 0;
        while (true) {
            let tmp = graph.get(root);
            if (root.endsWith("Z")) break;
            count++;
            if (steps[i] == "R") {
                if (tmp[1].endsWith("Z")) {
                    break;
                }
                root = tmp[1];
            } else {
                if (tmp[0].endsWith("Z")) {
                    break;
                }
                root = tmp[0];
            }
            i = (i + 1) % steps.length;
        }
        result.push(count);
    }

    const gcd = (a, b) => {
        if (b == 0)
            return a;
        return gcd(b, a % b);
    }

    const findLCM = (arr, n) => {
        let ans = arr[0];
        for (let i = 1; i < n; i++)
            ans = (((arr[i] * ans)) /
                (gcd(arr[i], ans)));
        return ans;
    }

    let totalCount = findLCM(result, result.length);
    console.log(totalCount);
} catch (err) {
    console.error("error", err);
}