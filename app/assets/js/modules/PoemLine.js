class PoemLine {
    constructor(body, line, index, data) {
        this.body = body
        this.line = line
        this.index = index
        this.data = data.content
        this.addToBody()
        this.events()
    }

    events() {
        this.DOMnext.click(() => this.changeLine("next"))
        this.DOMprev.click(() => this.changeLine("prev"))
        this.DOMlineContainer.keydown(e => {
            switch (e.which) {
                case 37: // left
                    this.changeLine("prev")
                    break
                case 38: // up
                    $(this.DOMlineContainer).prev().focus()
                    break
                case 39: // right
                    this.changeLine("next")
                    break
                case 40: // down
                    $(this.DOMlineContainer).next().focus()
                    break
                case 13: // enter
                    break
            }
        })
    }

    addToBody() {
        const that = this
        this.DOMlineContainer = $("<li tabindex=0 class='poem-line'>")
        this.DOMline = $("<span class='poem-line--text'>").text(this.line)
        //this.DOMprev
        this.DOMnext = $(
            "<div class='poem-line__nav poem-line__nav__next'>"
        ).html("<i class='material-icons md-18'>navigate_next</i>")
        this.DOMprev = $(
            "<div class='poem-line__nav poem-line__nav__prev'>"
        ).html("<i class='material-icons md-18'>navigate_before</i>")

        this.body.append(
            this.DOMlineContainer
                .append(this.DOMline)
                .append(this.DOMnext)
                .append(this.DOMprev)
        )
    }

    changeLine(direction) {
        if ($(".edit-mode").length > 0) {
            if (direction === "next") {
                if (this.data[this.index + 1]) {
                    this.index++
                } else {
                    this.index = 0
                }
            } else {
                if (this.index > 0) {
                    this.index--
                } else {
                    this.index = this.data.length - 1
                }
            }

            const newLine = this.data[this.index]
            $(this.DOMline).text(newLine)
        }
    }
}

export default PoemLine
