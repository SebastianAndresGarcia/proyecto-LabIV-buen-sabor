<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on"> Iniciar sesión </v-btn>
      </template>

      <v-card ref="form">
        <v-card-title>
          <span class="text-h5">Iniciar sesión</span>
        </v-card-title>

        <form @submit.prevent="ingresar">
          <v-card-text>
            <v-container>
              <v-row>

                <v-col cols="12">
                  <v-text-field label="Nombre de usuario" v-model="usuario.username" required>
                  </v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field label="Contraseña" v-model="usuario.password" type="password" required>
                  </v-text-field>
                </v-col>
                
              </v-row>

            </v-container>
          </v-card-text>
          <v-col cols="12"><h4 style="color: red; text-align: center;">{{respuestaError}}  </h4> </v-col>
          <v-divider class="mt-2"></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-container>
              <v-row justify="center" style="margin-bottom: 20px">
                <v-btn color="blue darken-1" text type="submit">
                  Ingresar
                </v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Salir
                </v-btn>
              </v-row>
              <v-row>
                <v-col>
                  <a style="text-decoration: none; color: blue darken-1;" @click="dialog = false">
                    Olvidó su contraseña?
                  </a>
                </v-col>
                <v-col>
                  <a style="text-decoration: none; color: blue darken-1;" @click="dialog = false">
                    No tiene cuenta??
                  </a>
                </v-col>
                
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
      usuario: {
        username: "",
        password: "",
        },
        respuestaError: ''
    }
  },

  methods: {
    async ingresar() {
      console.log("entró");
      console.log(this.usuario);
      let urlServer = "http://localhost:3000/api/auth/signin";
      let method = "POST";

      const respuesta = await fetch(urlServer, {
        method: method,
        body: JSON.stringify(this.usuario),
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
      } else {

        this.respuestaError = resJson.message
        console.log("mensaje del servidor: " + this.respuestaError)
      }

    },
  }
};
</script>