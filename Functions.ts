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