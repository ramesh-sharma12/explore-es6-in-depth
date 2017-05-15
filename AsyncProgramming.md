A promise specifies some code to be executed later (as with events and callbacks) and also explicitly indicates whether the code succeeded or failed at its job.

JavaScript engines are built on the concept of a single-threaded event loop. Single-threaded means that only one piece of code is ever executed at a time.

JavaScript engines can only execute one piece of code at a time, so they need to keep track of code that is meant to run. That code is kept in a job queue. Whenever a piece of code is ready to be executed, it is added to the job queue. When the JavaScript engine is finished executing code, the event loop executes the next job in the queue. The event loop is a process inside the JavaScript engine that monitors code execution and manages the job queue. Keep in mind that as a queue, job execution runs from the first job in the queue to the last.

When a user clicks a button or presses a key on the keyboard, an event like onclick is triggered. That event might respond to the interaction by adding a new job to the back of the job queue.

let button = document.getElementById("my-btn");
button.onclick = function(event) {
    console.log("Clicked");
};

Events work well for simple interactions, but chaining multiple separate asynchronous calls together is more complicated because you must keep track of the event target (button in the previous example) for each event. Additionally, you need to ensure all appropriate event handlers are added before the first time an event occurs.

The callback pattern is similar to the event model because the asynchronous code doesn’t execute until a later point in time. It’s different because the function to call is passed in as an argument, as shown here:

readFile("example.txt", function(err, contents) {
    if (err) {
        throw err;
    }

    console.log(contents);
});
console.log("Hi!");

Using the callback pattern, readFile() begins executing immediately and pauses when it starts reading from the disk. That means console.log("Hi!") is output immediately after readFile() is called, before console.log(contents) prints anything. When readFile() finishes, it adds a new job to the end of the job queue with the callback function and its arguments. That job is then executed upon completion of all other jobs ahead of it.

The callback pattern is more flexible than events because chaining multiple calls together is easier with callbacks. For example:

readFile("example.txt", function(err, contents) {
    if (err) {
        throw err;
    }

    writeFile("example.txt", function(err) {
        if (err) {
            throw err;
        }

        console.log("File was written!");
    });
});
