const Role = require('../models/role.model');

exports.getRoles = async (req, res) => { 
    const roles = await Role.find();
    if (!roles)
        return res.status(204).json();
    console.log(roles)
    return res.json(roles)
  }