const { Category } = require("../models/");

class CategoryController {
  static getAll = async (req, res, next) => {
    try {
      const data = await Category.findAll({});
      res.status(200).json(data);
    } catch (error) {
      
      res.status(400).json({ message: "ada eror" });
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
      
    } catch (error) {
      
      res.status(400).json({ message: "ada eror" });
    }
  };
  static getByName = async (req, res, next) => {
    const { name } = req.params;
    try {
      const data = await Category.findOne({
        where: {
          name,
        },
      });
      res.status(200).json(data);
      
    } catch (error) {
      
      res.status(400).json({ message: "ada eror" });
    }
  };
  static postAdd = async (req, res, next) => {
    const { name, description } = req.body;
    try {
      const data = await Category.create({
        name,
        description,
      });
      res.status(200).json(data);
      
    } catch (error) {
      
      res.status(400).json({ message: "ada eror" });
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
      res.status(200).json(data);
      
    } catch (error) {
      
      res.status(400).json({ message: "ada eror" });
    }
  };
  static update = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const data = await Category.update(
        {
          name: name,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json(data);
      
    } catch (error) {
      
      res.status(400).json({ message: "ada eror" });
    }
  };
}

module.exports = CategoryController;
