<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">
          Iniciar sesión
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Iniciar sesión</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              
              <v-col cols="12">
                <v-text-field label="Nombre de usuario o email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Contraseña*" type="password" required></v-text-field>
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
  data: () => ({
    dialog: false,
  }),
};
</script>