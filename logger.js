const fs = require('fs');
const path = require('path');

// Function to log suspicious input
function logSuspiciousActivity(message) {
  const logPath = path.join(__dirname, 'security.log');
  const time = new Date().toISOString();
  const logMessage = `[${time}] ⚠️ Suspicious input detected: ${message}\n`;

  fs.appendFileSync(logPath, logMessage, 'utf8');
}

module.exports = logSuspiciousActivity;
