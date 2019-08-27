import db from '../mongodb'
let topicSchema = db.Schema([],{collection:"topic"})
export default db.model('topic', topicSchema)