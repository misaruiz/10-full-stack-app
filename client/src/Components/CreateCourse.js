import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons';
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

    return (
        <main className="container">
            <div className="mb-4 bg-white rounded-3 shadow">
                <form>
                    <Row className='gx-0'>
                        <Col xs={1} md={8} className="p-5">
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label text-secondary">Course Title</label>
                                <input 
                                    id="username" 
                                    name="username" 
                                    type="text"
                                    value={username} 
                                    onChange={this.change} 
                                    className="form-control form-control-lg" />
                            </div>
                            <p className="pb-3">by Joe Smith</p>
                            <div className="mb-3">
                                <label htmlFor="courseDescription" className="form-label text-secondary">Course Description</label>
                                <textarea 
                                    id="courseDescription" 
                                    name="courseDescription"
                                    onChange={this.change} 
                                    className="form-control"
                                    style={{height: '200px'}} >
                                </textarea>              
                                </div>
                            <div className="pt-4">
                                <button className="btn btn-warning me-2" type="button"><PlusCircleFill /> Create Course</button>
                                <button className="btn btn-light" type="button">Cancel</button>
                            </div>
                        </Col>
                        <Col xs={1} md={4} className="bg-light p-5 rounded-end">
                            <div className="mb-3">
                                <label htmlFor="estimatedTime" className="form-label text-secondary">Estimated Time</label>
                                <input 
                                    id="estimatedTime" 
                                    name="estimatedTime" 
                                    type="text"
                                    onChange={this.change} 
                                    className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="materialsNeeded" className="form-label text-secondary">Materials Needed</label>
                                <textarea 
                                    id="materialsNeeded" 
                                    name="materialsNeeded"
                                    onChange={this.change} 
                                    className="form-control"
                                    style={{height: '200px'}} >
                                </textarea>              
                            </div>
                        </Col>
                    </Row>
                </form>
        </div>
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
    const { from } = this.props.location.state || { from: { pathname: '/authenticated' } };
    const { username, password } = this.state;
    context.actions.signIn(username, password)
      .then( user => {
        if (user === null) {
          this.setState(() => {
            return { errors: [ 'Sign-in was unsuccessful' ] };
          })
        } else {
          this.props.navigate(from);
      }
      })
      .catch( err => {
        console.log(err);
        this.props.navigate('/error');
      })
  }

  cancel = () => {
    this.props.navigate('/');
  }
}
