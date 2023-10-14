import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash, faFilm } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import  Navbar  from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

export const Header = ({setSuccessMessage}) => {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    let navigate = useNavigate();
    const goToLogin = () => {
        navigate("/login");
    };
    const goToSignup = () => {
        navigate("/signup");
    };
    const handleLogout = () => {
        setSuccessMessage("You have successfully logged out.");
        setTimeout(() => {
            setSuccessMessage(null);
        }, 3000);
        logout();
        navigate("/");
    };

    return (
        <Navbar bg='dark' variant='dark' expand='lg'>
            <Container fluid className="mx-2">
                <Navbar.Brand href='/' style={{"color": "gold"}}>
                    <FontAwesomeIcon icon={faFilm} /> Reel Reviewer
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbarScroll'style={{maxWidth: '70px'}} />
                <Navbar.Collapse id='navbarScroll'>
                <Nav
                    className='me-auto my-2 my-lg-0'
                    style={{maxHeight: '100px'}}
                    navbarScroll
                >
                    <NavLink className='nav-link'  to='/' >Home</NavLink>
                    <NavLink className='nav-link' to='/watchlist' >Watch List</NavLink>
                </Nav>
                {user && <Button variant='outline-info' onClick={handleLogout} style={{maxWidth: '100px'}} className="me-2">Logout</Button>}
                {!user && <Button variant='outline-info' onClick={goToLogin} style={{maxWidth: '100px'}} className="me-2">Login</Button>}
                {!user && <Button variant='outline-info' onClick={goToSignup} style={{maxWidth: '100px'}}>Register</Button>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};