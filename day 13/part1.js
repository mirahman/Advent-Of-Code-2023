const { Console } = require('console');
const fs = require('fs');
try {
    const txt = fs.readFileSync('./input1.txt', 'utf8');
    const lines = txt.split('\n');
    //console.log(lines);
    let total = 0;
    let sections = [];
    let section = [];
    
    const getHorizontalPoint = (matrix) => {
        let rCount = matrix.length
        for (let row = 0; row < rCount - 1; row++) {
            let valid = true
            let l = row
            let r = row + 1
            while (l >= 0 && r < rCount) {
                let lRow = matrix[l]
                let rRow = matrix[r]
                if (lRow !== rRow) {
                    valid = false
                    break
                }
                l--
                r++
            }
            if (valid) return (row + 1) * 100
        }
        return 0
    }


    const getVerticalPoint = (matrix) => {
        let cCount = matrix[0].length
        for (let col = 0; col < cCount - 1; col++) {
            let valid = true
            let l = col
            let r = col + 1
            while (l >= 0 && r < cCount) {
                let lCol = matrix.map((row) => row[l]).join('')
                let rCol = matrix.map((row) => row[r]).join('')
                if (lCol !== rCol) {
                    valid = false
                    break
                }
                l--
                r++
            }
            if (valid) return col + 1
        }
        return 0
    }


    for (let line of lines) {
        if (!line) {
            sections.push([...section])
            section = []
        } else {
            section.push(line)
        }
    }
    sections.push([...section])

    for (let section of sections) {
        let vPoint = getVerticalPoint(section);
        let hPoint = getHorizontalPoint(section);
        //console.log(vPoint, hPoint);
        total += hPoint + vPoint

    }
    console.log(total);
} catch (err) {
    console.error("error", err);
}