const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Initialize the app
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve HTML files

// Database (use a JSON file for simplicity)
const DATA_FILE = path.join(__dirname, 'data', 'users.json');

// Helper function to read/write user data
const readUsers = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const writeUsers = (users) => fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));

// Endpoint: Create Account
app.post('/create-account', (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check if user exists
  const users = readUsers();
  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: 'Email is already registered.' });
  }

  // Add user
  const newUser = { username, email, password };
  users.push(newUser);
  writeUsers(users);

  res.status(201).json({ message: 'Account created successfully!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
