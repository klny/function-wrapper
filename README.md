# function-wrapper

  wrap sync/async js functions with before and after processing

## SYNC
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

## ASYNC
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

## Features

  * sync/async functions support
  * before/after processing
  * preserves function name

## License

  [MIT](LICENSE)