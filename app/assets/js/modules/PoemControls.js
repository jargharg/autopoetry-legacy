import Poem from "./Poem"

class PoemControls {
	constructor(poemData){
		this.poemData = poemData
		this.poemEdit = $("#poemEdit")
		this.poemEditIcon = $("#poemEdit .material-icons")
		this.poemContainer = $("#poemContainer")
		this.poemLinesRefresh = $(".poemLineRefresh")
		this.wholePoemRefresh = $("#wholePoemRefresh")
		this.editModeActive = false
		this.events()
	}

	events(){
		const that = this
		this.poemEdit.off().click(this.editMode.bind(this))
		this.poemLinesRefresh.off().click(function(){that.refreshLine(this)})
		this.wholePoemRefresh.off().click(this.refreshPoem.bind(this))
	}

	editMode() {
		if (this.editModeActive === true) {
			this.poemEditIcon.text("mode_edit")
			this.poemContainer.removeClass("editMode")
			this.editModeActive = false
		} else {
			this.poemEditIcon.text("done")
			this.poemContainer.addClass("editMode")
			this.editModeActive = true
		}
	}

	refreshLine(refreshIcon) {
		const newLine = this.poemData.content[Math.floor(Math.random()*this.poemData.content.length)]
		$(refreshIcon).prev().text(newLine)
	}

	refreshPoem(){
		this.editMode()
		const poem = new Poem(this.poemData.title)
	}
}

export default PoemControls