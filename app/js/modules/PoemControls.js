function PoemControls(poemData) {
	var base = this
	this.poemData = poemData
	this.poemEdit = $("#poemEdit")
	this.poemEditIcon = $("#poemEdit .material-icons")
	this.poemContainer = $("#poemContainer")
	this.poemLinesRefresh = $(".poemLineRefresh")
	this.wholePoemRefresh = $("#wholePoemRefresh")
	this.editModeActive = false

	this.events = function(){
		this.poemEdit.off().click(this.editMode.bind(this))
		this.poemLinesRefresh.off().click(this.refreshLine)
		this.wholePoemRefresh.off().click(this.refreshPoem.bind(this))
	}

	this.editMode = function() {
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

	this.refreshLine = function() {
		var newLine = base.poemData.content[Math.floor(Math.random()*base.poemData.content.length)]
		$(this).prev().text(newLine)
	}

	this.refreshPoem = function(){
		this.editMode()
		var poem = new Poem(base.poemData.title)
	}

	this.events()
}


export default PoemControls

// ES6 constructor
//
// class PoemControls {
// 	constructor(poemData){
// 		var base = this
// 		this.poemData = poemData
// 		this.poemEdit = $("#poemEdit")
// 		this.poemEditIcon = $("#poemEdit .material-icons")
// 		this.poemContainer = $("#poemContainer")
// 		this.poemLinesRefresh = $(".poemLineRefresh")
// 		this.wholePoemRefresh = $("#wholePoemRefresh")
// 		this.editModeActive = false
// 		this.events()
// 	}

// 	events() {
// 		this.poemEdit.off().click(this.editMode.bind(this))
// 		this.poemLinesRefresh.off().click(this.refreshLine)
// 		this.wholePoemRefresh.off().click(this.refreshPoem.bind(this))
// 	}

// 	editMode() {
// 		if (this.editModeActive === true) {
// 			this.poemEditIcon.text("mode_edit")
// 			this.poemContainer.removeClass("editMode")
// 			this.editModeActive = false
// 		} else {
// 			this.poemEditIcon.text("done")
// 			this.poemContainer.addClass("editMode")
// 			this.editModeActive = true
// 		}
// 	}

// 	refreshLine() {
// 		var newLine = base.poemData.content[Math.floor(Math.random()*base.poemData.content.length)]
// 		$(this).prev().text(newLine)
// 	}

// 	refreshPoem(){
// 		this.editMode()
// 		var poem = new Poem(base.poemData.title)
// 	}
// }