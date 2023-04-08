const User = require('../models/user.model')
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

            newUser.save((err, user) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send({ message: 'Error interno del servidor' });
                }

                // Crea un token de acceso para el usuario
                //const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
                const token = jwt.sign({ id: user._id }, config.secret, {
                    expiresIn: 60 // 24 hours = (86400)
                  });
                // Devuelve el token y la información del usuario al frontend
                return res.status(200).send({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    
                    accessToken: token,
                    message: user.username+" logged on sucessfuly!"
                  });
                
            });
        } else {
            // Si el usuario existe, crea un token de acceso para el usuario
            //const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET);
            const token = jwt.sign({ id: existingUser._id }, config.secret, {
                expiresIn: 60 // 24 hours = (86400)
              });
            // Devuelve el token y la información del usuario al frontend
            return res.send({ accessToken: token, user: existingUser, message: user.username+" logged on sucessfuly!" });
        }
    });
}