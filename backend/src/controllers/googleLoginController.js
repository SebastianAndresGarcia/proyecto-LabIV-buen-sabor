const User = require('../models/user.model')
const Role = require('../models/role.model')
const jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs");
const config = require("../config/auth.config.js");

exports.googleLogin = async (req, res) => {
    const { token, user, googleUser } = req.body;
    console.log("entró a googleLogin ", req.body)
    // Verifica si el usuario existe en la base de datos
    User.findOne({ 'username': user.lw }, (err, existingUser) => {
        if (err) {
            console.log(err)
            return res.status(500).send({ message: 'Error interno del servidor' });
        }

        // Si el usuario no existe, crea uno nuevo
        if (!existingUser) {
            const newUser = new User({
                nombre: user.c_,
                apellido: user.yf,
                email: user.lw,
                username: user.lw,
                password: bcrypt.hashSync('clavealeatoria', 8),
                borrado: false
                 
            });
            Role.findOne({ name: "user" }, (err, role) => {
                console.log("entró a Role.find...")
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                newUser.roles = [role._id];
                newUser.save((err, user) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send({ message: 'Error interno del servidor' });
                    }
                    // Crea un token de acceso para el usuario
                    //const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
                    var expire=60
                    const token = jwt.sign({ id: user._id }, config.secret, {
                        expiresIn: expire // 24 hours = (86400)
                    });
                    // Devuelve el token y la información del usuario al frontend
                    var authorities = [];
                    authorities.push("ROLE_USER");
                    return res.status(200).send({
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        roles: authorities,
                        accessToken: token,
                        message: user.username + " signed up sucessfuly!",
                        expiresIn: "Token seconds remaining " + expire
                    });
                });
            });
            
        } else {
            // Si el usuario existe, crea un token de acceso para el usuario
            //const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET);
            var authorities = [];
            authorities.push("ROLE_USER");
            var expire=60
            const token = jwt.sign({ id: existingUser._id }, config.secret, {
                expiresIn: expire // 24 hours = (86400)
            });
            // Devuelve el token y la información del usuario al frontend
            return res.send({ 
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                roles: authorities,
                accessToken: token,
                message: existingUser.username + " logged on sucessfuly!",
                expiresIn: "Token seconds remaining " + expire });
        }
    });
}