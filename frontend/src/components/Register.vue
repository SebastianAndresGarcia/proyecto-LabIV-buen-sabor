<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn block text v-bind="attrs" v-on="on"> <v-icon>mdi-account</v-icon>Registrarse </v-btn>
      </template>
      <v-card ref="form">
        <v-card-title>
          <span class="text-h5">Crear cuenta</span>
        </v-card-title>

        <form @submit.prevent="registrar">
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Nombres*" v-model="usuarioNuevo.nombre" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Apellidos*" v-model="usuarioNuevo.apellido"
                  hint="example of helper text only on focus" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Nombre de usuario en la App*" v-model="usuarioNuevo.username" required>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" v-model="usuarioNuevo.email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Contraseña*" v-model="usuarioNuevo.password" type="password" required>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Confirmar Contraseña*" v-model="usuarioNuevo.password" type="password" required>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="fechaNacimiento"
                  transition="scale-transition" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="usuarioNuevo.fechaNacimiento" label="Fecha de Nacimiento"
                      prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" :rules="[v => !!v || 'Obligatorio']"
                      required></v-text-field>
                  </template>
                  <v-date-picker v-model="usuarioNuevo.fechaNacimiento" no-title scrollable required>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Salir
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(fechaNacimiento)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <small>*Todos los campos son obligatorios</small>
          </v-card-text>
          <v-divider class="mt-2"></v-divider>

          <v-card-actions>

            <v-btn text color="blue darken-1" @click="dialog = false">
              Cancel
            </v-btn>
            <v-spacer></v-spacer>

            <v-btn text color="blue darken-1" type="submit">
              Guardar
            </v-btn>
          </v-card-actions>
        </form>

      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "register-item",

  data() {
    return {
      dialog: false,
      fechaNacimiento: null,
      menu: false,
      modal: false,
      menu2: false,
      usuarioNuevo: {
        username: "",
        email: "",
        password: "",
        nombre: "",
        apellido: "",
        fechaNacimiento: null,
        telefono: null,
        borrado: false,
      },
    };
  },

  methods: {
    async registrar() {

      console.log("entró");
      console.log(this.usuarioNuevo);
      let urlServer = "http://localhost:3000/api/auth/signup";
      let method = "POST";

      await fetch(urlServer, {
        method: method,
        body: JSON.stringify(this.usuarioNuevo),
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
      });
      this.dialog = false;
    },
  },
};
</script>