<template>
  <v-container fluid style="align-content: center">
    <v-row>
      <carousel-item id="carousel"></carousel-item>
    </v-row>
    <v-row>
      <foo-ter id="dondeestamos"></foo-ter>
    </v-row>
  </v-container>
</template>
<script >
import carousel from "@/components/Carousel.vue";
import footer from "@/components/Footer.vue";
import Register from "@/components/Register.vue";

export default {
  name: "ho-me",
  components: {
    "carousel-item": carousel,
    "foo-ter": footer, //si no le pongo el guión en el medio no funciona
    "register-item": Register,
  },
  data() {
    return {
      socket: null,
      respuestaEvento: null,
    };
  },
  mounted() {
  },
};
</script>
