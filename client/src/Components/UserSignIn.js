import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from "../Context";
import { Row, Col, Form, Button } from 'react-bootstrap';

const UserSignIn = (props) => {

  const { actions } = useContext(Context);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState(false);

  let navigate = useNavigate();

    // const change = (event) => {     
    //   const value = event.target.value;
  
    //   if (event.target.name === 'emailAddress') {
    //     setEmailAddress(value);
    //   }
    //   if (event.target.name === 'password') {
    //     setPassword(value);
    //     console.log();
    //   }
    // }
    
  
    const submit = (e) => {
      e.preventDefault();
      
      actions.signIn(emailAddress, password)
        .then( response => {
          if (response === null) {
            setValidate(true);
          } 
          else {
            // setEmailAddress(emailAddress);
            // setPassword(password);
            navigate(-1);
        }
        })
        .catch( error => {
          console.log(error);
          navigate('/error');
        })
    }
  
    const cancel = () => {
      navigate(-1);
    }

    return (
      <main className="container">
          <Row xs={1} lg={3} className='justify-content-center'>
            <Col className='shadow rounded p-5 bg-white'>
              <h1 className='mb-3 fw-bold'>Sign In</h1>
              <Form noValidate validated={validate} onSubmit={submit}>
                    <Form.Group className="mb-3" controlId="emailAddress">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control 
                        required 
                        name="emailAddress" 
                        type="text"
                        value={emailAddress} 
                        onChange={ (e)=> setEmailAddress(e.target.value) } 
                      />
                      <Form.Control.Feedback key="1" type="invalid">You'll need an email address to sign in!</Form.Control.Feedback>
                      </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                      <Form.Control 
                        required 
                        name="password"
                        type="password"
                        value={password} 
                        onChange={ (e)=> setPassword(e.target.value) } 
                      />
                      <Form.Control.Feedback key="1" type="invalid">You'll need to submit a password!</Form.Control.Feedback>   
                    </Form.Group>
                    <Form.Group className="pad-bottom">
                      <Button variant="warning" className="me-2" type="submit">Sign In</Button>
                      <Button variant="light" onClick={cancel}>Cancel</Button>
                  </Form.Group>
              </Form>
              <p className='mt-4'>
                Don't have a user account? <br /> <Link to="/signup">Click here</Link> to sign up!
              </p>
            </Col>
          </Row>
      </main>
    );
}

export default UserSignIn;