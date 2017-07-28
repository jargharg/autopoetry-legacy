import Poem from "./Poem"

class PoemInput {
	constructor(){
		this.inputButton = $("#inputSubmit")
		this.inputText = $("#inputText")
		this.events()
		this.inputText.focus()
	}

	events(){
		var that = this
		this.inputButton.click(this.firstWordSearch.bind(this)) // Submit button pressed
		this.inputText.keypress(function(e){
			if (e.which == 13) { // Enter key pressed
				that.firstWordSearch()
			}
		})
	}

	newWordSearch() {
		if(this.inputText.val() != "") {
			this.poem = new Poem(this.inputText.val())
			this.inputText.val("")
			.removeClass("inputMobile")
			.parent().removeClass("poemFormExpanded")
			this.inputButton.blur()
			// !! this should reset edit mode too
		} else {
			this.inputText
			.addClass("inputMobile")
			.focus()
			.parent().addClass("poemFormExpanded")
		}
	}

	firstWordSearch() {
		var that = this
		if(this.inputText.val() != "") {
			$(".container").removeClass("hidden")
			$(".poemForm").removeClass("poemFormInit").addClass("poemFormBottom")
			this.inputButton.off().click(this.newWordSearch.bind(this)) // Submit button pressed
			this.inputText.off().keypress(function(e){
				if (e.which == 13) { // Enter key pressed
					that.newWordSearch()
				}
			})
			this.newWordSearch()
		} else {
			this.inputText.focus()
		}
	}
}

export default PoemInput