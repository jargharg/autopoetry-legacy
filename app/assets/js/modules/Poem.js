import ShareLinks from "./ShareLinks"
import PoemControls from "./PoemControls"

class Poem {
	constructor(inputPhrase){
		this.inputPhrase = inputPhrase
		this.currentPoemData = {}
		this.gUrl = "https://content.guardianapis.com/search?show-fields=body&q="
		this.gKey = "&api-key=2c7e590d-dde8-498a-b351-b008c42edf52"
		this.poemBody = $(".poemBody")
		this.newPoem(this.inputPhrase)
	}

	createPoem(poemData){
		var that = this
		var randomArray = []
		this.poemBody.empty()
		for(var i=0; i<10; i++) {
			randomArray.push(Math.floor(Math.random()*poemData.content.length))
		}

		randomArray.forEach(function(x){
			that.poemBody.append(
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

	parseData(guardianData, title) {
		var results = guardianData.response.results
		var article = Math.floor(Math.random()*results.length)
		var content = results[article].fields.body
		var articleLink = results[article].webUrl

		var textContent = content.replace(/<(?:.|\n)*?>/gm, '')
		.replace(/\&apos/g,"'")
		.replace(/\&amp/," and ")
		.replace( /\u201C|\u201D|!|\(|\)|\[|\]|;|:|\"|\/|,|\.com|\&quot|\.|\?|–|\u2013 |\&|\u2022|\||@/g, ".")
		.split(".")

		var tidyContent = textContent.map(function(str){
			var strTrim = str.trim()
			if (strTrim.length > 2 && strTrim.length < 90 && strTrim != "Photograph" && strTrim != "'*") {
				var strCap = strTrim.charAt(0).toUpperCase() + strTrim.slice(1)
				return strCap
			}
		}).filter(function(str){
			return str
		})

		this.currentPoemData = {title: title, link: articleLink, content: tidyContent}

		this.createPoem(this.currentPoemData)
	}
	
	newPoem(wordSearch){
		var that = this
		$("h1").text(wordSearch) // Add poem title

		$("ul").empty().append("<div class='loadingDiv'>Loading<span>.</span><span>.</span><span>.</span></div>") // Add loading animation

		var APIWordSearch = wordSearch.replace(/ /g, " AND ")

		$.getJSON(that.gUrl+APIWordSearch+that.gKey, function(guardianData){
			if (Number(guardianData.response.total) > 0){
				that.parseData(guardianData, wordSearch)
			} else {
				APIWordSearch = APIWordSearch.replace(/ AND /g, " OR ")
				$.getJSON(that.gUrl+APIWordSearch+that.gKey, function(guardianData){
					if (Number(guardianData.response.total) > 0){
						that.parseData(guardianData, wordSearch)
					} else {
						$(".loadingDiv").html("No results, try again x")
					}
				})
			}
		})
	}
}

export default Poem