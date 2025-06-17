import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="text-section">
        <h1>Hello,</h1>
        <h2>I am Aahana</h2>
      </div>

      <div className="image-section">
        <img src="/new.jpg" alt="Aahana" />
      </div>

      {/* Home-specific nav links */}
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
