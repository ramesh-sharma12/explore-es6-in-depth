Sets and Maps

A set is a list of values that cannot contain duplicates. You typically don’t access individual items in a set like you would items in an array; instead, it’s much more common to just check a set to see if a value is present. 
A map is a collection of keys that correspond to specific values. 

ECMAScript 6 adds a Set type that is an ordered list of values without duplicates. Sets allow fast access to the data they contain, adding a more efficient manner of tracking discrete values.

Creating Sets and Adding Items
Sets are created using new Set() and items are added to a set by calling the add() method. You can see how many items are in a set by checking the size property:

let set = new Set();
set.add(5);
set.add("5");

console.log(set.size);    // 2

let set = new Set(),
    key1 = {},
    key2 = {};

set.add(key1);
set.add(key2);

console.log(set.size);    // 2

If the add() method is called more than once with the same value, all calls after the first one are effectively ignored:

You can initialize a set using an array, and the Set constructor will ensure that only unique values are used. For instance:

let set = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
console.log(set.size);    // 5

You can test which values are in a set using the has() method, like this:

let set = new Set();
set.add(5);
set.add("5");

console.log(set.has(5));    // true
console.log(set.has(6));    // false

Removing Values
It’s also possible to remove values from a set. You can remove single value by using the delete() method, or you can remove all values from the set by calling the clear() method. This code shows both in action:

let set = new Set();
set.add(5);
set.add("5");

console.log(set.has(5));    // true

set.delete(5);

console.log(set.has(5));    // false
console.log(set.size);      // 1

set.clear();

console.log(set.has("5"));  // false
console.log(set.size);      // 0
After the delete() call, only 5 is gone; after the clear() method executes, set is empty.

The forEach() Method for Sets

The forEach() method is passed a callback function that accepts three arguments:

The value from the next position in the set
The same value as the first argument
The set from which the value is read
let set = new Set([1, 2]);

set.forEach(function(value, key, ownerSet) {
    console.log(key + " " + value);
    console.log(ownerSet === set);
});

//This code iterates over each item in the set and outputs the values passed to the forEach() callback function. Each time the callback function executes, key and value are the same, and ownerSet is always equal to set. This code outputs:
It’s easy to convert an array into a set because you can pass the array to the Set constructor. It’s also easy to convert a set back into an array using the spread operator. 

let set = new Set([1, 2, 3, 3, 3, 4, 5]),
    array = [...set];

console.log(array);             // [1,2,3,4,5]

This approach is useful when you already have an array and want to create an array without duplicates. For example:

function eliminateDuplicates(items) {
    return [...new Set(items)];
}

let numbers = [1, 2, 3, 3, 3, 4, 5],
    noDuplicates = eliminateDuplicates(numbers);

console.log(noDuplicates);      // [1,2,3,4,5]


---------------------------
Maps in ECMAScript 6
The ECMAScript 6 Map type is an ordered list of key-value pairs, where both the key and the value can have any type. Keys equivalence is determined by using the same approach as Set objects, so you can have both a key of 5 and a key of "5" because they are different types. This is quite different from using object properties as keys, as object properties always coerce values into strings.

You can add items to maps by calling the set() method and passing it a key and the value to associate with the key. You can later retrieve a value by passing the key to the get() method. For example:

let map = new Map();
map.set("title", "Understanding ES6");
map.set("year", 2016);

console.log(map.get("title"));      // "Understanding ES6"
console.log(map.get("year"));       // 2016

These three methods are available on both maps and sets:

has(key) - Determines if the given key exists in the map
delete(key) - Removes the key and its associated value from the map
clear() - Removes all keys and values from the map