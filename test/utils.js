function sleep(ms) {
  return new Promise(exec => setTimeout(exec, ms));
}

async function sleepResult(ms) {
  const start = Date.now();
  await sleep(ms);
  return Date.now() - start;
}

module.exports = {
  sleep: sleep,
  sleepResult: sleepResult
};