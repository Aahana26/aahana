import React, { useState } from 'react';
import BottomNav from '../components/BottomNav';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert(data.message || 'Failed to send message');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Server error');
    }
  };

  return (
    <div className="contact-container" style={{ padding: '20px' }}>
      <div className="contact-details">
        <h2>Contact</h2>
        <p><strong>Phone:</strong> +91 XXXXX XXXXX</p>
        <p>
          <strong>LinkedIn:</strong>{' '}
          <a
            href="https://www.linkedin.com/in/aahana-nithin-bb2760285"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'blue', textDecoration: 'underline' }}
          >
            aahana-nithin-bb2760285
          </a>
        </p>
      </div>

      {/* ✅ Contact Form */}
      <form onSubmit={handleSubmit} className="contact-form mt-6" style={{ marginTop: '30px' }}>
        <h3 className="text-lg font-semibold mb-2">Send a Message</h3>

        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="block w-full p-2 mb-2 border rounded"
        />

        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="block w-full p-2 mb-2 border rounded"
        />

        <textarea
          placeholder="Your Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          className="block w-full p-2 mb-2 border rounded"
          rows={5}
        />

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>

        {successMsg && <p className="text-green-600 mt-2">{successMsg}</p>}
      </form>

      <BottomNav />
    </div>
  );
}

export default Contact;
