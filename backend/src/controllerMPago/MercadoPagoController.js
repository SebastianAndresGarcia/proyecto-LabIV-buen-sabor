const MercadoPago = require('../models/MercadoPagoDatos');
const Pedido = require('../models/Pedido');

const mercadopago = require("mercadopago");
mercadopago.configure({
    access_token: "TEST-7688520916959333-011315-ac6aa89652cb4ae1e81a0383af5df4ab-257082384",
});
exports.checkout = async (req, res) => {
    console.log("req.body",req.body)
    let preference = {
        items: [
            {
                title: req.body.description,
                unit_price: Number(req.body.price),
                quantity: Number(req.body.quantity), 
            }
        ],
        back_urls: {
            "success": "http://localhost:8080/MisCompras",
            "failure": "http://localhost:8080/MiCarrito",
            "pending": "http://localhost:8080/feedback"
        },
        auto_return: "approved",
        external_reference: req.body.external_reference
    }

    mercadopago.preferences.create(preference)
        .then(function (response) {
            console.log("preferences", response.body)
            res.redirect(response.body.init_point)
        }).catch(function (error) {
            console.log(error);
        });
}

exports.savePayment = async (req, res) => {
    const Pago = await MercadoPago.findOne({ identificadorPago: req.body.identificadorPago })
    if (Pago){
        return res.status(301).json({ message: 'The payment already exists' })
    }
    const registroPago = new MercadoPago(req.body)
    const savedRegistro = await registroPago.save()
    const updatedPedido = await Pedido.findByIdAndUpdate(savedRegistro.pedidoid, {mercadopagodatosid: savedRegistro._id} )
    res.json(savedRegistro)
} 