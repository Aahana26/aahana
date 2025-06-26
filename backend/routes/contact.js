import express from 'express';
import nodemailer from 'nodemailer';
import Message from '../models/Message.js'; // Mongoose model for contact messages

const router = express.Router();

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  try {
    // ✅ Step 1: Save to MongoDB
    const savedMessage = await Message.create({ name, email, message });

    // ✅ Step 2: Send email to your inbox
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'aahanapn11@gmail.com',     // Replace with your Gmail address
        pass: 'fxgk ujlh kwsc ihpz',       // Use App Password from Google
      },
      catch (err) {
  console.error('Error in /api/contact:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
}

    });

    const mailOptions = {
      from: email, // sender is the user
      to: 'aahanapn11@gmail.com', // your email
      subject: `New message from ${name}`,
      text: `You've received a new message:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message saved and email sent successfully!' });
  } catch (err) {
    console.error('Error in /api/contact:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
