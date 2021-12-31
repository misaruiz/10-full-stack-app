import React, { useContext, useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import { Context } from "../Context";
  import { Row, Col } from 'react-bootstrap';
  import { PenFill, TrashFill } from 'react-bootstrap-icons';


const CourseDetail = () => {

    const { data } = useContext(Context);
    const [ course, setCourse ] = useState({});
    let navigate = useNavigate();
    const { id } = useParams();
    // const courseId = params.id;
    // let currentCourse;

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

    // const {
    //     title,
    //     description,
    //     estimatedTime,
    //     materialsNeeded
    // } = course;
    // const { firstName, lastName } = course.user;

    return (
        <main className="container">
            <div className="mb-4 bg-white rounded-3 shadow">
                <Row className='gx-0'>
                    <Col xs={1} md={8} className="p-5">
                        <div>
                            <p className="text-secondary mb-0">Course</p>
                            <h1 className="fw-bold">{course.title}</h1>
                            {/* <p className="pb-3">by {course.user.firstName} {course.user.lastName}</p> */}
                            <p>{course.description}</p>
                        </div>
                        <div className="pt-4">
                            <button className="btn btn-warning me-2" type="button"><PenFill className="bi" /> Update Course</button>
                            <button className="btn btn-warning me-2" type="button"><TrashFill className="bi" /> Delete Crouse</button>
                            <button className="btn btn-light" type="button"> Return to List</button>
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