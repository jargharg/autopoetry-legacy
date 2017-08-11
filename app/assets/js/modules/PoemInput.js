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
		this.inputText.off().keypress(e => e.which == 13 ? func.call(this) : null) // Enter key pressed
	}

	newWordSearch() {
		if(this.inputText.val() != "") {
			this.poem.newPoem(this.inputText.val())
			this.inputText.val("")
			.removeClass("input-mobile")
			.parent().removeClass("poem-form__expanded")
			this.inputButton.blur()
			$(".edit-mode").removeClass("edit-mode")
			$("#poemEdit .material-icons").text("mode_edit")
		} else {
			this.inputText
			.addClass("input-mobile")
			.focus()
			.parent().addClass("poem-form__expanded")
		}
	}

	firstWordSearch() {
		if(this.inputText.val() != "") {
			$(".container").removeClass("hidden")
			$(".top-nav").removeClass("hidden")
			$(".app-name__init").addClass("hidden")
			$(".poem-form").removeClass("poem-form__init").addClass("poem-form__bottom")
			this.events(this.newWordSearch)
			this.newWordSearch()
		} else {
			this.inputText.focus()
		}
	}
}

export default PoemInput
