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

module.exports = Poem