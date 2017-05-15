What are Modules?
Modules are JavaScript files that are loaded in a different mode (as opposed to scripts, which are loaded in the original way JavaScript worked). This different mode is necessary because modules have very different semantics than scripts:

Basic Exporting
You can use the export keyword to expose parts of published code to other modules. In the simplest case, you can place export in front of any variable, function, or class declaration to export it from the module, like this:

// export data
export var color = "red";
export let name = "Nicholas";
export const magicNumber = 7;

// export function
export function sum(num1, num2) {
    return num1 + num1;
}

// export class
export class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }
}

// this function is private to the module
function subtract(num1, num2) {
    return num1 - num2;
}

// define a function...
function multiply(num1, num2) {
    return num1 * num2;
}

// ...and then export it later
export { multiply };

Importing a Single Binding
Suppose that the first example in the “Basic Exporting” section is in a module with the filename example.js. You can import and use bindings from that module in a number of ways. For instance, you can just import one identifier:

// import just one
import { sum } from "./example.js";

console.log(sum(1, 2));     // 3

sum = 1;        // error

mporting Multiple Bindings
If you want to import multiple bindings from the example module, you can explicitly list them out as follows:

// import multiple
import { sum, multiply, magicNumber } from "./example.js";
console.log(sum(1, magicNumber));   // 8
console.log(multiply(1, 2));        // 2

Importing All of a Module
There’s also a special case that allows you to import the entire module as a single object. All of the exports are then available on that object as properties. For example:

// import everything
import * as example from "./example.js";
console.log(example.sum(1,
        example.magicNumber));          // 8
console.log(example.multiply(1, 2));    // 2


ECMAScript 6’s import statements create read-only bindings to variables, functions, and classes rather than simply referencing the original bindings like normal variables. Even though the module that imports the binding can’t change its value, the module that exports that identifier can. For example, suppose you want to use this module:

export var name = "Nicholas";
export function setName(newName) {
    name = newName;
}
When you import those two bindings, the setName() function can change the value of name:

import { name, setName } from "./example.js";

console.log(name);       // "Nicholas"
setName("Greg");
console.log(name);       // "Greg"

name = "Nicholas";       // error


If the module importing the function wants to use a different name, it can also use as:

import { add as sum } from "./example.js";
console.log(typeof add);            // "undefined"
console.log(sum(1, 2));             // 3


If the module importing the function wants to use a different name, it can also use as:

import { add as sum } from "./example.js";
console.log(typeof add);            // "undefined"
console.log(sum(1, 2));             // 3

Importing Default Values
You can import a default value from a module using the following syntax:

// import the default
import sum from "./example.js";

console.log(sum(1, 2));     // 3




Importing Default Values
You can import a default value from a module using the following syntax:

// import the default
import sum from "./example.js";

console.log(sum(1, 2));     // 3