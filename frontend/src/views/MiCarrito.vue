<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Mi Carrito</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="8">
                <v-card outlined v-for="(item, i) in items" :key="i" cols="10" height="150px" width="100%"
                    style="display:inline-block; margin-bottom: 2px; background-color:beige;">
                    <h3 class="text-overline ml-2"><b> {{ item.denominacion }}</b></h3>
                    <v-row style="align: center; justify-content: center; ">
                        <v-col cols="2">
                            <v-avatar size="80" tile>
                                <v-img v-if="String(item.imagen).indexOf('http') >= 0" :src="item.imagen"></v-img>
                                <v-img v-else :src="`../images/` + item.imagen"></v-img>
                            </v-avatar>
                        </v-col>
                        <v-col cols="2">
                            <v-row><v-card-subtitle><b>Valor Unitario</b></v-card-subtitle></v-row>
                            <v-row style="justify-content: center">${{ item.precioVenta }}</v-row>
                        </v-col>
                        <v-col cols="3">
                            <v-row
                                style="justify-content: center"><v-card-subtitle><b>Cantidad</b></v-card-subtitle></v-row>
                            <v-card-actions>
                                <v-row>
                                    <v-col>
                                        <div class="buttons_buy" style="display: flex;">
                                            <a class="arrow-down_touch" @click="agregarProducto(item._id, -1, i)"></a>
                                            <input class="inputpromohome" v-model="cantidad[i]" readonly>
                                            <a class="arrow-up_touch" @click="agregarProducto(item._id, 1, i)"></a>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-col>
                        <v-col cols="2">
                            <v-row
                                style="justify-content: center"><v-card-subtitle><b>Total</b></v-card-subtitle></v-row>
                            <v-row style="justify-content: center">${{ cantidad[i]* item.precioVenta }}</v-row>
                        </v-col>
                        <v-col cols="1">
                            <v-row><v-card-subtitle><b></b></v-card-subtitle></v-row>
                            <v-row style="justify-content: center">
                                <v-btn color="red" icon rounded large @click="eliminar(item._id)">
                                    <v-icon>mdi-trash-can</v-icon>
                                </v-btn>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="4">
                <v-card class="mx-auto" min-height="100%">
                    <v-card-title><b>Resumen de la compra</b></v-card-title>
                    <v-card-text>
                        <v-row class="my-4 text-subtitle-1">
                            <v-col cols="5"><b>Subtotal</b></v-col> <v-col style="text-align: right;" cols="5"><b>${{
                                subtotal
                            }}</b></v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-radio-group v-model="radios">
                            <v-radio label="Retiro en el local" value="local"></v-radio>
                            <v-radio label="Delivery" value="delivery"></v-radio>
                        </v-radio-group>
                        <div v-if="radios == 'delivery'">
                            <v-row class="my-4 text-subtitle-1"><v-col cols="5"><b>Costo de Env??o</b></v-col> <v-col
                                    style="text-align: right;" cols="5"><b>$ 500</b></v-col></v-row>
                            <v-row class="my-4 text-subtitle-1"> <v-col cols="5"><b>Total</b></v-col> <v-col
                                    style="text-align: right;" cols="5"><b>$ {{ subtotal+ 500}}</b></v-col></v-row>
                        </div>
                        <div v-if="radios == 'local'">
                            <v-row class="my-4 text-subtitle-1"> <v-col cols="5"><b>10% Descuento</b></v-col> <v-col
                                    cols="5" style="text-align: right;"><b>-$ {{ 0.1* subtotal }}</b></v-col></v-row>
                            <v-row class="my-4 text-subtitle-1"> <v-col cols="5"><b>Total</b></v-col> <v-col cols="5"
                                    style="text-align: right;"><b>${{ subtotal*0.9 }}</b></v-col></v-row>
                        </div>
                    </v-card-text>

                    <v-card-action>
                        <v-row style="justify-content: center; margin: 5%;" dense>
                            <v-btn rounded @click="registrarPedido()" color="success">Ir a pagar</v-btn>
                        </v-row>
                    </v-card-action>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { eventBus } from "../main";
