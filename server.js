const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();

// Middleware for security
const helmet = require('helmet');
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello over HTTPS!');
});

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(3443, () => {
  console.log('Server running securely on https://localhost:3443');
});