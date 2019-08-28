import db from '../mongodb'
let groupSchema = db.Schema({
    groupname: String,
    grouphead: String,
    gid: Number,
    uid:Number,
    text: String,
    createtime: Date,
    usercount: Number,
    user: Array,
    admin: Array,
    creator:{},
    topicmax: Number,
    tid: Array
},{collection:"group"})
export default db.model('group', groupSchema)