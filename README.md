# function-wrapper
Wrap sync/async js functions with before and after processing

## Usage
Wrap any function and add code to be executed before and after.

```js
const wrap = require('@klny/function-wrapper');

const myFunction = () => console.log('my function was executed');
const before = () => console.log('executing some code before function');
const after = () => console.log('executing some code after function');

const wrappedFunc = wrap(myFunction, before, after);

wrappedFunc();
```

```sh
executing some code before function
my function was executed
executing some code after function
```

 * You have access to wrapped function arguments in before and after functions. 
 * You can use result of before function in after function.
 * Before/after functions should be sync.

## Examples
* SYNC performance wrapper:
```js
const wrap = require('@klny/function-wrapper');

function fib(n) {
  if (n <= 1) return n;
  return fib(n-1) + fib(n-2);
}

const wrappedFib = wrap(fib, (args) => Date.now(), (beforeResult, args) => {
  const duration = Date.now() - beforeResult;
  console.log('fib(' + JSON.stringify(...args) + ') took ' + duration + ' ms');
});

console.log('function name: ' + wrappedFib.name);
const syncResult = wrappedFib(39);
console.log('result of fib: ' + syncResult);
```

```sh
function name: fib
fib(39) took 628 ms
result of fib: 63245986
```

* ASYNC performance wrapper:
```js
const wrap = require('@klny/function-wrapper');

async function asyncFib(n) {
  if (n <= 1) return n;
  return await asyncFib(n-1) + await asyncFib(n-2);
}

const wrappedAsyncFib = wrap(asyncFib, () => Date.now(), (beforeResult, args) => {
  const duration = Date.now() - beforeResult;
  console.log('asyncFib(' + JSON.stringify(...args) + ') took ' + duration + ' ms');
});

console.log('function name: ' + wrappedAsyncFib.name);
const asyncResult = await wrappedAsyncFib(25);
console.log('result of fib: ' + asyncResult);
```

```sh
function name: asyncFib
asyncFib(25) took 44 ms
result of fib: 75025
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

## License

  [MIT](LICENSE)