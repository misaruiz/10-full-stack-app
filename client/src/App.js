// import './Styles/App.css';
// import './Styles/reset.css';
// import './Styles/global.css';

import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import withContext from './Context';
import Courses from './Components/Courses';
import Header from './Components/Header';

const CoursesWithContext = withContext(Courses);

function App() {

  return (
    <>
      <Header />
      <Routes>
          <Route path="/" element={<CoursesWithContext />} />
      </Routes>
    </>
  );
}

export default App;
