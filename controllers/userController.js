// controllers/UserController.js
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  static async register(req, res, next) {
    try {
      const { first_name, last_name, email, username, password, address, company } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ first_name, last_name, email, username, password: hashedPassword, address, company });
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error creating user' });
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      if (!user) {
        throw new Error('Invalid username or password');
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error('Invalid username or password');
      }
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
        }
      );
      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error logging in' });
    }
  }

  static async getAll(req, res, next) {
    try {
      const data = await User.findAll({});
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error getting users' });
    }
  }
}

module.exports = UserController;
