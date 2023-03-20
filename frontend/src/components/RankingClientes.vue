<template>
    <v-container>
        <v-expansion-panel-content>
            <v-divider class="mt-2"></v-divider>
            <v-row>
                <v-col>
                    <v-menu ref="menuDesde" v-model="menuDesde" :close-on-content-click="false"
                        :return-value.sync="fechaDesde" transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="fechaDesde" label="Fecha Desde" prepend-icon="mdi-calendar" readonly
                                v-bind="attrs" v-on="on" :rules="[v => !!v || 'Obligatorio']" required></v-text-field>
                        </template>
                        <v-date-picker v-model="fechaDesde" no-title scrollable required>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menuDesde = false">
                                Salir
                            </v-btn>
                            <v-btn text color="primary" @click="$refs.menuDesde.save(fechaDesde)">
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col>
                    <v-menu ref="menuHasta" v-model="menuHasta" :close-on-content-click="false"
                        :return-value.sync="fechaHasta" transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="fechaHasta" label="Fecha Hasta" prepend-icon="mdi-calendar" readonly
                                v-bind="attrs" v-on="on" :rules="[v => !!v || 'Obligatorio']" required></v-text-field>
                        </template>
                        <v-date-picker v-model="fechaHasta" no-title scrollable required>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menuHasta = false">
                                Salir
                            </v-btn>
                            <v-btn text color="primary" @click="$refs.menuHasta.save(fechaHasta)">
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <!-- <v-col v-if="fechaDesde&&fechaHasta">
                    <v-btn color="blue darken-1" @click="recaudaciones(fechaDesde,fechaHasta)">
                            Buscar
                    </v-btn>
                </v-col> -->
            </v-row>
            <v-row align="center" style="justify-content: center;" v-if="fechaDesde && fechaHasta">
                <v-simple-table class="tabla">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    
                                </th>
                                <th class="text-left">
                                    <b>Usuario</b>
                                </th>
                                <th class="text-left">
                                    <b>Mail</b>
                                </th>
                                <th class="text-left">
                                    <b>Cantidad de Pedidos</b>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, i) in pedidosxcliente" :key="i" style="padding-top: 5px;">
                                <td>
                                    {{ i+1 }}
                                </td>
                                <td>
                                    {{ item.nombreusuario }}
                                </td>
                                <td>
                                    {{ item.usermail }}
                                </td>
                                <td>
                                    {{ item.cantidadpedidos }}
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-row>
            <v-row align="center" style="justify-content: center; padding-top: 10px;" v-if="fechaDesde && fechaHasta">
                <v-btn color="blue darken-1" @click="importarExcel()">
                    DESCARGAR A EXCEL
                </v-btn>
            </v-row>
            <!-- ITEM RANKING -->
        </v-expansion-panel-content>
    </v-container>
</template>
<script>
import exportFromJSON from "export-from-json"
export default {
    data() {
        return {
            menuDesde: false,
            menuHasta: false,
            fechaDesde: null,
            fechaHasta: null,
            pedidosxcliente: null,
        }
    },
    beforeUpdate() {
        if (this.fechaDesde && this.fechaHasta) {
            this.pedidosXcliente(this.fechaDesde, this.fechaHasta)
        }
    },
    methods: {
        async pedidosXcliente(fechaDesde, fechaHasta) {
            const res = await fetch(
                "http://localhost:3000/pedidosXcliente/" + fechaDesde + "/" + fechaHasta,
            );
            const resJson = await res.json();
            console.log("pedidosXcliente", resJson);
            this.pedidosxcliente = resJson
        },
        async importarExcel() {
            let fecha = [{ 'fechaDesde': this.fechaDesde, 'fechaHasta': this.fechaHasta }]
            let data=fecha
            data = data.concat(this.pedidosxcliente)
            console.log("data ", data)
            const fileName = 'rankingClientes'
            const exportType = exportFromJSON.types.xls
            await exportFromJSON({ data, fileName, exportType })
        }
    }
}

</script>
