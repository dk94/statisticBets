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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const parseM = __webpack_require__(1);
const save= __webpack_require__(2);
const load= __webpack_require__(3);
__webpack_require__(4);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function getData() {
    if (document.querySelector('.loading')) {
        document.querySelector('.loading').innerHTML = "<img src='https://m.popkey.co/dc6bd3/Llgbv.gif'/>";
    }
    else{
         document.querySelector('.info').innerHTML = "<div class='text-center'><img style='margin:0 auto' src='https://m.popkey.co/dc6bd3/Llgbv.gif'/></div>";
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var xhttpPost = new XMLHttpRequest();
            xhttpPost.open("POST", "fixtures", true);
            xhttpPost.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhttpPost.send(this.responseText);
            xhttpPost.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    document.querySelector('.info').innerHTML = this.responseText;
                }
            }
        }
    };
    xhttp.open("GET", "scraper", true);
    xhttp.send();
}
window.getData = getData;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function saveData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
           document.querySelector('.info').innerHTML ="<h2 class='text-center'>Data is saved</h2>"
        }
    };
    xhttp.open("GET", "save", true);
    xhttp.send();
}
window.saveData = saveData;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function loadData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
           document.querySelector('.info').innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "load", true);
    xhttp.send();
}
window.loadData = loadData;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

function editItem(e) {
    console.log(e)
}
window.editItem = editItem;

/***/ })
/******/ ]);