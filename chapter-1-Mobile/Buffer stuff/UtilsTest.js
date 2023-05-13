const path = require("path")
const {buf} = require("../utils.js")
const {concBuf} = require("../utils.js")
const {getBufIdxs} = require("../utils.js")
const {aFile} = require("../utils.js")
/*const WORDS_FILENAME = "words.txt"*/

console.time("Op")
/*const words = rFile(path.join(__dirname, WORDS_FILENAME))*/

let wordsBuf = buf("word1\nword2\nword3")
const wordsBufLen = wordsBuf.length
const idxs = getBufIdxs(wordsBuf, 10)

idxs.forEach((idx, i)=>{
  let isLast = i === idxs.length - 1
  let lPos = !isLast ? idxs[i+1] : wordsBuf.length
  let wordBuf = i === 0 ? wordsBuf.subarray(idx, lPos) : wordsBuf.subarray(idx+1, lPos)
  let fPart = i === 0 ? buf('{"') : buf('"')
  let lPart = isLast ? buf('":{}}') : buf('":{},')
  let wordObjBuf = concBuf([fPart,wordBuf,lPart], wordBuf.length+(fPart.length+lPart.length))
     aFile(path.join(__dirname,"testWords.txt"), wordObjBuf)
})

console.timeEnd("Op")