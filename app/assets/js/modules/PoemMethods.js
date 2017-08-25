class PoemMethods {
    constructor() {
        this.methods = [this.randomPoem, this.ifOrPoem]
        this.randomLineIndex = this.randomLineIndex.bind(this)
    }

    newPoem(data) {
        this.length = 3 + Math.floor(Math.random() * 10)
        this.title = data.title
        this.content = data.content

        return this.randomPoem.call(this)
        // const randomMethod = Math.floor(Math.random() * this.methods.length)
        // return this.methods[randomMethod].call(this)
    }

    randomLineIndex() {
        return Math.floor(Math.random() * this.content.length)
    }

    randomPoem() {
        let randomArray = []
        for (let i = 0; i < this.length; i++) {
            randomArray.push(this.randomLineIndex())
        }

        const poemArray = randomArray.map(x => {
            var lineObject = {}
            lineObject.index = x
            lineObject.content = this.content[x]
            return lineObject
        })

        return poemArray
    }

    ifOrPoem() {
        let ifArray = []
        let orArray = []
        let thenArray = []
        let ifOrArray = []

        this.content.forEach(line => {
            if (/if /i.test(line.substring(0, 3))) {
                ifArray.push(line)
            } else if (/or /i.test(line.substring(0, 3))) {
                orArray.push(line)
            } else if (/then /i.test(line.substring(0, 5))) {
                thenArray.push(line)
            }
        })

        const ifOrMin = Math.min(ifArray.length, orArray.length)

        const ifOrLength = Math.floor(Math.random() * ifOrMin)

        ifOrArray.push(
            ifArray[Math.floor(Math.random() * ifArray.length)],
            orArray[Math.floor(Math.random() * orArray.length)]
        )

        thenArray.length !== 0
            ? ifOrArray.push(
                  thenArray[Math.floor(Math.random() * thenArray.length)]
              )
            : ifOrArray.push(this.content[this.randomLineIndex()])

        return ifOrArray //.slice(1, this.length)
    }
}

export default PoemMethods
