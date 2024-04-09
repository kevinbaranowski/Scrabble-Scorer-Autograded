// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

// function checkForSpecialCharacter(word) {
//    const specialCharacters = [
//       '`', "'", '"', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-',
//       '_', '=', '+', '[', ']', '{', '}', '\\', ';', '|', ':', ',', '.', '/',
//       '?', '<', '>'
//    ]
//    for (let i = 0; i < word.length; i++) {
//       if (specialCharacters.includes(word[i])) {
//          return true;
//       }
//    }
//    return false;
// }

// function checkForNumbers(word) {
//    const numbers = `1234567890`;
//    for (let i = 0; i < word.length; i++) {
//       if (numbers.includes(word[i])) {
//          return true;
//       }
//    }
//    return false;
// }

function validateCharacters(word) {
   let wordLC = word.toLowerCase()
   let validChars = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 
      'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 
      'u', 'v', 'w', 'x', 'y', 'z'
    ]
   for (let i = 0; i < word.length; i++) {
      if (!validChars.includes(wordLC[i])) {
         return false;
      }
   }
   return true;
}

function initialPrompt() {
   console.log("Let's play some scrabble!");
   let word;
   let isValid;
   while (word === undefined || isValid) {
      let response = input.question('Enter a word to score: ')
      isValid = validateCharacters(response);
      if (validateCharacters(response)) {
         word = response
         break;
      } else {
         console.log(`Invalid user entry. Response contains either an invalid symbol or number.`)
      }
   }
   return word
};

function simpleScorer(word) {
   word = word.toUpperCase();
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      score += 1;
   }
   return score;
};

const vowels = ['A', 'E', 'I', 'O', 'U'];

function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         score += 3;
      } else {
         score++
      }
   }
   return score;
};

function scrabbleScorer(word) {
   word = word.toLowerCase();
   const newPointStructure = transform(oldPointStructure);
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      for (const letter in newPointStructure) {
         if (letter === word[i]) {
            score += newPointStructure[letter]
            break;
         }
      }
   }
   return score
};

const simpleScore = {
   name: 'Simple Score',
   description: 'Each letter is worth 1 point',
   scorerFunction: simpleScorer
};

const bonusVowels = {
   name: 'Bonus Vowels',
   description: 'Vowels are 3 pts, consonants are 1 pt.',
   scorerFunction: vowelBonusScorer
};

const scrabble = {
   name: 'Scrabble',
   description: 'The traditional scoring algorithm.',
   scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [simpleScore, bonusVowels, scrabble];

function scorerPrompt() {
   let index;
   while (index < 0 || index > 2 || isNaN(index) || index === undefined) {
      let response = input.question('Which scoring algorithm would you like to use?\n Enter 0 for simple score\n Enter 1 for bonus vowel\n Enter 2 for traditional scrabble ')
      index = Number(response);
      if (index < 0 || index > 3) {
         console.log(`Invalid user entry. Please enter a number between 0 and 2. You entered: ${response}`)
      } else if (isNaN(index)) {
         console.log(`Invalid user entry. Please enter a number. You entered: ${response}`)
      } else {
         console.log('Valid entry recorded.')
      }
   }
   console.log(`Scoring algorithm selected: ${scoringAlgorithms[index].name}\nDescription: ${scoringAlgorithms[index].description}`)
   return scoringAlgorithms[index];
}

/* 
1. initialize newPointStructure variable as a new Object
2. loop over each property of oldPointStructure and retrieve the array we want to loop over
3. loop over each array value and set the key in the new object as the array value and the value as the old key converted to a number 
*/

function transform(oldPointStructure) {
   const newPointStructure = new Object();
   for (let property in oldPointStructure) {
      let arrayOfValues = oldPointStructure[property]
      arrayOfValues.forEach(function(value) {
         newPointStructure[value.toLowerCase()] = Number(property)
      })
   }
   return newPointStructure;
};
let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let word = initialPrompt();
   let algorithm = scorerPrompt();
   let score = algorithm.scorerFunction(word);
   console.log(`Score for '${word}': ${score} `)
   return score
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
