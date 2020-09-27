const wrap = require('../index');

// this is your original function
function yourFunction(x) {
  console.log(' - Your function was executed with x = ' + x + '. Returning ' + x + '.');
  return x;
}

// this will be executed before your function
function before(args) {
  console.log(' - Executing some code before your function. Your function was called with arguments: ' + JSON.stringify(args) + '. Returning 7.');
  return 7;
}

// this will be executed after your function
function after(beforeResult, args) {
  console.log(' - Executing some code after your function. Your function was called with arguments: ' + JSON.stringify(args) + '. Before function returned ' + beforeResult + '.');
}

// wrapped version of your function
const wrappedFunc = wrap(yourFunction, before, after);
module.exports = wrappedFunc;

const wrappedFunc2 = wrap(yourFunction, before, after, false);
const wrappedFunc3 = wrap(yourFunction, before, after, true, (args) => args[0] >= 10);

// expensive fibonacci function
function fib(x) {
  if (x <= 1) return x;
  return fib(x - 1) + fib(x - 2);
}

// performance test
const perfTest = wrap(fib, () => Date.now(), (startedAt, args) => {
  const execTime = Date.now() - startedAt;
  console.log(' - execution of ' + perfTest.name + ' with arguments ' + JSON.stringify(args) + ' took ' + execTime + ' [ms]');
});

async function test() {

  console.log('Testing wrappedFunc(21).');
  wrappedFunc(21);

  console.log('');
  console.log('Testing performance of fib(39).');
  console.log('Fibonacci result: ' + perfTest(39) + '.');

  console.log('');
  console.log('test with wrap = true');
  wrappedFunc();

  console.log('');
  console.log('test with wrap = false');
  wrappedFunc2();

  console.log('');
  console.log('test with condition args[0] >= 10, x = 0');
  wrappedFunc3(0);

  console.log('');
  console.log('test with condition args[0] >= 10, x = 15');
  wrappedFunc3(15);
}

module.exports = test();