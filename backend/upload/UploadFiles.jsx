import { useState } from 'react';
import download from 'downloadjs';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';

import Navegacion from './Navegacion.jsx';
import ModalPersonalizado from './ModalPersonalizado.jsx';

import imagen from '../Images/WhatsApp Image 2022-06-08 at 12.53.30 PM.jpeg'

const UploadFiles = () => {
    const [fileData, setFileData] = useState();
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [documentos, setDocumentos] = useState([]);
    const [seleccion, setSeleccion] = useState({
        id: '',
        nombreArchivo: '',
    });


    const fileChangeHandler = (e) => {
        setFileData(e.target.files[0])
    }



    const actualizarLista = () => {
        fetch(`http://localhost:5000/`)
            .then(res =>
                res.json()
            )
            .then(res =>
                setDocumentos(res)
            )
    }

    const onSubmitUpload = (e) => {

        e.preventDefault();

        if (fileData !== undefined) {
            const data = new FormData()
            data.append('image', fileData)
            fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: data,
            }).then(() => {
                setShowSuccess(true)
            }).then(() => {
                actualizarLista()
            }).then(() => {
                setSuccess('El archivo se ha subido exitosamente! Lista de archivos a solicitar actualizada')
            }).catch((err) => {
                console.log(err.message)
            })
        } else {
            setError('Debe elegir un archivo a cargar')
            setShowError(true)
        }
    }

    return (
        <Container>
            <Navegacion />
            <Row>
                <Col>
                    <Container className='SubirArchivo'>
                        <Form onSubmit={onSubmitUpload}>
                            <Form.Control type='file' onChange={fileChangeHandler}></Form.Control>
                            {' '}
                            <Container className='BotonSubir'>
                                <Button type='submit'>Subir archivo</Button>
                            </Container>
                        </Form>
                    </Container>
                </Col>
                <Col>
                    <Container className='DescargarArchivo'>
                        <Dropdown>
                            <Dropdown.Toggle variant="warning" id="dropdown-basic" value={seleccion}>
                                Seleccione el archivo a solicitar
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {documentos.map((doc) => (
                                    <Dropdown.Item id={doc.id} key={doc.id} onClick={(e) => {
                                        setSeleccion({
                                            id: e.target.id,
                                            nombreArchivo: document.getElementById(e.target.id).textContent
                                        })
                                        document.getElementsByClassName('BotonDescargar').style.display = 'block'
                                    }}>
                                        {doc.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Container className='BotonDescargar' >
                            <Button onClick={async () => {
                                const res = await fetch(`http://localhost:5000/download/${seleccion.id}`)
                                const blob = await res.blob();
                                download(blob, seleccion.nombreArchivo);
                            }}>
                                Descargar archivo
                            </Button>
                        </Container>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col className='imagenArquitectura'>
                    <img
                        src={imagen}
                        width="700"
                        height="400"

                    />
                </Col>
            </Row>

            <ModalPersonalizado texto={error} variante='danger' mostrar={showError} cerrar={() => setShowError(false)} ></ModalPersonalizado>
            <ModalPersonalizado texto={success} variante='success' mostrar={showSuccess} cerrar={() => setShowSuccess(false)} ></ModalPersonalizado>
        </Container >
    )
}

export default UploadFiles