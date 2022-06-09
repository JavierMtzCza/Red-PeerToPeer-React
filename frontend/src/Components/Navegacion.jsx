import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import icono from '../Images/red-de-computadoras.png';

const Navegacion = () => {
    return (
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
    )
}

export default Navegacion