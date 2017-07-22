function TopNav() {
	this.topNav = $(".topNav")

	this.events = function(){
		this.topNav.click(this.infoToggle.bind(this))
	}

	this.infoToggle = function(e){
		$(".appDetails").toggleClass("visible")
		e.stopPropagation()
		$(document).click(function(){
			$(".appDetails").removeClass("visible")
			$("body").off()
		})
	}

	this.events()
}

module.exports = TopNav