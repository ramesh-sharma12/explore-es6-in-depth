//The Spread Operator

let value1 = 25,
    value2 = 50;

console.log(Math.max(value1, value2));      // 50

let values = [25, 50, 75, 100];
console.log(Math.max.apply(Math, values));  // 100

/*
The ECMAScript 6 spread operator makes this case very simple. Instead of calling apply(), you can pass the array to Math.max() directly and prefix it with the same ... pattern used with rest parameters. The JavaScript engine then splits the array into individual arguments and passes them in, like this:
*/

let values = [25, 50, 75, 100];

// equivalent to
// console.log(Math.max(25, 50, 75, 100));
console.log(Math.max(...values));           // 100

/*
ECMAScript 6’s name Property
Identifying functions can be challenging in JavaScript given the various ways a function can be defined. Additionally, the prevalence of anonymous function expressions makes debugging a bit more difficult, often resulting in stack traces that are hard to read and decipher. For these reasons, ECMAScript 6 adds the name property to all functions.
*/

function doSomething() {
    // ...
}

var doAnotherThing = function() {
    // ...
};

console.log(doSomething.name);          // "doSomething"
console.log(doAnotherThing.name);       // "doAnotherThing"

/*
The new.target MetaProperty
To solve this problem, ECMAScript 6 introduces the new.target metaproperty. A metaproperty is a property of a non-object that provides additional information related to its target (such as new). When a function’s [[Construct]] method is called, new.target is filled with the target of the new operator. That target is typically the constructor of the newly created object instance that will become this inside the function body. If [[Call]] is executed, then new.target is undefined.


This new metaproperty allows you to safely detect if a function is called with new by checking whether new.target is defined as follows:

*/

function Person(name) {
    if (typeof new.target !== "undefined") {
        this.name = name;   // using new
    } else {
        throw new Error("You must use new with Person.")
    }
}

var person = new Person("Nicholas");
var notAPerson = Person.call(person, "Michael");    // error!

/*
Block-Level Functions

ECMAScript 5 strict mode introduced an error whenever a function declaration was used inside of a block in this way:
*/

"use strict";

if (true) {

    // Throws a syntax error in ES5, not so in ES6
    function doSomething() {
        // ...
    }
}

//In ECMAScript 5, this code throws a syntax error. In ECMAScript 6, the doSomething() function is considered a block-level declaration and can be accessed and called within the same block in which it was defined. For example:

"use strict";

if (true) {

    console.log(typeof doSomething);        // "function"

    function doSomething() {
        // ...
    }

    doSomething();
}

console.log(typeof doSomething);            // "undefined"

/*
Deciding When to Use Block-Level Functions
Block level functions are similar to let function expressions in that the function definition is removed once execution flows out of the block in which it’s defined. The key difference is that block level functions are hoisted to the top of the containing block. Function expressions that use let are not hoisted, as this example illustrates:
*/

"use strict";

if (true) {

    console.log(typeof doSomething);        // throws error

    let doSomething = function () {
        // ...
    }

    doSomething();
}

console.log(typeof doSomething);

/*
Block-Level Functions in Nonstrict Mode
ECMAScript 6 also allows block-level functions in nonstrict mode, but the behavior is slightly different. Instead of hoisting these declarations to the top of the block, they are hoisted all the way to the containing function or global environment. For example:

*/

// ECMAScript 6 behavior
if (true) {

    console.log(typeof doSomething);        // "function"

    function doSomething() {
        // ...
    }

    doSomething();
}

console.log(typeof doSomething);            // "function"