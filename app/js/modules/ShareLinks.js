function ShareLinks() {
	var base = this
	this.shareLink = $(".shareLink i")

	this.events = function() {
		this.shareLink.click(this.sendWhatsAppPoem.bind(this))
	}

	this.whatsAppPoemLink = function() {
		var whatsAppPre = "whatsapp://send?text="
		var whatsAppPost = "\nMake your own autopoem at jarodhargreav.es/autopoetry"
		var whatsAppText = $("#poemTitle h1").text().toUpperCase()+"\n\n"
		var contents = $(".poemLineText")

		contents.each(function(){
			whatsAppText += this.textContent + "\n"
		})

		var whatsAppLink = whatsAppPre + encodeURI(whatsAppText + whatsAppPost)

		return whatsAppLink
	}

	this.sendWhatsAppPoem = function(){
		this.shareLink.parent().attr("href", base.whatsAppPoemLink())
	}

	this.events()
}

export default ShareLinks