const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  static async register(first_name, last_name, email, username, password, address, company) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ first_name, last_name, email, username, password: hashedPassword, address, company });
      return user;
    } catch (error) {
      console.log(error);
      throw new Error('Error creating user');
    }
  }

  static async login(username, password) {
    try {
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
      return token;
    } catch (error) {
      console.log(error);
      throw new Error('Error logging in');
    }
  }

  static async getUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.log(error);
      throw new Error('Error getting users');
    }
  }

  static async getUser(id) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(`Error getting user with id ${id}`);
    }
  }

  static async createUser(userData) {
    try {
      const user = await User.create(userData);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error('Error creating user');
    }
  }

  static async updateUser(id, userData) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
      await user.update(userData);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(`Error updating user with id ${id}`);
    }
  }

  static async deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
      await user.destroy();
      return { message: 'User deleted successfully' };
    } catch (error) {
      console.log(error);
      throw new Error(`Error deleting user with id ${id}`);
    }
  }
}

module.exports = UserController;
