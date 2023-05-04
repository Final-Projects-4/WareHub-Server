const { Customer } = require("../models/");
class CustomerController {


  static create = async (req, res, next) => {
    const { first_name, last_name, email, address, company } =
      req.body;
    try {
      const data = await Customer.create({
        user_id: req.user.id,
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


  static getAll = async (req, res, next) => {
    try {
      const data = await Customer.findAll({
        where: {
          user_id: req.user.id
        }
      });
      res.status(200).json(data);
    } catch (err) {
     next(err);
    }
  };


  static getById = async (req, res, next) => {
    try {
      await ownedData(req.params.id, req.user.id);
      const data = await Customer.findByPk(req.params.id);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
  
  
  static update = async (req, res, next) => {
    const { id } = req.params
    const { first_name, last_name, email, address, company } = req.body;
    try {
      await ownedData(req.params.id, req.user.id);
      const data = await Customer.findByPk(req.params.id);
      if (!data) throw { name: 'ErrorNotFound' };
      const [numOfRowsAffected, [updatedData]] = await Customer.update(
        {
          user_id: req.user.id,
          first_name: first_name,
          last_name: last_name,
          email: email,
          address: address,
          company: company,
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
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            address: data.address,
            company: data.company, 
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
      await ownedData(req.params.id, req.user.id);
      const data = await Customer.findByPk(req.params.id);
      const deletedData = await Customer.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({message: `${data.last_name} with an id of ${id} deleted`});
      
    } catch (err) {
     next(err);
    }
  };
}

const ownedData = async (customer_id, user_id) => {
  const data = await Customer.findOne({
    where: {
      id: customer_id,
      user_id: user_id
    }
  });
  if (!data) throw { name: 'ErrorNotFound' };
}

module.exports = CustomerController;
