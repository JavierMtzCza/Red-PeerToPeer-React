const express = require('express')
const multer = require('multer')
const cors = require('cors')

const app = express()
app.use(cors())

let Documentos = [];
let Consultas = [];


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({ storage: fileStorage })

app.get('/', (req, res) => {
    res.send('Servidor principal')
})

app.get('/buscar/:nombre', (req, res) => {
    Consultas = Documentos.find((doc) => {
        doc == req.params.nombre
    })

    if (Consultas.length == 0) {
        res.json([])
    } else {
        console.log(Consultas)
        res.json(Consultas)
    }
})

app.post('/upload', upload.single('image'), (req, res) => {

    Documentos.push(req.file.originalname)
    console.log(Documentos)
    res.send('Single File Upload')
})

app.listen(5000)