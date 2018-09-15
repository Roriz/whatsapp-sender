/* -------------------------------------------------- */
/*  Start of Webpack Chrome Hot Extension Middleware  */
/* ================================================== */
/*  This will be converted into a lodash templ., any  */
/*  external argument must be provided using it       */
/* -------------------------------------------------- */
var WebpackReloadPlugin = false;
(function (chrome, window) {
    const name = 'background';
    const id = parseInt('1');
    const wsHost = 'ws://localhost:9090/';
    const filename = 'js/background.js';
    const { runtime, tabs } = chrome;
    const logger = (msg, level = 'info') => console[level]('[ WCER: ' + msg + ' ]');
    const manifest = (runtime && runtime.getManifest) ? runtime.getManifest() : undefined;
    var path = (manifest ? manifest.name + ' | ' : '') + (name || filename);
    if (path.length > 43)
        path = path.slice(0, 20) + '...' + path.slice(-20);
    function init() {
        let timerId = null;
        let socket = null;
        try {
            socket = new WebSocket(wsHost + id.toString());
        }
        catch (err) {
            console.log(err);
        }
        let send = (type, data) => {
            if (typeof data === 'string') {
                data = (new Date()).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1") + ' - ' + path + ' | ' + data;
            }
            socket.send(JSON.stringify({ type, data }));
        };
        socket.onopen = () => {
            logger(wsHost);
            clearTimeout(timerId);
            WebpackReloadPlugin = true;
        };
        socket.onmessage = ({ data: json }) => {
            const { type, data } = JSON.parse(json);
            if (runtime.reload && type === 'restart') {
                send('restart', 'successfully restart');
                runtime.reload();
                runtime.restart();
            }
            if (type === 'reload' && id === data.id) {
                send('reloaded', 'successfully reloaded');
                window.location.reload();
            }
        };
        socket.onclose = ({ code }) => {
            logger("Socket connection closed.", 'warn');
            timerId = setTimeout(() => {
                logger('WEPR Attempting to reconnect ...');
                init();
                logger('Reconnected. Reloading plugin');
            }, 2000);
        };
        window.onbeforeunload = () => socket.close();
    }
    !WebpackReloadPlugin ? init() : logger('WebpackReloadPlugin: Socket already started !');
})(chrome, window);
/* ----------------------------------------------- */
/* End of Webpack Chrome Hot Extension Middleware  */
/* ----------------------------------------------- */ 
var background =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

