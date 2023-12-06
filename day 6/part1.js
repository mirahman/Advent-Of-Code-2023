const fs = require('fs');
try {
    const txt = fs.readFileSync('./input1.txt', 'utf8');
    const lines = txt.split('\n');
    let total = 1;
    let times = lines[0].split(":")[1].trim().split(/\s+/).map(Number);
    let distance = lines[1].split(":")[1].trim().split(/\s+/).map(Number);

    for (let i = 0; i < times.length; i++) {
        let localResult = 0;
        for (let j = 1; j <= times[i]; j++) {
            let localDistance = 0;
            localDistance = (times[i] - j) * j;
            if (localDistance > distance[i]) {
                localResult++;
            }
        }
        total *= localResult;
    }
    console.log(total);
} catch (err) {
    console.error("error", err);
}