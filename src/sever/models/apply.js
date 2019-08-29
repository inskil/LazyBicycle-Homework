import db from '../mongodb'

let applySchema = db.Schema({
    gid: Number,
    uid: Number,
    username: String,
    userheadimg: String,
    touid: Number,
    applytime: Date,
},{collection:"apply"})
export default db.model('apply', applySchema)
