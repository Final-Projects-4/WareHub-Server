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
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      if (!user) {
        throw {name: 'InvalidCredential'};
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw {name: 'InvalidCredential'};
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
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      const data = await User.findAll({});
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getOne(req, res, next) {
    const {id} = req.params;

    try {
      const data = await User.findOne({
        where : {
          id
        }
      });

      if(data) {
        res.status(200).json(data)
      } else {
        throw {name: "ErrorNotFound"}
      }
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { first_name, last_name, email, username, password, address, company } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const [updatedRowsCount, [updatedUser]] = await User.update(
        { first_name, last_name, email, username, password: hashedPassword, address, company },
        { where: { id }, returning: true }
      );
      if (updatedRowsCount !== 1) {
        throw {name: 'InvalidCredential'};
      }
      res.status(200).json(updatedUser);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedRowsCount = await User.destroy({ where: { id } });
      if (deletedRowsCount !== 1) {
        throw {name: 'InvalidCredential'};
      }
      res.status(204).send();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UserController;
