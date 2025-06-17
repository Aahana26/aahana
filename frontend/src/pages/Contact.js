import React from 'react';
import BottomNav from '../components/BottomNav';

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-details">
        <h2>Contact</h2>
        <p><strong>Phone:</strong> +91 XXXXX XXXXX</p>
        <p><strong>Email:</strong> aahanapn11@gmail.com</p>
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
      <BottomNav />
    </div>
  );
}

export default Contact;
