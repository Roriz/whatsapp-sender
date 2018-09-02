
function writeMgs() {
  const awaitInput = () => {
    return new Promise((resolve) => {
      if (document.querySelector('[contenteditable]')) {
        resolve();
      } else {
        setTimeout(() => {
          awaitInput().then(resolve);
        }, 500);
      }
    });
  }
  awaitInput().then(() => {
    document.querySelectorAll('footer button')[1].click();
  });
}

export default writeMgs;