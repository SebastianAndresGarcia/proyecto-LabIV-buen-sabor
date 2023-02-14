<template>
    <v-container v-if='currentUser.roles.includes("ROLE_ADMIN")'>
        <v-card style="margin-top: 10px; justify:center">
            <v-row style="justify-content: center; margin-bottom: 10px;"><v-card-title>
                    <h2><b>Cocina</b></h2>
                </v-card-title>
            </v-row>
            <div v-if="pedidosData.length > 0">
                
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
                                    <b>horaEstimadaFin</b>
                                </th>
                                <th class="text-left">
                                    <b>Ver Detalles</b>
                                </th>
                                <th class="text-left">
                                    <b>Estado</b>
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
                                    {{ pedido.horaEstimadaFin }}
                                </td>
                                <td>
                                    <detalle-pedido :pedidoParam="pedido"></detalle-pedido>
                                </td>
                                <td>
                                    Cocinando...
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

export default {
    components: {
        "detalle-pedido": detallepedido,
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
            pedidosData: []
        };
    },
    methods: {
        async getPedidos() {
            const res = await fetch(
                "http://localhost:3000/pedidoscocinero"
            );
            const resJson = await res.json();
            console.log(resJson);
            this.pedidosData = resJson;
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