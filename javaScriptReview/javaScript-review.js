// js is weakly typed -> no explicit types. Doesn't force you to specify variable type
// oop -> we make objects and work with them
// versatile language -> runs in browser and PC(via node)

/* ----------------------CORE------------------------------*/

// Core variables:
var name_ = "Max";
var age = 26;
var hasHobbies = true;

// basic function
function summarizeUser(userName, userAge, userHasHobby) {
  return `Name is ${userName}, age is ${userAge}, and the user has hobbies? ${userHasHobby}`;
}
console.log(summarizeUser(name_, age, hasHobbies));

// Next gen jS:
let nickName = "Jack"; // you can change this
const permanentName = "Jackie"; // you can't change this

// Arrow function:
const summarizeNewUser = () => {};
const add = (a, b) => a + b; // only 1 thing to return
const addOne = (a) => a + 1; // func only takes 1 argument
const addRandom = () => 1 + 2; // func has no arguments

/* ----------------------Object------------------------------*/

const car = {
  mode: "Corvette",
  year: 2025,
  pedalDown: () => {
    console.log("Vroom Vroom....Weeeeeeeeeeeeeeeeeeeee");
  }
};
car.pedalDown();

/* ----------------------Array------------------------------*/

const moves = ["Armbar", "triangle", "RNC"];
//loop through array
for (let move of moves) {
  console.log(move);
}

//Array methods:
moves.map((move) => "Move: " + move); // ["Move: Armbar", "Move: triangle", "Move: RNC"];

/* 
    Why can we modify moves even though moves is const?
        - Reference types has not changed. The address has not changed
*/

//rest and spread operator
let copiedMoves = moves.slice(); // creates a copy of moves
let nestedMoves = [moves]; // creates an array with the first element being the moves array
let spreadMoves = [...hobbies]; // just creates a copy just like .slice()

const toArray = (arg1, arg2, arg3) => {
  // this only allows us to work with 3 items
  return [arg1, arg2, arg3];
};
console.log(toArray(1, 2, 3)); //this works
// console.log(toArray(1, 2, 3,4 )); -> this fails

const toSpreadArray = (...args) => {
  // this allows us
  return args;
};
console.log(toSpreadArray(1, 2, 3, 4, 5));

// to pull elements, use spread, to merge use rest. Syntax is the same

/* ----------------------Async------------------------------*/

setTimeout(() => {
  console.log("Timer is done!");
}, 1);

console.log("Hello");
console.log("Hi!");

// We see Hello and Hi because the timer has to finish
// In situation like this, we use async 