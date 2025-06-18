import React, { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav';

function About() {
  const [aboutContent, setAboutContent] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginDetails, setLoginDetails] = useState({ username: '', password: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    fetchAbout();
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, []);

  const fetchAbout = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/about');
    console.log('Response status:', res.status);
    if (!res.ok) {
      const text = await res.text();
      console.error('Error response text:', text);
      setAboutContent('Error loading about info.');
      return;
    }
    const data = await res.json();
    if (data && data.content) {
      setAboutContent(data.content);
      setEditedContent(data.content);
    } else {
      setAboutContent('No about info found');
    }
  } catch (err) {
    console.error('Fetch error:', err);
    setAboutContent('Error loading about info.');
  }
};


  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginDetails),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        setShowLoginForm(false);
      } else {
        alert('Login failed');
      }
    } catch (err) {
      alert('Error during login');
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: editedContent }),
      });
      if (res.ok) {
        setAboutContent(editedContent);
        setIsEditing(false);
      } else {
        alert('Failed to update');
      }
    } catch (err) {
      alert('Error while updating');
    }
  };

  return (
    <div className="about-container">
      <img src="/second.jpg" alt="Aahana" className="about-image" />
      <div className="about-text">
        <h2>About Me</h2>
        {!isEditing ? (
          <p>{aboutContent}</p>
        ) : (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={6}
            style={{ width: '100%' }}
          />
        )}

        {/* Admin actions */}
        {isLoggedIn ? (
  <>
    {isEditing ? (
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
    ) : (
      <div>
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </div>
    )}
    <button
      style={{ marginTop: '10px' }}
      onClick={() => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setIsEditing(false);
      }}
    >
      Logout
    </button>
  </>
) : (
  // login form section)}

          <>
            {!showLoginForm ? (
              <button onClick={() => setShowLoginForm(true)}>Admin Login</button>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={loginDetails.username}
                  onChange={(e) =>
                    setLoginDetails({ ...loginDetails, username: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginDetails.password}
                  onChange={(e) =>
                    setLoginDetails({ ...loginDetails, password: e.target.value })
                  }
                />
                <button onClick={handleLogin}>Login</button>
                <button onClick={() => setShowLoginForm(false)}>Cancel</button>
              </div>
            )}
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
}

export default About;
