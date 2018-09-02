
const awaitFor = (element) => {
  return new Promise((resolve) => {
    if (document.querySelector(element)) {
      resolve();
    } else {
      resolve();
    }
  });
}

export default awaitFor;