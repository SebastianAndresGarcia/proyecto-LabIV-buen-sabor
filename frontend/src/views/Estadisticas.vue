<!-- *Reportes en excel: Ranking comidas más pedidas en un periodo de tiempo determinado
Ingresos (recaudaciones) por períodos de tiempo. Diario / Mensual
Cantidad de pedidos agrupados por cliente en un determinado periodo de tiempo.
Monto de Ganancia en un periodo de tiempo (ventas - costos) -->
<template>
    <v-card style="margin: 10px" v-if='currentUser.roles.includes("ROLE_ADMIN")' elevation="4">
        <v-row style="margin: 10px; justify-content:center"><v-card-title><b>CENTRO DE
                    ESTADISTICAS</b></v-card-title></v-row>

        <v-card-text>
            <v-expansion-panels>

                <v-expansion-panel>
                    <v-expansion-panel-header style="height: 100px; background-color:aqua">
                        <template v-slot:default="{ open }">
                            <v-row no-gutters>
                                <v-col cols="4">
                                    COMIDAS MÁS VENDIDAS
                                </v-col>
                            </v-row>
                        </template>
                    </v-expansion-panel-header>
                    <items-ranking></items-ranking>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header style="height: 100px; background-color:aqua">
                        <template v-slot:default="{ open }">
                            <v-row no-gutters>
                                <v-col cols="4">
                                    RECAUDACIONES
                                </v-col>
                            </v-row>
                        </template>
                    </v-expansion-panel-header>
                    <item-recaudaciones></item-recaudaciones>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header style="height: 100px; background-color:aqua">
                        <template v-slot:default="{ open }">
                            <v-row no-gutters>
                                <v-col cols="4">
                                    GANANCIAS EN PERIODO DE TIEMPO
                                </v-col>
                            </v-row>
                        </template>
                    </v-expansion-panel-header>
                    <item-ganancias></item-ganancias>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header style="height: 100px; background-color:aqua">
                        <template v-slot:default="{ open }">
                            <v-row no-gutters>
                                <v-col cols="4">
                                    RANKING CLIENTES
                                </v-col>
                            </v-row>
                        </template>
                    </v-expansion-panel-header>
                    <item-clientes></item-clientes>
                </v-expansion-panel>

            </v-expansion-panels>
        </v-card-text>


    </v-card>
</template>
<script >

import AuthService from "@/service/auth.service.js"
import masvendidos from "@/components/MasVendidos.vue"
import comprasclientes from "@/components/RankingClientes.vue"
import recaudaciones from "@/components/Recaudaciones.vue"
import ganancias from "@/components/Ganancias.vue"
export default {
    name: "estadisticas",
    components: {
        "items-ranking": masvendidos,
        "item-clientes": comprasclientes,
        "item-recaudaciones": recaudaciones,
        "item-ganancias": ganancias
    },
    data() {
        return {
            currentUser: undefined,
            maspedidos: null,
            ingresos: null,
            pedidosxcliente: null,
            gananciasxtiempo: null,
            fecha: null
        }
    },
    beforeMount() {
        this.currentUser = AuthService.getCurrentUser()
    },
    mounted() {
        this.verificarUsuario(this.currentUser)

        this.recaudaciones("2023-01-17", "2023-03-17")
        this.pedidosXcliente("2023-01-17", "2023-03-17")
        this.ganancias("2023-01-17", "2023-03-17")
    },

    methods: {

        async verificarUsuario(currentUser) {
            if (currentUser) {
                if (!currentUser.roles.includes("ROLE_ADMIN")) {
                    window.location.href = "/Home"
                }
            } else {
                window.location.href = "/Home"
            }
        },
        async recaudaciones(fechaDesde, fechaHasta) {
            const res = await fetch(
                "http://localhost:3000/recaudaciones/" + fechaDesde + "/" + fechaHasta,
            );
            const resJson = await res.json();
            console.log("recaudaciones", resJson);
            this.ingresos = resJson
        },
        async pedidosXcliente(fechaDesde, fechaHasta) {
            const res = await fetch(
                "http://localhost:3000/pedidosXcliente/" + fechaDesde + "/" + fechaHasta,
            );
            const resJson = await res.json();
            console.log("pedidosXcliente", resJson);
            this.pedidosxcliente = resJson
        },
        async ganancias(fechaDesde, fechaHasta) {
            let method = "GET"
            const res = await fetch(
                "http://localhost:3000/ganancias/" + fechaDesde + "/" + fechaHasta,
            );
            const resJson = await res.json();
            console.log("ganancias", resJson);
            this.gananciasxtiempo = resJson
        }

    },

};

</script>
<style scoped>
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