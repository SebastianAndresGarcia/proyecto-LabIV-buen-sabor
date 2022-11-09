<template>
  <v-container fluid style="align-content: center">
    <v-row>
      <carousel-item></carousel-item>
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

  return: {
    ejecutarmodal: null,
  },
  methods: {
    registrar() {
      this.ejecutarmodal = true;
    },
  },
  /* mounted() { 
         this.getInstrumentos()
     },
     data() {
         return {
             instrumentosData: []
         };
     },
     methods: {
         async getInstrumentos() {
             const res = await fetch(
                 "http://localhost:3000/instrumentos"
             );
             const resJson = await res.json();
             console.log(resJson);
             this.instrumentosData = resJson;
         }
     }  */
};
</script>
