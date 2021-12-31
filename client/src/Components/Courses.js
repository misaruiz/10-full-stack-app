import React, { 
    useContext, 
    useEffect, 
    useState 
  } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { Context } from "../Context";
  import { Card, Row, Col } from 'react-bootstrap';
  import { ClockFill, PlusCircleFill, ImageAlt } from 'react-bootstrap-icons';


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
        <main className="container pb-5">
            <div className="p-5 mb-4 bg-white rounded-3 shadow" style={{
                background: "url(/images/ux-design-bkg.png)",
                backgroundSize: "cover",
                backgroundPosition: "center"
                }}>
                <div className="container-fluid py-4">
                    <h1 className="display-5 text-white mb-0 pb-3">
                        <ImageAlt className="me-2 mb-4" />
                        <span className="fw-bold">Golden Hill</span> UX Design Course
                    </h1>
                    <p className="col-md-8 fs-4 text-white pb-3">In this course, you'll learn various methods of iterating on a design idea, from wireframing to building a mockup to sharing interactive prototypes.</p>
                    <button className="btn btn-warning btn-lg" type="button"><PlusCircleFill className="bi" /> Create New Course</button>
                </div>
            </div>
            <Row xs={1} md={2} lg={3} className='g-4'>
                {courses.map((course) => (
                    <Col key={course.id}>
                        <Card bg='warning' text='dark' className='h-100 border-0 shadow'>
                            <Card.Header 
                                className='border-bottom-0'>
                                    <div className="opacity-75 d-flex flex-row">
                                        <div>
                                            Course
                                        </div>
                                        <div className="ms-auto">
                                            <ClockFill className="me-2 bi" />
                                            {course.estimatedTime}
                                        </div>
                                    </div>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title className="fw-bold fs-4">{course.title}</Card.Title>
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