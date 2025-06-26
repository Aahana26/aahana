import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import BottomNav from '../components/BottomNav';

function MyWork() {
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editedProject, setEditedProject] = useState({ title: '', description: '' });
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error('Error fetching projects:', err));

    const token = localStorage.getItem('token');
    setIsAdmin(!!token);
  }, []);

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        setIsAdmin(true);
        setShowLoginForm(false);
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Server error during login');
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAdmin(false);
  };

  // Add New Project
  const handleNewProjectSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProject),
    });
    const data = await res.json();
    if (res.ok) {
      setProjects([...projects, data]);
      setNewProject({ title: '', description: '' });
      alert('Project added successfully!');
    } else {
      alert('Error adding project');
    }
  };

  // Start editing a project
  const handleEditClick = (project) => {
    setEditingProjectId(project._id);
    setEditedProject({ title: project.title, description: project.description });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingProjectId(null);
    setEditedProject({ title: '', description: '' });
  };

  // Save edited project to backend
  const handleSaveEdit = async (projectId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedProject),
    });
    const data = await res.json();
    if (res.ok) {
      setProjects(projects.map(p => (p._id === projectId ? data : p)));
      setEditingProjectId(null);
      setEditedProject({ title: '', description: '' });
      alert('Project updated successfully!');
    } else {
      alert(data.message || 'Error updating project');
    }
  };

  // Delete a project
const handleDeleteProject = async (projectId) => {
  const token = localStorage.getItem('token');
  const confirmDelete = window.confirm("Are you sure you want to delete this project?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setProjects(projects.filter((p) => p._id !== projectId));
      alert('Project deleted successfully!');
    } else {
      const data = await res.json();
      alert(data.message || 'Error deleting project');
    }
  } catch (err) {
    console.error('Delete error:', err);
    alert('Server error during deletion');
  }
};


  return (
    <div className="projects-container">
      <h1 className="mywork-title">My Work</h1>
      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project._id} className="project-card">
              {editingProjectId === project._id ? (
                <>
                  <input
                    type="text"
                    value={editedProject.title}
                    onChange={(e) =>
                      setEditedProject({ ...editedProject, title: e.target.value })
                    }
                    className="block w-full p-2 mb-2 border rounded"
                  />
                  <textarea
                    value={editedProject.description}
                    onChange={(e) =>
                      setEditedProject({ ...editedProject, description: e.target.value })
                    }
                    className="block w-full p-2 mb-2 border rounded"
                  />
                  <button
                    onClick={() => handleSaveEdit(project._id)}
                    className="mr-2 px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-3 py-1 bg-gray-400 text-white rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h3>
                    <Link
                      to={`/projects/${project.slug}`}
                      className="project-title"
                    >
                      {project.title}
                    </Link>
                  </h3>

                  <div className="divider" />
                  <p style={{ whiteSpace: 'pre-line' }}>{project.description}</p>

                    {isAdmin && (
                      <>
                        <button
                          onClick={() => handleEditClick(project)}
                          className="mt-2 px-3 py-1 bg-purple-600 text-white rounded"
                        >
                          Edit Project
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project._id)}
                          className="mt-2 ml-2 px-3 py-1 bg-red-600 text-white rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}

                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-lg">Loading projects...</p>
      )}

      {!isAdmin && !showLoginForm && (
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button
            className="text-sm text-gray-400 hover:underline"
            onClick={() => setShowLoginForm(true)}
          >
            Admin Login
          </button>
        </div>
      )}

      {showLoginForm && (
        <form onSubmit={handleLoginSubmit} className="admin-login-form mt-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-2 mb-2 border rounded"
            required
          />
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
            Login
          </button>
        </form>
      )}

      {isAdmin && (
        <>
          <form onSubmit={handleNewProjectSubmit} className="mt-6">
            <h3 className="text-xl font-bold mb-2">Add New Project</h3>
            <input
              type="text"
              placeholder="Title"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              className="block w-full p-2 mb-2 border rounded"
              required
            />
            <textarea
              placeholder="Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="block w-full p-2 mb-2 border rounded"
              required
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
              Add Project
            </button>
          </form>

          <button
            onClick={handleLogout}
            className="mt-4 text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </>
      )}

      <BottomNav />
    </div>
  );
}

export default MyWork;