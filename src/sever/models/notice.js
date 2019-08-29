import db from '../mongodb'

let noticeSchema = db.Schema({
    gid: Number,
    uid: Number,
    username: String,
    userheadimg: String,
    touid: Number,
    createtime: Date,
    type: String, //apply or notice or success
    
},{collection:"notice"})
export default db.model('notice', noticeSchema)