eval("/* eslint-disable no-undef, no-console */\n\nconst Sender = __webpack_require__(11);\nconst ClickToSend = __webpack_require__(12);\n\n\nfunction openPage({ url, tabId }) {\n  if (url.includes('web.whatsapp.com')) {\n    chrome.tabs.executeScript(tabId, { code: `(${ClickToSend})();` });\n  }\n}\n\nconst events = {\n  'ws-start': startSender,\n  'ws-finish': finishSender,\n  'ws-success': successSender,\n};\n\nfunction onMessage(obj) {\n  if (typeof obj !== 'object' || !obj.type.includes('ws-')) { return; }\n\n  const event = events[obj.type];\n  if (event) {\n    event(obj.params);\n  } else {\n    throw new Error('mgs-not-found');\n  }\n}\n\nlet sender;\nfunction startSender(params) {\n  sender = new Sender(params);\n}\n\nfunction finishSender() {\n  console.log('finish');\n}\n\nfunction successSender() {\n  sender.feedback('success');\n}\n\nfunction onRemoved() {\n  if (!sender) { return; }\n  sender.next();\n}\n\nchrome.tabs.onRemoved.addListener(onRemoved);\nchrome.webNavigation.onCompleted.addListener(openPage);\nchrome.runtime.onMessage.addListener(onMessage);\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTAuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2VuZC9pbmRleC5qcz8xZGU5Il0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmLCBuby1jb25zb2xlICovXG5cbmNvbnN0IFNlbmRlciA9IHJlcXVpcmUoJy4vc2VuZGVyJyk7XG5jb25zdCBDbGlja1RvU2VuZCA9IHJlcXVpcmUoJy4vY2xpY2stdG8tc2VuZCcpO1xuXG5cbmZ1bmN0aW9uIG9wZW5QYWdlKHsgdXJsLCB0YWJJZCB9KSB7XG4gIGlmICh1cmwuaW5jbHVkZXMoJ3dlYi53aGF0c2FwcC5jb20nKSkge1xuICAgIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQodGFiSWQsIHsgY29kZTogYCgke0NsaWNrVG9TZW5kfSkoKTtgIH0pO1xuICB9XG59XG5cbmNvbnN0IGV2ZW50cyA9IHtcbiAgJ3dzLXN0YXJ0Jzogc3RhcnRTZW5kZXIsXG4gICd3cy1maW5pc2gnOiBmaW5pc2hTZW5kZXIsXG4gICd3cy1zdWNjZXNzJzogc3VjY2Vzc1NlbmRlcixcbn07XG5cbmZ1bmN0aW9uIG9uTWVzc2FnZShvYmopIHtcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8ICFvYmoudHlwZS5pbmNsdWRlcygnd3MtJykpIHsgcmV0dXJuOyB9XG5cbiAgY29uc3QgZXZlbnQgPSBldmVudHNbb2JqLnR5cGVdO1xuICBpZiAoZXZlbnQpIHtcbiAgICBldmVudChvYmoucGFyYW1zKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ21ncy1ub3QtZm91bmQnKTtcbiAgfVxufVxuXG5sZXQgc2VuZGVyO1xuZnVuY3Rpb24gc3RhcnRTZW5kZXIocGFyYW1zKSB7XG4gIHNlbmRlciA9IG5ldyBTZW5kZXIocGFyYW1zKTtcbn1cblxuZnVuY3Rpb24gZmluaXNoU2VuZGVyKCkge1xuICBjb25zb2xlLmxvZygnZmluaXNoJyk7XG59XG5cbmZ1bmN0aW9uIHN1Y2Nlc3NTZW5kZXIoKSB7XG4gIHNlbmRlci5mZWVkYmFjaygnc3VjY2VzcycpO1xufVxuXG5mdW5jdGlvbiBvblJlbW92ZWQoKSB7XG4gIGlmICghc2VuZGVyKSB7IHJldHVybjsgfVxuICBzZW5kZXIubmV4dCgpO1xufVxuXG5jaHJvbWUudGFicy5vblJlbW92ZWQuYWRkTGlzdGVuZXIob25SZW1vdmVkKTtcbmNocm9tZS53ZWJOYXZpZ2F0aW9uLm9uQ29tcGxldGVkLmFkZExpc3RlbmVyKG9wZW5QYWdlKTtcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihvbk1lc3NhZ2UpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFja2VuZC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///10\n");

/***/ }),

