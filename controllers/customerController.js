const { Customer } = require("../models/");
class CustomerController {
  static getAll = async (req, res, next) => {
    try {
      const data = await Customer.findAll({});
      res.status(200).json(data);
    } catch (err) {
     next(err);
    }
  };

  static getById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const data = await Customer.findOne({
        where: {
          id,
        },
      });
      res.status(200).json(data);
      
    } catch (err) {
     next(err);
    }
  };

  static getByEmail = async (req, res, next) => {
    const { email } = req.params;
    try {
      const data = await Customer.findOne({
        where: {
          email,
        },
      });
      res.status(200).json(data);
      
    } catch (err) {
     next(err);
    }
  };

  static create = async (req, res, next) => {
    const { user_id, first_name, last_name, email, address, company } =
      req.body;
    try {
      const data = await Customer.create({
        user_id,
        first_name,
        last_name,
        email,
        address,
        company,
      });
      res.status(200).json(data);
      
    } catch (err) {
     next(err);
    }
  };

  static delete = async (req, res, next) => {
    const { id } = req.params;
    try {
      const data = await Customer.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({message: "Customer Deleted"});
      
    } catch (err) {
     next(err);
    }
  };

  static update = async (req, res, next) => {
    const { id } = req.params;
    const { user_id, first_name, last_name, email, address, company } =
      req.body;
    try {
      const data = await Customer.update(
        {
          user_id,
          first_name,
          last_name,
          email,
          address,
          company,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({message: "Successfuly edited"});
      
    } catch (err) {
     next(err);
    }
  };
}

module.exports = CustomerController;
