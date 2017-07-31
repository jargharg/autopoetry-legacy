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

"use strict";


var _TopNav = __webpack_require__(1);

var _TopNav2 = _interopRequireDefault(_TopNav);

var _Poem = __webpack_require__(2);

var _Poem2 = _interopRequireDefault(_Poem);

var _PoemInput = __webpack_require__(5);

var _PoemInput2 = _interopRequireDefault(_PoemInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var topNav = new _TopNav2.default(); // import $ from "jquery"

var poem = new _Poem2.default();
var poemInput = new _PoemInput2.default(poem);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TopNav = function () {
	function TopNav() {
		_classCallCheck(this, TopNav);

		this.topNav = $(".topNav");
		this.events();
	}

	_createClass(TopNav, [{
		key: "events",
		value: function events() {
			this.topNav.click(this.infoToggle.bind(this));
		}
	}, {
		key: "infoToggle",
		value: function infoToggle(e) {
			$(".appDetails").toggleClass("visible");
			e.stopPropagation();
			$(document).click(function () {
				$(".appDetails").removeClass("visible");
				$(document).off();
			});
		}
	}]);

	return TopNav;
}();

exports.default = TopNav;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ShareLinks = __webpack_require__(3);

var _ShareLinks2 = _interopRequireDefault(_ShareLinks);

var _PoemControls = __webpack_require__(4);

var _PoemControls2 = _interopRequireDefault(_PoemControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Poem = function () {
	function Poem() {
		_classCallCheck(this, Poem);

		this.currentPoemData = {};
		this.gUrl = "https://content.guardianapis.com/search?show-fields=body&q=";
		this.gKey = "&api-key=2c7e590d-dde8-498a-b351-b008c42edf52";
		this.poemBody = $(".poemBody");
		this.poemControls = new _PoemControls2.default(this);
		this.shareLinks = new _ShareLinks2.default();
	}

	_createClass(Poem, [{
		key: "createPoem",
		value: function createPoem(poemData) {
			var _this = this;

			var randomArray = [];
			this.poemBody.empty();
			for (var i = 0; i < 10; i++) {
				randomArray.push(Math.floor(Math.random() * poemData.content.length));
			}

			randomArray.forEach(function (x) {
				_this.poemBody.append($("<li class='poemLine'>").append($("<span class='poemLineText'>").html(poemData.content[x])).append($("<div class='poemLineRefresh'>").html("<i class='material-icons md-18'>&#xE86A;</i>")));
			});

			this.poemControls.newPoem(poemData);
			this.shareLinks.newPoem();
			$(".articleLink").attr("href", poemData.link);
		}
	}, {
		key: "parseData",
		value: function parseData(guardianData, title) {
			var results = guardianData.response.results;
			var article = Math.floor(Math.random() * results.length);
			var content = results[article].fields.body;
			var articleLink = results[article].webUrl;

			var textContent = content.replace(/\<br\>/g, ".").replace(/<(?:.|\n)*?>/gm, '').replace(/\&apos/g, "'").replace(/\&amp/g, " and ").replace(/\u201C|\u201D|!|\(|\)|\[|\]|;|:|\"|\/|,|\.com|\&quot|\.|\?|–|\u2013 |\&|\u2022|\||@/g, ".").split(".");

			var tidyContent = textContent.map(function (str) {
				var strTrim = str.trim();
				if (strTrim.length > 2 && strTrim.length < 90 && strTrim != "Photograph" && strTrim != "'*") {
					var strCap = strTrim.charAt(0).toUpperCase() + strTrim.slice(1);
					return strCap;
				}
			}).filter(function (str) {
				return str;
			});

			this.currentPoemData = { title: title, link: articleLink, content: tidyContent };

			this.createPoem(this.currentPoemData);
		}
	}, {
		key: "newPoem",
		value: function newPoem(wordSearch) {
			var that = this;
			$("h1").text(wordSearch); // Add poem title

			$("ul").empty().append("<div class='loadingDiv'>Loading<span>.</span><span>.</span><span>.</span></div>"); // Add loading animation

			wordSearch = wordSearch.replace(/\?/g, "");

			var APIWordSearch = wordSearch.replace(/ /g, " AND ");

			$.getJSON(that.gUrl + APIWordSearch + that.gKey, function (guardianData) {
				if (Number(guardianData.response.total) > 0) {
					that.parseData(guardianData, wordSearch);
				} else {
					APIWordSearch = APIWordSearch.replace(/ AND /g, " OR ");
					$.getJSON(that.gUrl + APIWordSearch + that.gKey, function (guardianData) {
						if (Number(guardianData.response.total) > 0) {
							that.parseData(guardianData, wordSearch);
						} else {
							$(".loadingDiv").html("No results, try again x");
						}
					});
				}
			});
		}
	}]);

	return Poem;
}();

exports.default = Poem;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShareLinks = function () {
	function ShareLinks() {
		_classCallCheck(this, ShareLinks);

		this.shareLink = $(".shareLink i");
		this.poemContents = {};
		this.poemTitle = {};
		this.events();
	}

	_createClass(ShareLinks, [{
		key: "events",
		value: function events() {
			this.shareLink.click(this.sendWhatsAppPoem.bind(this));
		}
	}, {
		key: "newPoem",
		value: function newPoem() {
			this.poemContents = $(".poemLineText");
			this.poemTitle = $("#poemTitle h1").text().toUpperCase();
		}
	}, {
		key: "whatsAppPoemLink",
		value: function whatsAppPoemLink() {
			var whatsAppPre = "whatsapp://send?text=";
			var whatsAppPost = "\nMake your own autopoem at jarodhargreav.es/autopoetry";
			var whatsAppText = this.poemTitle + "\n\n";

			this.poemContents.each(function () {
				whatsAppText += this.textContent + "\n";
			});

			var whatsAppLink = whatsAppPre + encodeURI(whatsAppText + whatsAppPost);

			return whatsAppLink;
		}
	}, {
		key: "sendWhatsAppPoem",
		value: function sendWhatsAppPoem() {
			var that = this;
			this.shareLink.parent().attr("href", that.whatsAppPoemLink());
		}
	}]);

	return ShareLinks;
}();

exports.default = ShareLinks;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PoemControls = function () {
	function PoemControls(poem) {
		_classCallCheck(this, PoemControls);

		this.poem = poem;
		this.poemData = {};
		this.poemEdit = $("#poemEdit");
		this.poemEditIcon = $("#poemEdit .material-icons");
		this.poemContainer = $("#poemContainer");
		this.poemLinesRefresh = $();
		this.wholePoemRefresh = $("#wholePoemRefresh");
		this.editModeActive = false;
		this.events();
	}

	_createClass(PoemControls, [{
		key: "events",
		value: function events() {
			this.poemEdit.click(this.editMode.bind(this));
			this.wholePoemRefresh.click(this.refreshPoem.bind(this));
		}
	}, {
		key: "newPoem",
		value: function newPoem(data) {
			var that = this;
			this.poemData = data;
			this.poemLinesRefresh = $(".poemLineRefresh");
			this.poemLinesRefresh.off().click(function () {
				that.refreshLine(this);
			});
		}
	}, {
		key: "editMode",
		value: function editMode() {
			if (this.editModeActive === true) {
				this.poemEditIcon.text("mode_edit");
				this.poemContainer.removeClass("editMode");
				this.editModeActive = false;
			} else {
				this.poemEditIcon.text("done");
				this.poemContainer.addClass("editMode");
				this.editModeActive = true;
			}
		}
	}, {
		key: "refreshLine",
		value: function refreshLine(refreshIcon) {
			var newLine = this.poemData.content[Math.floor(Math.random() * this.poemData.content.length)];
			$(refreshIcon).prev().text(newLine);
		}
	}, {
		key: "refreshPoem",
		value: function refreshPoem() {
			this.editMode();
			this.poem.newPoem(this.poemData.title);
		}
	}]);

	return PoemControls;
}();

exports.default = PoemControls;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PoemInput = function () {
	function PoemInput(poem) {
		_classCallCheck(this, PoemInput);

		this.poem = poem;
		this.inputButton = $("#inputSubmit");
		this.inputText = $("#inputText");
		this.events(this.firstWordSearch);
		this.inputText.focus();
	}

	_createClass(PoemInput, [{
		key: "events",
		value: function events(func) {
			var _this = this;

			this.inputButton.off().click(func.bind(this)); // Submit button pressed
			this.inputText.off().keypress(function (e) {
				if (e.which == 13) func.call(_this);
			}); // Enter key pressed
		}
	}, {
		key: "newWordSearch",
		value: function newWordSearch() {
			if (this.inputText.val() != "") {
				this.poem.newPoem(this.inputText.val());
				this.inputText.val("").removeClass("inputMobile").parent().removeClass("poemFormExpanded");
				this.inputButton.blur();
				$(".editMode").removeClass("editMode");
				$("#poemEdit .material-icons").text("mode_edit");
			} else {
				this.inputText.addClass("inputMobile").focus().parent().addClass("poemFormExpanded");
			}
		}
	}, {
		key: "firstWordSearch",
		value: function firstWordSearch() {
			if (this.inputText.val() != "") {
				$(".container").removeClass("hidden");
				$(".topNav").removeClass("hidden");
				$(".appNameInit").addClass("hidden");
				$(".poemForm").removeClass("poemFormInit").addClass("poemFormBottom");
				this.events(this.newWordSearch);
				this.newWordSearch();
			} else {
				this.inputText.focus();
			}
		}
	}]);

	return PoemInput;
}();

exports.default = PoemInput;

/***/ })
/******/ ]);