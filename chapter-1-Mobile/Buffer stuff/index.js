const fs = require("fs")
const path = require("path")
/*const WORDS_FILENAME = "words.txt"*/

console.time("Op")
/*const words = fs.readFileSync(path.join(__dirname, WORDS_FILENAME))
console.timeLog("Op", `Reading "${WORDS_FILENAME}" Done`)*/

let wordsBuf = Buffer.from("word1\nword2\nword3")
const wordsBufLen = wordsBuf.length
const idxs = [0]
const idxsLen = idxs.length

for (let i = 0; i <= wordsBufLen; i++) {
  if (wordsBuf[i] === 10) idxs.push(i)
}

idxs.forEach((idx, i)=>{
  let isLast = i === idxs.length - 1
  let lPos = !isLast ? idxs[i+1] : wordsBuf.length
  let wordBuf = i === 0 ? wordsBuf.subarray(idx, lPos) : wordsBuf.subarray(idx+1, lPos)
  let fPart = i === 0 ? new Buffer.from('{"') : new Buffer.from('"')
  let lPart = isLast ? new Buffer.from('":{}}') : new Buffer.from('":{},')
  let wordObjBuf = Buffer.concat([fPart,wordBuf,lPart], wordBuf.length+(fPart.length+lPart.length))
  fs.appendFileSync(path.join(__dirname, "testWords.txt"), wordObjBuf)
})

//console.timeLog("Op", "All Done")
console.timeEnd("Op")