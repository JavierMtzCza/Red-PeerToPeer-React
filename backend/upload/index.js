const express = require('express');
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

const app = express();

let base =  [
    {
        "luz":0,
        "temp":0,
        "ventilador":0,
        "foco": false,
    },
]
   
app.get('/', (request, response) => {
    response.send('hola');
})

//Obtener todos los datos de los sensores (usamos solo el 1)
app.get('/data',(request,response) => {
   response.json(base);
})

app.get('/script',(req,res) => {
    
    var spawn = require("child_process").spawn; 
    var process = spawn('python3',["script.py",'hola', 'hola'] ); 
  
    process.stdout.on('data', function(data) { 
        res.send(data.toString()); 
    } ) 

 })
 
const PORT=3001;
app.listen(PORT)
console.log(`Server is running in port ${PORT}`)

//===========================  LEER EL PUERTO SERIAL ================================

// // iniciamos conexion con nuestro arduino en el COM que le especificamos y a 9600 bauds
// const port = new SerialPort( 
//     {
//         path: 'COM4',
//         baudRate: 9600
//     }
// )

// // Si hay un error esta funcion nos muestra que salio mal
// port.on('error', function(err) {
//     console.log('Error: ', err.message)
// })

// // Este parser  nos lo transforma a string cada que encuentre un ~
// const parser = port.pipe(new ReadlineParser({ delimiter: '~' }))
// //cada que se detecte una recepcion, lo imprimimos en la consola
// parser.on('data',(data)=>{

//     const datos = data.split(" ");
//     const luz = parseInt(datos[0],10);
//     const temperatura = parseInt(datos[1],10);

//     if(luz > 10){
//         base[0].foco = true;
//     }else{
//         base[0].foco = false;
//     }

//     if(temperatura > 20 && temperatura < 30){
//         base[0].ventilador = 1;
//     }else if(temperatura > 50 && temperatura < 80){
//         base[0].ventilador = 2;
//     }else if(temperatura > 80){
//         base[0].ventilador = 3;
//     }else{
//         base[0].ventilador = 0;
//     }
    
// })
