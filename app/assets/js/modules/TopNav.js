class TopNav {
	constructor() {
		this.topNav = $(".top-nav")
		this.events()
	}

	events() {
		this.topNav.click(this.infoToggle.bind(this))
	}

	infoToggle(e) {
		$(".top-nav--details").toggleClass("top-nav--details__expanded")
		e.stopPropagation()
		$(document).click(() => {
			$(".top-nav--details").removeClass("top-nav--details__expanded")
			$(document).off()
		})
	}
}

export default TopNav
