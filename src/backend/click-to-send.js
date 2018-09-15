
module.exports = async function clickToSend() {
  const findElement = selector => document.querySelector(selector); 

  const awaitFor = (selector) => {
    return new Promise((resolve) => {
      const hasInput = findElement('[contenteditable]');
      const popMgs = findElement('[data-animate-modal-popup]');
      const invalidMgs = popMgs ? popMgs.textContent.includes('invalid') : false;

      if (invalidMgs) {
        return resolve(false);
      } else if (hasInput) {
        return resolve(true);
      }
      setTimeout(() => {
        awaitFor(selector).then(resolve);
      }, 100);
    });
  }

  let type = 'ws-invalid';
  const valid = await awaitFor();

  if (valid) {
    type = 'ws-success';
    document.querySelectorAll('footer button')[1].click();
  }

  
  setTimeout(() => {
    window.chrome.runtime.sendMessage({ type });
    window.close();
  }, 200);
}