export default {
    data() {
        return {
            cerrarCarro: false,
            items: [],
            carritoLength: 0,
            eliminaItem: false,
            cantidad: [],
            subtotal: 0,
            radios: "",
            pedido: {
                fecha: new Date(),
                numero: 1,
                estado: "pendiente",
                horaEstimadaFin: new Date(),
                tipoEnvio: "",
                total: 0,
                userid: "",
                //domicilioid: "",
                detallepedido: [{
                    cantidad: 0,
                    subtotal: 0,
                    articuloid: null, //de articulomanufacturado y/o articuloinsumo(bebidas) en el backend lo asigno al que corresponda
                }]

            }
        };
    },
    mounted() {
        this.getLocalStorage()
    },

    methods: {
        async getmanufacturados(id, cant) {
            console.log("id " + id + " cant " + cant)
            const res = await fetch(
                `http://localhost:3000/getManufacturadoXid/${id}`
            )
            const resJson = await res.json();
            console.log(resJson);
            this.items.push(resJson);
            this.carritoLength = this.items.length
            this.cantidad.push(cant)
            this.calculaSubtotal()
        },
        async getLocalStorage() {
            this.cantidad = []
            this.items = []
            let claves = Object.keys(localStorage);
            let carrovacio = true
            claves.forEach(clave => {
                let valor = localStorage.getItem(clave);
                try {
                    if (((JSON.parse(localStorage.getItem(clave))).cantidad)) {
                        this.getmanufacturados(clave, Number((JSON.parse(localStorage.getItem(clave))).cantidad))
                        carrovacio = false
                    }
                } catch (err) {
                    console.log("err: " + err)
                }
            });
            if (carrovacio) {
                this.carritoLength = 0
            }
        },
        async eliminar(id) {
            window.localStorage.removeItem(id)
            eventBus.$emit("elimina-itemcarrito", id)
            this.getLocalStorage()
        },
        agregarProducto(id, j, index) {
            this.cantidad[index] += j
            if (this.cantidad[index] == 0) {
                this.eliminar(id)
            } else {
                localStorage.setItem(id, JSON.stringify({ 'cantidad': this.cantidad[index] }))
                eventBus.$emit("elimina-itemcarrito", '0')
                eventBus.$emit("carrito-changed", this.cambioCarrito)
            }
        },
        cerrar() {
            this.cerrarCarro = true
            this.$emit('carritoLength', { close: this.cerrarCarro })
        },
        async calculaSubtotal() {
            this.subtotal = 0
            for (let i = 0; i < this.items.length; i++) {
                this.subtotal += this.items[i].precioVenta * this.cantidad[i]
            }
        },
        async registrarPedido() {
            this.pedido = {
                fecha: new Date(),
                numero: 1,
                estado: "pendiente",
                horaEstimadaFin: new Date(),
                tipoEnvio: this.radios,
                total: this.subtotal,
                userid: (JSON.parse(localStorage.getItem('user'))).id,
                //domicilioid: this.radios,
                detallepedido: []
            }
            if (this.pedido.tipoEnvio == "delivery") {
                this.pedido.total += 500
            } else {
                this.pedido.total *= 0.9
            }
            for (let i = 0; i < this.cantidad.length; i++) {
                this.pedido.detallepedido.push({
                    cantidad: this.cantidad[i],
                    subtotal: this.cantidad[i] * this.items[i].precioVenta,
                    articuloid: this.items[i]._id
                })
            }
            console.log("this.pedido ", this.pedido)
            let urlServer = "http://localhost:3000/crearPedido";
            let method = "POST";
            const respuesta = await fetch(urlServer, {
                method: method,
                body: JSON.stringify(this.pedido),
                headers: {
                    "Content-type": "application/json",
                },
                mode: "cors",
            });
            const resJson = await respuesta.json()
            console.log("respuesta: ", resJson)
            if (respuesta.status === 200) {
                console.log(respuesta.status)
            } else {
                this.respuestaError = resJson.message
                console.log("mensaje del servidor: " + this.respuestaError)
            }
            //DESDE AC?? ABRIR??A UN DIALOG QUE DIGA EL ESTADO DEL PEDIDO Y REDIRIJA A "MIS COMPRAS"
        }
    },
    created() {
        eventBus.$on("carrito-changed", async (data) => {
            if (data)
                console.log("entr?? al if del itemcarrito, data: " + data)
            this.getLocalStorage()
            //eventBus.$off("carrito-changed");
        });
    },
    watch: {
        carritoLength: function () {
            this.$emit('carritoLength', { tamanio: this.carritoLength })
            //this.cerrarCarro=true
        }
    }
}
</script>
<style>
.inputpromohome {
    width: 36px;
    height: 35px;
    margin-right: 4px;
    font-size: 16px;
    text-align: center;
    background: white;
    border: 1px solid #ccc;
    margin-left: 10px;
}

.buttons_buy {
    height: 42px;
    margin: 0px auto;
    width: 141px;
}

.arrow-down_touch {
    background: url(https://static.cotodigital3.com.ar/sitios/cdigi/static/content/images/cdigi/touch_left.png) no-repeat !important;
    width: 43px;
    height: 38px;
    display: inline-block;
    cursor: pointer !important;
    float: left;
    margin-right: 1px;
}

.arrow-up_touch {
    background: url(https://static.cotodigital3.com.ar/sitios/cdigi/static/content/images/cdigi/touch_right.png) no-repeat !important;
    width: 43px;
    height: 38px;
    display: inline-block;
    cursor: pointer !important;
}
</style>