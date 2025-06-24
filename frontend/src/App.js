import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import MyWork from './pages/MyWork';
import Contact from './pages/Contact';
import ProjectDetails from './pages/ProjectDetails';

import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mywork" element={<MyWork />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects/:slug" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
