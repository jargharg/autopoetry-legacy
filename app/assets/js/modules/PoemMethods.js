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

        const poemArray = randomArray.map(x => this.content[x])
        return poemArray
    }

    ifOrPoem() {
        let ifArray = []
        let orArray = []
        let thenArray = []
        let ifOrArray = []

        this.content.forEach(
            line =>
                /if /i.test(line.substring(0, 3)) ? ifArray.push(line) : null
        )

        this.content.forEach(
            line =>
                /or /i.test(line.substring(0, 3)) ? orArray.push(line) : null
        )

        this.content.forEach(
            line =>
                /then /i.test(line.substring(0, 5))
                    ? thenArray.push(line)
                    : null
        )

        // refactor this to one foreach

        return ifArray.slice(1, this.length)
    }
}

export default PoemMethods
