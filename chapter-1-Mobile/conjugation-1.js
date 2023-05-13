const path = require("path")
const {rFile, isCVC} = require("./utils.js")
const { log } = require("console")
const irrVerbs = JSON.parse(rFile(path.join(__dirname, "irregularVerbs.json"), "utf-8"))
const thirdSingularPronouns = ["he", "she", "it"]

////////////////////
// Pronoun first //
//////////////////

module.exports = function conjugate(tense, verb, pronoun, type) {
  if(tense.includes("past")) {
    return pastTenses(tense, verb, pronoun, type)
  } else if(tense.includes("present")) {
    return presentTenses(tense, verb, pronoun, type)
  } else if (tense.includes("future")) {
    return futureTenses(tense, verb, pronoun, type)
  }
}

function pastTenses(tense, verb, pronoun, type) {
  const isI = pronoun === "I"
  const isThirdSingular = thirdSingularPronouns.includes(pronoun)
  const wasOrWere = isI || isThirdSingular ? "was" : "were"

  if(tense === "simple past"){
    if(verb === "be") return wasOrWere
    if(!Object.keys(irrVerbs).includes(verb)){
      return `${verb}ed.`
    } else {
      if(irrVerbs[verb].length === 4) {
        return `${irrVerbs[verb][0]} or ${irrVerbs[verb][1]}`
      } else {
        return irrVerbs[verb][0]
      }
    }
  }
  if(tense === "past progressive") {
    if(isCVC(verb)) {
      return `${wasOrWere} ${verb}${verb[verb.length-1]}ing`
    } else if(/[aeuio][aeuio]/.test(verb.split("").splice(verb.length-2))) {
      return `${wasOrWere} ${verb.splice(0, verb.length-1)}ing`
    } else {
      return `${wasOrWere} ${verb}ing`
    }
  }
  if(tense ===  "past perfect") {
    if(verb === "be") return `had been`
    if(!Object.keys(irrVerbs).includes(verb)){
      return `had ${verb}ed`
    } else {
      if(irrVerbs[verb].length === 4) {
        return `had ${irrVerbs[verb][2]} or had ${irrVerbs[verb][3]}`
      } else {
        return `had ${irrVerbs[verb][1]}`
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

function presentTenses(tense, verb, pronoun, type) {
  const isI = pronoun === "I"
  const isThirdSingular = thirdSingularPronouns.includes(pronoun)

  if(tense === "simple present"){
    if(verb === "be") return isThirdSingular ? "is" : isI ? "am" : "are"
    if(isThirdSingular){
      return verb + "s"
    } else {
      return verb
    }
  }
  if(tense === "present progressive") {
    if(isI) {
      if(isCVC(verb)) {
        return `am ${verb}${verb[verb.length-1]}ing`
      } else if(/[aeuio][aeuio]/.test(verb.split("").splice(verb.length-2))) {
        return `am ${verb.splice(0, verb.length-1)}ing`
      } else {
        return `am ${verb}ing`
      }
    } else {
      const isOrAre = `${isThirdSingular ? "is" : "are"}`
      if(isCVC(verb)) {
        return `${isOrAre} ${verb}${verb[verb.length-1]}ing`
      } else if(/[aeuio][aeuio]/.test(verb.split("").splice(verb.length-2))) {
        return `${isOrAre} ${verb.splice(0, verb.length-1)}ing`
      } else {
        return `${isOrAre} ${verb}ing`
      }
    }
  }
  if(tense ===  "present perfect") {
    if(isThirdSingular) {
      if(!Object.keys(irrVerbs).includes(verb)){
        return `has ${verb}ed`
      } else if(verb === "be") {
        return `has ${irrVerbs[verb][2]}`
      } else {
        if(irrVerbs[verb].length === 4) {
          return `has ${irrVerbs[verb][2]} or has ${irrVerbs[verb][3]}`
        } else {
          return `has ${irrVerbs[verb][1]}`
        }
      }
    } else {
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
  }
  if(tense === "present perfect progressive") {
    if(verb === "be") return isThirdSingular ? "has been" : "have been"
    if(isThirdSingular) {
      if(isCVC(verb)) {
        return `has been ${verb}${verb[verb.length-1]}ing`
      } else if(/[aeuio][aeuio]/.test(verb.split("").splice(verb.length-2))) {
        return `has been ${verb.splice(0, verb.length-1)}ing`
      } else {
        return `has been ${verb}ing`
      }
    } else {
      if(isCVC(verb)) {
        return `have been ${verb}${verb[verb.length-1]}ing`
      } else if(/[aeuio][aeuio]/.test(verb.split("").splice(verb.length-2))) {
        return `have been ${verb.splice(0, verb.length-1)}ing`
      } else {
        return `have been ${verb}ing`
      }
    }
  }
}

function futureTenses(tense, verb, pronoun, type) {
  if(tense === "simple future") {
    return "will " + verb
  }
  if(tense === "future progressive") {
    if(verb === "be") return "will be"
    if(isCVC(verb)) {
      return `will be ${verb}${verb[verb.length-1]}ing`
    } else if(/[aeuio][aeuio]/.test(verb.split("").splice(verb.length-2))) {
      return `will be ${verb.splice(0, verb.length-1)}ing`
    } else {
      return `will be ${verb}ing`
    }
  }
  if(tense === "future perfect") {
    if(!Object.keys(irrVerbs).includes(verb)){
      return `will have ${verb}ed`
    } else if(verb === "be") {
      return `will have been`
    } else {
      if(irrVerbs[verb].length === 4) {
        return `will have ${irrVerbs[verb][2]} or have ${irrVerbs[verb][3]}`
      } else {
        return `will have ${irrVerbs[verb][1]}`
      }
    }
  }
  if(tense === "future perfect progressive") {
    if(verb === "be") return `will have been`
    if(isCVC(verb)) {
      return `will have been ${verb}${verb[verb.length-1]}ing`
    } else if(/[aeuio][aeuio]/.test(verb.split("").splice(verb.length-2))) {
      return `will have been ${verb.splice(0, verb.length-1)}ing`
    } else {
      return `will have been ${verb}ing`
    }
  }
}
