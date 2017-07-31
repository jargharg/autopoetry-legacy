class ShareLinks {
	constructor() {
		this.shareLink = $(".shareLink i")
		this.poemContents = {}
		this.poemTitle = {}
		this.events()
	}
	
	events() {
		this.shareLink.click(this.sendWhatsAppPoem.bind(this))
	}

	newPoem() {
		this.poemContents = $(".poemLineText")
		this.poemTitle = $("#poemTitle h1").text().toUpperCase()
	}

	whatsAppPoemLink() {
		const whatsAppPre = "whatsapp://send?text="
		const whatsAppPost = "\nMake your own autopoem at jarodhargreav.es/autopoetry"
		let whatsAppText = `${this.poemTitle}\n\n`

		this.poemContents.each(function(){
			whatsAppText += `${this.textContent}\n`
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