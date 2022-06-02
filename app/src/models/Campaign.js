export class Campaign {
    constructor(publicKey, accountData) {
        this.publicKey = publicKey
        this.author = accountData.author
        this.name = accountData.name
        this.description = accountData.description
        this.amount_donated = accountData.amountDonated
        this.image_link = accountData.imageLink ? accountData.imageLink : accountData.image_link ? accountData.image_link : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnANpOEOCzNCNFrvcq0mL9DcguSxHOT3EXzA&usqp=CAU'
    }
    get key() {
        return this.publicKey.toBase58()
    }
    get author_display() {
        const author = this.author.toBase58();
        return author.slice(0, 4) + '..' + author.slice(-4)
    }
}