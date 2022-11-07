<template>
  
  <v-toolbar color="black" dark>
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
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({ value: 1 }),
}
</script>

<style lang=""></style>
