function PoemInput() {
	var base = this
	this.inputButton = $("#inputSubmit")
	this.inputText = $("#inputText")

	this.newWordSearch = function() {
		if(this.inputText.val() != "") {
			this.poem = new Poem(this.inputText.val())
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

	this.firstWordSearch = function() {
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

	this.events = function(){ // event listeners
		this.inputButton.click(this.firstWordSearch.bind(this)) // Submit button pressed
		this.inputText.keypress(function(e){
			if (e.which == 13) { // Enter key pressed
				base.firstWordSearch()
			}
		})
	}

	this.events()
	this.inputText.focus()
}

module.exports = PoemInput