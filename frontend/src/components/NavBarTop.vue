<!--https://codingbeautydev.com/blog/vuetify-app-bar/-->
<template>
  <div class="app">
    <v-app-bar app color="black" dark>
      <v-app-bar-nav-icon @click="drawer = true"> </v-app-bar-nav-icon>
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
          <v-tab><v-btn  text href="./">Ofertas del Día</v-btn></v-tab>
          <v-tab>

            <v-menu  bottom offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn  text v-bind="attrs" v-on="on">
                  Nuestro Menú
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in items" :key="index">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

          </v-tab>
          <v-tab><v-btn text href="./#dondeestamos">Sobre Nosotros</v-btn></v-tab>
        </v-tabs>
      </template>


    </v-app-bar>
    <v-navigation-drawer class="app" v-model="drawer" app absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title><a :href="'./'" style="text-decoration: none">Home</a></v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title><a :href="'./'" style="text-decoration: none">Ingresar</a></v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title><a :href="'./'" style="text-decoration: none">Registrarse</a></v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>


  <!-- <v-toolbar color="black" dark>
    <v-toolbar-title>
      <v-btn text href="/home">
        HOME
      </v-btn>
    </v-toolbar-title>

    <v-divider class="mx-6" vertical></v-divider>

    <span class="subheading">EL BUEN SABOR</span>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn text href="/instrumentos">
        Menu
      </v-btn>

      <v-divider vertical></v-divider>

      <v-btn text href="/DondeEstamos">
        Sobre Nosotros
      </v-btn>

      <v-divider vertical></v-divider>

      <v-btn text href="/GrillaInstrumentos">
        Mi Carrito
      </v-btn>

      <v-divider vertical></v-divider>
    </v-toolbar-items>

    <v-app-bar-nav-icon></v-app-bar-nav-icon>
  </v-toolbar> -->
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: false,
    group: null,
    items: [
        { title: 'Pizzas' },
        { title: 'Lomos' },
        { title: 'Empanadas' },
        { title: 'Hamburguesas' },
        { title: 'Bebidas' },
        { title: 'Ver Todo' },
      ]
  }),
};
</script>

<style lang=""></style>
