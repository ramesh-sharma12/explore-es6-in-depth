/*
Block-Level Declarations

Block-level declarations are those that declare variables that are inaccessible outside of a given block scope. Block scopes, also called lexical scopes, are created:

Inside of a function
Inside of a block (indicated by the { and } characters)
Block scoping is how many C-based languages work, and the introduction of block-level declarations in ECMAScript 6 is intended to bring that same flexibility (and uniformity) to JavaScript.


Let Declarations
The let declaration syntax is the same as the syntax for var. You can basically replace var with let to declare a variable, but limit the variable’s scope to only the current code block 

*/

var count = 30;

// Syntax error
let count = 40;



var count = 30;

if (condition) {

    // Does not throw an error
    let count = 40;

    // more code
}

/*
Constant Declarations
You can also define variables in ECMAScript 6 with the const declaration syntax. Variables declared using const are considered constants, meaning their values cannot be changed once set. For this reason, every const variable must be initialized on declaration, as shown in this example:
*/

// Valid constant
const maxItems = 30;

// Syntax error: missing initialization
const name;

// throw error - Cannot assign to maxItems since it is read-only property
maxItems = 60;

/*

Declaring Objects with Const
A const declaration prevents modification of the binding and not of the value itself. That means const declarations for objects do not prevent modification of those objects. For example:

*/


const person = {
    name: "Nicholas"
};

// works
person.name = "Greg";

// throws an error
person = {
    name: "Greg"
};

/*
The Temporal Dead Zone

A variable declared with either let or const cannot be accessed until after the declaration. Attempting to do so results in a reference error, even when using normally safe operations such as the typeof operation in this example:
*/

if (condition) {
    console.log(typeof value);  // ReferenceError! block scoped variable used before its declaration
    let value = "blue";
}

/*
Block Binding in Loops

Perhaps one area where developers most want block level scoping of variables is within for loops, where the throwaway counter variable is meant to be used only inside the loop. 
*/

for (var i = 0; i < 10; i++) {
    process(items[i]);
}

// i is still accessible here
console.log(i);      

/*
In other languages, where block level scoping is the default, this example should work as intended, and only the for loop should have access to the i variable. In JavaScript, however, the variable i is still accessible after the loop is completed because the var declaration gets hoisted. Using let instead, as in the following code, should give the intended behavior:
*/

for (let i = 0; i < 10; i++) {
    process(items[i]);
}
// i is not accessible here - throws an error
console.log(i);

/*
Constant Declarations in Loops
The ECMAScript 6 specification doesn’t explicitly disallow const declarations in loops; however, there are different behaviors based on the type of loop you’re using. For a normal for loop, you can use const in the initializer, but the loop will throw a warning if you attempt to change the value. For example:

*/

var funcs = [];

// throws an error after one iteration
for (const i = 0; i < 10; i++) {
    funcs.push(function() {
        console.log(i);
    });
}

for (const key in object) {
    funcs.push(function() {
        console.log(key);
    });
}
