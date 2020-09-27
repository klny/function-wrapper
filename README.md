# function-wrapper
Wrap sync/async js functions with before and after processing

## Usage
Import package for example as "wrapper", or copy src/wrapper to your project.
Add functions to be executed before/after your function execution.  

Imported "wrapper" is a function:
```js
function wrapper(func, before, after, wrap = true, cond = (args) => true);
```
 * func - your function to be wrapped 
 * before - function to be executed before your function
 * after - function to be executed after your function
 * wrap - optional, boolean to control wrapping (default true - always wrap)
 * cond - optional, function to control wrapper during execution (default true - always execute wrapper's functionality)

## Examples
### Wrap any sync/async function...
```js
const wrap = require('@klny/function-wrapper');

// this is your original function
function yourFunction(x) {
  console.log(' - Your function was executed with x = ' + x + '. Returning ' + x + '.');
  return x;
}

// this will be executed before your function
function before(...args) {
  console.log(' - Executing some code before your function. Your function was called with arguments: ' + JSON.stringify(args) + '. Returning 7.');
  return 7;
}

// this will be executed after your function
function after(beforeResult, ...args) {
  console.log(' - Executing some code after your function. Your function was called with arguments: ' + JSON.stringify(args) + '. Before function returned ' + beforeResult + '.');
}

// wrapped version of your function
const wrappedFunc = wrap(yourFunction, before, after);
module.exports = wrappedFunc;

// test
console.log('Testing wrappedFunc(21).');
wrappedFunc(21);
```
```sh
Testing wrappedFunc(21).
 - Executing some code before your function. Your function was called with arguments: [{"0":21}]. Returning 7.
 - Your function was executed with x = 21. Returning 21.
 - Executing some code after your function. Your function was called with arguments: [{"0":21}]. Before function returned 7.
```

 * You have access to wrapped function arguments in before and after functions. 
 * You can use result of before function in after function.
 * Before/after functions should be sync.

### Test function performance with wrapper
```js
// expensive fibonacci function
function fib(x) {
  if (x <= 1) return x;
  return fib(x - 1) + fib(x - 2);
}

// performance test wrapper
const perfTest = wrap(fib, () => Date.now(), (startedAt, args) => {
  const execTime = Date.now() - startedAt;
  console.log(' - execution of ' + perfTest.name + ' with arguments ' + JSON.stringify(args) + ' took ' + execTime + ' [ms]');
});

console.log('Testing performance of fib(39).');
console.log('Fibonacci result: ' + perfTest(39) + '.');
```
```sh
Testing performance of fib(39).
 - execution of fib with arguments {"0":39} took 634 [ms]
Fibonacci result: 63245986.
```

 * Wrapped function has the same name as your original function. 

## Conditional wrapping
There are two optional parameters to control wrapper's functionality.  
  
###wrap [true/false]
Wrap-time condition to skip wrapping completely. Original function will be returned when false.  
Can be used to add wrapper's functionality in development environment or in debug mode only.
```js
// will wrap function only in development
module.exports = wrap(myFunction, before, after, process.env === 'development');
```

###cond [function returning true/false]
Execution-time condition.  
Skips before/after processing during function execution when false.  
Cond is a function with access to arguments. Should return boolean.
 
```js
// will execute before/after functions only if called with argument > 10
module.exports = wrap(myFunction, before, after, true, (args) => args[0] > 10);
 ```

## Installation
```bash
$ npm install @klny/function-wrapper
```
Or just copy ./src/wrapper.js to your project.

## Features

  * sync/async functions support
  * before/after processing
  * preserves function name
  * access to original function arguments in before/after functions
  * access to before function results in after function
  * wrap-time and execution-time conditions to skip wrapper's functionality

## License

  [MIT](LICENSE)