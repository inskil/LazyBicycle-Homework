import db from '../mongodb'

let topicSchema = db.Schema({
    tid: String,
    createtime: String,
    title: String,
    text: String,
    gid: String,
    uid: String,
    username: String,
    userheaedimg: String,
    review: Array,
},{collection:"topic"})
export default db.model('topic', topicSchema)

