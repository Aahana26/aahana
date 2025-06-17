import React, { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav';

function MyWork() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')

      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error('Error fetching projects:', err));
  }, []);

  return (
    <div className="projects-container">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-200">My Work</h2>
      {projects.length > 0 ? (
        <ul>
          {projects.map((project, index) => (
            <li key={index} className="project-card">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-lg">Loading projects...</p>
      )}
      <BottomNav />
    </div>
  );
}

export default MyWork;
