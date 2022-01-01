import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route,  Navigate } from "react-router-dom";

import Header from './Components/Header';
import Footer from './Components/Footer';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import CourseCreate from './Components/CourseCreate';
import CourseUpdate from './Components/CourseUpdate';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import UserSignOut from './Components/UserSignOut';
import Authenticated from './Components/Authenticated';
import { Context } from "./Context";
import withContext from './Context';

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CourseCreateWithContext = withContext(CourseCreate);
const CourseUpdateWithContext = withContext(CourseUpdate);
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

          <Route path="/signin" element={<UserSignInWithContext />} />
          <Route path="/signup" element={<UserSignUpWithContext />} />
          <Route path="/signout" element={<UserSignOutWithContext />} />

          <Route path="/courses">
            <Route path=":id">
              <Route index element={<CourseDetailWithContext />} />
              <Route path="update" element={
                <RequireAuth redirectTo="/signin">
                  <CourseUpdateWithContext />
                </RequireAuth>
              } />
            </Route>
            <Route path="create" element={
              <RequireAuth redirectTo="/signin">  
                  <CourseCreateWithContext />
              </ RequireAuth>
            } />
          </Route>

          
          
          <Route path="/authenticated" element={
              <RequireAuth redirectTo="/signin">  
                  <AuthWithContext />
              </ RequireAuth>
          } />
      </Routes>
      <Footer />
    </Router>
  );
}

function RequireAuth({ children, redirectTo }) {
  const { authenticatedUser } = useContext(Context);
  return authenticatedUser ? children : <Navigate to={redirectTo} />;
}

export default App;
