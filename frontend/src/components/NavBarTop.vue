<!--https://codingbeautydev.com/blog/vuetify-app-bar/
https://es.acervolima.com/comunicacion-entre-componentes-usando-emit-y-props-en-vue-js/
https://kinsta.com/es/blog/vue-js/
-->
<template>
  <div class="app">
    <v-app-bar app color="black" dark>
      <v-app-bar-nav-icon @click="drawer = true">
        <v-icon> mdi-account</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>EL BUEN SABOR</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
      </v-menu>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>
            <v-btn text href="./#carousel">Ofertas del Día</v-btn>
          </v-tab>
          <v-tab>
            <v-menu bottom offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on"> Nuestro Menú </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in items" :key="index">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-tab>
          <v-tab>
            <a style="text-decoration: none; color: white;" href="./#dondeestamos">Sobre Nosotros</a>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-navigation-drawer class="app" v-model="drawer" app absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item :href="'./'">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Home
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <login-item></login-item>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <register-item></register-item>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import register from "@/components/Register.vue";
import login from "@/components/Login.vue"
export default {
  name: "App",
  data() {
    return {
      drawer: false,
      group: null,
      items: [
        { title: "Pizzas" },
        { title: "Lomos" },
        { title: "Empanadas" },
        { title: "Hamburguesas" },
        { title: "Bebidas" },
        { title: "Ver Todo" },
      ],
    };
  },
  components: {
    "register-item": register,
    "login-item": login
  },
};
</script>

<style lang=""></style>
