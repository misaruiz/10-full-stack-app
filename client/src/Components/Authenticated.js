import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';


export default ({ context  }) => {
  const authUser = context.authenticatedUser;
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} className="shadow rounded p-5 bg-warning text-center">
          <h1>{authUser.firstName} {authUser.lastName} is authenticated!</h1>
          <p>Your emailAddress is {authUser.emailAddress}.</p>
          <Link to="/" className="btn btn-dark btn-lg">Start Browsing!</Link>
        </Col>
      </Row>
    </Container>
  );
}