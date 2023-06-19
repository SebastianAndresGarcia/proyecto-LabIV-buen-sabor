<template>
  <div class="app fill-height">
    <v-container v-if="currentUser.roles.includes('ROLE_ADMIN')" fluid>
      <v-app-bar app color="black" dark>
        <v-app-bar-nav-icon @click="drawer = true">
          <v-icon> mdi-account</v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title>EL BUEN SABOR</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-menu v-if="currentUser" left bottom>
          <v-divider vertical></v-divider>
          <template v-slot:activator="{ on, attrs }">
            <a style="text-decoration: underline; color: aliceblue" text @click="cerrarSesion()">
              <h4>Cerrar Sesión</h4>
            </a>
          </template>
        </v-menu>

        <template v-slot:extension>
          <v-tabs v-model="tab" background-color="black" centered dark icons-and-text>
            <v-tabs-slider></v-tabs-slider>

            <v-tab v-for="item in items" :key="item.tab">
              {{ item }}
            </v-tab>
            <v-tab href="/home"> Ir al sitio WEB </v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-navigation-drawer left height="100vh" class="app" v-model="drawer" app temporary>
        <v-list v-if="currentUser == undefined" nav dense>
          <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
            <v-row style="
                justify-content: flex-end;
                margin-top: 10%;
                margin-bottom: 10%;
              ">
              <v-btn outlined color="white" @click="drawer = false"><v-icon medium
                  color="black">mdi-close</v-icon></v-btn>
            </v-row>
            <v-list-item style="margin-bottom: 10%">
              <login-item></login-item>
            </v-list-item>
            <v-list-item>
              <register-item></register-item>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-card v-else height="100%">
          <v-card-title style="color: black; justify-content: center; padding-top: 20%">Bienvenido {{ currentUser.username
          }}</v-card-title>
          <v-list-item-group>
            <v-list-item>Mi Perfil</v-list-item>
          </v-list-item-group>
          <v-card-subtitle>
            <v-row style="
                text-decoration: underline;
                color: black;
                justify-content: center;
                margin-top: 30%;
              " class="mx-0">
              <a @click="cerrarSesion()">
                <h3>Cerrar Sesión</h3>
              </a>
            </v-row>
          </v-card-subtitle>
        </v-card>
      </v-navigation-drawer>
      <v-tabs-items v-model="tab" class="fill-height">
        <v-card-text class="mb-4 fill-height">
          <div>
            <component :is="items[tab]"></component>
          </div>
        </v-card-text>
      </v-tabs-items>
    </v-container>
  </div>
</template>
    
<script>
import abmEmpleados from "@/components/Empleados.vue";
import abmManufacturados from "@/components/AbmManufacturados.vue";
import abmArticulosInsumos from "@/components/AbmArticulosInsumos.vue";
import abmFacturas from "@/components/AbmFacturas.vue";
import abmInsumos from "@/components/AbmInsumos.vue";
import abmPedidos from "@/components/AbmPedidos.vue";
import pedidosCocinero from "@/components/PedidosCocinero.vue";
import estadisticas from "@/components/Estadisticas.vue";
import AuthService from "@/service/auth.service.js";
import { borrarCarrito } from "@/funciones/BorrarCarrito.js"
export default {
  data() {
    return {
      items: [
        "Pedidos",
        "Empleados",
        "Comidas",
        "Articulos_Insumos",
        "Ingredientes",
        "Facturas",
        "Cocina",
        "Estadisticas",
      ],
      tab: null,
      currentUser: undefined,
      drawer: false,
      group: null,
    };
  },
  components: {
    Empleados: abmEmpleados,
    Pedidos: abmPedidos,
    Facturas: abmFacturas,
    Articulos_Insumos: abmArticulosInsumos,
    Comidas: abmManufacturados,
    Ingredientes: abmInsumos,
    Estadisticas: estadisticas,
    Cocina: pedidosCocinero,
  },

  beforeMount() {
    this.currentUser = AuthService.getCurrentUser();
    this.verificarUsuario(this.currentUser);
  },
  beforeUpdate() { },
  methods: {
    async verificarUsuario(currentUser) {
      if (currentUser) {
        if (!currentUser.roles.includes("ROLE_ADMIN")) {
          window.location.href = "/Home";
        }
      }
    },
    async cerrarSesion() {
      borrarCarrito()
      AuthService.logout()
      this.showAdminBoard = false
      this.currentUser = undefined
      window.location.href = "/Home"
    }
  },
};
</script>
    
<style>
.v-tabs__slider-wrapper {
  justify-content: center !important;
}
</style>
    