const express = require('express')
const multer = require('multer')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');

const app = express()
app.use(cors())

let Documentos = [];

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: fileStorage })

app.get('/', (req, res) => {
    res.json(Documentos)
})

app.get('/buscar/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    const doc = Documentos.find(doc => doc.id === id)
    res.send(doc.name)
})

app.post('/upload', upload.single('image'), (req, res) => {

    const uuid = uuidv4();
    const doc = {
        id: uuid,
        name: req.file.originalname
    }
    Documentos.push(doc)
    console.log(Documentos)
    res.send('Single File Upload')

    // SEPARAMOS AL MOMENTO DE SUBIR Y MANDAMOS
    var spawn = require("child_process").spawn; 
    var process = spawn('python3',["SepararArchivos.py",req.file.originalname] ); 
  
    process.stdout.on('data', function(data) { 
        console.log(data)
    } ) 
})

app.listen(5000)