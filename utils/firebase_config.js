const admin = require('firebase-admin')
const serviceAccount = require('../config/note-3f2f5-54bed0dd683c.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "note-3f2f5.appspot.com"
})
const bucket = admin.storage().bucket()
module.exports = bucket