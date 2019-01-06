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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet */ \"leaflet\");\n/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\njquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#people-columns\").html(function() {\n  const people = JSON.parse(jquery__WEBPACK_IMPORTED_MODULE_0___default()( this )\n    .data(\"people\")\n    .replace(/'/g, '\"')\n    .replace(/,\\s*\\]$/, \"]\"));\n  return shuffle(people).map( person => {\n    return `<div class=\"card\">\n<img class=\"card-img-top\" src=\"${ person.img_src }\" alt=\"${ person.name }\">\n<div class=\"card-body\">\n<h3 class=\"card-title\">${ person.name }</h3>\n</div>\n</div>\n`;\n  }).join(\"\\n\");\n});\n\nfunction shuffle(a) {\n  for (let i = a.length - 1; i > 0; i--) {\n    const j = Math.floor(Math.random() * (i + 1));\n    [a[i], a[j]] = [a[j], a[i]];\n  }\n  return a;\n}\n\nfunction initMap(mapInfo) {\n  const [mapDiv, lat, lng] = mapInfo;\n  const map = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.map(mapDiv).setView([lat, lng], 17);\n  leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.tileLayer(\"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\", {\n      maxZoom: 19,\n      attribution: \"&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>\"\n  }).addTo(map);\n  leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.marker([lat, lng]).addTo(map);\n}\n\njquery__WEBPACK_IMPORTED_MODULE_0___default()(\".location\").on(\"shown.bs.collapse\", function() {\n  setTimeout(() => {\n    initMap([jquery__WEBPACK_IMPORTED_MODULE_0___default()( this ).attr(\"id\").replace(\"location\", \"map\"), jquery__WEBPACK_IMPORTED_MODULE_0___default()( this ).data(\"lat\"), jquery__WEBPACK_IMPORTED_MODULE_0___default()( this ).data(\"lng\")]);\n  }, 500);\n});\n\njquery__WEBPACK_IMPORTED_MODULE_0___default()(window).ready( () => {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#loader\").hide();\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#bwOutput\").show();\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".carousel-item\").first().addClass(\"active\");\n    // $(\".carousel\").carousel({\n    //   interval: 8000 // default: 5000\n    // });\n});\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = jQuery;\n\n//# sourceURL=webpack:///external_%22jQuery%22?");

/***/ }),

/***/ "leaflet":
/*!********************!*\
  !*** external "L" ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = L;\n\n//# sourceURL=webpack:///external_%22L%22?");

/***/ })

/******/ });