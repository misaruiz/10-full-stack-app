import React, { useContext, useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../Context";
import { Row, Col, Form, Button } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons';

const CourseCreate = () => {

    const { data, emailAddress, password, authenticatedUser, actions } = useContext(Context);

    const [errors, setErrors] = useState("");
    const [validate, setValidate] = useState(false);

    let navigate = useNavigate();

    let initialState = {
        title: '',
        description: '',
        materialsNeeded: '',
        estimatedTime: '',
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value})
    }
    const { title, description, materialsNeeded, estimatedTime } = state;

    function reducer(state, { field, value }) {
        return {
            ...state,
            [field]: value
        }
    }

    const submit = (e) => {
        e.preventDefault();
        const body = {
            title,
            description,
            materialsNeeded,
            estimatedTime,
            userId: authenticatedUser.id
        };
        data.createCourse(body, emailAddress, password, authenticatedUser.id)
            .then((response) => {
                if (response.length) {
                    if (response[0].type === "Validation error")  {
                        setErrors(response);
                        setValidate(true);
                    }
                } else {
                    actions.setShowNotification('Course has been created!');
                    navigate(`/courses/${response.id}`);
                }
            })
            .catch((error) => {
                console.log(error);
                navigate("/error");
            })
        };

  const cancel = (e) => {
    e.preventDefault();
    navigate('/');
  }

    return (
        <main className="container">
            <div className="mb-4 bg-white rounded-3 shadow">
                <Form noValidate validated={validate} onSubmit={submit}>
                    <Row className='gx-0'>
                        <Col xs={1} md={8} className="p-5">
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label className="text-secondary">Course Title</Form.Label>
                                <Form.Control 
                                    required 
                                    name="title" 
                                    type="text"
                                    value={title}
                                    onChange={onChange} 
                                    className="form-control-lg fw-bold fs-1" />
                                    {errors
                                        ? errors.map(err => 
                                            err.path === 'title'
                                            ? <Form.Control.Feedback key="1" type="invalid">{err.message}</Form.Control.Feedback>
                                            : null
                                        )
                                        : null
                                    }
                            </Form.Group>
                            <p className="pb-3">by {`${authenticatedUser.firstName} ${authenticatedUser.lastName}`}</p>
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label className="text-secondary">Course Description</Form.Label>
                                <Form.Control 
                                    required 
                                    name="description"
                                    as="textarea"
                                    value={description}
                                    onChange={onChange} 
                                    style={{height: '200px'}} />
                                        {errors
                                            ? errors.map(err => 
                                                err.path === 'description'
                                                ? <Form.Control.Feedback key="2" type="invalid">{err.message}?</Form.Control.Feedback>
                                                : null
                                            )
                                            : null
                                        }
                            </Form.Group>
                            <div className="pt-4">
                                <Button variant="warning" className="me-2" type="submit"><PlusCircleFill /> Create Course</Button>
                                <Button variant="light" type="button" onClick={cancel}>Cancel</Button>
                            </div>
                        </Col>
                        <Col xs={1} md={4} className="bg-light p-5 rounded-end">
                            <Form.Group className="mb-3" controlId="estimatedTime">
                                <Form.Label className="text-secondary">Estimated Time</Form.Label>
                                <Form.Control 
                                    name="estimatedTime" 
                                    type="text"
                                    value={estimatedTime}
                                    onChange={onChange} 
                                    />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="materialsNeeded">
                                <Form.Label className="text-secondary">What You'll Learn</Form.Label>
                                <Form.Control 
                                    name="materialsNeeded"
                                    as="textarea"
                                    value={materialsNeeded}
                                    onChange={onChange} 
                                    style={{height: '200px'}} >
                                </Form.Control>              
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </div>
        </main>
    ); 
}

export default CourseCreate;