import db from '../mongodb'

let allmaxSchema = db.Schema({
    name:String,
    count: Number
},{collection:"allmax"})
export default db.model('allmax', allmaxSchema)

