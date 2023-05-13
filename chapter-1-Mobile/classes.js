class Express {
  constuctor() {}
  
  emotions(emotion) {
    this.emotion = emotion
    return "emotion expression." + emotion
  }
  
  thatIExist() {
    return "I am."
  }
  /* asMe() {
    console.log(this.emotion)
  }*/
}

class Human {}
class Town {}
class Location {}
class Animat {}
class Nature {}

const exp = new Express()

console.log(exp.emotions("anger"))