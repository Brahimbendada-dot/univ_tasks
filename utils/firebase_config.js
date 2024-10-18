const admin = require('firebase-admin')
const serviceAccount = require('../config/note-3f2f5-firebase-adminsdk-mwkha-96d70b6207.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "note-3f2f5.appspot.com"
})
const bucket = admin.storage().bucket()
module.exports = bucket