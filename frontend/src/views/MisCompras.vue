<!-- https://phppot.com/javascript/jspdf-autotable/
https://www.npmjs.com/package/jspdf 
-->
<template>
    <v-container>
        <v-card style="margin-top: 10px; justify:center">
            <v-card-title>Mis Compras</v-card-title>
            <v-simple-table class="tabla" v-if="miscompras.length > 0">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                                <b>Fecha</b>
                            </th>
                            <th class="text-left">
                                <b>Pedido N°</b>
                            </th>
                            <th class="text-left">
                                <b>Pago</b>
                            </th>
                            <th class="text-left">
                                <b>Total</b>
                            </th>
                            <th class="text-left">
                                <b>Ver Detalles</b>
                            </th>
                            <th class="text-left">
                                <b>Estado</b>
                            </th>
                            <th class="text-center">
                                <b>Ver Factura</b>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(compra, index) in miscompras" :key="index" style="padding-top: 5px;">

                            <td>
                                {{ getFechaFormateada(compra.fecha) }}
                            </td>
                            <td>
                                {{ compra.numero }}
                            </td>
                            <td>
                                {{ compra.mercadopagodatosid.estado }}
                            </td>
                            <td>
                                {{ compra.total }}
                            </td>
                            <td>
                                <detalle-pedido :pedidoParam="compra"></detalle-pedido>
                            </td>
                            <td>
                                <b>{{ compra.estado }}</b>
                            </td>

                            <td>
                                <div align="center">
                                    <div v-if="compra.estado == 'facturado'">
                                        <v-btn color="success" @click="facturaPDF(compra)">
                                            DESCARGAR
                                        </v-btn>
                                    </div>
                                    <div v-else-if="compra.estado == 'cancelado'">
                                        <b>Pedido Cancelado</b>
                                    </div>
                                    <div v-else>
                                        <b>En proceso...</b>
                                    </div>
                                </div>
                            </td>
                            <!-- <div v-else-if="compra.estado == 'cancelado'">
                                <td>
                                    Pedido Cancelado
                                </td>
                            </div>
                            <div v-else>
                                <td>
                                            <b>En proceso...</b>
                                        </td>
                                    </div> -->
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <div v-else>
                <v-row style="justify-content: center; align-content: center;"><v-card-title>No has realizado ningún
                        pedido</v-card-title></v-row>
            </div>
        </v-card>
    </v-container>
