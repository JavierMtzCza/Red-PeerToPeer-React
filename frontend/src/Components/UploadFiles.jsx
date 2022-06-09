import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import icono from '../Images/red-de-computadoras.png'

const UploadFiles = () => {
    const [fileData, setFileData] = useState();
    const [archivo, setArchivo] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const fileChangeHandler = (e) => {
        setFileData(e.target.files[0])
    }

    const onSubmitRequest = (e) => {

        e.preventDefault();

        if (archivo !== ''){
            fetch(`http://localhost:5000/buscar/${archivo}`)
            .then(res => 
                res.json()
               // console.log(res)
            )
            .then(res => 
                console.log(res)
            )
        } 
    }

    const onSubmitUpload = (e) => {

        if (fileData !== undefined) {

            e.preventDefault();
            const data = new FormData()

            data.append('image', fileData)
            fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: data,
            }).then((result) => {
                //console.log('File sent success')
                setShow(true)
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    return (
        <Container>
            <Container className='Navegacion'>
                <Navbar bg='dark' variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">
                            <img
                                alt=""
                                src={icono}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />
                            {' '}
                            Gestor de archivos
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Peer to Peer
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Container>
            <Row>
                <Col>
                    <Container className='Formulario'>
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
                    <Container className='Formulario'>
                        <Form onSubmit={onSubmitRequest}>
                            <Form.Control type='text' onChange={(e) => {
                                setArchivo(e.target.value)
                                console.log(archivo)
                            }}></Form.Control>
                            {' '}
                            <Container className='BotonSubir'>
                                <Button type='submit'>Solicitar archivo</Button>
                            </Container>
                        </Form>
                    </Container>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>Documento subido con exito!!!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Entendido
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default UploadFiles