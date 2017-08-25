class PoemControls {
	constructor(poem) {
		this.poem = poem
		this.poemData = {}
		this.poemEdit = $("#poemEdit")
		this.poemEditIcon = $("#poemEdit .material-icons")
		this.poemContainer = $(".poem-container")
		this.poemLinesRefresh = $()
		this.wholePoemRefresh = $("#wholePoemRefresh")
		this.editModeActive = false
		this.events()
	}

	events() {
		this.poemEdit.click(this.editMode.bind(this))
		this.wholePoemRefresh.click(this.refreshPoem.bind(this))
	}

	newPoem(poemData) {
		this.poemData = poemData
	}

	editMode() {
		if (this.editModeActive === true) {
			this.poemEditIcon.text("mode_edit")
			this.poemContainer.removeClass("edit-mode")
			this.editModeActive = false
		} else {
			this.poemEditIcon.text("done")
			this.poemContainer.addClass("edit-mode")
			this.editModeActive = true
		}
	}

	refreshPoem() {
		this.editMode()
		this.poem.createPoem(this.poemData)
	}
}

export default PoemControls
