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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.youtubePage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dataService = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var youtubePage = exports.youtubePage = function () {
	function youtubePage() {
		_classCallCheck(this, youtubePage);

		this.currentPage = 1;
		this.items = [];
	}

	_createClass(youtubePage, [{
		key: 'createPage',
		value: function createPage() {
			var logo = '<img class="logo" src="./img/YouTube-logo-full_color.png">';
			var searchIcon = '<a href="#" class="search-icon"><img src="./img/icon-search.png"></a>';
			var form = '<form><input type="text" autofocus>' + searchIcon + '</form>';
			var searchContainer = '<div class="search-container">' + logo + form + '</div>';
			var itemsContainer = '<div class="items-container"></div>';
			var paginationContainer = '<div class="pagination-container"><span class="arrow"><</span><span class="current-page">' + this.currentPage + '</span><span class="arrow">></span></div>';
			var body = document.body;

			body.innerHTML = '' + searchContainer + itemsContainer + paginationContainer;
		}
	}, {
		key: 'showVideos',
		value: function showVideos() {
			var _this = this;

			var tempContent = '';
			var items = this.items[this.currentPage - 1];

			items.forEach(function (item) {
				_this.fillVideoWithViews(item).then(function () {
					var videoBlock = '\n\t\t\t\t\t\t<div class="video-container">\n\t\t\t\t\t\t\t<a target="_blank" href=https://www.youtube.com/watch?v=' + item.id.videoId + '><img src=' + item.snippet.thumbnails.medium.url + '></a>\n\t\t\t\t\t\t\t<h3><a target="_blank" href=https://www.youtube.com/watch?v=' + item.id.videoId + '>' + item.snippet.title + '</a></h3>\n\t\t\t\t\t\t\t<h4><a target="_blank" href=https://www.youtube.com/channel/' + item.snippet.channelId + '>' + item.snippet.channelTitle + '</a></h4>\n\t\t\t\t\t\t\t<div class="date-and-views">\n\t\t\t\t\t\t\t\t<h5>' + item.snippet.publishedAt.substr(0, 10) + '</h5>\n\t\t\t\t\t\t\t\t<h6><img src="./img/eye-icon.png">' + item.views + '</h6>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t';

					tempContent += videoBlock;
					_this.stylizeContentAfterResponse(tempContent);
				});
			});
		}
	}, {
		key: 'fillVideoWithViews',
		value: function fillVideoWithViews(item) {
			if (!item.views) {
				return _dataService.dataService.getViewsCount(item.id.videoId).then(function (views) {
					return item.views = views;
				});
			} else {
				return Promise.resolve();
			}
		}
	}, {
		key: 'parseResponse',
		value: function parseResponse(items) {
			var tempArr = [];

			for (var i = 0; i < items.length; i++) {
				tempArr.push(items[i]);

				if (tempArr.length === 3) {
					this.items.push(tempArr);
					tempArr = [];
				}
			}

			this.showVideos();
		}
	}, {
		key: 'stylizeContentAfterResponse',
		value: function stylizeContentAfterResponse(tempContent) {
			var searchContainer = document.querySelector('.search-container');
			var itemsContainer = document.querySelector('.items-container');
			var paginationContainer = document.querySelector('.pagination-container');
			var logo = document.querySelector('.logo');
			var form = document.querySelector('form');

			searchContainer.classList.add('search-container-response');
			logo.classList.add('logo-response');
			form.classList.add('form-response');
			itemsContainer.innerHTML = tempContent;
			itemsContainer.classList.add('items-container-reponse');
			paginationContainer.classList.add('pagination-container-visible');
		}
	}, {
		key: 'setFormSubmit',
		value: function setFormSubmit() {
			var _this2 = this;

			var searchButton = document.querySelector('.search-icon');
			var inputElem = document.querySelector('input');
			var form = document.querySelector('form');
			var getDataHandler = function getDataHandler(event) {
				event.preventDefault();

				var newInputValue = inputElem.value;

				if (_this2.oldInputValue !== newInputValue) {
					_this2.oldInputValue = newInputValue;

					_dataService.dataService.getItems(newInputValue).then(function (items) {
						_this2.items = [];
						_this2.parseResponse(items);
					});
				}
			};

			searchButton.onclick = getDataHandler;
			form.onsubmit = getDataHandler;
		}
	}, {
		key: 'initPage',
		value: function initPage() {
			this.createPage();
			this.setFormSubmit();
			this.setPaginationClicks();
			this.setSwipePagination();
			this.setMousePagination();
		}
	}, {
		key: 'setPaginationClicks',
		value: function setPaginationClicks() {
			var _this3 = this;

			var pagination = document.querySelector('.pagination-container');

			pagination.onclick = function (event) {
				var clickedPage = event.target.innerHTML;

				if (clickedPage === '&gt;') {
					// > symbol
					_this3.getNextPage();
				} else if (clickedPage === '&lt;') {
					// < symbol
					_this3.getPrevPage();
				}

				_this3.updatePaginationOnPage();
			};
		}
	}, {
		key: 'getNextPage',
		value: function getNextPage() {
			var _this4 = this;

			var items = void 0;

			this.currentPage++;

			if (this.currentPage % 5 === 0) {
				_dataService.dataService.getNextPageItems().then(function (items) {
					return _this4.parseResponse(items);
				});
			} else {
				this.showVideos();
			}
		}
	}, {
		key: 'getPrevPage',
		value: function getPrevPage() {
			if (this.currentPage !== 1) {
				this.currentPage--;
				this.showVideos();
			}
		}
	}, {
		key: 'updatePaginationOnPage',
		value: function updatePaginationOnPage() {
			var currentPaginationNumber = document.querySelector('.current-page');

			currentPaginationNumber.innerHTML = this.currentPage;
		}
	}, {
		key: 'setSwipePagination',
		value: function setSwipePagination() {
			var _this5 = this;

			var oldXcoordinate = void 0;
			var isTouch = false;

			document.addEventListener('touchstart', function (event) {
				return oldXcoordinate = event.changedTouches[0].clientX;
			});

			document.addEventListener('touchmove', function () {
				return isTouch = true;
			});

			document.addEventListener('touchend', function (event) {
				var newXCoordinate = event.changedTouches[0].clientX;

				if (_this5.items.length && isTouch && newXCoordinate < oldXcoordinate) {
					_this5.getNextPage();
					_this5.updatePaginationOnPage();
				} else if (_this5.items.length && isTouch && newXCoordinate > oldXcoordinate) {
					_this5.getPrevPage();
					_this5.updatePaginationOnPage();
				}

				isTouch = false;
				oldXcoordinate = newXCoordinate;
			});
		}
	}, {
		key: 'setMousePagination',
		value: function setMousePagination() {
			var _this6 = this;

			var oldXcoordinate = void 0;

			document.addEventListener('mousedown', function (event) {
				return oldXcoordinate = event.clientX;
			});

			document.addEventListener('mouseup', function (event) {
				var newXCoordinate = event.clientX;

				if (_this6.items.length && newXCoordinate < oldXcoordinate) {
					_this6.getNextPage();
					_this6.updatePaginationOnPage();
				} else if (_this6.items.length && newXCoordinate > oldXcoordinate) {
					_this6.getPrevPage();
					_this6.updatePaginationOnPage();
				}

				oldXcoordinate = newXCoordinate;
			});
		}
	}]);

	return youtubePage;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "body {\n\tfont-family: Arial;\n}\n\na {\n\ttext-decoration: none;\n\tcolor: black;\n\ttransition: all 0.2s linear;\n}\n\na:hover {\n\tcolor: red;\n}\n\n.logo {\n\tdisplay: block;\n\tmargin: auto;\n\tmargin-bottom: 30px;\n    max-width: 100%;\n}\n\n.search-container {\n\ttext-align: center;\n\tmargin-top: 100px;\n}\n\n.items-container {\n\tdisplay: flex;\n    justify-content: space-around;\n    flex-flow: row wrap;\n    opacity: 0;\n    transition: opacity 0.4s linear;\n    margin-top: 45px;\n}\n\n.items-container .video-container {\n    display: inline-block;\n    vertical-align: top;\n    box-sizing: border-box;\n    padding-top: 60px;\n    flex-basis: 33%;\n    text-align: center;\n    transition: all 0.4s linear;\n    min-width: 0;\n}\n\n.items-container .video-container:hover {\n\tbox-shadow: inset 0 0 14px rgba(175, 29, 29, 0.67);\n    border-radius: 5px;\n}\n\n.video-container img {\n    max-width: 100%;\n}\n\n.items-container h3,\n.items-container h4 {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    display: inline-block;\n    max-width: 315px;\n    margin-left: -5px;\n    width: 100%;\n    text-align: left;\t\n}\n\n.items-container h3 {\n\tmargin-bottom: 22px;\n    margin-top: 33px;\n}\n\n.items-container h4 {\n    font-weight: 300;\n    font-size: 18px;\n    margin-top: 0;\n    margin-bottom: 17px;\n}\n\n.date-and-views {\n    max-width: 310px;\n    display: inline-block;\n    width: 100%;\n    margin-left: -10px;\n}   \n\n.items-container h5 {\n\tmargin-top: 0;\n\tfont-weight: 300;\n    font-size: 15px;\n    color: #909e9e;\n    float: left;\n}\n\n.items-container h6 {\n    float: right;\n    margin: 0;\n    font-weight: 300;\n    font-size: 15px;\n    color: #909e9e;\n    position: relative;\n}\n\n.items-container h6 img {\n    width: 33px;\n    position: absolute;\n    left: -30px;\n    top: -4px;\n}\n    \ninput {\n\twidth: 300px;\n    height: 25px;\n    font-size: 20px;\n    border-radius: 5px;\n    border-style: groove;\n    padding-left: 10px;\n    padding-right: 33px;\n    outline: none;\n}\n\n.search-icon {\n    position: absolute;\n    left: 320px;\n    top: 5px;\n}\n\n.search-icon img {\n\twidth: 15px;\n}\n\nform {\n\tdisplay: inline-block;\n\tposition: relative;\n    max-width: 100%;\n}\n\n.search-container-response {\n    margin-top: 20px;\n    text-align: left;\n}\n\n.logo-response {\n    display: inline-block;\n    width: 100px;\n    margin: 0px 14px;\n}\n\n.form-response {\n\tvertical-align: top;\n    margin-top: 6px;\n}\n\n.items-container-reponse {\n\topacity: 1;\n}\n\n.pagination-container {\n    text-align: center;\n    margin-top: 56px;\n    display: none;\n}\n\n.pagination-container-visible {\n    display: block;\n}\n\n.pagination-container .arrow {\n    display: inline-block;\n    width: 26px;\n    font-weight: 700;\n}\n\n.pagination-container .arrow:hover {\n    cursor: pointer;\n    box-shadow: 0 0 3px red;\n    border-radius: 50%;\n    font-size: 23px;\n    width: 27px;\n}\n\n.current-page {\n    border-radius: 50%;\n    width: 28px;\n    display: inline-block;\n    background: #ff2823;\n    font-weight: 900;\n    margin-left: 15px;\n    margin-right: 15px;\n    color: #fff;\n}\n\n@media screen and (max-width: 768px) {\n    .items-container {\n        align-items: center;\n        flex-direction: column;\n        margin-top: 0;\n    }\n\n    .items-container .video-container {\n        max-width: 320px;\n        padding-top: 0;\n    }\n\n    .items-container h3 {\n        margin-bottom: 5px;\n        margin-top: 0;\n    }\n\n    .items-container h4 {\n        margin-bottom: 10px;\n    }\n\n    .pagination-container {\n        margin-top: 0;\n    }\n}", ""]);

