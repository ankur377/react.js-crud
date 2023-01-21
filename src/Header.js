import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom'

function Header() {
    const history = useNavigate();
    const user = JSON.parse(localStorage.getItem('user-info'));
    function logout() {
        localStorage.clear();
        history("/register");
    }
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand>Ecomm</Navbar.Brand>
                    <Nav className="me-auto nav_bar_wrapper">
                        {
                            localStorage.getItem('user-info') ?
                                <>
                                    <Link to="/add">Add Product</Link>
                                    <Link to="/list">List Product</Link>
                                </>
                                :
                                <>
                                    <Link to="/login">Login</Link>
                                    <Link to="/register">Register</Link>
                                </>
                        }
                    </Nav>
                    {
                        localStorage.getItem('user-info') ?
                            <Nav>
                                <NavDropdown style={{ color: "whitesmoke" }} title={user && user.username}>
                                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                    <NavDropdown.Item >Profile</NavDropdown.Item>


                                </NavDropdown>
                            </Nav> : null
                    }
                </Container>
            </Navbar>
        </>
    )
}

export default Header;