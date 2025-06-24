import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProjectDetails() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`/api/projects/slug/${slug}`) // 🔁 Updated to match backend route
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

  if (!project) return <p style={{ textAlign: 'center' }}>Loading or project not found...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1 className="text-3xl font-bold">{project.title}</h1>
      <p className="mt-4">{project.description}</p>
    </div>
  );
}

export default ProjectDetails;
