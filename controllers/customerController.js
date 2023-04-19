const { Customer } = require("../models/");
class CustomerController {
  static getAll = async (req, res, next) => {
    try {
      const data = await Customer.findAll({});
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
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
      if (data == null) {
        next( {name : "ErrorNotFound"});
      } else {
        res.status(200).json(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      next(error);
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
      if (data == null) {
        next( {name : "ErrorNotFound"});
      } else {
        res.status(200).json(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  static postAdd = async (req, res, next) => {
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
      console.log(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  static delete = async (req, res, next) => {
    const { id } = req.params;
    try {
      const data = await Customer.destroy({
        where: {
          id,
        },
        returning: true,
      });
      if (data !== 1) {
        next( {name : "ErrorNotFound"});
      }else {
      res.status(200).json(" User Terhapus ");
      }
    } catch (error) {
      next(error);
    }
  };
  static update = async (req, res, next) => {
    const { id } = req.params;
    const { user_id, first_name, last_name, email, address, company } =
      req.body;
    try {
      const [rows, [data]] = await Customer.update(
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

module.exports = CustomerController;
