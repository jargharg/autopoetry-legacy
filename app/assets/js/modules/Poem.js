import ShareLinks from "./ShareLinks"
import PoemControls from "./PoemControls"

class Poem {
	constructor() {
		this.currentPoemData = {}
		this.gUrl = "https://content.guardianapis.com/search?show-fields=body&q="
		this.gKey = "&api-key=2c7e590d-dde8-498a-b351-b008c42edf52"
		this.poemBody = $(".poem-body")
		this.poemControls = new PoemControls(this)
		this.shareLinks = new ShareLinks()
	}

	createPoem(poemData) {
		let randomArray = []
		this.poemBody.empty()
		for(let i=0; i<10; i++) {
			randomArray.push(Math.floor(Math.random()*poemData.content.length))
		}

		randomArray.forEach(x => {
			this.poemBody.append(
				$("<li class='poem-line'>")
				.append(
					$("<span class='poem-line--text'>")
					.html(poemData.content[x])
					)
				.append(
					$("<div class='poem-line--refresh'>")
					.html("<i class='material-icons md-18'>&#xE86A;</i>")
					)
				)
		})

		this.poemControls.newPoem(poemData)
		this.shareLinks.newPoem()
		$(".articleLink").attr("href", poemData.link)
	}

	parseData(guardianData, title) {
		const results = guardianData.response.results
		const article = Math.floor(Math.random()*results.length)
		const content = results[article].fields.body
		const articleLink = results[article].webUrl
		let textContent = content.replace(/<br>/g,".")
		.replace(/<(?:.|\n)*?>/gm, '')
		.replace(/\&apos|’/g,"'")
		.replace(/\&amp/g," and ")
		.replace( /\u201C|\u201D|!|\(|\)|\[|\]|;|:|\"|\/|,|\.com|\&quot|\.|\?|–|\u2013 |\&|\u2022|\||@|\d{3,}/g, ".")
		.split(".")

		let tidyContent = []

		textContent.forEach(str => {
			str = str.trim()
			if (str.length > 2 && str != "Photograph" && str != "'*") {
				if (str.length > 70) {
					str = str.replace(/.{50}\S*\s+/g, "$&@").split(/\s+@/)
					tidyContent.push(...str)
				} else {
					tidyContent.push(str)
				}
			}
		})

		let finalContent = tidyContent.map(str => str.charAt(0).toUpperCase() + str.slice(1))

		this.currentPoemData = {title: title, link: articleLink, content: finalContent}

		this.createPoem(this.currentPoemData)
	}

	newPoem(wordSearch) {
		const that = this
		$("h1").text(wordSearch) // Add poem title

		$("ul").empty().append("<div class='loading-div'>Loading<span>.</span><span>.</span><span>.</span></div>") // Add loading animation

		wordSearch = wordSearch.replace(/\?/g,"")
		
		let APIWordSearch = wordSearch.replace(/ /g, " AND ")

		$.getJSON(that.gUrl+APIWordSearch+that.gKey, function(guardianData){
			if (Number(guardianData.response.total) > 0){
				that.parseData(guardianData, wordSearch)
			} else {
				APIWordSearch = APIWordSearch.replace(/ AND /g, " OR ")
				$.getJSON(that.gUrl+APIWordSearch+that.gKey, function(guardianData){
					if (Number(guardianData.response.total) > 0){
						that.parseData(guardianData, wordSearch)
					} else {
						$(".loading-div").html("No results, try again x")
					}
				})
			}
		})
	}
}

export default Poem