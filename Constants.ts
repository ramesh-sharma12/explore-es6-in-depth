/**
 * 
 * This declaration creates a constant that can be either global or local to the function 
 * in which it is declared. An initializer for a constant is required; 
 * that is, you must specify its value in the same statement in which it's declared
 *  (which makes sense, given that it can't be changed later).

The const declaration creates a read-only reference to a value.
 It does not mean the value it holds is immutable, just that the variable identifier cannot be reassigned.
  For instance, in the case where the content is an object, this means the object's contents 
  (e.g. its parameters) can be altered.
 */

// define MY_FAV as a constant and give it the value 7
const MY_FAV = 7;

// this will throw an error
MY_FAV = 20;

// throws an error, missing initializer in const declaration
const FOO; 

// it's important to note the nature of block scoping
if (MY_FAV === 7) { 
    // this is fine and creates a block scoped MY_FAV variable 
    // (works equally well with let to declare a block scoped non const variable)
    let MY_FAV = 20;

    // MY_FAV is now 20
    console.log('my favorite number is ' + MY_FAV);

    // this gets hoisted into the global context and throws an error
    var MY_FAV = 20;
}

// const also works on objects
const MY_OBJECT = {'key': 'value'};

// Attempting to overwrite the object throws an error
MY_OBJECT = {'OTHER_KEY': 'value'};

// The same applies to arrays
const MY_ARRAY = [];
// It's possible to push items into the array
MY_ARRAY.push('A'); // ["A"]
// However, assigning a new array to the variable throws an error
MY_ARRAY = ['B']