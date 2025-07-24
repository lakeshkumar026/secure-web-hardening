const express = require('express');
const helmet = require('helmet');
const validator = require('validator');
const logSuspiciousActivity = require('./logger');

const app = express();
app.use(helmet()); // Adds security headers
app.use(express.urlencoded({ extended: false })); // To parse form input

// Show feedback form
app.get('/feedback', (req, res) => {
  res.send(`
    <h2>Leave Feedback</h2>
    <form method="POST" action="/feedback">
      <input type="text" name="message" placeholder="Type your message" />
      <button type="submit">Submit</button>
    </form>
  `);
});

// Handle feedback submission
app.post('/feedback', (req, res) => {
  const message = req.body.message;

  // Check for suspicious characters
  if (/[<>{}]/.test(message)) {
    console.warn("⚠️ Suspicious input detected (XSS attempt)");
    logSuspiciousActivity(message);
  }

  // Sanitize and display message
  const safeMessage = validator.escape(message);
  res.send(`Thanks for your feedback: ${safeMessage}`);
});

// Run server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});