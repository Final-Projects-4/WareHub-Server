const { Expense } = require('../models');

class ExpenseController {


  static async create(req, res, next) {
    try {
      const { expense, detail, vendor_id } = req.body;
      const expenseItem = await Expense.create(
        { user_id: req.user.id,
          expense, 
          detail, 
          vendor_id 
        }
      );
      res.status(201).json(expenseItem);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }


  static async getAll(req, res, next) {
    try {
      const data = await Expense.findAll(
        {
          where: {
            user_id: req.user.id
          }
        }
      );
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }


  static async getOne(req, res, next) {
    const { id } = req.params;

    try {
      const data = await Expense.findOne({
        where: {
          user_id: req.user.id,
          id,
        },
      });

      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (err) {
      next(err);
    }
  }


  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { expense, detail } = req.body;
      const [updatedRowsCount, [updatedExpense]] = await Expense.update(
        { user_id: req.user.id, expense, detail },
        { where: { id }, returning: true }
      );
      if (updatedRowsCount !== 1) {
        throw { name: 'ErrorNotFound' };
      }
      res.status(200).json(updatedExpense);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedRowsCount = await Expense.destroy({ where: { id } });
      if (deletedRowsCount !== 1) {
        throw { name: 'ErrorNotFound' };
      }
      res.status(204).json({message: "Deleted"});
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = ExpenseController;
