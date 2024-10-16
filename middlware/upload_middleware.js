const multer = require('multer')

const storage = multer.diskStorage({
    destination:'uploads/',
    filename:(req,file,cb)=>{
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

// const fileFilter = (req, file, cb) => {
//     const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/png','application/blend']; // Modify based on your needs
//     if (allowedMimeTypes.includes(file.mimetype)) {
//         cb(null, true); // Accept the file
//     } else {
//         // Send a clear error message when the file type is unsupported
//         cb(new Error('Unsupported file type!'), false); 
//     }
// };


const uploads =  multer({
    storage,
    limits:{fileSize: 300000000}, // size of file less then 300 Mo
})

module.exports = {
    uploads
}
