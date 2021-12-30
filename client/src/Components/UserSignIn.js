import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Form from './Form';

export default class UserSignIn extends Component {

  state = {
    username: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      username,
      password,
      errors,
    } = this.state;
    console.log(this.state);

    return (
      <main className="container">
          <Row xs={1} lg={3} className='justify-content-center'>
            <Col className='shadow rounded p-5 bg-white'>
              <h1 className='mb-3 fw-bold'>Sign In</h1>
              <Form 
                cancel={this.cancel}
                errors={errors}
                submit={this.submit}
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
                        onChange={this.change} 
                        className="form-control" />
                      </div>
                    <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                      <input 
                        id="password" 
                        name="password"
                        type="password"
                        value={password} 
                        onChange={this.change} 
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

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    console.log(this.props);
    const { from } = this.props.location.state || { from: { pathname: '/authenticated' } };
    const { username, password } = this.state;

    context.actions.signIn(username, password)
      .then( user => {
        if (user === null) {
          this.setState(() => {
            return { errors: [ 'Sign-in was unsuccessful' ] };
          })
        } 
        else {
          this.props.history.push(from);
          // this.props.history.push('/');
          // navigate('/');
      }
      })
      .catch( error => {
        console.log(error);
        this.props.navigate('/error');
      })
  }

  cancel = () => {
    this.props.navigate('/');
  }
}
