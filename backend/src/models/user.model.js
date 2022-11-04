const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({

    username: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    password: String,

    nombre: {
      type: String,
      default: ""
    },
    apellido: {
      type: String,
      default: ""
    },
    fechaNacimiento: {
      type: Date,
      default: new Date()
    },
    telefono: {
      type: Number,
      default: null
    },
    borrado: {
      type: Boolean,
      default: false,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    domicilios: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
      }
    ]

  }, {
    timestamps: true  //va a crear los campos createdAt y updatedAt
  }
  ));

module.exports = User;
