const { Revenue } = require("../models");

class RevenueController {
  static findAll = async (req, res, next) => {
    try {
      const data = await Revenue.findAll();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
  static findOne = async (req, res, next) => {
    const { id } = req.params;
    try {
      const data = await Revenue.findOne({
        where: {
          id,
        },
      });
      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: "Error Not Found" };
      }
    } catch (err) {
      next(err);
    }
  };
  static create = async (req, res, next) => {
    try {
      const { user_id, revenue, detail } = req.body;
      const data = await Revenue.create({
        user_id,
        revenue,
        detail,
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
  static update = async (req, res, next) => {
    const { id } = req.params;
    const { revenue, detail } = req.body;
    try {
      const data = await Revenue.update(
        {
          revenue,
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
      const data = await Revenue.destroy({
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

module.exports = RevenueController;
