/*
The “fat” arrow => (as opposed to the thin arrow ->) was chosen to be compatible with CoffeeScript,
 whose fat arrow functions are very similar.

Specifying parameters:

    () => { ... } // no parameter
     x => { ... } // one parameter, an identifier
(x, y) => { ... } // several parameters
Specifying a body:
*/
x => { return x * x }  // block
x => x * x  // expression, equivalent to previous line

/*The statement block behaves like a normal function body. For example, you need return to give back a value. With an expression body, the expression is always implicitly returned.

Note how much an arrow function with an expression body can reduce verbosity. Compare:
*/

let squares = [1, 2, 3].map(function (x) { return x * x });
 squares = [1, 2, 3].map(x => x * x);

//With an arrow function, the code looks as follows.

function Prefixer(prefix) {
    this.prefix = prefix;
}

Prefixer.prototype.prefixArray = function (arr) {
    return arr.map((x) => {
        return this.prefix + x;
    });
};

 //To fully ES6-ify the code, you’d use a class and a more compact variant of arrow functions:

class Prefixer {
    prefix: any;

    constructor(prefix) {
        this.prefix = prefix;
    }
    prefixArray(arr) {
        return arr.map(x => this.prefix + x); // (A)
    }
}


//Immediately-invoked arrow functions 

(function () { // open IIFE
    // inside IIFE
})(); // close IIFE

//You can save a few characters if you use an Immediately Invoked Arrow Function (IIAF):

(() => {
    return 123
})();

/*
An arrow function is different from a normal function in only two ways:

The following constructs are lexical: arguments, super, this, new.target
It can’t be used as a constructor: Normal functions support new via the internal method [[Construct]] and the property prototype. 
Arrow functions have neither, which is why new (() => {}) throws an error.
Apart from that, there are no observable differences between an arrow function and a normal function. For example, typeof and instanceof produce the same results:

*/
> typeof (() => {})
'function'
> () => {} instanceof Function
true

> typeof function () {}
'function'
> function () {} instanceof Function
true

/*

Allowing block-level functions improves your ability to declare functions in JavaScript, but ECMAScript 6 also introduced a completely new way to declare functions.

Arrow Functions
One of the most interesting new parts of ECMAScript 6 is the arrow function. Arrow functions are, as the name suggests, functions defined with a new syntax that uses an “arrow” (=>). But arrow functions behave differently than traditional JavaScript functions in a number of important ways:

No this, super, arguments, and new.target bindings - The value of this, super, arguments, and new.target inside of the function is by the closest containing nonarrow function. (super is covered in Chapter 4.)
Cannot be called with new - Arrow functions do not have a [[Construct]] method and therefore cannot be used as constructors. Arrow functions throw an error when used with new.
No prototype - since you can’t use new on an arrow function, there’s no need for a prototype. The prototype property of an arrow function doesn’t exist.
Can’t change this - The value of this inside of the function can’t be changed. It remains the same throughout the entire lifecycle of the function.
No arguments object - Since arrow functions have no arguments binding, you must rely on named and rest parameters to access function arguments.
No duplicate named parameters - arrow functions cannot have duplicate named parameters in strict or nonstrict mode, as opposed to nonarrow functions that cannot have duplicate named parameters only in strict mode.

*/

var reflect = value => value;

// effectively equivalent to:
var reflect = function(value) {
    return value;
};

//If you are passing in more than one argument, then you must include parentheses around those arguments, like this:

var sum = (num1, num2) => num1 + num2;

// effectively equivalent to:
var sum = function(num1, num2) {
    return num1 + num2;
};

//If you want to create a function that does nothing, then you need to include curly braces, like this:

var doNothing = () => {};

//Curly braces are used to denote the function’s body, which works just fine in the cases you’ve seen so far. But an arrow function that wants to return an object literal outside of a function body must wrap the literal in parentheses. For example:

var getTempItem = id => ({ id: id, name: "Temp" });

// effectively equivalent to:

var getTempItem = function(id) {

    return {
        id: id,
        name: "Temp"
    };
};
//Wrapping the object literal in parentheses signals that the braces are an object literal instead of the function body.

/*
Creating Immediately-Invoked Function Expressions
One popular use of functions in JavaScript is creating immediately-invoked function expressions (IIFEs). IIFEs allow you to define an anonymous function and call it immediately without saving a reference. This pattern comes in handy when you want to create a scope that is shielded from the rest of a program. For example:
*/

let person = function(name) {
    return {
        getName: function() {
            return name;
        }
    };

}("Nicholas"); //IIFEs

console.log(person.getName());      // "Nicholas"

/* 
No this Binding
One of the most common areas of error in JavaScript is the binding of this inside of functions. Since the value of this can change inside a single function depending on the context in which the function is called, it’s possible to mistakenly affect one object when you meant to affect another.
*/

var PageHandler = {

    id: "123456",

    init: function() {
        document.addEventListener("click", function(event) {
            this.doSomething(event.type);     // error - property doSomething doesn't exist on document
        }, false);
    },

    doSomething: function(type) {
        console.log("Handling " + type  + " for " + this.id);
    }
};

var PageHandler = {

    id: "123456",

    init: function() {
        document.addEventListener("click", (function(event) {
            this.doSomething(event.type);     // no error
        }).bind(this), false); // bind(this)
    },

    doSomething: function(type) {
        console.log("Handling " + type  + " for " + this.id);
    }
};

/*
Arrow functions have no this binding, which means the value of this inside an arrow function can only be determined by looking up the scope chain. If the arrow function is contained within a nonarrow function, this will be the same as the containing function; otherwise, this is equivalent to the value of this in the global scope. Here’s one way you could write this code using an arrow function:
*/

var PageHandler = {

    id: "123456",

    init: function() {
        document.addEventListener("click",
                event => this.doSomething(event.type), false); // user of arrow function
    },

    doSomething: function(type) {
        console.log("Handling " + type  + " for " + this.id);
    }
};

/*
Arrow Functions and Arrays
The concise syntax for arrow functions makes them ideal for use with array processing, too. For example, if you want to sort an array using a custom comparator, you’d typically write something like this:
*/

var result = values.sort(function(a, b) {
    return a - b;
});

//That’s a lot of syntax for a very simple procedure. Compare that to the more terse arrow function version:

var result = values.sort((a, b) => a - b);