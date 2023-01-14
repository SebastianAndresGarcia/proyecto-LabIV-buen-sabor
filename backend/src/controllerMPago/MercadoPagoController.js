const mercadopago = require("mercadopago");

mercadopago.configure({
    access_token: "TEST-7688520916959333-011315-ac6aa89652cb4ae1e81a0383af5df4ab-257082384",
});
exports.checkout = async (req, res) => {
    console.log(req.body)
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