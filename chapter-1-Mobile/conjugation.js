const path = require("path")
const {rFile,joinAll, isCVC} = require("./utils.js")
const { log } = require("console")
const irrVerbs = JSON.parse(rFile(path.join(__dirname, "irregularVerbs.json"), "utf-8"))
const thirdSingularPronouns = ["HE", "SHE", "IT"]

module.exports = function conjugate(tense, verb, type) {
  if(tense.includes("past")) {
    return pastTenses(tense, verb)
  } else if(tense.includes("present")) {
    return presentTenses(tense, verb)
  } else if (tense.includes("future")) {
    return futureTenses(tense, verb, type)
  }
}

function pastTenses(tense, verb, type) {
  if(tense === "simple past"){
    if(!Object.keys(irrVerbs).includes(verb)){
      return `${verb}ed.`
    } else {
      if(irrVerbs[verb].length === 4) {
        return joinAll([irrVerbs[verb][0], "or", irrVerbs[verb][1]])
      } else {
        return joinAll([irrVerbs[verb][0]])
      }
    }
  }
  if(tense === "past progressive") {
    if(isCVC(verb)) {
      return `was ${verb}${verb[verb.length-1]}ing`
    } else if(/[aeuio][aeuio]/.test(verb.split("").splice(verb.length-2))) {
      return `was ${verb.splice(0, verb.length-1)}ing`
    } else {
      return `was ${verb}ing`
    }
  }
  if(tense ===  "past perfect") {
    if(!Object.keys(irrVerbs).includes(verb)){
      return `had ${verb}ed`
    } else if(verb === "be") {
      return joinAll(["had", irrVerbs[verb][2]])
    } else {
      if(irrVerbs[verb].length === 4) {
        return joinAll(["had", irrVerbs[verb][2], "or", "had", irrVerbs[verb][3]])
      } else {
        return joinAll(["had", irrVerbs[verb][1]])
      }
    }
  }
  if(tense === "past perfect progressive") {
    if(verb === "be") return "had been"
    if(isCVC(verb)) {
      return `had been ${verb}${verb[verb.length-1]}ing`
    } else if(/[aeuio][aeuio]/.test(verb.split("").splice(verb.length-2))) {
      return `had been ${verb.splice(0, verb.length-1)}ing`
    } else {
      return `had been ${verb}ing`
    }
  }
}

function presentTenses(tense, verb, type, pronoun) {
  const isNegative = type === "negative"

  if(tense === "simple present"){
    if(thirdSingularPronouns.includes(pronoun)){
      return isNegative ? "does not " + verb : verb + "s"
    } else {
      return isNegative ? "do not " + verb : verb
    }
  }
  if(tense === "present progressive") {
    if(isCVC(verb)) {
      return `${verb}${verb[verb.length-1]}ing`
    } else if(/[aeuio][aeuio]/.test(verb.split("").splice(verb.length-2))) {
      return `${verb.splice(0, verb.length-1)}ing`
    } else {
      return verb + "ing"
    }
  }
  if(tense ===  "present perfect") {
    if(!Object.keys(irrVerbs).includes(verb)){
      return `have ${verb}ed`
    } else if(verb === "be") {
      return `have ${irrVerbs[verb][2]}`
    } else {
      if(irrVerbs[verb].length === 4) {
        return `have ${irrVerbs[verb][2]} or have ${irrVerbs[verb][3]}`
      } else {
        return `have ${irrVerbs[verb][1]}`
      }
    }
  }
  if(tense === "present perfect progressive") {
    if(verb === "be") return "have been"
    if(isCVC(verb)) {
      return `have been ${verb}${verb[verb.length-1]}ing`
    } else if(/[aeuio][aeuio]/.test(verb.split("").splice(verb.length-2))) {
      return `have been ${verb.splice(0, verb.length-1)}ing`
    } else {
      return `have been ${verb}ing`
    }
  }
}

function futureTenses(tense, verb, type) {
  const isNegative = type === "negative"

  if(tense === "simple future") {
    return `${isNegative ? "will not" : "will"} ${verb}`
  }
  if(tense === "future progressive") {
    if(verb === "be") return `${isNegative ? "will not" : "will"} be`
    if(isCVC(verb)) {
      return `${isNegative ? "will not" : "will"} be ${verb}${verb[verb.length-1]}ing`
    } else if(/[aeuio][aeuio]/.test(verb.split("").splice(verb.length-2))) {
      return `${isNegative ? "will not" : "will"} be ${verb.splice(0, verb.length-1)}ing`
    } else {
      return `${isNegative ? "will not" : "will"} be ${verb}ing`
    }
  }
  if(tense === "future perfect") {
    if(!Object.keys(irrVerbs).includes(verb)){
      return `${isNegative ? "will not" : "will"} have ${verb}ed`
    } else if(verb === "be") {
      return `${isNegative ? "will not" : "will have"} ${irrVerbs[verb][2]}`
    } else {
      if(irrVerbs[verb].length === 4) {
        return `${isNegative ? "will not" : "will have"} ${irrVerbs[verb][2]} or have ${irrVerbs[verb][3]}`
      } else {
        return `${isNegative ? "will not" : "will have"} ${irrVerbs[verb][1]}`
      }
    }
  }
  if(tense === "future perfect progressive") {
    if(verb === "be") return `${isNegative ? "will not" : "will"} have been`
    if(isCVC(verb)) {
      return `${isNegative ? "will not" : "will"} have been ${verb}${verb[verb.length-1]}ing`
    } else if(/[aeuio][aeuio]/.test(verb.split("").splice(verb.length-2))) {
      return `${isNegative ? "will not" : "will"} have been ${verb.splice(0, verb.length-1)}ing`
    } else {
      return `${isNegative ? "will not" : "will"} have been ${verb}ing`
    }
  }
}
