const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Temporary in-memory user store
const users = [];

// Signup Route
app.post('/auth/signup', (req, res) => {
  const { username, password } = req.body;

  const userExists = users.find((u) => u.username === username);
  if (userExists) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = { id: users.length + 1, username, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: 'User created successfully' });
});

// Login Route
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`🚀 Auth service running on port ${PORT}`);
});
