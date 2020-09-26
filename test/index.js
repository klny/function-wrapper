const wrap = require('../index');

const myFunction = () => console.log('my function was executed');
const before = () => console.log('executing some code before function');
const after = () => console.log('executing some code after function');

const wrappedFunc = wrap(myFunction, before, after);
const wrappedFunc2 = wrap(myFunction, before, after, false);

function fib(n) {
  if (n <= 1) return n;
  return fib(n-1) + fib(n-2);
}

async function asyncFib(n) {
  if (n <= 1) return n;
  return await asyncFib(n-1) + await asyncFib(n-2);
}

const wrappedFib = wrap(fib, (args) => Date.now(), (beforeResult, args) => {
  const duration = Date.now() - beforeResult;
  console.log('fib(' + JSON.stringify(...args) + ') took ' + duration + ' ms');
});

const wrappedAsyncFib = wrap(asyncFib, () => Date.now(), (beforeResult, args) => {
  const duration = Date.now() - beforeResult;
  console.log('asyncFib(' + JSON.stringify(...args) + ') took ' + duration + ' ms');
});

async function test() {
  wrappedFunc();
  console.log();

  console.log('function name: ' + wrappedFib.name);
  const syncResult = wrappedFib(39);
  console.log('result of fib: ' + syncResult);

  console.log('');

  console.log('function name: ' + wrappedAsyncFib.name);
  const asyncResult = await wrappedAsyncFib(25);
  console.log('result of fib: ' + asyncResult);

  console.log('');
  console.log('(begin) test switch - enabled');
  wrappedFunc();
  console.log('(end) test switch - enabled');
  console.log('');
  console.log('(begin) test switch - disabled');
  wrappedFunc2();
  console.log('(end) test switch - disabled');
}

module.exports = test();