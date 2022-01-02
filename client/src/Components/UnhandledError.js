import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { BugFill } from "react-bootstrap-icons";

const Errors = () => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={8} className="shadow rounded p-5 bg-warning text-center">
                    <BugFill className="bi display-1 mb-3" />
                    <h1 >Oh no! There seems to be an error!</h1>
                    <p className="fs-4">Here is a handy button to get you back home</p>
                    <Link to="/" className="btn btn-dark btn-lg">Take Me Home</Link>
                </Col>
            </Row>
        </Container>
    );
};

export default Errors;