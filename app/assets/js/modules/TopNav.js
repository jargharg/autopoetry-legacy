class TopNav {
	constructor() {
		this.topNav = $(".topNav")
		this.events()
	}

	events() {
		this.topNav.click(this.infoToggle.bind(this))
	}

	infoToggle(e){
		$(".appDetails").toggleClass("visible")
		e.stopPropagation()
		$(document).click(function(){
			$(".appDetails").removeClass("visible")
			$(document).off()
		})
	}
}

export default TopNav