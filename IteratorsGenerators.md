What are Iterators?
Iterators are just objects with a specific interface designed for iteration. All iterator objects have a next() method that returns a result object. The result object has two properties: value, which is the next value, and done, which is a boolean that’s true when there are no more values to return. The iterator keeps an internal pointer to a location within a collection of values and with each call to the next() method, it returns the next appropriate value.

With that in mind, creating an iterator using ECMAScript 5 is fairly straightforward:

function createIterator(items) {

    var i = 0;

    return {
        next: function() {

            var done = (i >= items.length);
            var value = !done ? items[i++] : undefined;

            return {
                done: done,
                value: value
            };

        }
    };
}

var iterator = createIterator([1, 2, 3]);

console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: 2, done: false }"
console.log(iterator.next());           // "{ value: 3, done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"

// for all further calls
console.log(iterator.next());           // "{ value: undefined, done: true }"


What Are Generators?
A generator is a function that returns an iterator. Generator functions are indicated by a star character (*) after the function keyword and use the new yield keyword. It doesn’t matter if the star is directly next to function or if there’s some whitespace between it and the * character, as in this example:

// generator
function *createIterator() {
    yield 1;
    yield 2;
    yield 3;
}

// generators are called like regular functions but return an iterator
let iterator = createIterator();

console.log(iterator.next().value);     // 1
console.log(iterator.next().value);     // 2
console.log(iterator.next().value);     // 3

he yield keyword can be used with any value or expression, so you can write generator functions that add items to iterators without just listing the items one by one. For example, here’s one way you could use yield inside a for loop:

function *createIterator(items) {
    for (let i = 0; i < items.length; i++) {
        yield items[i];
    }
}

let iterator = createIterator([1, 2, 3]);

console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: 2, done: false }"
console.log(iterator.next());           // "{ value: 3, done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"

// for all further calls
console.log(iterator.next());           // "{ value: undefined, done: true }"