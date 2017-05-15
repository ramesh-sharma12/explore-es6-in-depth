ut instead of defining a function as the constructor, class declarations allow you to define the constructor directly inside the class with the special constructor method name.

Why to Use the Class Syntax
Despite the similarities between classes and custom types, there are some important differences to keep in mind:

Class declarations, unlike function declarations, are not hoisted. Class declarations act like let declarations and so exist in the temporal dead zone until execution reaches the declaration.
All code inside of class declarations runs in strict mode automatically. There’s no way to opt-out of strict mode inside of classes.
All methods are non-enumerable. This is a significant change from custom types, where you need to use Object.defineProperty() to make a method non-enumerable.
All methods lack an internal [[Construct]] method and will throw an error if you try to call them with new.
Calling the class constructor without new throws an error.
Attempting to overwrite the class name within a class method throws an error.

class PersonClass {

    // equivalent of the PersonType constructor
    constructor(name) {
        this.name = name;
    }

    // equivalent of PersonType.prototype.sayName
    sayName() {
        console.log(this.name);
    }
}

let person = new PersonClass("Nicholas");
person.sayName();   // outputs "Nicholas"

/ direct equivalent of PersonClass
let PersonType2 = (function() {

    "use strict";

    const PersonType2 = function(name) {

        // make sure the function was called with new
        if (typeof new.target === "undefined") {
            throw new Error("Constructor must be called with new.");
        }

        this.name = name;
    }

    Object.defineProperty(PersonType2.prototype, "sayName", {
        value: function() {

            // make sure the method wasn't called with new
            if (typeof new.target !== "undefined") {
                throw new Error("Method cannot be called with new.");
            }

            console.log(this.name);
        },
        enumerable: false,
        writable: true,
        configurable: true
    });

    return PersonType2;
}());

A Basic Class Expression
Here’s the class expression equivalent of the previous PersonClass examples, followed by some code that uses it:

let PersonClass = class {

    // equivalent of the PersonType constructor
    constructor(name) {
        this.name = name;
    }

    // equivalent of PersonType.prototype.sayName
    sayName() {
        console.log(this.name);
    }
};

let person = new PersonClass("Nicholas");
person.sayName();   // outputs "Nicholas"

ECMAScript 6 continues this tradition by making classes first-class citizens as well. That allows classes to be used in a lot of different ways. For example, they can be passed into functions as arguments:

function createObject(classDef) {
    return new classDef();
}

let obj = createObject(class {

    sayHi() {
        console.log("Hi!");
    }
});

obj.sayHi();        // "Hi!"
In this example, the createObject() function is called with an anonymous class expression as an argument, creates an instance of that class with new, and returns the instance. The variable obj then stores the returned instance.

Another interesting use of class expressions is creating singletons by immediately invoking the class constructor. To do so, you must use new with a class expression and include parentheses at the end. For example:

let person = new class {

    constructor(name) {
        this.name = name;
    }

    sayName() {
        console.log(this.name);
    }

}("Nicholas");

person.sayName();       // "Nicholas"

*This pattern allows you to use the class syntax for creating singletons without leaving a class reference available for inspection.

Accessor Properties
While own properties should be created inside class constructors, classes allow you to define accessor properties on the prototype. To create a getter, use the keyword get followed by a space, followed by an identifier; to create a setter, do the same using the keyword set. For example:

class CustomHTMLElement {

    constructor(element) {
        this.element = element;
    }

    get html() {
        return this.element.innerHTML;
    }

    set html(value) {
        this.element.innerHTML = value;
    }
}

var descriptor = Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype,\
 "html");
console.log("get" in descriptor);   // true
console.log("set" in descriptor);   // true
console.log(descriptor.enumerable); // false


Classes make inheritance easier to implement by using the familiar extends keyword to specify the function from which the class should inherit. The prototypes are automatically adjusted, and you can access the base class constructor by calling the super() method. Here’s the ECMAScript 6 equivalent of the previous example:

class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }

    getArea() {
        return this.length * this.width;
    }
}

class Square extends Rectangle {
    constructor(length) {

        // same as Rectangle.call(this, length, length)
        super(length, length);
    }
}

var square = new Square(3);

console.log(square.getArea());              // 9
console.log(square instanceof Square);      // true
console.log(square instanceof Rectangle);   // true

There are a few things to keep in mind when using super():

You can only use super() in a derived class. If you try to use it in a non-derived class (a class that doesn’t use extends) or a function, it will throw an error.
You must call super() before accessing this in the constructor. Since super() is responsible for initializing this, attempting to access this before calling super() results in an error.
The only way to avoid calling super() is to return an object from the class constructor.

Shadowing Class Methods
The methods on derived classes always shadow methods of the same name on the base class. For instance, you can add getArea() to Square to redefine that functionality:

class Square extends Rectangle {
    constructor(length) {
        super(length, length);
    }

    // override and shadow Rectangle.prototype.getArea()
    getArea() {
        return this.length * this.length;
    }
}


In ECMAScript 6 class-based inheritance, the value of this is first created by the base (Array) and then modified by the derived class constructor (MyArray). The result is that this starts with all the built-in functionality of the base and correctly receives all functionality related to it.

The following example shows a class-based special array in action:

class MyArray extends Array {
    // empty
}

var colors = new MyArray();
colors[0] = "red";
console.log(colors.length);         // 1

colors.length = 0;
console.log(colors[0]);             // undefined