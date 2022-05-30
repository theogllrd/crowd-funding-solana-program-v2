export class Campaign {
    constructor(publicKey, accountData) {
        this.publicKey = publicKey
        this.author = accountData.author
        this.name = accountData.name
        this.description = accountData.description
        this.amount_donated = accountData.amount_donated
    }
    get key() {
        return this.publicKey.toBase58()
    }
    get author_display() {
        const author = this.author.toBase58();
        return author.slice(0, 4) + '..' + author.slice(-4)
    }
}