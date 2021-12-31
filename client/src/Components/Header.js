import React from "react";
import { Link } from "react-router-dom";
//   import { Context } from "../Context";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { ImageAlt, PersonFill} from "react-bootstrap-icons";

export default class Header extends React.PureComponent {
    render() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        return (
        <div className="container-fluid mb-5 pb-5 px-0 shadow">
            <Navbar bg="warning" fixed="top" expand="lg">
                <Container> 
                        <Link to="/" className="text-decoration-none">
                        <Navbar.Brand>
                            <ImageAlt className="me-2 mb-2" />
                            <span className="fw-bold">Golden Hill</span> UX Design Course
                        </Navbar.Brand>
                        </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            { authUser ? <>
                                <Navbar.Text className="me-4 lh-1">
                                    <PersonFill className="me-2 bi" />Welcome, {`${authUser.firstName}`}!
                                </Navbar.Text>
                                <Link to="/signout" className='btn btn-dark'>Sign Out</Link>
                            </> : <>
                                <Link to="/signin" className='btn btn-warning me-2'>Sign In</Link>
                                <Link to="/signup" className='btn btn-dark'>Sign Up</Link>
                            </>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
        );
}
};