const { Revenue, User } = require('../models');


class RevenueController {
  static async create(req, res, next) {
    try {
      const { user_id, revenue, detail } = req.body;

      // check if user exists
      const user = await User.findOne({ where: { id: user_id } });
      if (!user) {
        throw { name: 'ErrorNotFound', message: 'User not found' };
      }

      const revenueData = await Revenue.create({ user_id: user_id, revenue, detail });
      res.status(201).json(revenueData);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      const data = await Revenue.findAll({ include: [User] });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getOne(req, res, next) {
    const { id } = req.params;

    try {
      const data = await Revenue.findOne({
        where: {
          id,
        },
        include: [User],
      });

      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: 'ErrorNotFound', message: 'Revenue not found' };
      }
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { user_id, revenue, detail } = req.body;

      // check if user exists
      const user = await User.findOne({ where: { id: user_id } });
      if (!user) {
        throw { name: 'ErrorNotFound', message: 'User not found' };
      }

      const [updatedRowsCount, [updatedRevenueData]] = await Revenue.update(
        { user_id: user_id, revenue, detail },
        { where: { id }, returning: true }
      );
      if (updatedRowsCount !== 1) {
        throw { name: 'ErrorNotFound', message: 'Revenue not found' };
      }
      res.status(200).json(updatedRevenueData);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedRowsCount = await Revenue.destroy({ where: { id } });
      if (deletedRowsCount !== 1) {
        throw { name: 'ErrorNotFound', message: 'Revenue not found' };
      }
      res.status(204).json({message: "Deleted"});
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = RevenueController;
