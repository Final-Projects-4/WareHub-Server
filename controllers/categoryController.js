const { Category } = require("../models/");

class CategoryController {

  static create = async (req, res, next) => {
    const { name, description } = req.body;
    try {
      const data = await Category.create(
        {
          name,
          description,
        }
      );
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  static getAll = async (req, res, next) => {
    try {
      const data = await Category.findAll({});
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  static getById = async (req, res, next) => {
    try {
      const data = await Category.findByPk(req.params.id);
      if (!data) throw { name: 'ErrorNotFound' };
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
  
  static update = async (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const data = await Category.findByPk(id);
      if (!data) throw { name: 'ErrorNotFound' };
      const [numOfRowsAffected, [updatedData]] = await Category.update(
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
      res.status(200).json({ 
        previous: 
          { 
            name: data.name, 
            description: data.description 
          },
        current: updatedData,
        dataUpdated: numOfRowsAffected
      });
    } catch (err) {
      next(err);
    }
  };
  
  static delete = async (req, res, next) => {
    const { id } = req.params;
    try {
      const data = await Category.findByPk(id);
      if (!data) throw { name: 'ErrorNotFound' };
      await Category.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({message: `${data.name} Deleted`});

    } catch (err) {
      next(err);
    }
  };
}

module.exports = CategoryController;
