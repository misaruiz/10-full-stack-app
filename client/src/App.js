import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

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
import UnhandledError from './Components/UnhandledError';
import NotFound from './NotFound';
import Forbidden from './Components/Forbidden';
import PrivateRoute from './PrivateRoute';

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
            <Route index element={<Navigate to="/" />} />
            <Route path=":id">
              <Route index element={<CourseDetailWithContext />} />
              <Route path="update" element={
                <PrivateRoute redirectTo="/forbidden">
                  <CourseUpdateWithContext />
                </PrivateRoute>
              } />
            </Route>
            <Route path="create" element={
              <PrivateRoute redirectTo="/signin">  
                  <CourseCreateWithContext />
              </ PrivateRoute>
            } />
          </Route>
          
          <Route path="/authenticated" element={
              <PrivateRoute redirectTo="/forbidden">  
                  <AuthWithContext />
              </ PrivateRoute>
          } />
          <Route path="/error" element={<UnhandledError />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
