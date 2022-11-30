<template>
    <v-card elevation="4">
        <v-card-title>GESTION DE ARTICULOS</v-card-title>

        <v-card-text>
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header style="height: 100px; background-color:aqua">
                        <template v-slot:default="{ open }">
                            <v-row no-gutters>
                                <v-col cols="4">
                                    Articulo Manufacturado
                                </v-col>

                            </v-row>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-divider class="mt-2"></v-divider>
                        <v-row>
                            <v-col>
                                <v-select multiple label="Seleccione un Rubro" outlined v-model="rubroSeleccionado"
                                    :items="rubros" item-value="_id" item-text="denominacion">
                                    <template v-slot:prepend-item>
                                        <v-list-item ripple @mousedown.prevent @click="toggle">
                                            <v-list-item-action>
                                                <v-icon :color="rubroSeleccionado.length > 0 ? 'indigo darken-4' : ''">
                                                    {{ icon }}
                                                </v-icon>
                                            </v-list-item-action>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    Select All
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-divider class="mt-2"></v-divider>
                                    </template>
                                </v-select>
                            </v-col>
                            
                            <v-col style="margin-top: 20px;">
                                <Crear-Rubro ></Crear-Rubro>
                            </v-col>
                        </v-row>
                        <p>{{ rubroSeleccionado }}</p>
                        <articulomanufacturado-item :manufacturadoParam="rubroSeleccionado">
                        </articulomanufacturado-item>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header v-slot="{ open }" style="height: 100px; background-color:greenyellow">
                        <v-row no-gutters>
                            <v-col cols="4">
                                Articulo Insumo
                            </v-col>

                        </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>

                        <v-select multiple label="Seleccione un insumo" outlined v-model="insumoSeleccionado"
                            :items="insumos" item-value="_id" item-text="denominacion">
                            <template v-slot:prepend-item>
                                <v-list-item ripple @mousedown.prevent @click="toggleInsumos">
                                    <v-list-item-action>
                                        <v-icon :color="insumoSeleccionado.length > 0 ? 'indigo darken-4' : ''">
                                            {{ icon }}
                                        </v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Select All
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-divider class="mt-2"></v-divider>
                            </template>
                        </v-select>
                        <v-btn color="primary" dark class="mb-2"> Crear Insumo </v-btn>
                        <p>{{ insumoSeleccionado }}</p>
                        <articuloinsumo-item :insumoParam="insumoSeleccionado"></articuloinsumo-item>

                    </v-expansion-panel-content>
                </v-expansion-panel>

            </v-expansion-panels>
        </v-card-text>
    </v-card>

</template>
<script >
import articuloManufacturado from "@/components/ArticuloManufacturado.vue";
import articuloInsumo from "@/components/ArticuloInsumo.vue";
import CrearRubro from "@/components/CrearRubro.vue";
export default {
    name: "abm-articulos",
    components: {
        "articulomanufacturado-item": articuloManufacturado,
        "articuloinsumo-item": articuloInsumo,
        "Crear-Rubro": CrearRubro
    },
    data() {
        return {
            rubros: [],
            rubroSeleccionado: [],
            insumos: [],
            insumoSeleccionado: [],
            rubrocreado: false
        }
    },
    
    mounted() {
        this.getRubrosGeneral(),
        this.getRubrosArticulos()
    },

    methods: {
        async getRubrosGeneral() {
            const res = await fetch(
                "http://localhost:3000/rubrosgeneral"
            );
            const resJson = await res.json();

            this.rubros = resJson;
            console.log("RUBROS ", this.rubros);
            console.log("RUBROS tamaño", this.rubros.length);

        },
        async getRubrosArticulos() {
            const res = await fetch(
                "http://localhost:3000/rubros"
            );
            const resJson = await res.json();

            this.insumos = resJson;
            console.log("InsumosArticulos ", this.insumos);
            console.log("tamaño", this.insumos.length);

        },
        toggle() {
            this.$nextTick(() => {
                if (this.selectAll) {
                    this.rubroSeleccionado = []
                } else {
                    this.rubroSeleccionado = this.rubros.slice()
                }
            })
        },
        toggleInsumos() {
            this.$nextTick(() => {
                if (this.selectAllinsumos) {
                    this.insumoSeleccionado = []
                } else {
                    this.insumoSeleccionado = this.insumos.slice()
                }
            })
        },
    },
    computed: {
        selectAll() {
            return this.rubroSeleccionado.length === this.rubros.length
        },
        selectSome() {
            return this.rubroSeleccionado.length > 0 && !this.selectAll
        },
        icon() {
            if (this.selectAll) return 'mdi-close-box'
            if (this.selectSome) return 'mdi-minus-box'
            return 'mdi-checkbox-blank-outline'
        },
        selectAllinsumos() {
            return this.insumoSeleccionado.length === this.insumos.length
        },
        selectSomeInsumo() {
            return this.insumoSeleccionado.length > 0 && !this.selectAllinsumos
        },
        icon() {
            if (this.selectAllinsumos) return 'mdi-close-box'
            if (this.selectSomeInsumo) return 'mdi-minus-box'
            return 'mdi-checkbox-blank-outline'
        },
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