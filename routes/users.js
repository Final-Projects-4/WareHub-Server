const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');



// router.get('/', UserController.getAllUsers);
// router.get('/:id', UserController.getUserById);
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
// router.put('/:id', UserController.updateUser);
// router.delete('/:id', UserController.deleteUser);

module.exports = router;
