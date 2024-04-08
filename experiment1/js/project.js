// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

function main() {
  const fillers = {
    faceshape: ["round", "oval", "diamond", "square", "heart", "rectangle", "inverted triangle"],
    eyeshape: ["upturned", "round", "monolid", "downturned", "hooded", "almond", "protruding"],
    eyecolor:  ["red", "blue", "yellow", "orange", "green", "brown", "purple", "gray", "light blue", "silver"],
    eyeadj: ["beautiful", "charming", "alluring", "mysterious", "large", "icy", "luminous", "radiant", "gleaming", "sad", "angry", "pensive", "dark", "hopeful", "droopy"],
    hairstyle: ["buzz cut", "side part", "faux hawk", "pompadour", "slick back", "undercut", "mohawk", "crew cut", "bowl cut", "two-block", "curtain bangs", "mash", "asymmetrical fringe", "see-through bangs", "wolf cut", "mullet", "brushed back hair", "60-40 quiff", "textured undercut", "wavy perm"],
    haircolor: ["black", "brown", "gray", "white", "light gray", "dark gray", "blue", "navy", "yellow", "red", "pink", "purple", "green", "light blue", "orange", "chestnut", "jet black", "blonde", "burgundy", "dark bown", "ash brown"],
    bodyshape: ["rectangular", "inverted triangular", "trapezoid", "triangular", "oval", "square"],
    bodytype: ["fit", "slim", "muscular", "toned", "chubby", "thick", "buff", "skinny"],
    height: ["very short (5'1 and below)", "short (5'2-5'7)", "average height(5'8-5'10)", "tall (5'11-6'1)", "very tall (6'2 and above)"],
    traits: ["ambitious", "accessible", "active", "athletic", "benevolent", "calm", "caring", "charismatic", "charming", "cheerful", "clever", "compassionate", "confident", "considerate", "cooperative", "dramatic", "dignified", "earnest", "educated", "elegant", "empathetic", "energetic", "efficient", "faithful", "friendly", "fun", "generous", "gentle", "genuine", "hardworking", "hearty", "honest", "humorous", "independent", "innovative", "kind", "loyal", "logical", "mature", "maticulous", "modest", "neat", "passionate", "playful", "popular", "protecive", "rational", "responisble", "skillful", "stoic", "understanding", "determined", "emotional", "abrasive", "angry", "anxious", "arrogant", "assertive", "aloof", "barbaric", "cautious", "childish", "careless", "clumsy", "cold", "conceited", "crafty", "cruel", "critical", "deceitful", "demanding", "devious", "forgetful", "hateful", "gullible", "ignorant", "hostile", "inconsiderate", "insecure", "insulting", "irrational", "lazy", "malicious", "moody", "naive", "obsessive", "paranoid", "passive", "sadistic", "selfish", "shy", "submissive"],
    traitlist: ["$traits, $traits, and $traits"]
  };
  
  const template = `Character created!
  
  His $faceshape face shape with $eyeadj $eyeshape $eyecolor eyes can capture anyone's attention.
  
  He just came out of the barbershop with a brand new look! His $haircolor $hairstyle really matches his $bodytype $bodyshape body don't you think?
  
  If you were to ask people to describe him in three words, they would say he is $traitlist.
  
  Did we mention he was $height?
  
  Have fun drawing!
  `;
  
  
  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;
  
  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  function generate() {
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }
  
    /* global box */
    $("#box").text(story);
  }
  
  /* global clicker */
  $("#clicker").click(generate);
  
  generate();
  
}

// let's get this party started - uncomment me
main();