/***/ 11:
/***/ (function(module, exports) {

eval("\nconst WHATSAPP_URL = 'https://web.whatsapp.com/send';\nconst link = document.createElement('a');\nlink.target = '_blank';\n\nmodule.exports = class Sender {\n  constructor({ prefix = '', message, phones }) {\n    this.prefix = prefix;\n    this.message = message;\n    this.phones = phones;\n    this.queuePos = 0;\n    this.report = {\n      success: 0,\n      error: 0,\n      invalid: 0,\n    };\n\n    this.next();\n  }\n\n  next() {\n    const phone = this.phones[this.queuePos];\n    if (phone) {\n      this.openBrowser(`${this.prefix}${phone}`, this.message);\n      this.queuePos += 1;\n    } else {\n      this.finish();\n    }\n  }\n\n  feedback(type) {\n    this.report[type] = this.report[type] ? this.report[type] + 1 : 1;\n  }\n\n  openBrowser(phone, message) {\n    link.href = `${WHATSAPP_URL}?phone=${phone}&text=${message}`;\n    link.click();\n  }\n\n  finish() {\n    window.chrome.runtime.sendMessage({ type: 'ws-finish' });\n  }\n}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTEuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2VuZC9zZW5kZXIuanM/NjYwYyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IFdIQVRTQVBQX1VSTCA9ICdodHRwczovL3dlYi53aGF0c2FwcC5jb20vc2VuZCc7XG5jb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xubGluay50YXJnZXQgPSAnX2JsYW5rJztcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBTZW5kZXIge1xuICBjb25zdHJ1Y3Rvcih7IHByZWZpeCA9ICcnLCBtZXNzYWdlLCBwaG9uZXMgfSkge1xuICAgIHRoaXMucHJlZml4ID0gcHJlZml4O1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5waG9uZXMgPSBwaG9uZXM7XG4gICAgdGhpcy5xdWV1ZVBvcyA9IDA7XG4gICAgdGhpcy5yZXBvcnQgPSB7XG4gICAgICBzdWNjZXNzOiAwLFxuICAgICAgZXJyb3I6IDAsXG4gICAgICBpbnZhbGlkOiAwLFxuICAgIH07XG5cbiAgICB0aGlzLm5leHQoKTtcbiAgfVxuXG4gIG5leHQoKSB7XG4gICAgY29uc3QgcGhvbmUgPSB0aGlzLnBob25lc1t0aGlzLnF1ZXVlUG9zXTtcbiAgICBpZiAocGhvbmUpIHtcbiAgICAgIHRoaXMub3BlbkJyb3dzZXIoYCR7dGhpcy5wcmVmaXh9JHtwaG9uZX1gLCB0aGlzLm1lc3NhZ2UpO1xuICAgICAgdGhpcy5xdWV1ZVBvcyArPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpbmlzaCgpO1xuICAgIH1cbiAgfVxuXG4gIGZlZWRiYWNrKHR5cGUpIHtcbiAgICB0aGlzLnJlcG9ydFt0eXBlXSA9IHRoaXMucmVwb3J0W3R5cGVdID8gdGhpcy5yZXBvcnRbdHlwZV0gKyAxIDogMTtcbiAgfVxuXG4gIG9wZW5Ccm93c2VyKHBob25lLCBtZXNzYWdlKSB7XG4gICAgbGluay5ocmVmID0gYCR7V0hBVFNBUFBfVVJMfT9waG9uZT0ke3Bob25lfSZ0ZXh0PSR7bWVzc2FnZX1gO1xuICAgIGxpbmsuY2xpY2soKTtcbiAgfVxuXG4gIGZpbmlzaCgpIHtcbiAgICB3aW5kb3cuY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyB0eXBlOiAnd3MtZmluaXNoJyB9KTtcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JhY2tlbmQvc2VuZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///11\n");

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

eval("\nmodule.exports = function clickToSend() {\n  const findElement = selector => document.querySelector(selector); \n\n  const awaitFor = (selector) => {\n    return new Promise((resolve) => {\n      const hasInput = findElement('[contenteditable]');\n      const popMgs = findElement('[data-animate-modal-popup]');\n      const invalidMgs = popMgs ? popMgs.textContent.includes('invalid') : false;\n\n      if (invalidMgs) {\n        return resolve();\n      } else if (hasInput) {\n        return resolve();\n      }\n      setTimeout(() => {\n        awaitFor(selector).then(resolve);\n      }, 100);\n    });\n  }\n\n  awaitFor().then(() => {\n    document.querySelectorAll('footer button')[1].click();\n\n    window.chrome.runtime.sendMessage({ type: 'ws-success' });\n    \n    setTimeout(() => {\n      window.close();\n    }, 200);\n  });\n}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTIuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2VuZC9jbGljay10by1zZW5kLmpzP2ZmYzUiXSwic291cmNlc0NvbnRlbnQiOlsiXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNsaWNrVG9TZW5kKCkge1xuICBjb25zdCBmaW5kRWxlbWVudCA9IHNlbGVjdG9yID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpOyBcblxuICBjb25zdCBhd2FpdEZvciA9IChzZWxlY3RvcikgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY29uc3QgaGFzSW5wdXQgPSBmaW5kRWxlbWVudCgnW2NvbnRlbnRlZGl0YWJsZV0nKTtcbiAgICAgIGNvbnN0IHBvcE1ncyA9IGZpbmRFbGVtZW50KCdbZGF0YS1hbmltYXRlLW1vZGFsLXBvcHVwXScpO1xuICAgICAgY29uc3QgaW52YWxpZE1ncyA9IHBvcE1ncyA/IHBvcE1ncy50ZXh0Q29udGVudC5pbmNsdWRlcygnaW52YWxpZCcpIDogZmFsc2U7XG5cbiAgICAgIGlmIChpbnZhbGlkTWdzKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICB9IGVsc2UgaWYgKGhhc0lucHV0KSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgYXdhaXRGb3Ioc2VsZWN0b3IpLnRoZW4ocmVzb2x2ZSk7XG4gICAgICB9LCAxMDApO1xuICAgIH0pO1xuICB9XG5cbiAgYXdhaXRGb3IoKS50aGVuKCgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdmb290ZXIgYnV0dG9uJylbMV0uY2xpY2soKTtcblxuICAgIHdpbmRvdy5jaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IHR5cGU6ICd3cy1zdWNjZXNzJyB9KTtcbiAgICBcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHdpbmRvdy5jbG9zZSgpO1xuICAgIH0sIDIwMCk7XG4gIH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JhY2tlbmQvY2xpY2stdG8tc2VuZC5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///12\n");

/***/ })

/******/ });