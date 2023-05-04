const { Vendor } = require('../models');


class VendorController {
  static async create(req, res, next) {
    try {
      const { name, country } = req.body;
      const vendor = await Vendor.create(
        { 
          name, 
          country,
          user_id: req.user.id 
        });
      res.status(201).json(vendor);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      const data = await Vendor.findAll({
        where: {
          user_id: req.user.id
        }
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getOne(req, res, next) {
    const { id } = req.params;

    try {
      const data = await Vendor.findOne({
        where: {
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
      const { name, country } = req.body;
      const [updatedRowsCount, [updatedVendor]] = await Vendor.update(
        { name, country },
        { where: { id }, returning: true }
      );
      if (updatedRowsCount !== 1) {
        throw new Error('Vendor not found');
      }
      res.status(200).json(updatedVendor);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedRowsCount = await Vendor.destroy({ where: { id } });
      if (deletedRowsCount !== 1) {
        throw {message: 'ErrorNotFound'};
      }
      res.status(204).json({message: "Deleted"});
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = VendorController;
