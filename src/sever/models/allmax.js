import db from '../mongodb'

let allmaxSchema = db.Schema({
    gidmax : Number,
    uidmax : Number,
    bidmax : Number,
    midmax : Number
},{collection:"allmax"})
export default db.model('allmax', allmaxSchema)

