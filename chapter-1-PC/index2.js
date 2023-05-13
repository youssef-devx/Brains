// 11.80s - map/filter
// 10.65s - for
// 10.85s - for
// 10.84s - for
// 9.013s - for
const fs = require('fs')
const path = require('path')
// const {DETERMINERS, PREPOSITIONS, PRONOUNS} = require('./constants')
const wordsApiSample = require('./wordsapi_sample.json')

console.time('Op')
const words = String(fs.readFileSync(path.join(__dirname, 'words.txt'))).split('\n')
console.timeLog('Op', 'Reading words.txt done')

// Change all words in alphabitical order
function AddDetails(char) {
    const apiWords = Object.keys(wordsApiSample)
    const slicedWords = []
    const slicedApiWords = []

    const wordsLength = words.length
    const apiWordsLength = apiWords.length

    for (let i = 0; i < wordsLength; i++) {
        const w = words[i]
        if(w.startsWith(char.toLowerCase()) || w.startsWith(char.toUpperCase())) {
            slicedWords.push(w)
        }
    }

    for (let i = 0; i < apiWordsLength; i++) {
        const w = apiWords[i]
        if(w.startsWith(char.toLowerCase()) || w.startsWith(char.toUpperCase())) {
            slicedApiWords.push(w)
        }
    }

    const detailedWords = {}
    const slicedWordsLength = slicedWords.length

    for(let i = 0; i < slicedWordsLength; i++) {
        const w = slicedWords[i]

        slicedApiWords.includes(w) ? detailedWords[w] = {
            ...wordsApiSample[w]
        } :
        detailedWords[w] = {}
    }

    fs.writeFileSync(path.join(__dirname, 'words2', `${char}.json`), JSON.stringify(detailedWords))
}

// Do all the characters
const charsLenght = 26
for (let i = 0; i < charsLenght; i++) {
    AddDetails(String.fromCharCode(65+i))
}
console.timeLog('Op', 'All Chars Done')

// Write all seperate character files to 'words.json' file
function writeAllToOne() {
    for (let i = 0; i < charsLenght; i++) {
        const detailedWords = String(fs.readFileSync(path.join(__dirname, 'words2', `${String.fromCharCode(65+i)}.json`)))
        fs.appendFileSync(path.join(__dirname, `words2.json`), detailedWords)
    }
}

// Execute
writeAllToOne()
console.timeLog('Op', 'All Chars Done')

console.timeEnd('Op')
