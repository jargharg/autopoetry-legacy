var appData = {
	gUrl: "https://content.guardianapis.com/search?show-fields=body&q=",
	gKey: "&api-key=2c7e590d-dde8-498a-b351-b008c42edf52",
	currentPoemData: {},
	$inputBox: ""
}

function firstWordSearch() {
	appData.$inputBox = $("#newWordText")
	if(appData.$inputBox.val() != "") {
		$(".container").removeClass("hidden")
		$(".poemForm").removeClass("poemFormInit").addClass("poemFormBottom")
		$("#submitNewWord").off().click(newWordSearch) // Submit button pressed
		appData.$inputBox.off().keypress(function(e){
			if (e.which == 13) { // Enter key pressed
				newWordSearch()
			}
		})
		newWordSearch()
	} else {
		appData.$inputBox.focus()
	}
}

function newWordSearch() {
	if(appData.$inputBox.val() != "") {
		newPoem(appData.$inputBox.val())
		appData.$inputBox.val("")
		.removeClass("inputMobile")
		.parent().removeClass("poemFormExpanded")
		appData.$inputBox.blur()
	} else {
		appData.$inputBox
		.addClass("inputMobile")
		.focus()
		.parent().addClass("poemFormExpanded")
	}
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
	$("#newWordText").focus()

	// Event listeners
	$("#submitNewWord").click(firstWordSearch) // Submit button pressed
	$("#newWordText").keypress(function(e){
		if (e.which == 13) { // Enter key pressed
			firstWordSearch()
		}
	})
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