</template>
<script>
import detallePedido from '@/components/DetallePedido.vue'
import AuthService from "@/service/auth.service.js"
import { eventBus } from "../main";
import { jsPDF } from "jspdf"
import { autoTable } from "jspdf-autotable"
import { borrarCarrito } from "@/funciones/BorrarCarrito.js"
import { horaFormateada } from "@/funciones/horaFormateada.js"
export default {
    data() {
        return {
            miscompras: [],
            respuestaMercaPago: {
                external_reference: "",
                status: "",
                currentUser: undefined
            }
        }
    },
    components: {
        "detalle-pedido": detallePedido
    },
    mounted() {
        //this.comprasUsuario((JSON.parse(localStorage.getItem('user'))).id)
        //this.getParamsUrl(document.URL)
    },
    beforeMount() {
        this.currentUser = AuthService.getCurrentUser()
        this.getParamsUrl(document.URL)
    },
    methods: {
        getFechaFormateada(fecha) {
            return horaFormateada(fecha)
        },
        async comprasUsuario(id) {
            const res = await fetch(
                `http://localhost:3000/pedidosxid/${id}/`,
                {
                    headers: {
                        "Content-type": "application/json",
                        'x-access-token': this.currentUser.accessToken
                    },
                    mode: "cors",
                }
            );
            const resJson = await res.json();
            console.log(resJson);
            if (res.status == 401) { //quiere decir que expiró el token o no está logueado
                borrarCarrito() // ver cómo borrar el carrito antes que expire el token
                AuthService.logout()
                window.location.href = "/Home"
            }
            this.miscompras = resJson
        },
        async getParamsUrl(url) {
            console.log(url);
            url = new URL(url)
            //aquí tienes dos opciones
            const urlParams = new URLSearchParams(url.search);
            //const urlParams2 = url.searchParams;
            //son equivalentes
            for (const [key, value] of urlParams) {
                //console.log(key, ':', value);
                this.respuestaMercaPago[key] = value
            }
            console.log(this.respuestaMercaPago)
            // for (const [key, value] of urlParams2) {
            //     console.log(key, ':', value);
            // }
            if (this.respuestaMercaPago.status) {
                // if(this.respuestaMercaPago.status=="approved"){
                //     this.limpiarCarrito()
                // }
                await this.setPedido(this.respuestaMercaPago.external_reference,
                    this.respuestaMercaPago.status)
            } else {
                this.comprasUsuario((JSON.parse(localStorage.getItem('user'))).id)
            }
        },
        async setPedido(id, status) {
            console.log("id " + id + ", status: " + status)
            let urlServer = "http://localhost:3000/actualizarPedido/" + id
            let method = "POST";
            const respuesta = await fetch(urlServer, {
                method: method,
                body: JSON.stringify({ estado: 'pendiente' }), //estado pendiente esperando que lo envíen a la cocina
                headers: {
                    "Content-type": "application/json",
                    'x-access-token': this.currentUser.accessToken
                },
                mode: "cors",
            });
            const resJson = await respuesta.json()
            console.log("respuestaSetPedido: ", resJson)
            if (respuesta.status === 200) {
                console.log(respuesta.status)
                this.registrarPago()
            } else {
                this.respuestaError = resJson.message
                console.log("mensaje del servidor: " + this.respuestaError)
            }
            this.limpiarCarrito()
        },
        async limpiarCarrito() {
            let claves = Object.keys(localStorage);
            claves.forEach(clave => {
                console.log("Tengo una clave:", clave);
                if (clave != 'user') {
                    try {
                        localStorage.removeItem(clave)
                    } catch (err) {
                        console.log("err: " + err)
                    }
                }
            })
            eventBus.$emit("carrito-changed", this.cambioCarrito)
        },
        async registrarPago() {
            let urlServer = "http://localhost:3000/registrarPago" //mercaPago schema
            let method = "POST";
            const respuesta = await fetch(urlServer, {
                method: method,
                body: JSON.stringify({
                    identificadorPago: this.respuestaMercaPago.payment_id,
                    // fechaCreacion: this.respuestaMercaPago,
                    // fechaAprobacion: ,
                    formaPago: this.respuestaMercaPago.payment_type,
                    metodoPago: this.respuestaMercaPago.payment_type,
                    //nroTarjeta: ,
                    estado: this.respuestaMercaPago.status,
                    pedidoid: this.respuestaMercaPago.external_reference
                }),
                headers: {
                    "Content-type": "application/json",
                    'x-access-token': this.currentUser.accessToken
                },
                mode: "cors",
            })
            const resJson = await respuesta.json()
            console.log("respuestaRegistrarPago: ", resJson)
            if (respuesta.status === 200) {
                console.log(respuesta.status)

            } else {
                this.respuestaError = resJson.message
                console.log("mensaje del servidor: " + this.respuestaError)
            }
            this.comprasUsuario((JSON.parse(localStorage.getItem('user'))).id)
        },
        async facturaPDF(compra) {
            var doc = new jsPDF('p', 'pt', 'letter')
            // generate the above data table
            var body = []
            var foot = []
            for (let i = 0; i < compra.detallepedidoid.length; i++) {
                let comida = null
                try {
                    comida = compra.detallepedidoid[i].articulomanufacturadoid.denominacion
                } catch (e) {
                    comida = compra.detallepedidoid[i].articuloinsumoid.denominacion
                }
                body.push([i + 1, comida, compra.detallepedidoid[i].cantidad, (compra.detallepedidoid[i].subtotal / compra.detallepedidoid[i].cantidad), compra.detallepedidoid[i].subtotal])
            }
            foot.push([' ', 'Total', '  ', '  ', compra.total])
            if (compra.tipoEnvio == 'delivery') {
                body.push([' ', 'Costo Delivery', '  ', '  ', '500'])
            }
            if (compra.tipoEnvio == 'local') {
                body.push([' ', 'Descuento retiro en local', '  ', '  ', '-%10'])
            }
            // New Header and Footer Data Include the table
            var y = 10;
            doc.setLineWidth(2);
            doc.text("El Buen Sabor", doc.internal.pageSize.getWidth() / 2, 50, { align: 'center' });
            let fechaFormateada = (new Date(compra.fecha)).toJSON().substr(0, 10)

            doc.text(fechaFormateada, 10, 20)
            doc.autoTable({
                body: body,
                startY: 70,
                head: [['No', 'Denominacion', 'Cantidad', 'Precio Unitario', 'Subtotal']],
                foot: foot,
                headStyles: { textColor: [255, 255, 255], },
                footStyles: {
                    textColor: [255, 255, 255], halign: 'right'
                },

                theme: 'grid',
                columnStyles: {
                    0: { halign: 'right', cellWidth: '50', },
                    1: { halign: 'left', cellWidth: '330', },
                    2: { halign: 'right', cellWidth: '50', },
                    3: { halign: 'right', cellWidth: '50', },
                    4: { halign: 'right', cellWidth: '50', }
                },
            })

            // save the data to this file
            doc.save('auto_table_header_footer');
        }
    }
}    
</script>

<style>
.tabla {
    padding: 5%;
}

a {
    text-decoration: none;
}

.form-inline {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
}

.form-inline label {
    margin: 5px 10px 5px 0;
}

/* Style the input fields */
.form-inline input {
    vertical-align: middle;
    margin: 5px 10px 5px 0;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
}

/* Style the submit button */
.form-inline button {
    padding: 10px 20px;
    background-color: dodgerblue;
    border: 1px solid #ddd;
    color: white;
}

.form-inline button:hover {
    background-color: royalblue;
}

/* Add responsiveness - display the form controls vertically instead of horizontally on screens that are less than 800px wide */
@media (max-width: 800px) {
    .form-inline input {
        margin: 10px 0;
    }

    .form-inline {
        flex-direction: column;
        align-items: stretch;
    }

}
</style>