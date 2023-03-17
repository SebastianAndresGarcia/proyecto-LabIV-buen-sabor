<template>
    <v-container v-if='currentUser.roles.includes("ROLE_ADMIN")'>
        <v-card style="margin-top: 10px; justify:center">
            <v-row style="justify-content: center"><v-card-title>
                    <h2><b>Pedidos</b></h2>
                </v-card-title>
            </v-row>
            <div v-if="pedidosData.length > 0">
                <v-row align="center">
                    <v-col cols="2">
                        <v-subheader>
                            Ver
                        </v-subheader>
                    </v-col>

                    <v-col cols="10">
                        <v-select v-model="select" :items="items" item-text="state" item-value="state"></v-select>
                    </v-col>
                </v-row>
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
                                    <b>Pago</b>
                                </th>
                                <th class="text-left">
                                    <b>horaEstimadaFin</b>
                                </th>
                                <th class="text-left">
                                    <b>Ver Detalles</b>
                                </th>
                                <th class="text-left">
                                    <b>Estado</b>
                                </th>
                                <th class="text-left">
                                    <h2><b>Acciones</b></h2>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(pedido, index) in pedidosData" :key="index" style="padding-top: 5px;">

                                <td>
                                    {{ pedido.fecha }}
                                </td>
                                <td>
                                    {{ pedido.numero }}
                                </td>
                                <td>
                                    {{ pedido.mercadopagodatosid.estado }}
                                </td>
                                <td>
                                    {{ pedido.horaEstimadaFin }}
                                </td>
                                <td>
                                    <detalle-pedido :pedidoParam="pedido"></detalle-pedido>
                                </td>
                                <td>
                                    {{ pedido.estado }}
                                    <!--pendiente, elaboracion, terminado, entregado (local o delivery), facturado -->
                                </td>
                                <td >
                                    <div  v-if="pedido.estado === 'pendiente'">
                                        <v-btn  small color="success" @click="cambiarEstado(pedido)">Enviar a Cocina</v-btn>
                                    </div>
                                    <div v-else-if="pedido.estado === 'terminado'">
                                        <form-factura  :pedidoParam="{ 'pedidoid': pedido._id, 'facturaid': pedido.facturaid }"></form-factura>
                                    </div>
                                    <div v-else>
                                        <b>Esperando a la cocina...</b>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </div>
            <div v-else><v-card-subtitle><b>No tienes Pedidos aún</b></v-card-subtitle></div>
        </v-card>
    </v-container>
</template>
<script>

import AuthService from "@/service/auth.service.js"
import detallepedido from "@/components/DetallePedido.vue"
import formfactura from "@/components/FormFactura.vue"


export default {

    components: {
        "detalle-pedido": detallepedido,
        "form-factura": formfactura
    },
    beforeMount() {
        this.currentUser = AuthService.getCurrentUser()
    },
    mounted() {
        this.verificarUsuario(this.currentUser)
        this.getPedidos()
    },
    data() {
        return {
            currentUser: undefined,
            pedidosData: [],
            select: 'Pendiente',
            items: [
                { state: 'Ver Todo' },
                { state: 'Pendiente' },
                { state: 'En preparación' },
                { state: 'Terminado' },

            ],
        };
    },
    methods: {
        async getPedidos() {
            const res = await fetch(
                "http://localhost:3000/pedidos"
            );
            const resJson = await res.json();
            console.log("resJson", resJson);
            this.pedidosData = resJson;
            setTimeout(() => this.getPedidos(), 10000) //milisegundos, va repitiendo la llamada cada 10 seg
        },
        async verificarUsuario(currentUser) {
            if (currentUser) {
                if (!currentUser.roles.includes("ROLE_ADMIN")) {
                    window.location.href = "/Home"
                }
            } else {
                window.location.href = "/Home"
            }
        },
        async cambiarEstado(pedido) {
            pedido.estado = 'elaboracion'
            let urlServer = "http://localhost:3000/actualizarPedido/" + pedido._id
            let method = "POST";
            const respuesta = await fetch(urlServer, {
                method: method,
                body: JSON.stringify({ estado: 'elaboracion' }),
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
        }
    }
};
</script>
<style scoped>
.row {
    text-align: justify;
    align-items: center;
    /**verticalmente */
    display: flex;
    margin-left: 0 auto;
    padding-left: 15%;
    padding-right: 15%;
}

.col {
    justify-content: center;
    text-align: justify;
    margin-left: auto;
}
</style>