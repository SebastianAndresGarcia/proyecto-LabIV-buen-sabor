const mongoose = require("mongoose");

const Address = mongoose.model(
  "Address",
  new mongoose.Schema({
  calle: {
    type: String,
    required: true
  },
  barrio: {
    type: String,
    required: true
  },
  numero: {
    type: Number,
    required: true
  },
  localidad: {
    type: String,
    required: true
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: true
}));

module.exports=Address;
