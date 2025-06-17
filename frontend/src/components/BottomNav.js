import React from 'react';
import { Link } from 'react-router-dom';

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/mywork">My Work</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}

export default BottomNav;
