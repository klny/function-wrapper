/**
 * Wraps function "func" with "before" and "after" functions when "enabled".
 * @param  {Function} func    Function to be wrapped
 * @param  {Function} before  Function to be executed before wrapped function
 * @param  {Function} after   Function to be executed after wrapped function
 * @param  {Boolean}  wrap    Switch to enable/disable function wrapping on wrap-time (will return original function when false)
 * @param  {Function} cond    Condition to skip wrapper functionality on function execution-time. Has access to arguments.
 * @return {Function}         Wrapped function.
 */
function wrapper(func, before, after, wrap = true, cond = (args) => true) {
  // return original function when wrapping is disabled
  if (!wrap) return func;

  function f() {
    // skip before/after function if not enabled
    if (!cond(arguments)) return func.apply(this, arguments);

    // run before wrapped function
    const beforeResult = before(arguments);

    // call function
    const result = func.apply(this, arguments);

    // function is async and returned Promise, run after function in then()
    if (result && result.then) {
      return result.then((val) => {
        after(beforeResult, arguments);
        return val;
      });
    }

    // function is sync, run after function and return result
    after(beforeResult, arguments);
    return result;
  }

  // copy function name
  Object.defineProperty(f, "name", { value: func.name });

  return f;
}

module.exports = wrapper;