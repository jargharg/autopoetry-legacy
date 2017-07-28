class ShareLinks {
	constructor(){
		this.shareLink = $(".shareLink i")
		this.poemContents = $(".poemLineText")
		this.events()
	}
	
	events() {
		this.shareLink.click(this.sendWhatsAppPoem.bind(this))
	}

	whatsAppPoemLink() {
		var whatsAppPre = "whatsapp://send?text="
		var whatsAppPost = "\nMake your own autopoem at jarodhargreav.es/autopoetry"
		var whatsAppText = $("#poemTitle h1").text().toUpperCase()+"\n\n"

		this.poemContents.each(function(){
			whatsAppText += this.textContent + "\n"
		})

		var whatsAppLink = whatsAppPre + encodeURI(whatsAppText + whatsAppPost)

		return whatsAppLink
	}

	sendWhatsAppPoem(){
		var that = this
		this.shareLink.parent().attr("href", that.whatsAppPoemLink())
	}
}

export default ShareLinks