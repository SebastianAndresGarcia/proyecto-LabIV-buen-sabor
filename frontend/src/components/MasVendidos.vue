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
            </v-row>
            <v-row align="center" style="justify-content: center;" v-if="fechaDesde && fechaHasta">
                <v-simple-table class="tabla">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    
                                </th>
                                <th class="text-left">
                                    <b>Denominación Comida</b>
                                </th>
                                <th class="text-left">
                                    <b>Cantidad Comprados</b>
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, i) in maspedidos" :key="i" style="padding-top: 5px;">
                                <td>
                                    {{ i+1 }}
                                </td>
                                <td>
                                    {{ item.comida }}
                                </td>
                                <td>
                                    {{ item.cantidadPedida }}
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-row>

            <!-- ITEM RANKING -->
        </v-expansion-panel-content>
    </v-container>
</template>
<script>
export default {
    
    data() {
        return {
            menuDesde: false,
            menuHasta: false,
            fechaDesde: null,
            fechaHasta: null,
            maspedidos: null
        }
    },
    beforeUpdate() {
        if (this.fechaDesde && this.fechaHasta) {
            this.manufacturadosVendidos(this.fechaDesde, this.fechaHasta)
        }
    },
    methods: {
        async manufacturadosVendidos(fechaDesde, fechaHasta) {
            const res = await fetch(
                "http://localhost:3000/manufacturadosVendidos/" + fechaDesde + "/" + fechaHasta,
            );
            const resJson = await res.json();
            console.log("resJson", resJson);
            this.maspedidos = resJson
        },
    }
}
</script>
