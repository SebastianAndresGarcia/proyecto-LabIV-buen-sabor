<template>
    <v-row>
        <v-dialog v-model="dialog" temporary max-width="700px">
            <template v-slot:activator="{ on, attrs }">
                <div v-if="pedidoParam.facturaid">
                    <v-btn v-bind="attrs" v-on="on" small color="success">Modificar
                        Factura
                    </v-btn>
                </div>
                <div v-else>
                    <v-btn v-bind="attrs" v-on="on" small color="success">Crear
                        Factura
                    </v-btn>
                </div>
            </template>

            <v-card ref="form">
                <v-card-title v-if="pedidoParam.facturaid">
                    <span class="text-h5">Modificar Factura</span>
                </v-card-title>
                <v-card-title v-else>
                    <span class="text-h5">Crear Factura</span>
                </v-card-title>
                <form @submit.prevent="crearFactura">
                    <v-card-text>
                        <v-row>
                            <!-- <v-col cols="12" sm="6" md="6">
                                <v-text-field label="Número de Factura*" v-model="factura.numero" required>
                                </v-text-field>
                            </v-col> -->
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="Fecha*" v-model="factura.fecha" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="montoDescuento*" type="number" v-model="factura.montoDescuento"
                                    hint="example of helper text only on focus" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field type="text" label="formaPago*" v-model="factura.formaPago" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="nroTarjeta*" v-model="factura.nroTarjeta" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field readonly label="totalCosto*" v-model="factura.totalCosto" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="totalVenta*" v-model="factura.totalVenta" required>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <small>*Todos los campos son obligatorios</small>
                    </v-card-text>
                    <v-divider class="mt-2"></v-divider>
                    <v-card-actions>
                        <v-btn text color="blue darken-1" @click="dialog = false">
                            Cancel
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn text color="blue darken-1" type="submit">
                            Guardar
                        </v-btn>
                    </v-card-actions>
                </form>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import AuthService from "@/service/auth.service.js"
import { calculaCosto } from "@/funciones/CalculaCosto.js"
export default {
    data() {
        return {
            currentUser: undefined,
            dialog: false,
            factura: {
                fecha: new Date(),
                número: null,
                montoDescuento: 0,
                formaPago: "",
                nroTarjeta: "0",
                totalVenta: null,
                totalCosto: null,
                detallefacturaid: [],
                pedidoid: ""
            },
            nuevaFactura: false
        }

    },
    mounted() {
        // console.log("this.pedidoParam", this.pedidoParam)
        this.getFactura(this.pedidoParam)
    },
    beforeMount() {
        this.currentUser = AuthService.getCurrentUser()
    },
    props: ["pedidoParam"],
    methods: {
        async crearFactura() { //también cumple la función de actualizar según el props activo
            this.factura.pedidoid = this.pedidoParam.pedidoid
            this.nuevaFactura = false
            if (this.pedidoParam.facturaid) {
                let urlServer = "http://localhost:3000/actualizarFactura/" + this.pedidoParam.facturaid;
                let method = "POST";
                const respuesta = await fetch(urlServer, {
                    method: method,
                    body: JSON.stringify(this.factura),
                    headers: {
                        "Content-type": "application/json",
                        'x-access-token': this.currentUser.accessToken
                    },
                    mode: "cors",
                });
                const resJson = await respuesta.json()
                if (respuesta.status === 200) {
                    console.log(respuesta.status)
                    this.dialog = false;
                    this.nuevaFactura = true
                    this.cambiarEstado(this.pedidoParam.pedidoid)
                    this.$emit('nuevaFactura',true)
                } else {
                    this.respuestaError = resJson.message
                }
            } else {
                let urlServer = "http://localhost:3000/crearFactura";
                let method = "POST";
                const respuesta = await fetch(urlServer, {
                    method: method,
                    body: JSON.stringify(this.factura),
                    headers: {
                        "Content-type": "application/json",
                        'x-access-token': this.currentUser.accessToken
                    },
                    mode: "cors",
                });
                const resJson = await respuesta.json()
                console.log("respuesta: ", resJson)
                if (respuesta.status === 200) {
                    console.log(respuesta.status)
                    this.dialog = false;
                    this.nuevaFactura = true
                    this.cambiarEstado(this.pedidoParam.pedidoid)
                    this.$emit('nuevaFactura',true)
                } else {
                    this.respuestaError = resJson.message
                    console.log("mensaje del servidor: " + this.respuestaError)
                }
            }
            //window.location.href('localhost:8080/abmfacturas')
        },
        async cerrardialog() {
            this.factura = {
                fecha: new Date(),
                número: null,
                montoDescuento: null,
                formaPago: "",
                nroTarjeta: "",
                totalVenta: null,
                totalCosto: null
            },
                this.nuevaFactura = false,
                this.dialog = false
        },
        async getFactura(pedidoParam) {
            if (pedidoParam.facturaid) {

                const res = await fetch(
                    `http://localhost:3000/facturaxid/${pedidoParam.facturaid}`,
                    {
                        headers: {
                            "Content-type": "application/json",
                            'x-access-token': this.currentUser.accessToken
                        },
                    }
                );
                const resJson = await res.json();
                //console.log("datosFactura", resJson);
                this.factura = resJson
            }
            else {
                const res = await fetch(
                    `http://localhost:3000/pedidoxid/${pedidoParam.pedidoid}`,
                    {
                        headers: {
                            "Content-type": "application/json",
                            'x-access-token': this.currentUser.accessToken
                        },
                    }
                );
                const resJson = await res.json();
                // console.log("datos para crear factura", resJson);
                this.factura = {
                    fecha: new Date(),
                    montoDescuento: 0,
                    formaPago: resJson.mercadopagodatosid.formaPago,
                    nroTarjeta: resJson.mercadopagodatosid.formaPago,
                    totalVenta: resJson.total,
                    totalCosto: resJson.totalCosto,
                    detallefacturaid: resJson.detallepedidoid,
                }
                // console.log("this.factura ", this.factura)
            }
            if (this.factura.totalCosto == 0 || this.factura.totalCosto == null) {
                this.factura.totalCosto = await calculaCosto(this.factura.detallefacturaid)
            }
        },
        async cambiarEstado(pedido) {

            let urlServer = "http://localhost:3000/actualizarPedido/" + pedido
            let method = "POST";
            const respuesta = await fetch(urlServer, {
                method: method,
                body: JSON.stringify({ estado: 'facturado' }),
                headers: {
                    "Content-type": "application/json",
                    'x-access-token': this.currentUser.accessToken
                },
                mode: "cors",
            });
            const resJson = await respuesta.json()
            // console.log("respuesta: ", resJson)
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