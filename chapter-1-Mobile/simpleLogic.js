console.time('OP')
const { log } = require("console")
const conjugate = require("./conjugation-2.js")
const words = []
const someVerbs = ["be", "use", "learn", "hit"]
const pronouns = ["I", "you", "he", "she", "it", "we", "they"]
/*const statuses = [{
  status: "happiness",
  adj: "happy"
}, {status: "sadness", adj: "sad"}]
const actions = [{}]
const input = pickRandom(["I am happy", "You are rich"])

function whichSentence(sentence) {
  const pronounsRegExp = "I|YOU|HE|SHE|IT|WE|THEY"
  const SVO = new RegExp(`${pronounsRegExp} am|is|are|was|were [A-z]`, "i")
  // || /I am [A-z]/
  return sentence.match(SVO) && "SVO"
}

function whichTense(sentence) {
  return ""
}

function referToMyself(statusOrAction) {
  return statusOrAction === "status" ? pickRandom(["I am", "I'm"]): "I"
}

function statusOf(status) {
  return statuses.filter(sObj => sObj.status === status)[0].adj
}
function actionOf(action) {}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function splitStr(str, token) {
  return str.split(token)
}
*/
const simple = someVerbs.map(v=>{
  return pronouns.map(p => p + " " + conjugate("simple past", v, p, "negative"))
})
const progressive =  someVerbs.map(v=>{
  return pronouns.map(p => p + " " + conjugate("past progressive", v, p, "negative"))
})
const perfect = someVerbs.map(v=>{
  return pronouns.map(p => p + " " + conjugate("past perfect", v, p, "negative"))
})
const perfectProgressive = someVerbs.map(v=>{
  return pronouns.map(p => p + " " + conjugate("past perfect progressive", v, p, "negative"))
})
log(simple)
log(progressive)
log(perfect)
log(perfectProgressive)
console.timeEnd('OP')
/*
if(whichSentence(input) === "SVO") {
  // console.log(joinAll([referToMyself("status"), statusOf("happiness")]), input.split(" ")[1])
}
*/
