const path = require('path');
const User = require('../models/user.model');

exports.getEmpleados = async (req, res) => {
  //const rolempleado = ["6350643cbe764c621c1e78cf"];
  const rolempleados = ["6350643cbe764c621c1e78cf","6350643cbe764c621c1e78ce","63589ca2473f9606e8844be8","63589ca2473f9606e8844be7"]
  const empleados = await User.find({ "roles": { $in: rolempleados }
    //"roles.0": rolempleado 
  }).populate({path:"roles"});
  if (!empleados)
      return res.status(204).json();
  console.log(empleados)
  return res.json(empleados)
}

exports.updateUser = async (req, res) =>{
  const updatedUser = await User.findByIdAndUpdate(req.body._id, req.body)
  return res.json(updatedUser)
}