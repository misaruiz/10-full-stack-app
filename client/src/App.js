import React from 'react';
import { BrowserRouter as Router, Routes, Route,  Navigate } from "react-router-dom";

import Header from './Components/Header';
import Footer from './Components/Footer';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import CreateCourse from './Components/CreateCourse';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import UserSignOut from './Components/UserSignOut';
import Authenticated from './Components/Authenticated';

import { Consumer } from './Context';
import withContext from './Context';
// import PrivateRoute from './PrivateRoute';


const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const AuthWithContext = withContext(Authenticated);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

function App() {

  return (
    <Router>
      <HeaderWithContext />
      <Routes>
          <Route path="/" element={<CoursesWithContext />} />
          <Route path="/courses/:id" element={<CourseDetailWithContext />} />
          <Route path="/courses/create" element={<CreateCourseWithContext />} />
          <Route path="/authenticated" element={
            <Consumer>
              {context => 
                (
                  props => context.authenticatedUser ? (
                    <AuthWithContext {...props} />
                  ) : (
                    <Navigate to={{
                      pathname: '/signin',
                      state: { from: props.location }
                    }} />
                  )
                )
               }
            </Consumer>
          } />
          {/* <PrivateRoute path="/authenticated" component={AuthWithContext} /> */}
          <Route path="/signin" element={<UserSignInWithContext />} />
          <Route path="/signup" element={<UserSignUpWithContext />} />
          <Route path="/signout" element={<UserSignOutWithContext />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
