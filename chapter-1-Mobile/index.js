const fs = require("fs")
const path = require("path")

console.time("Op")

let words = fs.readFileSync(path.join(__dirname, "testWords.txt"), "utf-8").split("\n")
let ws = {}

words.forEach(w=>ws[w]={})
fs.writeFileSync(path.join(__dirname, "testWords.txt"), JSON.stringify(ws))

console.timeEnd("Op")