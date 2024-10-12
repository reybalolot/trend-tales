import { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const NavigationBar = () => {

    const {user, unsetUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        unsetUser();
        localStorage.clear();
        navigate('/login');
    }

    return (
        <>
        <Navbar className="">
          <Container>
            <Navbar.Brand href="#home" className='text-white'><span className='fw-bold'>Trend</span>tales</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                {user.id === null ? (
                    <Nav.Link as={Link} to={'/register'} className='text-small text-white'>register</Nav.Link>
                ) : (
                    <Navbar.Text className='text-small text-white'>
                      Signed in as: <a href="#login">Mark Otto</a>
                    </Navbar.Text>
                )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </>
    )
}

export default NavigationBar;
