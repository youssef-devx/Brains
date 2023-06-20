const { toShort, toNegative } = require("./utils.js")
const testWords = ["do", "go", "play"]

testWords.forEach(w => console.log(w, toNegative()))
