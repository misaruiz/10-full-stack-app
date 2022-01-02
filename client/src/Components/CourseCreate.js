import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../Context";
import { Row, Col } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons';

const CourseCreate = () => {

  const { data, emailAddress, password, authenticatedUser, actions } = useContext(Context);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
	const [materialsNeeded, setMaterialsNeeded] = useState("");
	const [estimatedTime, setEstimatedTime] = useState("");

  let navigate = useNavigate();

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
    this.props.navigate('/');
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
                                    onChange={ (e)=> setTitle(e.target.value) } 
                                    className="form-control form-control-lg" />
                            </div>
                            <p className="pb-3">by Joe Smith</p>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label text-secondary">Course Description</label>
                                <textarea 
                                    id="description" 
                                    name="description"
                                    onChange={ (e)=> setDescription(e.target.value) } 
                                    className="form-control"
                                    style={{height: '200px'}} >
                                </textarea>              
                                </div>
                            <div className="pt-4">
                                <button className="btn btn-warning me-2" type="submit"><PlusCircleFill /> Create Course</button>
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
                                    onChange={ (e)=> setEstimatedTime(e.target.value) } 
                                    className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="materialsNeeded" className="form-label text-secondary">Materials Needed</label>
                                <textarea 
                                    id="materialsNeeded" 
                                    name="materialsNeeded"
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

export default CourseCreate;