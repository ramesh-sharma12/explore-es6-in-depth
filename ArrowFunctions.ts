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