const fs = require('fs');
try {
    const txt = fs.readFileSync('./input1.txt', 'utf8');
    const lines = txt.split('\n');
    let total = 0;
    let time = lines[0].split(":")[1].trim().replaceAll(' ', '');
    let distance = lines[1].split(":")[1].trim().replaceAll(' ', '');
    let localResult = 0;
    for (let j = 1; j <= time; j++) {
        let localDistance = 0;
        localDistance = (time - j) * j;
        if (localDistance > distance) {
            total++;
        }
    }
    console.log(total);
} catch (err) {
    console.error("error", err);
}