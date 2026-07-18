import express from 'express';
import Message from '../models/Message.js';
import { protect } from '../middleware/authMiddleware.js';
import { sendEmail } from '../utils/sendEmail.js';

const router = express.Router();

// @route   POST /api/messages
// @desc    Send a new message (Public)
router.post('/', async (req, res) => {
  try {
    const message = new Message(req.body);
    const savedMessage = await message.save();

    // Trigger confirmation email to the client
    const clientHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
        <h2 style="color: #4f46e5; margin-bottom: 20px;">Thank You for Reaching Out!</h2>
        <p>Dear <strong>${savedMessage.name}</strong>,</p>
        <p>I have successfully received your message sent through my portfolio. Here is a summary of what you submitted:</p>
        <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border-left: 4px solid #4f46e5; margin: 20px 0;">
          <p style="margin: 0; color: #475569; font-style: italic;">"${savedMessage.message}"</p>
        </div>
        <p>I will review your message and reply to you as soon as possible.</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
        <p style="font-size: 12px; color: #94a3b8;">This is an automated confirmation of receipt of your email. Please do not reply directly to this message.</p>
      </div>
    `;

    await sendEmail({
      to: savedMessage.email,
      subject: 'Thank you for contacting Haider Ali',
      html: clientHtml
    });

    // Trigger notification email to the admin
    const adminHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <h2 style="color: #db2777; margin-bottom: 20px;">New Contact Message Received</h2>
        <p><strong>Name:</strong> ${savedMessage.name}</p>
        <p><strong>Email:</strong> ${savedMessage.email}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #334155; white-space: pre-wrap;">${savedMessage.message}</p>
        </div>
        <p><a href="${req.headers.origin || 'https://haiderweb-alpha.vercel.app'}/admin" style="display: inline-block; padding: 10px 20px; background-color: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold;">View in Admin Panel</a></p>
      </div>
    `;

    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'haideralimangwal786@gmail.com',
      subject: `New Portfolio Message from ${savedMessage.name}`,
      html: adminHtml
    });

    const io = req.app.get('io');
    if (io) io.emit('messages_updated');
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   GET /api/messages
// @desc    Get all messages
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   DELETE /api/messages/:id
// @desc    Delete a message
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    if (!deletedMessage) return res.status(404).json({ message: 'Message not found' });
    const io = req.app.get('io');
    if (io) io.emit('messages_updated');
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/messages/:id/reply
// @desc    Reply to a client message (Private)
// @access  Private
router.post('/:id/reply', protect, async (req, res) => {
  try {
    const { replyText } = req.body;
    if (!replyText || !replyText.trim()) {
      return res.status(400).json({ message: 'Reply text is required' });
    }

    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Send the reply email to client
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <h2 style="color: #4f46e5; margin-bottom: 20px;">Response to Your Message</h2>
        <p>Hi <strong>${message.name}</strong>,</p>
        <p>Thank you for contacting me. Here is my response to your message:</p>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #4f46e5; margin: 20px 0; font-size: 15px; color: #1e293b; line-height: 1.6;">
          <p style="margin: 0; white-space: pre-wrap;">${replyText}</p>
        </div>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
        <p style="font-size: 13px; color: #64748b;">Original Message submitted on ${new Date(message.createdAt).toLocaleDateString()}:</p>
        <blockquote style="margin: 0; padding-left: 15px; border-left: 3px solid #cbd5e1; color: #64748b; font-style: italic;">
          ${message.message}
        </blockquote>
      </div>
    `;

    const emailSent = await sendEmail({
      to: message.email,
      subject: 'Response from Haider Ali',
      html: emailHtml
    });

    if (!emailSent) {
      return res.status(500).json({ message: 'Failed to send reply email. Please verify SMTP settings.' });
    }

    message.replyText = replyText;
    message.isReplied = true;
    await message.save();

    const io = req.app.get('io');
    if (io) io.emit('messages_updated');

    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