// exports


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var apiKey = 'AIzaSyC8HcO5nMmOjyHCDVpCKhFuTVdSkCL5-y8';

var dataService = exports.dataService = {
	savePageTokens: function savePageTokens(response) {
		this.nextPageToken = response.nextPageToken;
		this.prevPageToken = response.prevPageToken;
	},
	getItems: function getItems(inputString) {
		var _this = this;

		var url = 'https://www.googleapis.com/youtube/v3/search?key=' + apiKey + '&type=video&part=snippet&maxResults=15&q=' + inputString;

		return fetch(url).then(function (response) {
			return response.json();
		}).then(function (response) {
			_this.savePageTokens(response);
			_this.url = url;

			return response.items;
		});
	},
	getViewsCount: function getViewsCount(item) {
		var url = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + item + '&key=' + apiKey;

		return fetch(url).then(function (response) {
			return response.json();
		}).then(function (response) {
			return response.items[0].statistics.viewCount;
		});
	},
	getNextPageItems: function getNextPageItems() {
		var _this2 = this;

		return fetch(this.url + '&pageToken=' + this.nextPageToken).then(function (response) {
			return response.json();
		}).then(function (response) {
			_this2.savePageTokens(response);
			return response.items;
		});
	}
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _youtubePage = __webpack_require__(0);

__webpack_require__(1);

var pageInstance = new _youtubePage.youtubePage();

pageInstance.initPage();

/***/ })
/******/ ]);