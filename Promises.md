The Promise Lifecycle
Each promise goes through a short lifecycle starting in the pending state, which indicates that the asynchronous operation hasn’t completed yet. A pending promise is considered unsettled. The promise in the last example is in the pending state as soon as the readFile() function returns it. Once the asynchronous operation completes, the promise is considered settled and enters one of two possible states:

Fulfilled: The promise’s asynchronous operation has completed successfully.
Rejected: The promise’s asynchronous operation didn’t complete successfully due to either an error or some other cause.
An internal [[PromiseState]] property is set to "pending", "fulfilled", or "rejected" to reflect the promise’s state. This property isn’t exposed on promise objects, so you can’t determine which state the promise is in programmatically. But you can take a specific action when a promise changes state by using the then() method.

The then() method is present on all promises and takes two arguments. The first argument is a function to call when the promise is fulfilled. Any additional data related to the asynchronous operation is passed to this fulfillment function. The second argument is a function to call when the promise is rejected. Similar to the fulfillment function, the rejection function is passed any additional data related to the rejection.


Both arguments to then() are optional, so you can listen for any combination of fulfillment and rejection. For example, consider this set of then() calls:

let promise = readFile("example.txt");

promise.then(function(contents) {
    // fulfillment
    console.log(contents);
}, function(err) {
    // rejection
    console.error(err.message);
});

promise.then(function(contents) {
    // fulfillment
    console.log(contents);
});

promise.then(null, function(err) {
    // rejection
    console.error(err.message);
});

Promises also have a catch() method that behaves the same as then() when only a rejection handler is passed. For example, the following catch() and then() calls are functionally equivalent:

promise.catch(function(err) {
    // rejection
    console.error(err.message);
});

// is the same as:

promise.then(null, function(err) {
    // rejection
    console.error(err.message);
});


Creating Unsettled Promises

ew promises are created using the Promise constructor. This constructor accepts a single argument: a function called the executor, which contains the code to initialize the promise. The executor is passed two functions named resolve() and reject() as arguments. 

// Node.js example

let fs = require("fs");

function readFile(filename) {
    return new Promise(function(resolve, reject) {

        // trigger the asynchronous operation
        fs.readFile(filename, { encoding: "utf8" }, function(err, contents) {

            // check for errors
            if (err) {
                reject(err);
                return;
            }

            // the read succeeded
            resolve(contents);

        });
    });
}

let promise = readFile("example.txt");

// listen for both fulfillment and rejection
promise.then(function(contents) {
    // fulfillment
    console.log(contents);
}, function(err) {
    // rejection
    console.error(err.message);
});


Chaining Promises
To this point, promises may seem like little more than an incremental improvement over using some combination of a callback and the setTimeout() function, but there is much more to promises than meets the eye. More specifically, there are a number of ways to chain promises together to accomplish more complex asynchronous behavior.

Each call to then() or catch() actually creates and returns another promise. This second promise is resolved only once the first has been fulfilled or rejected. Consider this example:

let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});

p1.then(function(value) {
    console.log(value);
}).then(function() {
    console.log("Finished");
});
The code outputs:

42
Finished


Catching Errors
Promise chaining allows you to catch errors that may occur in a fulfillment or rejection handler from a previous promise. For example:

let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});

p1.then(function(value) {
    throw new Error("Boom!");
}).catch(function(error) {
    console.log(error.message);     // "Boom!"
});


The Promise.race() Method
The Promise.race() method provides a slightly different take on monitoring multiple promises. This method also accepts an iterable of promises to monitor and returns a promise, but the returned promise is settled as soon as the first promise is settled. Instead of waiting for all promises to be fulfilled like the Promise.all() method, the Promise.race() method returns an appropriate promise as soon as any promise in the array is fulfilled. For example:

let p1 = Promise.resolve(42);

let p2 = new Promise(function(resolve, reject) {
    resolve(43);
});

let p3 = new Promise(function(resolve, reject) {
    resolve(44);
});

let p4 = Promise.race([p1, p2, p3]);

p4.then(function(value) {
    console.log(value);     // 42
});

Inheriting from Promises
Just like other built-in types, you can use a promise as the base for a derived class. This allows you to define your own variation of promises to extend what built-in promises can do. Suppose, for instance, you’d like to create a promise that can use methods named success() and failure() in addition to the usual then() and catch() methods. You could create that promise type as follows:

class MyPromise extends Promise {

    // use default constructor

    success(resolve, reject) {
        return this.then(resolve, reject);
    }

    failure(reject) {
        return this.catch(reject);
    }

}

let promise = new MyPromise(function(resolve, reject) {
    resolve(42);
});

promise.success(function(value) {
    console.log(value);             // 42
}).failure(function(value) {
    console.log(value);
});

Since static methods are inherited, the MyPromise.resolve() method, the MyPromise.reject() method, the MyPromise.race() method, and the MyPromise.all() method are also present on derived promises. The last two methods behave the same as the built-in methods, but the first two are slightly different.