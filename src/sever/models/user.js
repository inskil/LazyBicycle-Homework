import db from '../mongodb'

let userSchema = db.Schema({
    username: String,
    pwd: String,
    name: String,
    avatar: String,
    ismanager: Boolean,
    roles: Array,
    createTime: { type: Date, default: Date.now},
    loginTime: Date,
    likebooks:Array,
    likemovies:Array,
    group:Array,
    admingroup:Array,
    text :String
},{collection:"user"})
export default db.model('user', userSchema);