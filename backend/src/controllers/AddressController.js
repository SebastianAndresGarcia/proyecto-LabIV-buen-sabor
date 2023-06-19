const Address = require('../models/Address');
const User = require('../models/user.model');


exports.createAddress = async (req, res) => {
    //const AddressFound = await Address.findOne({ usuario: req.body.usuario })
    //const user = await User.findById(req.body.id)
    const address = new Address(req.body)
    //console.log(address)
    try {
        const savedAddress = await address.save()
        const userUpdated =await User.findByIdAndUpdate(req.body.userid, {$addToSet:{"domicilios":savedAddress._id}})
        console.log(savedAddress)
        res.json(savedAddress)
        
    } catch (error) {
        console.log(error)
    }

}

exports.getAddressbyuser = async (req, res) => {
    const addressFound = await Address.find({ "userid": req.params.id })
    if (!addressFound)
        return res.status(204).json();
    return res.json(addressFound)
}
exports.updateAddress = async (req, res) => {
    const addressUpdated = await Address.findByIdAndUpdate(req.params.id, req.body)
    res.json(addressUpdated)
}