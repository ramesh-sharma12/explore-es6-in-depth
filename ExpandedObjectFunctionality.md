//ECMAScript 6 improves objects in a number of ways, from simple syntax extensions to options for manipulating and interacting with them.

//Object Categories

/*

Ordinary objects Have all the default internal behaviors for objects in JavaScript.
Exotic objects Have internal behavior that differs from the default in some way.
Standard objects Are those defined by ECMAScript 6, such as Array, Date, and so on. Standard objects may be ordinary or exotic.
Built-in objects Are present in a JavaScript execution environment when a script begins to execute. All standard objects are built-in objects.

*/

//Property Initializer Shorthand

function createPerson(name, age) {
    return {
        name: name,
        age: age
    };
}

/*
In ECMAScript 6, you can eliminate the duplication that exists around property names and local variables by using the property initializer shorthand. When an object property name is the same as the local variable name, you can simply include the name without a colon and value. For example, createPerson() can be rewritten for ECMAScript 6 as follows:
*/

function createPerson(name, age) {
    return {
        name,
        age
    };
}

//In ECMAScript 6, computed property names are part of the object literal syntax, and they use the same square bracket notation that has been used to reference computed property names in object instances. For example:

var lastName = "last name";

var person = {
    "first name": "Nicholas",
    [lastName]: "Zakas"
};

console.log(person["first name"]);      // "Nicholas"
console.log(person[lastName]);          // "Zakas"

//New Methods

/*
//The Object.is() Method

ECMAScript 6 introduces the Object.is() method to make up for the remaining quirks of the identically equals operator. This method accepts two arguments and returns true if the values are equivalent. Two values are considered equivalent when they are of the same type and have the same value. 

*/

console.log(5 === "5");             // false
console.log(Object.is(5, 5));       // true
console.log(Object.is(5, "5"));     // false

/*
Own Property Enumeration Order
ECMAScript 5 didn’t define the enumeration order of object properties, as it left this up to the JavaScript engine vendors. However, ECMAScript 6 strictly defines the order in which own properties must be returned when they are enumerated. This affects how properties are returned using Object.getOwnPropertyNames() and Reflect.ownKeys (covered in Chapter 12). It also affects the order in which properties are processed by Object.assign().

The basic order for own property enumeration is:

All numeric keys in ascending order
All string keys in the order in which they were added to the object
All symbol keys (covered in Chapter 6) in the order in which they were added to the object

*/

