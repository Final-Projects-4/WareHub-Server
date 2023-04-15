const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

// Route to register a new user
router.post('/register', async (req, res) => {
  const { first_name, last_name, email, username, password, address, company } = req.body;

  try {
    const user = await UserController.register(first_name, last_name, email, username, password, address, company);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Route to login a user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await UserController.login(username, password);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Route to get all users
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await UserController.getUsers();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error getting users' });
  }
});

// Route to get a single user by ID
router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserController.getUser(id);
    if (!user) {
      res.status(404).json({ message: `User with ID ${id} not found` });
    } else {
      res.status(200).json({ user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error getting user with ID ${id}` });
  }
});

// Route to create a new user
router.post('/', authMiddleware, async (req, res) => {
  const userData = req.body;

  try {
    const user = await UserController.createUser(userData);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Route to update a user by ID
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userData = req.body;

  try {
    const user = await UserController.updateUser(id, userData);
    res.status(200).json({ message: `User with ID ${id} updated successfully`, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error updating user with ID ${id}` });
  }
});

// Route to delete a user by ID
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await UserController.deleteUser(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error deleting user with ID ${id}` });
  }
});

module.exports = router;
