class TopNav {
	constructor() {
		this.topNav = $(".top-nav")
		this.events()
	}

	events() {
		this.topNav.click(this.infoToggle.bind(this))
	}

	infoToggle(e) {
		$(".top-nav__details").toggleClass("top-nav__details--expanded")
		e.stopPropagation()
		$(document).click(() => {
			$(".top-nav__details").removeClass("top-nav__details--expanded")
			$(document).off()
		})
	}
}

export default TopNav
