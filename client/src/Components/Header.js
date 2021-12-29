import React from "react";
import { Link, useNavigate } from "react-router-dom";
//   import { Context } from "../Context";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { CameraReelsFill } from "react-bootstrap-icons";

export default class Header extends React.PureComponent {
    render() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        return (
        <div className="container-fluid mb-4 px-0 shadow">
            <Navbar bg="warning" sticky="top">
                <Container>
                    <Navbar.Brand href="/">
                        <CameraReelsFill className="me-2 mb-1" />
                        Golden Hill Film School
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        { authUser ? <>
                            <span>Welcome, {authUser.name}!</span>
                            <Link to="/signout" className='btn'>Sign Out</Link>
                        </> : <>
                            <Link to="/signin" className='btn'>Sign In</Link>
                            <Link to="/signup" className='btn btn-dark'>Sign Up</Link>
                        </>}
                    </Nav>
                </Container>
            </Navbar>
        </div>
        );
}
};