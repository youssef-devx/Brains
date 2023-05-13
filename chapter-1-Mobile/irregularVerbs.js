const fs = require("fs")
const path = require("path")
const FILENAME = "irregularVerbs.txt"

console.time("Op")
let irrVerbs = fs.readFileSync(path.join(__dirname, FILENAME), "utf-8").split("\n")

const irrVerbsObj = {}
const irrVerbsLen = irrVerbs.length

for(let i=0;i<=irrVerbsLen;i++) {
  if(irrVerbs[i]) {
  let lineArr=irrVerbs[i].split("\t")

  for(let j=0;j<=lineArr.length;j++) {
    if(lineArr[j]) {
      lineArr[j]=lineArr[j].split(" or ")
      lineArr=lineArr.flat()
    }
  }
  //console.log(lineArr)
irrVerbsObj[lineArr[0]]=[...lineArr.slice(1)]
  }
}

fs.writeFileSync(path.join(__dirname,"irregularVerbs.json"), JSON.stringify(irrVerbsObj))

console.timeEnd("Op")