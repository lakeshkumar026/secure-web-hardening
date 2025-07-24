const express = require('express');
const helmet = require('helmet');

const app = express();

// Use Helmet to enhance security headers
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello from HTTP with Helmet! by Rayyan');
});

// Start regular HTTP server
app.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});
