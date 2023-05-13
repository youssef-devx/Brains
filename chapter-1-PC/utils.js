const fs = require('fs')
const path = require('path')
// const {DETERMINERS, PREPOSITIONS, PRONOUNS} = require('./constants')
const wordsApiSample = require('./wordsapi_sample.json')

console.time('Operation')
const words = String(fs.readFileSync(path.join(__dirname, 'words_alpha.txt'))).split('\n')
console.timeLog('Operation', 'Reading words_alpha.txt done')

// Change all words in alphabitical order
function AddDetails(char) {
    const apiWords = Object.keys(wordsApiSample)
    const slicedWords = words.filter(w => w.startsWith(char.toLowerCase()) || w.startsWith(char.toUpperCase()))
    const slicedApiWords = apiWords.filter(w => w.startsWith(char.toLowerCase()) || w.startsWith(char.toUpperCase()))

    const detailedWords = {}
    slicedWords.map((w, idx) => {
        idx % 100 === 0 && console.timeLog('Operation', `${(idx * 100 / slicedWords.length).toFixed(2)}%`)


        slicedApiWords.includes(w) ? detailedWords[w] = {
            ...wordsApiSample[w]
        } :
        detailedWords[w] = {}
    })
    fs.writeFileSync(path.join(__dirname, 'words_alpha', `${char}.json`), JSON.stringify(detailedWords))
}

// Do all the characters
Array(26).fill().map((c, i) => {
    // AddDetails(String.fromCharCode(65+i))
})

// Write all seperate character files to 'words.json' file
function writeAllToOne() {
    Array(26).fill().map((c, i) => {
        const detailedWords = String(fs.readFileSync(path.join(__dirname, 'words_alpha', `${String.fromCharCode(65+i)}.json`)))
        fs.appendFileSync(path.join(__dirname, `words_alpha.json`), detailedWords)
        console.timeLog('Operation', String.fromCharCode(65+i), 'Done')
    })
}

// Execute
// writeAllToOne()

console.timeLog('Operation', 'All Operations Done')
console.timeEnd('Operation')
