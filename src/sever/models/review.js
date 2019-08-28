import db from '../mongodb'
let reviewSchema = db.Schema({
    comments:Array,
    count:Number,
    start:Number,   //movie id
    total:Number,
    next_start:Number,
    subject:[]
},{collection:"review"})
export default db.model('review', reviewSchema)
