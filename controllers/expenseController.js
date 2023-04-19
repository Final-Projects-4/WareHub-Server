const { Expense } = require("../models");

class ExpenseController {
  static findAll = async (req, res, next) => {
    const data = await Expense.findAll();
    res.status(200).json(data);
  };
  static findOne = async (req, res, next) => {
    const { id } = req.params;
    try {
      const data = await Expense.findOne({
        where: {
          id,
        },
      });
      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (err) {
      next(err);
    }
  };
  static create = async (req, res, next) => {
    try {
      const { user_id, expense, detail } = req.body;
      const data = await Expense.create({
        user_id,
        expense,
        detail,
      });

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
  static update = async (req, res, next) => {
    const { id } = req.params;
    const { expense, detail } = req.body;
    try {
      const data = await Expense.update(
        {
          expense,
          detail,
        },
        {
          where: {
            id,
          },
        }
      );
      if (data) {
        res.status(200).json({ message: "Update Succesfully" });
      } else {
        throw { name: "Update Error" };
      }
    } catch (err) {
      next(err);
    }
  };
  static delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await Expense.destroy({
        where: {
          id,
        },
      });
      if (data) {
        res.status(200).json({ message: "Deleted Succesfully" });
      } else {
        throw { name: "Error Not Found" };
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = ExpenseController;
