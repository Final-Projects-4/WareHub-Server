const { Category } = require("../models/");

class CategoryController {
  static getAll = async (req, res, next) => {
    try {
      const data = await Category.findAll({});
      if (data == null) {
        next( {name : "ErrorNotFound"});
      } else {
        res.status(200).json(data);
        console.log(data);
      }
    } catch (error) {
      next(error);
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
      if (data == null) {
        next( {name : "ErrorNotFound"});
      } else {
        res.status(200).json(data);
        console.log(data);
      }
    } catch (error) {
      next(error);
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
      if (data == null) {
        next( {name : "ErrorNotFound"});
      } else {
        res.status(200).json(data);
        console.log(data);
      }
    } catch (error) {
      next(error);
    }
  };
  static postAdd = async (req, res, next) => {
    const { name, description } = req.body;
    try {
      const data = await Category.create({
        name,
        description,
      });
      if (data == null) {
        next( {name : "ErrorNotFound"});
      } else {
        res.status(200).json(data);
        console.log(data);
      }
    } catch (error) {
      next(error);
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
      if (data !== 1) {
        next( {name : "ErrorNotFound"});
      }else {
      res.status(200).json(" Category Terhapus ");
      }
    } catch (error) {
      next(error);
    }
  };
  static update = async (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const [rows, [data]] = await Category.update(
        {
          name: name,
          description: description
        },
        {
          where: {
            id,
          },
          returning: true,
        }
      );
      if (rows !== 1) {
        next( {name : "ErrorNotFound"});
      } else {
        res.status(200).json(data);
        console.log(data);
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = CategoryController;
