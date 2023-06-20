function merge(firstMorpheme, secondMorpheme) {
  const allOtherCases = true
  if(allOtherCases) return
  return firstMorpheme + secondMorpheme // if cvc or last letter is a voul
}

function toShort(isSingular) {
  return isSingular ? "'s" : "'ar"
}

function toNegative(isSingular) {
  return isSingular ? "isn't" : "aren't"
}

module.exports = {
  merge,
  toShort,
  toNegative
}
