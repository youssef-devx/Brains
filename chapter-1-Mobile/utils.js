const fs = require("fs")

// Create File
function wFile(filePath, data) {}

// Read File
function rFile(filePath, encoding) {
  return fs.readFileSync(filePath, encoding)
}

// Append To A File
function aFile(filePath, data) {
  fs.appendFileSync(filePath, data)
}

// Join All Strings
function joinAll(arr) {
  return arr.join(" ")
}

function isCVC(verb = "") {
  if(verb.length > 3) return false
  const CVC = /[^aeuio ][aeuio][^aeuio ]/i
  return CVC.test(verb)
}

module.exports = {
  rFile,
  aFile,
  joinAll,
  isCVC
}
