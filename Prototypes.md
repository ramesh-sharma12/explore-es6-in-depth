//More Powerful Prototypes

/*
Changing an Object’s Prototype

ECMAScript 5 did add the Object.getPrototypeOf() method for retrieving the prototype of any given object

ECMAScript 6 changes that assumption by adding the Object.setPrototypeOf() method, which allows you to change the prototype of any given object. The Object.setPrototypeOf() method accepts two arguments: the object whose prototype should change and the object that should become the first argument’s prototype. For example:

*/

let person = {
    getGreeting() {
        return "Hello";
    }
};

let dog = {
    getGreeting() {
        return "Woof";
    }
};

// prototype is person
let friend = Object.create(person);
console.log(friend.getGreeting());                      // "Hello"
console.log(Object.getPrototypeOf(friend) === person);  // true

// set prototype to dog
Object.setPrototypeOf(friend, dog);
console.log(friend.getGreeting());                      // "Woof"
console.log(Object.getPrototypeOf(friend) === dog);     // true

/*
Remembering to use Object.getPrototypeOf() and .call(this) to call a method on the prototype is a bit involved, so ECMAScript 6 introduced super. At its simplest, super is a pointer to the current object’s prototype, effectively the Object.getPrototypeOf(this) value. Knowing that, you can simplify the getGreeting() method as follows:
*/

let friend = {
    getGreeting() {
        // in the previous example, this is the same as:
        // Object.getPrototypeOf(this).getGreeting.call(this)
        return super.getGreeting() + ", hi!"; //The call to super.getGreeting() is the same as Object.getPrototypeOf(this).getGreeting.call(this) in this context.
    }
};

//A Formal Method Definition
//ECMAScript 6 formally defines a method as a function that has an internal [[HomeObject]] property containing the object to which the method belongs.

let person = {

    // method
    getGreeting() {
        return "Hello";
    }
};

// not a method
function shareGreeting() {
    return "Hi!";
}

/*
The [[HomeObject]] for getGreeting() is person by virtue of assigning the function directly to an object. The shareGreeting() function, on the other hand, has no [[HomeObject]] specified because it wasn’t assigned to an object when it was created. 
*/

let person = {
    getGreeting() {
        return "Hello";
    }
};

/*
Any reference to super uses the [[HomeObject]] to determine what to do. The first step is to call Object.getPrototypeOf() on the [[HomeObject]] to retrieve a reference to the prototype. Then, the prototype is searched for a function with the same name. Last, the this binding is set and the method is called.
*/

// prototype is person
let friend = {
    getGreeting() {
        return super.getGreeting() + ", hi!";
    }
};
Object.setPrototypeOf(friend, person);

console.log(friend.getGreeting());  // "Hello, hi!"