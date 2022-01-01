import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from "../Context";
import { Row, Col } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons';

const CourseUpdate = () => {

    const { data, username, password, authenticatedUser, actions } = useContext(Context);
    const [ course, setCourse ] = useState({});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
	const [materialsNeeded, setMaterialsNeeded] = useState("");
	const [estimatedTime, setEstimatedTime] = useState("");

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

  const submit = (e) => {
    e.preventDefault();
    const body = {
      title,
      description,
      materialsNeeded,
      estimatedTime,
      userId: authenticatedUser.id
    };
    data.createCourse(body, username, password, authenticatedUser.id)
        .then((response) => {
            actions.setShowNotification('Course has been created!');
            navigate(`/courses/${response.id}`);
        })
        .catch((error) => {
            console.log(error);
            navigate("/error");
        })
};

  const cancel = (e) => {
    e.preventDefault();
    navigate(`/courses/${id}`);
  }

    return (
        <main className="container">
            <div className="mb-4 bg-white rounded-3 shadow">
                <form onSubmit={submit}>
                    <Row className='gx-0'>
                        <Col xs={1} md={8} className="p-5">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label text-secondary">Course Title</label>
                                <input 
                                    id="title" 
                                    name="title" 
                                    type="text"
                                    value={course.title}
                                    onChange={ (e)=> setTitle(e.target.value) } 
                                    className="form-control form-control-lg fw-bold fs-1" />
                            </div>
                            <p className="pb-3">by {`${authenticatedUser.firstName} ${authenticatedUser.lastName}`}</p>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label text-secondary">Course Description</label>
                                <textarea 
                                    id="description" 
                                    name="description"
                                    value={course.description}
                                    onChange={ (e)=> setDescription(e.target.value) } 
                                    className="form-control"
                                    style={{height: '200px'}} >
                                </textarea>              
                                </div>
                            <div className="pt-4">
                                <button className="btn btn-warning me-2" type="submit"><PlusCircleFill className='bi' /> Update Course</button>
                                <button className="btn btn-light" type="button" onClick={cancel}>Cancel</button>
                            </div>
                        </Col>
                        <Col xs={1} md={4} className="bg-light p-5 rounded-end">
                            <div className="mb-3">
                                <label htmlFor="estimatedTime" className="form-label text-secondary">Estimated Time</label>
                                <input 
                                    id="estimatedTime" 
                                    name="estimatedTime" 
                                    type="text"
                                    value={course.estimatedTime}
                                    onChange={ (e)=> setEstimatedTime(e.target.value) } 
                                    className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="materialsNeeded" className="form-label text-secondary">Materials Needed</label>
                                <textarea 
                                    id="materialsNeeded" 
                                    name="materialsNeeded"
                                    value={course.materialsNeeded}
                                    onChange={ (e)=> setMaterialsNeeded(e.target.value) } 
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

export default CourseUpdate;