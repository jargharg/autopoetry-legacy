var gUrl = "https://content.guardianapis.com/search?show-fields=body&q="
var gKey = "&api-key=2c7e590d-dde8-498a-b351-b008c42edf52"
var currentPoemData = {}

$(document).ready(function(){
	$("#newWordText").focus()
	newPoem("hello")

	// Event listeners
	$("#submitNewWord").click(function(){ // Submit button pressed
		newPoem($("#newWordText").val())
		$("#newWordText").val("")
	})
	$("#newWordText").keypress(function(e){
		if (e.which == 13) { // Enter key pressed

				newPoem($("#newWordText").val())
				$("#newWordText").val("")

		}
	})
	$("header span").click(function(){
		createPoem(currentPoemData)
	})
})


function newPoem(wordSearch){
	$.getJSON(gUrl+wordSearch+gKey, function(data){
		parseData(data, wordSearch)
	});
}

function parseData(data, title) {
	if (Number(data.response.total) > 0){
		var results = data.response.results
		var article = Math.floor(Math.random()*results.length)
		var content = results[article].fields.body
		var articleLink = results[article].webUrl

		var textContent = content.replace(/<(?:.|\n)*?>/gm, '')
		.replace( "[\u2018\u2019\u201A\u201B\u2032\u2035\u201C\u201D\u201E\u201F\u2033\u2036]", ".")
		.split(/!|\(|\)|;|:|\"|,|\.|\?|-|\u2022|\|/)

		var tidyContent = []

		textContent.forEach(function(str, ind){
			str = str.trim()
			//get rid of long sections, sentences with @, numbers too?
			if (str.length > 3 && str.length < 100 && str != "Photograph") {
				str = str.charAt(0).toUpperCase() + str.slice(1)
				tidyContent.push(str)
			}
		})

		currentPoemData = {title: title, link: articleLink, content: tidyContent}
		createPoem(currentPoemData)
	}
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
			$("<li class='poemLine' >")
			.append(
				$("<span class='poemLineText'>")
				.html(poemData.content[x])
			)
			.append(
				$("<div class='poemLineRefresh'>")
				.html("&#x27f2;")
				.click(refreshLine)
			)
		)
	})


	$("h1").text(poemData.title)
	$(".articleLink a").attr("href", poemData.link)
}

function refreshLine() {
	var newLine = currentPoemData.content[Math.floor(Math.random()*currentPoemData.content.length)]
	$(this).prev().text(newLine)
}
