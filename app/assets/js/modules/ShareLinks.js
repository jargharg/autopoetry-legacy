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
		const whatsAppPre = "whatsapp://send?text="
		const whatsAppPost = "\nMake your own autopoem at jarodhargreav.es/autopoetry"
		let whatsAppText = $("#poemTitle h1").text().toUpperCase()+"\n\n"

		this.poemContents.each(function(){
			whatsAppText += this.textContent + "\n"
		})

		const whatsAppLink = whatsAppPre + encodeURI(whatsAppText + whatsAppPost)

		return whatsAppLink
	}

	sendWhatsAppPoem(){
		const that = this
		this.shareLink.parent().attr("href", that.whatsAppPoemLink())
	}
}

export default ShareLinks