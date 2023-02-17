<template>
    <v-card style="margin: 10px" v-if='currentUser.roles.includes("ROLE_ADMIN")' elevation="4">
        <v-row style="margin: 10px; justify-content:center"><v-card-title><b>GESTION DE ARTICULOS
                    INSUMOS</b></v-card-title></v-row>
        <v-row>
            <v-col cols="2">
                <v-card>
                    <Crear-RubroInsumo @nuevoRubroInsumo="handleMessage"></Crear-RubroInsumo>
                    <v-divider class="mt-10"></v-divider>
                    <v-card-subtitle><b>Fitrar por Rubro</b></v-card-subtitle>
                    <v-card-text>
                        <v-checkbox v-model="insumoSeleccionado" v-for="insumo in insumos" :value="insumo._id"
                            :key="insumo._id" :label="insumo.denominacion">
                        </v-checkbox>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="10">
                <v-card-text>
                    <v-divider class="mt-2"></v-divider>
                    <!-- <p>{{ insumoSeleccionado }}</p>  -->
                    <articuloinsumo-item :insumoParam="insumoSeleccionado"></articuloinsumo-item>
                </v-card-text>
            </v-col>
        </v-row>
    </v-card>
</template>
<script >

import articuloInsumo from "@/components/ArticuloInsumo.vue";
import CrearRubro from "@/components/CrearRubro.vue";
import CrearInsumo from "@/components/CrearInsumo.vue"
import AuthService from "@/service/auth.service.js"
export default {
    name: "abm-articulos",
    components: {

        "articuloinsumo-item": articuloInsumo,
        "Crear-Rubro": CrearRubro,
        "Crear-RubroInsumo": CrearInsumo
    },
    data() {
        return {
            rubros: [],
            rubroSeleccionado: [],
            insumos: [],
            insumoSeleccionado: [],
            rubrocreado: false,
            currentUser: undefined
        }
    },
    beforeMount() {
        this.currentUser = AuthService.getCurrentUser()
    },
    mounted() {
        this.verificarUsuario(this.currentUser)
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
       
        handleMessage3(value) {
            console.log("entró handleMessage3" + value)
            this.nuevoArt = value
            if (this.nuevoArt) {
                this.getRubrosGeneral()
                this.nuevoArt = false
            }
        },
        handleMessage(value) {
            console.log("entró handleMessageRubroArticulo" + value)
            this.nuevoIns = value
            if (this.nuevoIns) {
                this.getRubrosArticulos()
                this.nuevoIns = false
            }
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