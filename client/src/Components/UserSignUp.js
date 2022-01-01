import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from "../Context";
import { Row, Col, Form, Button } from 'react-bootstrap';

const UserSignUp = () => {

  const { data, actions } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [validate, setValidate] = useState(false);
  // console.log(errors.map(err => err.path));

  let navigate = useNavigate();

    // const change = (event) => {     
    //   const value = event.target.value;
  
    //   if (event.target.name === 'firstName') {
    //     setFirstName(value);
    //   }
    //   if (event.target.name === 'lastName') {
    //     setLastName(value);
    //   }
    //   if (event.target.name === 'username') {
    //     setUsername(value);
    //   }
    //   if (event.target.name === 'password') {
    //     setPassword(value);
    //   }
    // }
  
    const submit = (e) => {
      e.preventDefault();

      const body = {
        firstName,
        lastName,
        emailAddress: username,
        password
      }
      console.log(body);
      
      data.createUser(body, username, password)
        .then( response => {
          if(response) {
            setErrors(response);
            setValidate(true);
          } else {
            actions.setShowNotification(`Thanks for signing up, ${body.firstName}!`);
            actions.signIn(username, password);
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
      <main className="container mb-5">
          <Row xs={1} lg={3} className='justify-content-center'>
            <Col className='shadow rounded p-5 bg-white'>
              <h1 className='mb-3 fw-bold'>Sign Up</h1>
              <Form noValidate validated={validate} onSubmit={submit}>
                  <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      required 
                      name="firstName" 
                      type="text"
                      onChange={ (e)=> setFirstName(e.target.value) }
                    />
                      {errors
                        ? errors.map(err => 
                            err.path === 'firstName'
                              ? <Form.Control.Feedback key="1" type="invalid">{err.message}</Form.Control.Feedback>
                              : null
                          )
                        : null
                      }
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                      required
                      name="lastName" 
                      type="text"
                      onChange={ (e)=> setLastName(e.target.value) }
                    />
                      {errors
                        ? errors.map(err => 
                            err.path === 'lastName'
                              ? <Form.Control.Feedback key="2" type="invalid">{err.message}</Form.Control.Feedback>
                              : null
                          )
                        : null
                      }
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control 
                      required
                      name="username" 
                      type="text"
                      onChange={ (e)=> setUsername(e.target.value) }
                    />
                      {errors
                        ? errors.map(err => 
                            err.path === 'emailAddress'
                              ? <Form.Control.Feedback key="3" type="invalid">{err.message}</Form.Control.Feedback>
                              : null
                          )
                        : null
                      }
                    </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      required 
                      name="password"
                      type="password"
                      onChange={ (e)=> setPassword(e.target.value) } 
                    />
                      {errors
                        ? errors.map(err => 
                            err.path === 'password'
                              ? <Form.Control.Feedback key="4" type="invalid">{err.message}</Form.Control.Feedback>
                              : null
                          )
                        : null
                      }                
                  </Form.Group>
                  <Form.Group className="pad-bottom">
                    <Button variant="warning" className="me-2" type="submit">Sign Up</Button>
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

export default UserSignUp;