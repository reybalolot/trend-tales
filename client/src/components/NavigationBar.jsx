import { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import UserContext from '../context/UserContext';

const NavigationBar = () => {

    const {user, unsetUser} = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        unsetUser();
        localStorage.clear();
        navigate('/login');
    }

    return (
        <>
        <Navbar className="rounded-bottom fixed-top">
          <Container>
            <Navbar.Brand as={Link} to={'/'} className='text-white'><span className='fw-bold'>Trend</span>tales</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                {user.id === null ? (
                  location.pathname == '/login' ? (
                    <Nav.Link as={Link} to={'/register'} className='text-sm text-white'>register</Nav.Link>
                  ) : (
                    <Nav.Link as={Link} to={'/login'} className='text-sm text-white'>log in</Nav.Link>
                  )
                ) : (
                  <>
                    <Navbar.Text className='text-sm text-white'>
                      {/* <div className='text-xxs d-flex'>Signed in as:</div> */}
                      <a href="#login" className='d-flex text-white text-decoration-none'>{ user.username }</a>
                    </Navbar.Text>
                    <div className='text-white mx-2'> | </div>
                    <Nav.Link onClick={handleLogout} className='text-sm text-white'>log out</Nav.Link>
                  </>
                )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </>
    )
}

export default NavigationBar;
