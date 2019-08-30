import db from '../mongodb'

let userSchema = db.Schema({
    username: String,
    pwd: String,
    name: String,
    avatar: String,
    ismanager: Boolean,
    createTime: { type: Date, default: Date.now},
    loginTime: Date,
    likebooks:Array,
    likemovies:Array,
    group:Array,
    admingroup:Array
},{collection:"user"})
export default db.model('user', userSchema);