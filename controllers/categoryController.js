const { Category } = require("../models/");

class CategoryController {
  static getAll = async (req, res, next) => {
    try {
      const data = await Category.findAll({});
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
  static getById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const data = await Category.findOne({
        where: {
          id,
        },
      });
      res.status(200).json(data);

    } catch (err) {
      next(err);
    }
  };
  
  static create = async (req, res, next) => {
    const { name, description } = req.body;
    try {
      const data = await Category.create({
        name,
        description,
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
  static delete = async (req, res, next) => {
    const { id } = req.params;
    try {
      const data = await Category.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({message: "Deleted"});

    } catch (err) {
      next(err);
    }
  };
  static update = async (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const data = await Category.update(
        {
          name: name,
          description: description
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = CategoryController;
