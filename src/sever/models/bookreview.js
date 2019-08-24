import db from '../mongodb'
let bookreviewSchema = db.Schema({
    comments:Array,
    count:Number,
    start:Number,
    total:Number,
},{collection:"bookreview"})
export default db.model('bookreview', bookreviewSchema)