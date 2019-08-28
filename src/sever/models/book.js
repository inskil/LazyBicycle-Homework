import db from '../mongodb'
let bookSchema = db.Schema({
    rating: Array,
    title: String,
    subtitle: String,
    origin_title:String,
    author: Array,
    pubdate: Date,
    tags: Array,
    binding:String,
    image:String,
    translator:String,
    images:Array,
    catalog:String,
    ebook_url:String,
    id:String,
    publisher:String,
    isbn10:String,
    isbn13:String,
    url:String,
    alt_title:String,
    author_intro:String,
    summary:String,
    ebook_price:Number,
    series:Array,
    pages:Number,
    alt:String,
    likes:Number
},{collection:"book"})

export default db.model('book', bookSchema)