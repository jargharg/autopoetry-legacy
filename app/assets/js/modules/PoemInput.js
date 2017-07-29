import Poem from "./Poem"

class PoemInput {
	constructor(){
		this.inputButton = $("#inputSubmit")
		this.inputText = $("#inputText")
		this.events(this, this.firstWordSearch)
		this.inputText.focus()
	}

	events(that, func){
		that.inputButton.off().click(func.bind(that)) // Submit button pressed
		that.inputText.off().keypress(e => {if (e.which == 13) func.call(that) }) // Enter key pressed
	}

	newWordSearch() {
		if(this.inputText.val() != "") {
			this.poem = new Poem(this.inputText.val())
			this.inputText.val("")
			.removeClass("inputMobile")
			.parent().removeClass("poemFormExpanded")
			this.inputButton.blur()
			$(".editMode").removeClass("editMode")
		} else {
			this.inputText
			.addClass("inputMobile")
			.focus()
			.parent().addClass("poemFormExpanded")
		}
	}

	firstWordSearch() {
		if(this.inputText.val() != "") {
			$(".container").removeClass("hidden")
			$(".poemForm").removeClass("poemFormInit").addClass("poemFormBottom")
			this.events(this, this.newWordSearch)
			this.newWordSearch()
		} else {
			this.inputText.focus()
		}
	}
}

export default PoemInput