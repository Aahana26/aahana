import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProjectDetails() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`/api/projects/slug/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Project not found');
        return res.json();
      })
      .then((data) => setProject(data))
      .catch((err) => {
        console.error(err);
        setProject(null);
      });
  }, [slug]);

  if (!project) return <p className="loading">Loading...</p>;

  return (
    <div className="project-detail-container">
      <h1 className="project-detail-title">{project.title}</h1>

      <div className="project-description">{project.description}</div>

      {project.slug === 'jewelry-website' && (
        <img
          src="/images/ring.png"
          alt="Jewelry Screenshot"
          className="project-image"
        />
      )}
    </div>
  );
}

export default ProjectDetails;
