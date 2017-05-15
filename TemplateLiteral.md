/***
 * Template Literals
JavaScript’s strings have always had limited functionality compared to strings in other languages. For instance, until ECMAScript 6, strings lacked the methods covered so far in this chapter, and string concatenation is as simple as possible. To allow developers to solve more complex problems, ECMAScript 6’s template literals provide syntax for creating domain-specific languages (DSLs) for working with content in a safer way than the solutions available in ECMAScript 5 and earlier.
 * 
 * 
 * 
 * In reality, though, template literals are ECMAScript 6’s answer to the following features that JavaScript lacked all the way through ECMAScript 5:

Multiline strings A formal concept of multiline strings.
Basic string formatting The ability to substitute parts of the string for values contained in variables.
HTML escaping The ability to transform a string such that it is safe to insert into HTML.

 */

let message = `Hello world!`;

console.log(message);               // "Hello world!"
console.log(typeof message);        // "string"
console.log(message.length); 

let html = `
<div>
    <h1>Title</h1>
</div>`.trim();

/*
Making Substitutions
At this point, template literals may look like fancier versions of normal JavaScript strings. The real difference between the two lies in template literal substitutions. Substitutions allow you to embed any valid JavaScript expression inside a template literal and output the result as part of the string.

Substitutions are delimited by an opening ${ and a closing } that can have any JavaScript expression inside. The simplest substitutions let you embed local variables directly into a resulting string, like this:
*/

let name = "Nicholas",
    message = `Hello, ${name}.`;

console.log(message); // "Hello, Nicholas."

/*
Since all substitutions are JavaScript expressions, you can substitute more than just simple variable names. You can easily embed calculations, function calls, and more. For example:
*/

let count = 10,
    price = 0.25,
    message = `${count} items cost $${(count * price).toFixed(2)}.`;

console.log(message);   

/*
A template tag performs a transformation on the template literal and returns the final string value. This tag is specified at the start of the template, just before the first ` character, as shown here:
*/

let message = tag`Hello world`;

function tag(literals, ...substitutions) {
    // return a string
}

function passthru(literals, ...substitutions) {
    let result = "";

    // run the loop only for the substitution count
    for (let i = 0; i < substitutions.length; i++) {
        result += literals[i];
        result += substitutions[i];
    }

    // add the last literal
    result += literals[literals.length - 1];

    return result;
}

let count = 10,
    price = 0.25,
    message = passthru`${count} items cost $${(count * price).toFixed(2)}.`;

console.log(message);    // "10 items cost $2.50."