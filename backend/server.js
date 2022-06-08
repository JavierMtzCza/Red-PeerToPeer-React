const express = require('express')
const multer = require('multer')
const cors = require('cors')

const app = express()
app.use(cors())

const fileStorage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null,'./upload')
    },
    filename: (req,file,cb) => {
        cb(null, Date.now()+'--'+file.originalname)
    }  
})

const upload = multer({storage: fileStorage})

app.get('/', (req,res) => {
    res.send('jjj')
})

app.post('/upload', upload.single('image'),(req,res) => {
    console.log(req.file)
    res.send('Single File Upload')
})

app.listen(5000)