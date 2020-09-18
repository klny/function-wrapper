const wrap = require('../src/wrapper');

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
  console.log('function name: ' + wrappedFib.name);
  const syncResult = wrappedFib(39);
  console.log('result of fib: ' + syncResult);

  console.log('');

  console.log('function name: ' + wrappedAsyncFib.name);
  const asyncResult = await wrappedAsyncFib(25);
  console.log('result of fib: ' + asyncResult);
}

module.exports = test();