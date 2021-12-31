import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Form from './Form';

const UserSignIn = (props) => {

  // state = {
  //   username: '',
  //   password: '',
  //   errors: [],
  // }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  let location = useLocation();
  let navigate = useNavigate();
//  const [name, setName] = useState("");

    // const {
    //   username,
    //   password,
    //   errors,
    // } = state;
    // console.log(state);

    const change = (event) => {     
      // setName(event.target.name);
      const value = event.target.value;
  
      // setName(value);
      if (event.target.name === 'username') {
        setUsername(value);
      }
      if (event.target.name === 'password') {
        setPassword(value);
      }
    }
  
    const submit = () => {
      const { context } = props;
      console.log(props);
      // const { from } = location.state || { from: { pathname: '/authenticated' } };
  
      context.actions.signIn(username, password)
        .then( user => {
          if (user === null) {
            setErrors({ errors: [ 'Sign-in was unsuccessful' ] })
          } 
          else {
            console.log(location);
            // navigate(location.pathname || '/authenticated');
            navigate(-1);
            // props.history.push('/');
            // navigate('/');
        }
        })
        .catch( error => {
          console.log(error);
          navigate('/error');
        })
    }
  
    const cancel = () => {
      navigate('/');
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