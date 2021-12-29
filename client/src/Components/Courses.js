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
        <main className="container mt-5">
            <h1 className="mb-4">Courses</h1>
            <Row md={3} className='g-4'>
                {courses.map((course) => (
                    <Col key={course.id}>
                        <Card bg='white' text='dark' className='h-100 border-0 shadow-sm'>
                            <Card.Header 
                                className='bg-secondary text-white border-bottom-0 d-flex flex-row'>
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
                            </Card.Body>
                            <Card.Footer className='border-top-0 bg-transparent'>
                                <Link 
                                    to={`/courses/${course.id}`}  
                                    className='stretched-link'>
                                    Details
                                </Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
                <Col>
                    <Card bg='transparent' text='dark' className='h-100 border-0'>
                        <Card.Body className='border-top-0 bg-transparent d-flex align-items-center justify-content-center'>
                                <Link to='/create-new-course' className='stretched-link btn btn-primary btn-lg shadow-sm'>
                                    <PlusCircleFill className="mb-1 me-1" /> Create New Course
                                </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </main>
    )
};

export default Courses;