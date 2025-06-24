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

  if (!project) return <p>Loading...</p>;

    return (
      <div className="project-detail-container">
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

        {/* ⬇️ Description from database */}
        <div
          className="mb-4"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />

        {/* ⬇️ Conditionally show image only for jewelry project */}
        {project.slug === 'jewelry-website' && (
          <img
            src="/images/ring.png"
            alt="Jewelry Screenshot"
            style={{ width: '50%' }}
            className="w-full max-w-md mx-auto rounded shadow"
          />
        )}
      </div>
    );
  }

export default ProjectDetails;
