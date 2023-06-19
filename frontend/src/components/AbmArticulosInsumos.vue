<template>
  <v-card
    style="margin: 10px"
    v-if="currentUser.roles.includes('ROLE_ADMIN')"
    elevation="4"
  >
    <v-row style="margin: 10px; justify-content: center"
      ><v-card-title
        ><b>GESTION DE ARTICULOS DE VENTA DIRECTA </b></v-card-title
      ></v-row
    >
    <v-row>
      <v-col cols="3">
        <v-card>
          <Crear-RubroInsumo
            @nuevoRubroInsumo="handleMessage"
          ></Crear-RubroInsumo>
          <v-divider class="mt-10"></v-divider>
          <v-card-subtitle><b>Fitrar por Rubro</b></v-card-subtitle>

          <div v-if="arbol.length > 0">
            <sub-rubros
              v-for="item in arbol"
              :key="item._id"
              :subrubros="item"
              @changeRubroSeleccionado="handleRubroSelecc"
            />
          </div>
        </v-card>
      </v-col>
      <v-col cols="9">
        <v-card-text>
          <v-divider class="mt-2"></v-divider>
          <!-- <p>{{ rubroSeleccionado }}</p> -->
          <articulo-item
            :insumoParam="{
              insumoSeleccionado: rubroSeleccionado,
              esInsumo: false,
            }"
          ></articulo-item>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>
<script >
import articuloventadirecta from "@/components/ArticuloInsumo.vue";
import CrearInsumo from "@/components/CrearInsumo.vue";
import Subrubros from "@/components/Subrubros.vue";
import AuthService from "@/service/auth.service.js";
import { eventBus } from "../main";

export default {
  name: "abm-articulos",
  components: {
    "sub-rubros": Subrubros,
    "articulo-item": articuloventadirecta,
    "Crear-RubroInsumo": CrearInsumo,
  },
  data() {
    return {
      rubros: [],
      descendientes: [],
      rubroSeleccionado: [],
      currentUser: undefined,
      arbol: [],
    };
  },
  beforeMount() {
    this.currentUser = AuthService.getCurrentUser();
    this.verificarUsuario(this.currentUser);
    this.getRubrosArticulos();
  },
  mounted() {},

  methods: {
    async getRubrosArticulos() {
      const res = await fetch("http://localhost:3000/rubrosnoinsumos", {
        headers: {
          "x-access-token": this.currentUser.accessToken,
        },
      });
      if (res.status == 401) {
        //quiere decir que expiró el token o no está logueado
        AuthService.logout();
        window.location.href = "/Home";
      }
      const resJson = await res.json();

      this.rubros = resJson;
      console.log("RubrosArticulos ", this.rubros);
      console.log("tamaño", this.rubros.length);
      if (this.rubros.length > 0) this.obtenerArbolDeArticuloPadre(this.rubros);
    },

    async obtenerArbolDeArticuloPadre(rubrosParam) {
      for (let i = 0; i < rubrosParam.length; i++) {
        const res = await fetch(
          "http://localhost:3000/obtenerArbolDeArticuloPadre/" +
            rubrosParam[i]._id,
          {
            headers: {
              "x-access-token": this.currentUser.accessToken,
            },
          }
        );
        const resJson = await res.json();
        this.arbol.push(resJson);
        console.log("obtenerArbolDeArticuloPadre ", this.arbol);
      }
    },
    async handleRubroSelecc(value) {
      console.log("value", value);
      this.rubroSeleccionado = value.value;
      console.log("value recibido de Subrubros", this.rubroSeleccionado);
    },
    async verificarUsuario(currentUser) {
      if (currentUser) {
        if (!currentUser.roles.includes("ROLE_ADMIN")) {
          window.location.href = "/Home";
        }
      } else {
        window.location.href = "/Home";
      }
    },
    handleMessage(value) {
      console.log("entró handleMessageRubroArticulo" + value);
      this.nuevoIns = value;
      if (this.nuevoIns) {
        this.getRubrosArticulos();
        this.nuevoIns = false;
      }
    },
  },
  created() {
    eventBus.$on("actualiza-arbol", async (data) => {
      if (data == true) {
        //revisar bien si sirve este if, si no borrar
        console.log("entró");
        this.arbol = [];
        this.getRubrosArticulos();
      }
    });
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

<!-- <template>
    <v-container>
        <rubros-item :rubrosParam="rubros"></rubros-item>
    </v-container>
</template>
  
<script>
import Rubros from '@/components/Rubros.vue';
import AuthService from '@/service/auth.service.js'
export default {
    name: 'AbmArticulosInsumos',
    components: {
        "rubros-item": Rubros
    },
    data() {
        return {
            rubros: [
                // {
                //     _id: "1",
                //     denominacion: "Bebidas Alcohólicas",
                //     subrubros: [
                //         {
                //             _id: "2",
                //             denominacion: "Vinos",
                //             subrubros: null,
                //         },
                //         {
                //             _id: "3",
                //             denominacion: "Cervezas",
                //             subrubros: null,
                //         },
                //     ],
                // },
                // {
                //     _id: "4",
                //     denominacion: "Bebidas Sin Alcohol",
                //     subrubros: [
                //         {
                //             _id: "5",
                //             denominacion: "Gasificadas",
                //             subrubros: null,
                //         },
                //         {
                //             _id: "6",
                //             denominacion: "Sin Gas",
                //             subrubros: null,
                //         },
                //     ],
                // },
            ],
            currentUser: undefined
        }
    },
    mounted() {
        this.getRubrosArticulos()
    },
    beforeMount() {
        this.currentUser = AuthService.getCurrentUser()
    },
    methods: {
        async getRubrosArticulos() {
            const res = await fetch(
                "http://localhost:3000/rubrosInsumos",
                {
                    headers: {
                        'x-access-token': this.currentUser.accessToken
                    }
                }
            );
            const resJson = await res.json();
            this.rubros = resJson;
            console.log("InsumosArticulos ", this.rubros);
        },
    },
}
</script> -->
