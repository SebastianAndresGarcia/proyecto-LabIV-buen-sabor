<!--https://codingbeautydev.com/blog/vuetify-app-bar/
https://es.acervolima.com/comunicacion-entre-componentes-usando-emit-y-props-en-vue-js/
https://kinsta.com/es/blog/vue-js/

https://materialdesignicons.com/  ÍCONOS
-->
<template>
  <div class="app">
    <v-app-bar app color="black" dark>
      <v-app-bar-nav-icon @click="drawer = true">
        <v-icon> mdi-account</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>EL BUEN SABOR</v-toolbar-title>
      <v-spacer></v-spacer>

      <Carrito-item></Carrito-item>

      <v-menu v-if="currentUser" left bottom>
        <v-divider vertical></v-divider>
        <template v-slot:activator="{ on, attrs }">
          <a style="text-decoration: underline; color:aliceblue;" text @click="cerrarSesion()">
            <h4>Cerrar Sesión</h4>
          </a>
        </template>
      </v-menu>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>
            <v-btn height="100%" block text href="http://localhost:8080/#carousel">Ofertas del Día</v-btn>
          </v-tab>
          <v-tab>
            <v-menu bottom offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn height="100%" text v-bind="attrs" v-on="on"> Nuestro Menú </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in rubros" :key="index">
                  <v-list-item-title><v-btn block text :href="'http://localhost:8080/ManufacXrubro/' + item._id">{{
                    item.denominacion
                  }}</v-btn></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-tab>
          <v-tab>
            <v-btn height="100%" block text href="http://localhost:8080/#dondeestamos">Sobre Nosotros</v-btn>
          </v-tab>

          <v-tab v-if="showAdminBoard">
            <v-btn height="100%" block text href="http://localhost:8080/abmempleados">ABM EMPLEADOS</v-btn>
          </v-tab>
          <v-tab v-if="showAdminBoard">
            <v-btn height="100%" block text href="http://localhost:8080/abmarticulos">ABM ARTICULOS</v-btn>
          </v-tab>

        </v-tabs>
      </template>
    </v-app-bar>
    <v-navigation-drawer left height="100vh" class="app" v-model="drawer" app absolute temporary>
      <v-list v-if="currentUser == undefined" nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <!-- <v-list-item :href="'./'">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title> Home </v-list-item-title>
          </v-list-item> -->
          <v-row style="justify-content: flex-end; margin-top: 10%; margin-bottom: 10%;">
            <v-btn outlined color="white" @click="drawer = false"><v-icon medium color="black">mdi-close</v-icon></v-btn>
          </v-row>
          <v-list-item style="margin-bottom: 10%;">

            <login-item></login-item>
          </v-list-item>

          <v-list-item>

            <register-item></register-item>
          </v-list-item>

        </v-list-item-group>
      </v-list>

      <v-card v-else height="100%">
        <v-card-title style="color: black; justify-content: center; padding-top: 20%;">Bienvenido {{ currentUser.username }}</v-card-title>
        <v-card-subtitle>
          <v-row style="text-decoration:underline; color: black; justify-content: center; margin-top: 30%;" class="mx-0">
            <a @click="cerrarSesion()">
              <h3>Cerrar Sesión</h3>
            </a>
          </v-row>
        </v-card-subtitle>
      </v-card>

    </v-navigation-drawer>

  </div>
</template>

<script >//lang="ts"
import register from "@/components/Register.vue";
import login from "@/components/Login.vue";
import carrito from "@/components/Carrito.vue"
import AuthService from "@/service/auth.service.js"
export default {
  name: "App",
  data() {
    return {
      showAdminBoard: false,
      currentUser: undefined,
      user: undefined,

      activado: false,
      drawer: false,
      group: null,
      rubros: [
        //{ denominacion: String }
      ] //as Array<Object>,
    };
  },
  components: {
    "register-item": register,
    "login-item": login,
    "Carrito-item": carrito
  },
  mounted() {
    this.getRubrosGeneral()
    this.user = AuthService.getCurrentUser();
    if (this.user) {
      this.currentUser = this.user;
      if (this.user.roles.includes("ROLE_ADMIN")) { this.showAdminBoard = true }
    }
  },
  methods: {
    async getRubrosGeneral() {
      const res = await fetch(
        "http://localhost:3000/rubrosgeneral"
      );
      const resJson = await res.json();
      this.rubros = resJson
      this.rubros.push({ 'denominacion': "Ver todo", '_id': 0 })
    },
    async cerrarSesion() {
      AuthService.logout()
      this.showAdminBoard = false
      this.currentUser = undefined
      window.location.href = "/Home"
    }
  }
};
</script>

<style >

</style>
