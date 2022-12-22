<template>
  <v-row justify="center" align="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark class="mb-20" v-bind="attrs" v-on="on"> Crear Rubro </v-btn>
      </template>

      <v-card ref="form">
        <v-card-title>
          <span class="text-h5">Crear Rubro</span>
        </v-card-title>

        <form @submit.prevent="crearRubro">
          <v-card-text>
            <v-container>
              <v-row>

                <v-col cols="12">
                  <v-text-field label="Denominacion" v-model="rubro.denominacion" required>
                  </v-text-field>
                </v-col>

              </v-row>

            </v-container>
          </v-card-text>
          <v-col cols="12">
            <h4 style="color: red; text-align: center;">{{ respuestaError }} </h4>
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
                  Salir
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
export default {
  data() {
    return {
      dialog: false,
      rubro: {
        denominacion: ""
      },
      respuestaError: '',
      //rubrocreado: false,
      nuevoRubro: false
    }
  },
  beforeUpdate() {

  },
  methods: {
    async crearRubro() {
      console.log("entró");
      console.log(this.rubro);
      let urlServer = "http://localhost:3000/crearRubroGeneral";
      let method = "POST";

      const respuesta = await fetch(urlServer, {
        method: method,
        body: JSON.stringify(this.rubro),
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",

      });
      const resJson = await respuesta.json()
      console.log("respuesta: ", resJson)
      if (respuesta.status === 200) {
        console.log(respuesta.status)
        this.dialog = false;
        this.nuevoRubro = true
      } else {

        this.respuestaError = resJson.message
        console.log("mensaje del servidor: " + this.respuestaError)
      }
      this.rubro.denominacion = ""
    }
  },
  watch: {
    nuevoRubro: function () {
      this.$emit('nuevoRubro', this.nuevoRubro)
    }
  }
};
</script>