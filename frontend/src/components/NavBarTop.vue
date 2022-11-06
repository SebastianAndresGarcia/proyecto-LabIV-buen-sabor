<template>
  
  <v-toolbar color="black" dark>
    <v-toolbar-title>
      <v-btn text href="/home">
        Home
      </v-btn>
    </v-toolbar-title>

    <v-divider class="mx-6" vertical></v-divider>

    <span class="subheading"> Welcome to Musical Hendrix</span>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn text href="/instrumentos">
        Productos
      </v-btn>

      <v-divider vertical></v-divider>

      <v-btn text href="/DondeEstamos">
        Donde Estamos
      </v-btn>

      <v-divider vertical></v-divider>

      <v-btn text href="/GrillaInstrumentos">
        ABM
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
