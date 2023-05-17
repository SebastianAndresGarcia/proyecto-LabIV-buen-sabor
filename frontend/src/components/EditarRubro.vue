<template>
  <v-row justify="center" align="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>

      <v-card ref="form">
        <v-card-title>
          <span class="text-h5">Editar Rubro</span>
        </v-card-title>

        <form @submit.prevent="editarRubro">
          <v-col v-if="rubros.length > 0">
            <v-select
              label="Rubro Padre"
              outlined
              v-model="cambioRubroPadre"
              :items="rubros"
              item-value="_id"
              item-text="denominacion"
            >
              <template v-slot:prepend-item>
                <v-divider class="mt-2"></v-divider>
              </template>
            </v-select>
          </v-col>
          {{ cambioRubroPadre }}
          <!--RubroGeneral-->
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Denominacion"
                    v-model="rubro.denominacion"
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-col cols="12">
            <h4 style="color: red; text-align: center">{{ respuestaError }}</h4>
          </v-col>
          <v-col cols="12">
            <v-row v-for="ins in cantidadHijos" :key="ins.id">
              <v-col cols="2">
                <v-text-field
                  label="Subrubro"
                  type="text"
                  v-model="rubroHijo[ins - 1].denominacion"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-btn @click="eliminarHijo(ins)">Eliminar</v-btn>
              </v-col>
            </v-row>
            <v-btn @click="agregarHijo">Agregar Subrubro</v-btn>
          </v-col>
          <v-divider class="mt-2"></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-container>
              <v-row justify="center" style="margin-bottom: 20px">
                <v-btn color="blue darken-1" text type="submit">
                  Guardar
                </v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Cancelar
                </v-btn>
              </v-row>
            </v-container>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
  </v-row>
</template>
    
<script>
import { eventBus } from "../main";
import AuthService from "@/service/auth.service.js";
export default {
  data() {
    return {
      dialog: false,
      rubro: "",
      cambioRubroPadre: "0",
      respuestaError: "",
      rubros: [],
      rubroHijo: [],
      cantidadHijos: null,
    };
  },
  props: ["rubroParam"],
  beforeMount() {
    this.currentUser = AuthService.getCurrentUser();
    this.verificarUsuario(this.currentUser);
  },
  mounted() {
    this.rubro = this.rubroParam;
    this.getRubrosSubrubros();
    
    console.log("rubro " + this.rubro);
    if (this.rubro) {
      this.obtenerArbol(this.rubro._id);
    }
  },
  methods: {
    async obtenerArbol(rubroid) {
      console.log(rubroid);
      const res = await fetch(
        "http://localhost:3000/obtenerArbolDeArticuloPadre/" + rubroid,
        {
          headers: {
            "x-access-token": this.currentUser.accessToken,
          },
        }
      );
      const resJson = await res.json();
      this.arbol = resJson;
      console.log("arbol en editar ", this.arbol);
    },
    async getRubrosSubrubros() {
      const res = await fetch("http://localhost:3000/getRubrosSubrubros", {
        headers: {
          "x-access-token": this.currentUser.accessToken,
        },
      });
      this.rubros=this.rubros.concat(this.rubroParam)
      this.cambioRubroPadre = this.rubros[0].padre
      this.rubros=this.rubros.concat({'denominacion': 'Convertir en Rubro Padre', 'padre': null, '_id': '0'})
      const resJson = await res.json();
      this.rubros = this.rubros.concat(resJson);
      console.log(this.rubros);
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
    agregarHijo() {
      this.rubroHijo.push({ denominacion: "", padre: this.rubro._id });
      this.cantidadHijos = this.cantidadHijos + 1;
      console.log("cantidad de select: " + this.cantidadHijos);
    },
    async eliminarHijo(i) {
      this.cantidadHijos = this.cantidadHijos - 1;
      this.rubroHijo.splice(i - 1, 1);
      console.log("rubroHijo ", this.rubroHijo);
    },
    async editarRubro() {
      if (this.cambioRubroPadre) {
        let padreid=''
        if(this.cambioRubroPadre=='0'){
          padreid=null
        }else{
          padreid=this.cambioRubroPadre
        }
        let urlServer =
          "http://localhost:3000/actualizarRubroArticulo/" + this.rubro._id;
        let method = "POST";
        const respuesta = await fetch(urlServer, {
          method: method,
          body: JSON.stringify({ padre: padreid, denominacion: this.rubro.denominacion, padreAnterior: this.rubro.padre }),
          headers: {
            "Content-type": "application/json",
            "x-access-token": this.currentUser.accessToken,
          },
          mode: "cors",
        });
        const resJson = await respuesta.json();
        console.log("respuesta: ", resJson);
      }
      if (this.rubroHijo.length > 0) {
        for (let i = 0; i < this.rubroHijo.length; i++) {
          let urlServer = "http://localhost:3000/addChildArticuloPadre";
          let method = "POST";
          const respuesta = await fetch(urlServer, {
            method: method,
            body: JSON.stringify({
              padre: this.rubro._id,
              denominacion: this.rubroHijo[i].denominacion,
              esInsumo: false,
            }),
            headers: {
              "Content-type": "application/json",
              "x-access-token": this.currentUser.accessToken,
            },
            mode: "cors",
          });
          const resJson = await respuesta.json();
          console.log("respuesta: ", resJson);
        }
      }
      this.dialog=false
      eventBus.$emit("actualiza-arbol", true)
    },
  },
  watch: {
    nuevoRubro: function () {
      this.$emit("nuevoRubro", this.nuevoRubro);
    },
  },
};
</script>