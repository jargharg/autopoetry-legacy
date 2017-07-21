var appData = {
	gUrl: "https://content.guardianapis.com/search?show-fields=body&q=",
	gKey: "&api-key=2c7e590d-dde8-498a-b351-b008c42edf52",
	currentPoemData: {},
	$inputBox: ""
}

function PoemInput() {
	var base = this
	this.inputButton = $("#inputSubmit")
	this.inputText = $("#inputText")

	this.newWordSearch = function newWordSearch() {
		if(this.inputText.val() != "") {
			newPoem(this.inputText.val())
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

	this.firstWordSearch = function firstWordSearch() {
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

	this.events = function events(){ // event listeners
		this.inputButton.click(this.firstWordSearch.bind(this)) // Submit button pressed
		this.inputText.keypress(function(e){
			if (e.which == 13) { // Enter key pressed
				base.firstWordSearch()
			}
		})
	}

	this.events()
}

function newPoem(wordSearch){
	$("h1").text(wordSearch) // Add poem title

	$("ul").empty().append("<div class='loadingDiv'>Loading<span>.</span><span>.</span><span>.</span></div>") // Add loading animation

	APIWordSearch = wordSearch.replace(/ /g, " AND ")

	$.getJSON(appData.gUrl+APIWordSearch+appData.gKey, function(guardianData){
		if (Number(guardianData.response.total) > 0){
			parseData(guardianData, wordSearch)
		} else {
			APIWordSearch = APIWordSearch.replace(/ AND /g, " OR ")
			$.getJSON(appData.gUrl+APIWordSearch+appData.gKey, function(guardianData){
				if (Number(guardianData.response.total) > 0){
					parseData(guardianData, wordSearch)
				} else {
					$(".loadingDiv").html("No results, try again x")
				}
			})
		}
	})
}

function parseData(guardianData, title) {
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

	appData.currentPoemData = {title: title, link: articleLink, content: tidyContent}

	createPoem(appData.currentPoemData)
}

function createPoem(poemData){
	var randomArray = []
	var $poemBody = $("ul")
	$poemBody.empty()
	for(var i=0; i<10; i++) {
		randomArray.push(Math.floor(Math.random()*poemData.content.length))
	}

	randomArray.forEach(function(x){
		$poemBody.append(
			$("<li class='poemLine'>")
			.append(
				$("<span class='poemLineText'>")
				.html(poemData.content[x])
				)
			.append(
				$("<div class='poemLineRefresh'>")
				.html("<i class='material-icons md-18'>&#xE86A;</i>")
				.click(refreshLine)
				.hover(function(){
					$(this).parent().toggleClass("poemHighlight")
				})
				)
			)
	})

	$(".articleLink").attr("href", poemData.link)
}

function whatsAppPoemLink() {
	var whatsAppPre = "whatsapp://send?text="
	var whatsAppPost = "\nMake your own autopoem at jarodhargreav.es/autopoetry"
	var whatsAppText = $(".poemContainer header h1").text().toUpperCase()+"\n\n"
	var contents = $(".poemLineText")

	contents.each(function(){
		whatsAppText += this.textContent + "\n"
	})

	var whatsAppLink = whatsAppPre + encodeURI(whatsAppText + whatsAppPost)

	return whatsAppLink
}

function refreshLine() {
	var newLine = appData.currentPoemData.content[Math.floor(Math.random()*appData.currentPoemData.content.length)]
	$(this).prev().text(newLine)
}

$(document).ready(function(){
	$("#inputText").focus()

	var poemInput = new PoemInput()

	$("#wholePoemRefresh").click(function(){
		newPoem(appData.currentPoemData.title)
	}).hover(function(){
		$(".poemContainer").toggleClass("poemHighlight")
	})
	$(".shareLink i").click(function(){
		$(this).parent().attr("href", whatsAppPoemLink())
	})
	$(".topNav").click(function(e){
		$(".appDetails").toggleClass("visible")
		e.stopPropagation()
		$(document).click(function(){
			$(".appDetails").removeClass("visible")
			$("body").off()
		})
	})
})
