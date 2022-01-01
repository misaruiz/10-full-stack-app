import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Form from './Form';

const UserSignIn = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  let navigate = useNavigate();

    const change = (event) => {     
      const value = event.target.value;
  
      if (event.target.name === 'username') {
        setUsername(value);
      }
      if (event.target.name === 'password') {
        setPassword(value);
        console.log();
      }
    }
    
  
    const submit = () => {
      const { context } = props;
      
      context.actions.signIn(username, password)
        .then( user => {
          if (user === null) {
            setErrors({ errors: [ 'Sign-in was unsuccessful' ] })
          } 
          else {
            setUsername(username);
            setPassword(password);
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
              <Form 
                cancel={()=> cancel()}
                errors={errors}
                submit={()=> submit()}
                submitButtonText="Sign In"
                elements={() => (
                  <>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">User Name</label>
                      <input 
                        id="username" 
                        name="username" 
                        type="text"
                        value={username} 
                        onChange={(event) => change(event)} 
                        className="form-control" />
                      </div>
                    <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                      <input 
                        id="password" 
                        name="password"
                        type="password"
                        value={password} 
                        onChange={(event) => change(event)} 
                        className="form-control" />                
                    </div>
                  </>
                )} />
              <p className='mt-4'>
                Don't have a user account? <br /> <Link to="/signup">Click here</Link> to sign up!
              </p>
            </Col>
          </Row>
      </main>
    );
}

export default UserSignIn;