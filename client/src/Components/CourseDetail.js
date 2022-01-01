import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../Context";
import { Row, Col } from 'react-bootstrap';
import { PenFill, TrashFill } from 'react-bootstrap-icons';


const CourseDetail = () => {

    const { data, username, password, authenticatedUser, actions } = useContext(Context);
    const [ course, setCourse ] = useState({});
    let navigate = useNavigate();
    const { id } = useParams();

    // Get courses
    useEffect(() => {
        data.getCourse(id)
        .then((response) => {
            setCourse(response);
        })
        .catch((error) => {
            navigate("/error");
            console.log(error);
        });
    }, [data, id, navigate, setCourse]);

    const handleDelete = () => {
        data.deleteCourse(id, username, password)
            .then((response) => {
                actions.setShowNotification('Course has been deleted!');
                navigate(-1);
                return response;
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <main className="container">
            <div className="mb-4 bg-white rounded-3 shadow">
                <Row className='gx-0'>
                    <Col xs={1} md={8} className="p-5">
                        <div>
                            <p className="text-secondary mb-0">Course</p>
                            <h1 className="fw-bold">{course.title}</h1>
                            { course.user
                                ?   <p className="pb-3">by {course.user.firstName} {course.user.lastName}</p>
                                :   null
                            }
                            <p>{course.description}</p>
                        </div>
                        <div className="pt-4">
                            {   (course.user) 
                                    ? (authenticatedUser)
                                        ? (authenticatedUser.emailAddress === course.user.emailAddress)
                                            ?   <>
                                                    <Link to={`/courses/${course.id}/update`} className="btn btn-warning me-2" type="button"><PenFill className="bi" /> Update Course</Link>
                                                    <button className="btn btn-warning me-2" type="button" onClick={handleDelete}><TrashFill className="bi" /> Delete Crouse</button>
                                                    <Link to="/" className="btn btn-light" type="button"> Return to List</Link>
                                                </>
                                            : <Link to="/" className="btn btn-warning" type="button"> Return to List</Link>
                                        : <Link to="/" className="btn btn-warning" type="button"> Return to List</Link>
                                    :   null
                            }
                        </div>
                    </Col>
                    <Col xs={1} md={4} className="bg-light p-5 rounded-end">
                        <p className="text-secondary mb-0">Estimated Time</p>
                        <p className="pb-3">{course.estimatedTime}</p>
                        <p className="text-secondary mb-0">Materials Needed</p>
                        <ul>
                            <li>{course.materialsNeeded}</li>
                        </ul>
                    </Col>
                </Row>
            </div>
        </main>
    )
};

export default CourseDetail;