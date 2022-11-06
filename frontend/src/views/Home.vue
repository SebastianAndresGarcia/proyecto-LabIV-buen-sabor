<template>
    <v-container>
      <div>      <carousel-item></carousel-item></div>
            <foo-ter></foo-ter>
         </v-container>
</template>
<script >
import carousel from "@/components/Carousel.vue";
import footer from "@/components/Footer.vue";
export default {
    name: "ho-me",
    components: {
        "carousel-item": carousel,
        "foo-ter": footer, //si no le pongo el guión en el medio no funciona
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
