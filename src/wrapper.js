function wrapper(func, before, after) {
  function f() {
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