import React, { 
    useContext, 
    useEffect, 
    useState 
  } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { Context } from "../Context";
  import { Card, Row, Col } from 'react-bootstrap';
  import { ClockFill, PlusCircleFill } from 'react-bootstrap-icons';


const Courses = () => {

    const { data } = useContext(Context);
    const [ courses, setCourses ] = useState([]);
    let navigate = useNavigate();

    // Get courses
    useEffect(() => {
        data.getCourses()
        .then((response) => {
            setCourses(response);
        })
        .catch((error) => {
            navigate.push("/error");
            console.log(error);
        });
    }, [data, navigate]);

    return (
        <main className="container">
            <div className="p-5 mb-4 bg-white rounded-3 shadow" style={{
                background: "url(/images/pexels-kyle-loftus-3379934.png)",
                backgroundSize: "cover"
                }}>
                <div className="container-fluid">
                    <h1 className="display-5 fw-bold text-white">Courses</h1>
                    <p className="col-md-8 fs-4 text-white">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
                    <button className="btn btn-warning btn-lg" type="button"><PlusCircleFill /> Create New Course</button>
                </div>
            </div>
            <Row xs={1} md={2} lg={3} className='g-4'>
                {courses.map((course) => (
                    <Col key={course.id}>
                        <Card bg='warning' text='dark' className='h-100 border-0 shadow'>
                            <Card.Header 
                                className='border-bottom-0 d-flex flex-row'>
                                <div>
                                    Course
                                </div>
                                <div className="ms-auto">
                                    <ClockFill className="me-2 mb-1" />
                                    {course.estimatedTime}
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{course.title}</Card.Title>
                                <Link 
                                    to={`/courses/${course.id}`}  
                                    className='stretched-link' />
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </main>
    )
};

export default Courses;