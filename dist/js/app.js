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
/***/ (function(module, exports) {

function TopNav() {
	this.topNav = $(".topNav")

	this.events = function(){
		this.topNav.click(this.infoToggle.bind(this))
	}

	this.infoToggle = function(e){
		$(".appDetails").toggleClass("visible")
		e.stopPropagation()
		$(document).click(function(){
			$(".appDetails").removeClass("visible")
			$("body").off()
		})
	}

	this.events()
}

function PoemInput() {
	var base = this
	this.inputButton = $("#inputSubmit")
	this.inputText = $("#inputText")

	this.newWordSearch = function() {
		if(this.inputText.val() != "") {
			this.poem = new Poem(this.inputText.val())
			this.inputText.val("")
			.removeClass("inputMobile")
			.parent().removeClass("poemFormExpanded")
			this.inputButton.blur()
		} else {
			this.inputText
			.addClass("inputMobile")
			.focus()
			.parent().addClass("poemFormExpanded")
		}
	}

	this.firstWordSearch = function() {
		if(this.inputText.val() != "") {
			$(".container").removeClass("hidden")
			$(".poemForm").removeClass("poemFormInit").addClass("poemFormBottom")
			this.inputButton.off().click(this.newWordSearch.bind(this)) // Submit button pressed
			this.inputText.off().keypress(function(e){
				if (e.which == 13) { // Enter key pressed
					base.newWordSearch()
				}
			})
			this.newWordSearch()
		} else {
			this.inputText.focus()
		}
	}

	this.events = function(){ // event listeners
		this.inputButton.click(this.firstWordSearch.bind(this)) // Submit button pressed
		this.inputText.keypress(function(e){
			if (e.which == 13) { // Enter key pressed
				base.firstWordSearch()
			}
		})
	}

	this.events()
	this.inputText.focus()
}

function Poem(inputPhrase) {
	var base = this
	this.inputPhrase = inputPhrase
	this.currentPoemData = {}
	this.gUrl = "https://content.guardianapis.com/search?show-fields=body&q="
	this.gKey = "&api-key=2c7e590d-dde8-498a-b351-b008c42edf52"
	this.poemBody = $(".poemBody")

	this.createPoem = function(poemData){
		var randomArray = []
		this.poemBody.empty()
		for(var i=0; i<10; i++) {
			randomArray.push(Math.floor(Math.random()*poemData.content.length))
		}

		randomArray.forEach(function(x){
			base.poemBody.append(
				$("<li class='poemLine'>")
				.append(
					$("<span class='poemLineText'>")
					.html(poemData.content[x])
					)
				.append(
					$("<div class='poemLineRefresh'>")
					.html("<i class='material-icons md-18'>&#xE86A;</i>")
					)
				)
		})

		var poemControls = new PoemControls(this.currentPoemData)
		var shareLinks = new ShareLinks()
		$(".articleLink").attr("href", poemData.link)
	}

	this.parseData = function(guardianData, title) {
		var results = guardianData.response.results
		var article = Math.floor(Math.random()*results.length)
		var content = results[article].fields.body
		var articleLink = results[article].webUrl

		var textContent = content.replace(/<(?:.|\n)*?>/gm, '')
		.replace(/\&apos/g,"'")
		.replace(/\&amp/," and ")
		.replace( /\u201C|\u201D|!|\(|\)|\[|\]|;|:|\"|\/|,|\.com|\&quot|\.|\?|–|\u2013 |\&|\u2022|\||@/g, ".")
		.split(".")

		var tidyContent = []

		textContent.forEach(function(str, ind){
			str = str.trim()
				//get rid of long sections, sentences with @, numbers too?
				if (str.length > 2 && str.length < 90 && str != "Photograph" && str != "'*") {
					str = str.charAt(0).toUpperCase() + str.slice(1)
					tidyContent.push(str)
				}
			})

		this.currentPoemData = {title: title, link: articleLink, content: tidyContent}

		this.createPoem(this.currentPoemData)
	}
	
	this.newPoem = function(wordSearch){
		$("h1").text(wordSearch) // Add poem title

		$("ul").empty().append("<div class='loadingDiv'>Loading<span>.</span><span>.</span><span>.</span></div>") // Add loading animation

		var APIWordSearch = wordSearch.replace(/ /g, " AND ")

		$.getJSON(base.gUrl+APIWordSearch+base.gKey, function(guardianData){
			if (Number(guardianData.response.total) > 0){
				base.parseData(guardianData, wordSearch)
			} else {
				APIWordSearch = APIWordSearch.replace(/ AND /g, " OR ")
				$.getJSON(base.gUrl+APIWordSearch+base.gKey, function(guardianData){
					if (Number(guardianData.response.total) > 0){
						base.parseData(guardianData, wordSearch)
					} else {
						$(".loadingDiv").html("No results, try again x")
					}
				})
			}
		})
	}

	this.newPoem(this.inputPhrase)
}

function PoemControls(poemData) {
	var base = this
	this.poemData = poemData
	this.poemEdit = $("#poemEdit")
	this.poemEditIcon = $("#poemEdit .material-icons")
	this.poemContainer = $("#poemContainer")
	this.poemLinesRefresh = $(".poemLineRefresh")
	this.wholePoemRefresh = $("#wholePoemRefresh")
	this.editModeActive = false

	this.events = function(){
		this.poemEdit.off().click(this.editMode.bind(this))
		this.poemLinesRefresh.off().click(this.refreshLine)
		this.wholePoemRefresh.off().click(this.refreshPoem.bind(this))
	}

	this.editMode = function() {
		if (this.editModeActive === true) {
			this.poemEditIcon.text("mode_edit")
			this.poemContainer.removeClass("editMode")
			this.editModeActive = false
		} else {
			this.poemEditIcon.text("done")
			this.poemContainer.addClass("editMode")
			this.editModeActive = true
		}
	}

	this.refreshLine = function() {
		var newLine = base.poemData.content[Math.floor(Math.random()*base.poemData.content.length)]
		$(this).prev().text(newLine)
	}

	this.refreshPoem = function(){
		this.editMode()
		var poem = new Poem(base.poemData.title)
	}

	this.events()
}

function ShareLinks() {
	var base = this
	this.shareLink = $(".shareLink i")

	this.events = function() {
		this.shareLink.click(this.sendWhatsAppPoem.bind(this))
	}

	this.whatsAppPoemLink = function() {
		var whatsAppPre = "whatsapp://send?text="
		var whatsAppPost = "\nMake your own autopoem at jarodhargreav.es/autopoetry"
		var whatsAppText = $("#poemTitle h1").text().toUpperCase()+"\n\n"
		var contents = $(".poemLineText")

		contents.each(function(){
			whatsAppText += this.textContent + "\n"
		})

		var whatsAppLink = whatsAppPre + encodeURI(whatsAppText + whatsAppPost)

		return whatsAppLink
	}

	this.sendWhatsAppPoem = function(){
		this.shareLink.parent().attr("href", base.whatsAppPoemLink())
	}

	this.events()
}

var topNav = new TopNav()
// !! initialise the poem here, then pass it to PoemInput?
var poemInput = new PoemInput()


/***/ })
/******/ ]);