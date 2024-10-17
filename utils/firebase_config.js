const admin = require('firebase-admin')
const serviceAccount = require('../note-3f2f5-firebase-adminsdk-71ul9-4cd063082f.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "note-3f2f5.appspot.com"
})
const bucket = admin.storage().bucket()
module.exports = bucket