import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

const Forbidden = () => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={8} className="shadow rounded p-5 bg-warning text-center">
                    <h1>Welcome, to the Forbidden city!</h1>
                    <p className="fs-4">Seriously, you don't have the proper credentials or you don't know the right people to access this page. </p>
                    <Link to="/" className="btn btn-dark btn-lg">Take Me Home</Link>
                </Col>
            </Row>
        </Container>
    );
};

export default Forbidden;