import React, { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav';

function About() {
  const [aboutContent, setAboutContent] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/about')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.content) {
          setAboutContent(data.content);
        } else {
          setAboutContent('No about info found.');
        }
      })
      .catch((err) => {
        console.error('Error fetching about content:', err);
        setAboutContent('Error loading about info.');
      });
  }, []);

  return (
    <div className="about-container">
      <img src="/second.jpg" alt="Aahana" className="about-image" />
      <div className="about-text">
        <h2>About Me</h2>
        <p>{aboutContent}</p>
      </div>
      <BottomNav />
    </div>
  );
}

export default About;
