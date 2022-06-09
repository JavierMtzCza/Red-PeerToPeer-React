import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalPersonalizado = (props) => {
    return (
        <Modal show={props.mostrar} onHide={props.cerrar}>
            <Modal.Body>{props.texto}</Modal.Body>
            <Modal.Footer>
                <Button variant={props.variante} onClick={props.cerrar}>
                    Entendido
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalPersonalizado