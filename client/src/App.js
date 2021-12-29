import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Courses from './Components/Courses';
import Header from './Components/Header';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import UserSignOut from './Components/UserSignOut';
import withContext from './Context';


const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

function App() {

  return (
    <BrowserRouter>
      <HeaderWithContext />
      <Routes>
          <Route path="/" element={<CoursesWithContext />} />
          <Route path="/signin" element={<UserSignInWithContext />} />
          <Route path="/signup" element={<UserSignUpWithContext />} />
          <Route path="/signout" element={<UserSignOutWithContext />} />
      </Routes>
    </ BrowserRouter>
  );
}

export default App;
