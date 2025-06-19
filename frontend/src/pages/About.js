import React, { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav';

function About() {
  const [aboutContent, setAboutContent] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginDetails, setLoginDetails] = useState({ username: '', password: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');

   const styles = {
  loginContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // translucent white
    padding: '30px',
    borderRadius: '12px',
    backdropFilter: 'blur(8px)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: '300px',
    marginTop: '20px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    marginLeft: '40px',
    marginRight: 'auto',
    transform: 'translateX(20%)', // shift more to the right
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '15px',
    marginLeft:'-10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    marginBottom: '12px',
  },
  buttonGroup: {
    marginTop: '16px',
    display: 'flex',
    marginLeft: '-10px',
    justifyContent: 'space-between',
  },
  loginBtn: {
    padding: '8px 16px',
    backgroundColor: '#ec4899', // 🌸 pink
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  cancelBtn: {
    padding: '8px 16px',
    backgroundColor: '#d97706',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    marginLeft:'40px',
    cursor: 'pointer',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
};


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
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          rows={6}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
          }}
        />
      ) : (
        <p>{aboutContent}</p>
      )}


        {/* Admin actions */}
        {isLoggedIn ? (
  <>
    {isEditing ? (
      <>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px'
        }}>
          <button
            onClick={handleSave}
            style={{
              padding: '10px 16px',
              height: '40px',
              fontSize:'15px',
              backgroundColor: '#55AA18', // green
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }}
          >
            Save
          </button>
          <div style={{ textAlign: 'right' }}>
            <button
              onClick={() => setIsEditing(false)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#FFA825', // orange
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                marginLeft:'20px',
                marginRight:'-25px',
                fontSize:'15px',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                marginBottom: '10px'
              }}
            >
              Cancel
            </button>
            <br />
            <button
              onClick={() => {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                setIsEditing(false);
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#ec4899', // pink
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                fontWeight: '500'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </>
    ) : (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => setIsEditing(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ec4899', // pink
            color: 'white',
            border: 'none',
            fontSize:'16px',
            marginLeft:'10px',
            marginTop:'20px',
            borderRadius: '6px',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            margin: '20px auto',
            display: 'block'
          }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#4f46e5', // indigo
            cursor: 'pointer',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontWeight: '500',
            textDecoration: 'underline',
            fontSize: '20px'
          }}
        >
          Logout
        </button>
        </div>
    )}
  </>
) : (
  // login form section)}

          <>
            {!showLoginForm ? (
              <button className="nav-link-btn" onClick={() => setShowLoginForm(true)}>Admin Login</button>
            ) : (
              <div style={styles.loginContainer}>
                <input
                    type="text"
                    placeholder="Username"
                    value={loginDetails.username}
                    onChange={(e) =>
                      setLoginDetails({ ...loginDetails, username: e.target.value })
                    }
                    style={styles.input}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginDetails.password}
                    onChange={(e) =>
                      setLoginDetails({ ...loginDetails, password: e.target.value })
                    }
                    style={styles.input}
                  />
                  <div style={styles.buttonGroup}>
                    <button onClick={handleLogin} style={styles.loginBtn}>Login</button>
                    <button onClick={() => setShowLoginForm(false)} style={styles.cancelBtn}>Cancel</button>
                  </div>
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



//rgb(255, 168, 37)