// import './Styles/App.css';
// import './Styles/reset.css';
// import './Styles/global.css';

import React from 'react';
import { Routes, Route, Link } from "react-router-dom";

import withContext from './Context';
import Courses from './Components/Courses';
import Header from './Components/Header';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import UserSignOut from './Components/UserSignOut';


const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

function App() {

  return (
    <>
      <HeaderWithContext />
      <Routes>
          <Route path="/" element={<CoursesWithContext />} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
      </Routes>
    </>
  );
}

export default App;
