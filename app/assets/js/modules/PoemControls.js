class PoemControls {
	constructor(poem) {
		this.poem = poem;
		this.poemData = {};
		this.poemEdit = $("#poemEdit");
		this.poemEditIcon = $("#poemEdit .material-icons");
		this.poemContainer = $("#poemContainer");
		this.poemLinesRefresh = $();
		this.wholePoemRefresh = $("#wholePoemRefresh");
		this.editModeActive = false;
		this.events();
	}

	events() {
		this.poemEdit.click(this.editMode.bind(this));
		this.wholePoemRefresh.click(this.refreshPoem.bind(this));
	}

	newPoem(data) {
		const that = this;
		this.poemData = data;
		this.poemLinesRefresh = $(".poemLineRefresh");
		this.poemLinesRefresh.off().click(function(){
			that.refreshLine(this);
		});
	}

	editMode() {
		if (this.editModeActive === true) {
			this.poemEditIcon.text("mode_edit");
			this.poemContainer.removeClass("editMode");
			this.editModeActive = false;
		} else {
			this.poemEditIcon.text("done");
			this.poemContainer.addClass("editMode");
			this.editModeActive = true;
		}
	}

	refreshLine(refreshIcon) {
		const newLine = this.poemData.content[Math.floor(Math.random()*this.poemData.content.length)];
		$(refreshIcon).prev().text(newLine);
	}

	refreshPoem() {
		this.editMode();
		this.poem.newPoem(this.poemData.title);
	}
}

export default PoemControls;