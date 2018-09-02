/* -------------------------------------------------- */
/*  Start of Webpack Chrome Hot Extension Middleware  */
/* ================================================== */
/*  This will be converted into a lodash templ., any  */
/*  external argument must be provided using it       */
/* -------------------------------------------------- */
var WebpackReloadPlugin = false;
(function (chrome, window) {
    const name = 'devtools';
    const id = parseInt('4');
    const wsHost = 'ws://localhost:9090/';
    const filename = 'js/devtools.js';
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
var devtools =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 179);
/******/ })
/************************************************************************/
/******/ ({

/***/ 179:
/***/ (function(module, exports) {

eval("chrome.devtools.panels.create('panel', 'img/logo.png', 'pages/panel.html', function (panel) {\n  console.log('hello from callback');\n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTc5LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9kZXZ0b29scy9pbmRleC5qcz8yNjg3Il0sInNvdXJjZXNDb250ZW50IjpbImNocm9tZS5kZXZ0b29scy5wYW5lbHMuY3JlYXRlKCdwYW5lbCcsICdpbWcvbG9nby5wbmcnLCAncGFnZXMvcGFuZWwuaHRtbCcsIGZ1bmN0aW9uIChwYW5lbCkge1xuICBjb25zb2xlLmxvZygnaGVsbG8gZnJvbSBjYWxsYmFjaycpXG59KVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9kZXZ0b29scy9pbmRleC5qcyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///179\n");

/***/ })

/******/ });