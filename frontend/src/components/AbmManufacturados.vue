<template>
    <v-card style="margin: 10px" v-if='currentUser.roles.includes("ROLE_ADMIN")||currentUser.roles.includes("ROLE_CHEF")' elevation="4">
        <v-row style="margin: 10px; justify-content:center"><v-card-title><b>GESTION DE ARTICULOS</b>
            </v-card-title></v-row>
        <v-row>
            <v-col cols="2">
                <v-card >
                    <Crear-Rubro @nuevoRubro="handleMessage3"></Crear-Rubro>
                    <v-divider class="mt-10"></v-divider>
                    <v-card-subtitle><b>Fitrar por Rubro</b></v-card-subtitle>
                    <v-card-text>
                        <v-checkbox v-model="rubroSeleccionado" v-for="rubro in rubros" :value="rubro._id" :key="rubro._id"
                            :label="rubro.denominacion">
                        </v-checkbox>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="10">
                <v-card-text>
                    <!-- <p>{{ rubroSeleccionado }}</p> -->
                    <articulomanufacturado-item :manufacturadoParam="rubroSeleccionado">
                    </articulomanufacturado-item>
                </v-card-text>
            </v-col>
        </v-row>
    </v-card>
</template>
<script >
import articuloManufacturado from "@/components/ArticuloManufacturado.vue";
import CrearRubro from "@/components/CrearRubro.vue";
import AuthService from "@/service/auth.service.js"
export default {
    name: "abm-manufacturados",
    components: {
        "articulomanufacturado-item": articuloManufacturado,
        "Crear-Rubro": CrearRubro,
    },
    data() {
        return {
            rubros: [],
            rubroSeleccionado: [],
            rubrocreado: false,
            currentUser: undefined
        }
    },
    beforeMount() {
        this.currentUser = AuthService.getCurrentUser()
    },
    mounted() {
        this.verificarUsuario(this.currentUser)
        this.getRubrosGeneral()
    },

    methods: {
        async getRubrosGeneral() {
            const res = await fetch(
                "http://localhost:3000/rubrosgeneral"
            );
            if (res.status == 401) { //quiere decir que expiró el token o no está logueado
                borrarCarrito() // ver cómo borrar el carrito antes que expire el token
                AuthService.logout()
                window.location.href = "/Home"
            }
            const resJson = await res.json();
            this.rubros = resJson;
            console.log("RUBROS ", this.rubros);
            console.log("RUBROS tamaño", this.rubros.length);
        },
        
        handleMessage3(value) {
            console.log("entró handleMessage3" + value)
            this.nuevoArt = value
            if (this.nuevoArt) {
                this.getRubrosGeneral()
                this.nuevoArt = false
            }
        },

        async verificarUsuario(currentUser) {
            if (currentUser) {
                if (!currentUser.roles.includes("ROLE_ADMIN")&&!currentUser.roles.includes("ROLE_CHEF")) {
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