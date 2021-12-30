import React from "react";
import { Link } from "react-router-dom";
//   import { Context } from "../Context";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { ImageAlt } from "react-bootstrap-icons";

export default class Header extends React.PureComponent {
    render() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        return (
        <div className="container-fluid mb-5 pb-5 px-0 shadow">
            <Navbar bg="warning" fixed="top">
                <Container>
                    <Navbar.Brand href="/">
                        <ImageAlt className="me-2 mb-2" />
                        <span className="fw-bold">Golden Hill</span> UX Design Course
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        { authUser ? <>
                            <span className="btn">Welcome, {authUser.name}!</span>
                            <Link to="/signout" className='btn btn-warning'>Sign Out</Link>
                        </> : <>
                            <Link to="/signin" className='btn btn-warning me-2'>Sign In</Link>
                            <Link to="/signup" className='btn btn-dark'>Sign Up</Link>
                        </>}
                    </Nav>
                </Container>
            </Navbar>
        </div>
        );
}
};