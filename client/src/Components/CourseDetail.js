import React, { 
    useContext, 
    useEffect, 
    useState 
  } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { Context } from "../Context";
  import { Card, Row, Col } from 'react-bootstrap';
  import { ClockFill, PenFill, TrashFill } from 'react-bootstrap-icons';


const CourseDetail = () => {

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
            <div className="mb-4 bg-white rounded-3 shadow">
                <Row className='gx-0'>
                    <Col xs={1} md={8} className="p-5">
                        <div>
                            <p className="text-secondary mb-0">Course</p>
                            <h1 className="fw-bold">Building a Basic Bookcase</h1>
                            <p className="pb-3">by Joe Smith</p>
                            <p>High-end furniture projects are great to dream about. But unless you have a well-equipped shop and some serious woodworking experience to draw on, it can be difficult to turn the dream into a reality.</p>
                            <p>Not every piece of furniture needs to be a museum showpiece, though. Often a simple design does the job just as well and the experience gained in completing it goes a long way toward making the next project even better.</p>
                            <p>Our pine bookcase, for example, features simple construction and it's designed to be built with basic woodworking tools. Yet, the finished project is a worthy and useful addition to any room of the house. While it's meant to rest on the floor, you can convert the bookcase to a wall-mounted storage unit by leaving off the baseboard. You can secure the cabinet to the wall by screwing through the cabinet cleats into the wall studs.</p>
                            <p>We made the case out of materials available at most building-supply dealers and lumberyards, including 1/2 x 3/4-in. parting strip, 1 x 2, 1 x 4 and 1 x 10 common pine and 1/4-in.-thick lauan plywood. Assembly is quick and easy with glue and nails, and when you're done with construction you have the option of a painted or clear finish.</p>
                            <p>As for basic tools, you'll need a portable circular saw, hammer, block plane, combination square, tape measure, metal rule, two clamps, nail set and putty knife. Other supplies include glue, nails, sandpaper, wood filler and varnish or paint and shellac.</p>
                            <p>The specifications that follow will produce a bookcase with overall dimensions of 10 3/4 in. deep x 34 in. wide x 48 in. tall. While the depth of the case is directly tied to the 1 x 10 stock, you can vary the height, width and shelf spacing to suit your needs. Keep in mind, though, that extending the width of the cabinet may require the addition of central shelf supports.</p>
                        </div>
                        <div className="pt-4">
                            <button className="btn btn-warning me-2" type="button"><PenFill /> Update Course</button>
                            <button className="btn btn-warning me-2" type="button"><TrashFill /> Delete Crouse</button>
                            <button className="btn btn-light" type="button"> Return to List</button>
                        </div>
                    </Col>
                    <Col xs={1} md={4} className="bg-light p-5 rounded-end">
                        <p className="text-secondary mb-0">Estimated Time</p>
                        <p className="pb-3">14 hours</p>
                        <p className="text-secondary mb-0">Materials Needed</p>
                        <ul>
                            <li>1/2 x 3/4 inch parting strip</li>
                            <li>1 x 2 common pine</li>
                            <li>1 x 4 common pine</li>
                            <li>1 x 10 common pine</li>
                            <li>1/4 inch thick lauan plywood</li>
                            <li>Finishing Nails</li>
                            <li>Sandpaper</li>
                            <li>Wood Glue</li>
                            <li>Wood Filler</li>
                            <li>Minwax Oil Based Polyurethane</li>
                        </ul>
                    </Col>
                </Row>
            </div>
        </main>
    )
};

export default CourseDetail;