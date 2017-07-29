class PoemInput {
	constructor(poem) {
		this.poem = poem
		this.inputButton = $("#inputSubmit")
		this.inputText = $("#inputText")
		this.events(this.firstWordSearch)
		this.inputText.focus()
	}

	events(func) {
		this.inputButton.off().click(func.bind(this)) // Submit button pressed
		this.inputText.off().keypress(e => {if (e.which == 13) func.call(this) }) // Enter key pressed
	}

	newWordSearch() {
		if(this.inputText.val() != "") {
			this.poem.newPoem(this.inputText.val())
			this.inputText.val("")
			.removeClass("inputMobile")
			.parent().removeClass("poemFormExpanded")
			this.inputButton.blur()
			$(".editMode").removeClass("editMode")
			$("#poemEdit .material-icons").text("mode_edit")
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
			this.events(this.newWordSearch)
			this.newWordSearch()
		} else {
			this.inputText.focus()
		}
	}
}

export default PoemInput