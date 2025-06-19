import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  return (
    <div className="home-container">
      <div className="top-section">

        <div
      style={{
        marginLeft:'350px',
        marginTop:'450px',
      }}
    ></div>
        
        {/* Text section with entrance animation */}
        <motion.div
          className="text-section"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <h1>Hello,</h1>
          <h2>I am Aahana</h2>
        </motion.div>

        {/* Image section without animation */}
        <div className="image-section">
          <img src="/new.jpg" alt="Aahana" />
        </div>
      </div>

      {/* Navigation links */}
      <nav className="home-nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/mywork">My Work</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </div>
  );
}

export default Home;
