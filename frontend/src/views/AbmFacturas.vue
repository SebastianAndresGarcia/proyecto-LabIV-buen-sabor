<template>
    <v-container v-if='currentUser.roles.includes("ROLE_ADMIN")'>
        <v-card style="margin-top: 20px; justify:center">
            <v-row style="justify-content: center"><v-card-title>
                    <h2><b>Facturas</b></h2>
                </v-card-title></v-row>
            <v-row align="center">
             
            </v-row>
            <v-simple-table class="tabla" v-if="facturasData.length > 0">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                                <b>Fecha</b>
                            </th>
                            <th class="text-left">
                                <b>Factura N°</b>
                            </th>
                            <th class="text-left">
                                <b>montoDescuento</b>
                            </th>
                            <th class="text-left">
                                <b>formaPago</b>
                            </th>
                            <th class="text-left">
                                <b>nroTarjeta</b>
                            </th>
                            <th class="text-left">
                                <b>totalVenta</b>
                            </th>
                            <th class="text-left">
                                <b>totalCosto</b>
                            </th>
                            <th class="text-left">
                                <b>ENVIAR A CLIENTE</b>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(factura, index) in facturasData" :key="index" style="padding-top: 5px;">

                            <td>
                                {{ factura.fecha }}
                            </td>
                            <td>
                                {{ factura.numero }}
                            </td>
                            <td>
                                {{ factura.montoDescuento }}
                            </td>
                            <td>
                                {{ factura.formaPago }}
                            </td>
                            <td>
                                <detalle-pedido :pedidoParam="factura"></detalle-pedido>
                            </td>
                            
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <div v-else>
                <v-card-subtitle><b>NO HAY FACTURAS DISPONIBLES</b></v-card-subtitle>
            </div>
        </v-card>
    </v-container>
</template>
<script>

import AuthService from "@/service/auth.service.js"
import detallepedido from "@/components/DetallePedido.vue"
export default {

    components: {
        "detalle-pedido": detallepedido
    },
    mounted() {
        this.currentUser = AuthService.getCurrentUser()
        this.verificarUsuario(this.currentUser)
        this.getFacturas()
    },
    data() {
        return {
            currentUser: undefined,
            facturasData: [],
            select: 'Pendiente',
            items: [
                { state: 'Ver Todo' },
                { state: 'Pendiente' },
                { state: 'Entregado' },
                { state: 'Cancelado' },

            ],
        };
    },
    methods: {
        async getFacturas() {
            const res = await fetch(
                "http://localhost:3000/facturas"
            );
            const resJson = await res.json();
            console.log(resJson);
            this.facturasData = resJson;
        },
        async verificarUsuario(currentUser) {
            if (currentUser) {
                if (!currentUser.roles.includes("ROLE_ADMIN")) {
                    window.location.href = "/Home"
                }
            } else {
                window.location.href = "/Home"
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