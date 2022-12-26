const path = require('path');
const User = require('../models/user.model');

exports.getEmpleados = async (req, res) => {
  const rolempleado = "63589ca2473f9606e8844be8";

  const empleados = await User.find({ "roles.0": rolempleado }).populate({path:"roles"});
  if (!empleados)
      return res.status(204).json();
  console.log(empleados)
  return res.json(empleados)
}

exports.updateUser = async (req, res) =>{
  const updatedUser = await User.findByIdAndUpdate(req.body._id, req.body)
  return res.json(updatedUser)
}