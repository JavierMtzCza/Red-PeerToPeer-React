import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

import icono from '../Images/red-de-computadoras.png'


const UploadFiles = () => {
    const [fileData, setFileData] = useState()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const fileChangeHandler = (e) => {
        setFileData(e.target.files[0])
    }

    const onSubmitHandler = (e) => {

        if (fileData != undefined) {

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
                            Subida de archivos
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Linux Principal
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Container>
            <Container className='Formulario'>
                <Form onSubmit={onSubmitHandler}>
                    <Form.Control type='file' onChange={fileChangeHandler}></Form.Control>
                    {' '}
                    <Button type='submit'>Subir archivo</Button>
                </Form>
            </Container>
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