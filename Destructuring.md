
// ECMAScript 6 simplifies this task by adding destructuring, which is the process of breaking a data structure down into smaller parts. 
//That’s why ECMAScript 6 adds destructuring for both objects and arrays. When you break a data structure into smaller parts, getting the information you need out of it becomes much easier.

/*
Object Destructuring
Object destructuring syntax uses an object literal on the left side of an assignment operation. For example:
*/

let node = {
        type: "Identifier",
        name: "foo"
    };

let { type, name } = node;

console.log(type);      // "Identifier"
console.log(name);      // "foo"

//The object destructuring examples so far have used variable declarations. However, it’s also possible to use destructuring in assignments. For instance, you may decide to change the values of variables after they are defined, as follows:

let node = {
        type: "Identifier",
        name: "foo"
    },
    type = "Literal",
    name = 5;

// assign different values using destructuring
({ type, name } = node);

console.log(type);      // "Identifier"
console.log(name);      // "foo"

/*
When you use a destructuring assignment statement, if you specify a local variable with a property name that doesn’t exist on the object, then that local variable is assigned a value of undefined. For example:
*/

let node = {
        type: "Identifier",
        name: "foo"
    };

let { type, name, value=true } = node;  // value will have default value of true

console.log(type);      // "Identifier"
console.log(name);      // "foo"
console.log(value);     // undefined / true (if provided)

//ECMAScript 6 has an extended syntax that allows you to assign to a local variable with a different name, and that syntax looks like the object literal nonshorthand property initializer syntax. Here’s an example:

let node = {
        type: "Identifier",
        name: "foo"
    };

let { type: localType, name: localName = "bar" } = node; // You can add default values when using a different variable name, as well.

console.log(localType);     // "Identifier"
console.log(localName);     // "foo"

/*
Array Destructuring
Array destructuring syntax is very similar to object destructuring; it just uses array literal syntax instead of object literal syntax. The destructuring operates on positions within an array, rather than the named properties that are available in objects. For example:
*/

let colors = [ "red", "green", "blue" ];

let [ firstColor, secondColor ] = colors;

console.log(firstColor);        // "red"
console.log(secondColor);       // "green"

let [ , , thirdColor ] = colors; // The commas preceding thirdColor in the pattern are placeholders for the array items that come before it.
console.log(thirdColor);        // "blue"