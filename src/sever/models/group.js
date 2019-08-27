import db from '../mongodb'
let groupSchema = db.Schema({
    groupname: String,
    grouphead: String,
    gid: Number,
    text: String,
    createtime: Date,
    usercount: Number,
    user: Array,
    admin: Array,
    creator:Array,
    topicmax: Number,
    tid: Document
},{collection:"group"})
export default db.model('group', groupSchema)