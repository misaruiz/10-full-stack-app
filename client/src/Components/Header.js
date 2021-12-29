import React, { 
    useContext, 
    useEffect, 
    useState 
  } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { Context } from "../Context";
  import { Navbar, Container, Nav } from 'react-bootstrap';

  const Header = () => {
    const { data } = useContext(Context);
    // const [ courses, setCourses ] = useState([]);
    // let navigate = useNavigate();
    return (
        <Navbar bg="primary" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand href="#home">Golden Hill College</Navbar.Brand>
                <Nav className="ms-auto">
                    <Link to="#home" className='nav-link'>Sign Up</Link>
                    <Link to="#features" className='nav-link'>Sign In</Link>
                </Nav>
            </Container>
        </Navbar>
    )
  }

  export default Header;