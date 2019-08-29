import db from '../mongodb'

let movieSchema = db.Schema({
    rating: Array,
    title: String,
    original_title:String,
    casts: Array,
    pubdates: Array,
    mainland_pubdate : String,
    genres: Array,
    directors:Array,
    images:Array,
    durations:Array,
    year:String,
    id:String,
    summary:String,
    alt:String,
    likes:Number
},{collection:"movie"})
export default db.model('movie', movieSchema)