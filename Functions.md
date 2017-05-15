/*
Default Parameter Values in ECMAScript 6
ECMAScript 6 makes it easier to provide default values for parameters by providing initializations that are used when the parameter isn’t formally passed. For example:
*/

function makeRequest(url, timeout = 2000, callback = function() {}) {

    // the rest of the function

}

/*
When makeRequest() is called with all three parameters, the defaults are not used. For example:
*/

// uses default timeout and callback
makeRequest("/foo");

// uses default callback
makeRequest("/foo", 500);

// doesn't use defaults
makeRequest("/foo", 500, function(body) {
    doSomething(body);
});

/*
How Default Parameter Values Affect the arguments Object
Just keep in mind that the behavior of the arguments object is different when default parameter values are present. In ECMAScript 5 nonstrict mode, the arguments object reflects changes in the named parameters of a function. Here’s some code that illustrates how this works:

*/

function mixArgs(first, second) {
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
    first = "c";
    second = "d";
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
}

mixArgs("a", "b");

/*
This outputs:

true
true
true
true
*/

/*
ECMAScript 5’s strict mode, however, eliminates this confusing aspect of the arguments object. In strict mode, the arguments object does not reflect changes to the named parameters. Here’s the mixArgs() function again, but in strict mode:
*/
function mixArgs(first, second) {
    "use strict";

    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
    first = "c";
    second = "d"
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
}

mixArgs("a", "b");

/*
The call to mixArgs() outputs:

true
true
false
false

*/

/*The arguments object in a function using ECMAScript 6 default parameter values, however, will always behave in the same manner as ECMAScript 5 strict mode, regardless of whether the function is explicitly running in strict mode. The presence of default parameter values triggers the arguments object to remain detached from the named parameters.
*/

/*
Default Parameter Expressions
Perhaps the most interesting feature of default parameter values is that the default value need not be a primitive value. You can, for example, execute a function to retrieve the default parameter value, like this:
*/

function getValue() {
    return 5;
}

function add(first, second = getValue()) {
    return first + second;
}

console.log(add(1, 1));     // 2
console.log(add(1));        // 6

/*
Rest Parameters
A rest parameter is indicated by three dots (...) preceding a named parameter. That named parameter becomes an Array containing the rest of the parameters passed to the function, which is where the name “rest” parameters originates.
 There are two restrictions on rest parameters. The first restriction is that there can be only one rest parameter, and the rest parameter must be last.

 For example, pick() can be rewritten using rest parameters, like this:
 
*/

function pick(object, ...keys) {
    let result = Object.create(null);

    for (let i = 0, len = keys.length; i < len; i++) {
        result[keys[i]] = object[keys[i]];
    }

    return result;
}

/*
Increased Capabilities of the Function Constructor
The Function constructor is an infrequently used part of JavaScript that allows you to dynamically create a new function. The arguments to the constructor are the parameters for the function and the function body, all as strings. Here’s an example:
*/

var add = new Function("first", "second", "return first + second");

console.log(add(1, 1));     // 2

var add = new Function("first", "second = first",
        "return first + second");

console.log(add(1, 1));     // 2
console.log(add(1));        // 2

// /For rest parameters, just add the ... before the last parameter, like this:

var pickFirst = new Function("...args", "return args[0]");

console.log(pickFirst(1, 2));   // 1