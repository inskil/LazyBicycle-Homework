import db from '../mongodb'

let topicSchema = db.Schema({
    tid: Number,
    createtime: Date,
    title: String,
    text: String,
    gid: Number,
    uid: Number,
    username: String,
    userheadimg: String,
    istop: Boolean,
    isgood: Boolean,
    updatetime: Date,
    review: Array,
},{collection:"topic"})
export default db.model('topic', topicSchema)

