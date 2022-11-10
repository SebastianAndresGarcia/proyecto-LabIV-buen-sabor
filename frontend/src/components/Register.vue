<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">
          Registrarse
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Crear cuenta</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Nombres*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Apellidos*" hint="example of helper text only on focus"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Nombre de usuario en la App*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Contraseña*" type="password" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Confirmar Contraseña*" type="password" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                
                  <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                    transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="date" label="Fecha de Nacimiento" prepend-icon="mdi-calendar" readonly
                        v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Salir
                      </v-btn>
                      <v-btn text color="primary" @click="$refs.menu.save(date)">
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                
              </v-col>
             
            </v-row>
          </v-container>
          <small>*campos obligatorios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Salir
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Guardar
          </v-btn>
        </v-card-actions>
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
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
    }
  },
 
};
</script>