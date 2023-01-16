<template>
    <v-container>
        <v-card v-if="miscompras.length > 0" style="margin-top: 10px; justify:center">
            <v-card-title>Mis Pedidos</v-card-title>
            <v-simple-table class="tabla">
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
                                <b>Estado</b>
                            </th>
                            <th class="text-left">
                                <b>Total</b>
                            </th>
                            <th class="text-left">
                                <b>Ver Detalles</b>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(compra, index) in miscompras" :key="index" style="padding-top: 5px;">

                            <td>
                                {{ compra.fecha }}
                            </td>
                            <td>
                                {{ compra.numero }}
                            </td>
                            <td>
                                {{ compra.estado }}
                            </td>
                            <td>
                                {{ compra.total }}
                            </td>
                            <td>
                                <detalle-pedido :pedidoParam="compra"></detalle-pedido>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card>
    </v-container>
</template>
<script>
import detallePedido from '@/components/DetallePedido.vue'
import { eventBus } from "../main";
export default {
    data() {
        return {
            miscompras: [],
            respuestaMercaPago: {
                external_reference: "",
                status: ""
            }
        }
    },
    components: {
        "detalle-pedido": detallePedido
    },
    mounted() {
        this.comprasUsuario((JSON.parse(localStorage.getItem('user'))).id)
        //this.getParamsUrl(document.URL)
    },
    beforeUpdate() {
        this.getParamsUrl(document.URL)
    },
    methods: {
        async comprasUsuario(id) {
            const res = await fetch(
                `http://localhost:3000/pedidosxid/${id}/`
            );
            const resJson = await res.json();
            console.log(resJson);
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
                this.setPedido(this.respuestaMercaPago.external_reference,
                    this.respuestaMercaPago.status)
            }
        },
        async setPedido(id, status) {
            let urlServer = "http://localhost:3000/actualizarPedido/" + id
            let method = "POST";
            const respuesta = await fetch(urlServer, {
                method: method,
                body: JSON.stringify({ estado: status }),
                headers: {
                    "Content-type": "application/json",
                },
                mode: "cors",
            });
            const resJson = await respuesta.json()
            console.log("respuesta: ", resJson)
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
            let urlServer = "http://localhost:3000/registrarPago"
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
                },
                mode: "cors",
            })
            const resJson = await respuesta.json()
            console.log("respuesta: ", resJson)
            if (respuesta.status === 200) {
                console.log(respuesta.status)
             
            } else {
                this.respuestaError = resJson.message
                console.log("mensaje del servidor: " + this.respuestaError)
            }
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