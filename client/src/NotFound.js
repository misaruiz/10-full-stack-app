import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

const NotFound = () => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={8} className="shadow rounded p-5 bg-warning text-center">
                    <h1>Hmmm... there's nothing here.</h1>
                    <p className="fs-4">Here is a handy button to get you back on your way.</p>
                    <Link to="/" className="btn btn-dark btn-lg">Take Me Home</Link>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;