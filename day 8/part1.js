const { Console } = require('console');
const fs = require('fs');
try {
    const txt = fs.readFileSync('./input1.txt', 'utf8');
    const lines = txt.split('\n');
    let steps = lines[0].trim();
    let graph = new Map();
    let root = "AAA";
    let desitnation = "ZZZ";
    for (let i = 2; i < lines.length; i++) {
        let tmp = lines[i].split("=");
        let a = tmp[0].trim();
        tmp[1] = tmp[1].replace("(", "");
        tmp[1] = tmp[1].replace(")", "");
        let [b, c] = tmp[1].trim().split(",");
        graph.set(a, [b.trim(), c.trim()])
    }

    let count = 0;
    let i = 0;

    while (true) {
        let tmp = graph.get(root);
        if (root == desitnation) break;
        count++;
        if (steps[i] == "R") {
            if (tmp[1] == desitnation) {
                break;
            }
            root = tmp[1];
        } else {
            if (tmp[0] == desitnation) {
                break;
            }
            root = tmp[0];
        }
        i = (i + 1) % steps.length;
    }
    console.log(count);
} catch (err) {
    console.error("error", err);
}