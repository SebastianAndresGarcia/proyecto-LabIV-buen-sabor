<template>
  <v-expansion-panel>
    <v-expansion-panel-header
      style="height: 100px; background-color: greenyellow"
    >
      <template>
        <v-row no-gutters>
          <v-col cols="4"> RECAUDACIONES </v-col>
        </v-row>
      </template>
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-divider class="mt-2"></v-divider>
      <v-row>
        <v-col>
          <v-menu
            ref="menuDesde"
            v-model="menuDesde"
            :close-on-content-click="false"
            :return-value.sync="fechaDesde"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="fechaDesde"
                label="Fecha Desde"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="[(v) => !!v || 'Obligatorio']"
                required
              ></v-text-field>
            </template>
            <v-date-picker v-model="fechaDesde" no-title scrollable required>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menuDesde = false">
                Salir
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menuDesde.save(fechaDesde)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col>
          <v-menu
            ref="menuHasta"
            v-model="menuHasta"
            :close-on-content-click="false"
            :return-value.sync="fechaHasta"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="fechaHasta"
                label="Fecha Hasta"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="[(v) => !!v || 'Obligatorio']"
                required
              ></v-text-field>
            </template>
            <v-date-picker v-model="fechaHasta" no-title scrollable required>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menuHasta = false">
                Salir
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menuHasta.save(fechaHasta)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <!-- <v-col v-if="fechaDesde&&fechaHasta">
                    <v-btn color="blue darken-1" @click="recaudaciones(fechaDesde,fechaHasta)">
                            Buscar
                    </v-btn>
                </v-col> -->
      </v-row>
      <v-row
        align="center"
        style="justify-content: center"
        v-if="fechaDesde && fechaHasta"
      >
        <h1>{{ ingresos }}</h1>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>

export default {
  data() {
    return {
      currentUser: undefined,
      menuDesde: false,
      menuHasta: false,
      fechaDesde: null,
      fechaHasta: null,
      ingresos: null,
    };
  },
  props:["user"],
  beforeMount() {
    this.currentUser = this.user;
  },

  beforeUpdate() {
    if (this.fechaDesde && this.fechaHasta) {
      this.recaudaciones(this.fechaDesde, this.fechaHasta);
    }
  },
  methods: {
    async recaudaciones(fechaDesde, fechaHasta) {
      const res = await fetch(
        "http://localhost:3000/recaudaciones/" + fechaDesde + "/" + fechaHasta,
        {
          headers: {
            "Content-type": "application/json",
            "x-access-token": this.currentUser.accessToken,
          },
          mode: "cors",
        }
      );
      if (res.status == 401) {
        //quiere decir que expiró el token o no está logueado
        alert('sesion expirada, vuelva a iniciar sesión')
        AuthService.logout();
        window.location.href = "/Home";
      }
      const resJson = await res.json();
      console.log("recaudaciones", resJson);
      this.ingresos = resJson.ingresos.ventas;
    },
  },
};
</script>
