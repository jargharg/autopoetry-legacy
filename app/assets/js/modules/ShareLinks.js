class ShareLinks {
	constructor() {
		this.shareLink = $(".shareLink i")
		this.poemContents = {}
		this.events()
	}
	
	events() {
		this.shareLink.click(this.sendWhatsAppPoem.bind(this))
	}

	newPoem() {
		this.poemContents = $(".poemLineText")
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

	sendWhatsAppPoem() {
		const that = this
		this.shareLink.parent().attr("href", that.whatsAppPoemLink())
	}
}

export default ShareLinks