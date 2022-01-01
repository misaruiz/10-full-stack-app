import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Toast, ToastContainer } from 'react-bootstrap';
import { ImageAlt, PersonFill} from "react-bootstrap-icons";

export default class Header extends React.PureComponent {
    render() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const showNotification = context.showNotification;
        const setShowNotification = context.actions.setShowNotification;
        const notificationMessage = context.notificationMessage;
        return (
        <>
            {showNotification
                ?   <ToastContainer position="top-end" className="mt-5 p-3">
                        <Toast onClose={setShowNotification} delay={12000} autohide>
                            <Toast.Header>
                                <ImageAlt className="me-2 mb-1" />
                                <span className="me-auto">
                                    <span className="fw-bold">Golden Hill</span> UX Design Track
                                </span>
                                <small className="text-muted">just now</small>
                            </Toast.Header>
                            <Toast.Body>{notificationMessage}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                :   null
            }
            <div className="container-fluid mb-5 pb-5 px-0">
                <Navbar bg="warning" fixed="top" expand="lg" className="shadow">
                    <Container> 
                            <Link to="/" className="text-decoration-none">
                            <Navbar.Brand>
                                <ImageAlt className="me-2 mb-2" />
                                <span className="fw-bold">Golden Hill</span> UX Design Track
                            </Navbar.Brand>
                            </Link>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                { authUser ? <>
                                    <Navbar.Text className="me-4 lh-2">
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
        </>
        );
}
};