<template>
    <v-carousel v-model="currentSlide" @click.native="nextSlide">
        <!--hide-delimiters me borra los circulos de las imagenes del slider-->
        <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.imagen">
            <!-- style="cursor:pointer" contain(ajusta la imagen)> -->
            <v-row >
                <v-card max-width="auto" height="auto" class="mx-auto mt-2">
                    <v-card-title class="promo-title"> Promo {{ i + 1 }} </v-card-title><v-btn block color="success"
                        @click.stop="abrirPromo(item)">VER</v-btn>
                </v-card>
            </v-row>
        </v-carousel-item>
        <detalle-manufacturado :manufacturado="art" @limpiarObjeto="handlefunction"></detalle-manufacturado>
    </v-carousel>
</template>

<script>
import detallemanufacturado from "@/components/DetalleManufacturado.vue"
export default {
    name: 'Car-ousel',
    components: {
        "detalle-manufacturado": detallemanufacturado
    },
    data() {
        return {
            currentSlide: 0,
            items: [{}], //no funciona el carrousel si no lo inicializo así
            dialog: false,
            art: null
        }
    },
    mounted() {
        this.getPromociones()
    },
    methods: {
        nextSlide() {
            console.log('entró')
            this.currentSlide = (this.currentSlide + 1) % this.items.length;
        },
        async getPromociones() {
            const res = await fetch(
                `http://localhost:3000/getPromociones`
            )
            const resJson = await res.json();

            this.items = resJson;
            console.log("items getPromociones", this.items);
        },
        abrirPromo(item) {
            this.art = item
        },
        async handlefunction(value) {
            console.log("value ", value)
            if (value.close) {
                this.art = null
                this.getPromociones()
            }
            if (value.actualizarCarrousel) {
                try{
                const res = await fetch(
                    `http://localhost:3000/getManufacturadoXid/${this.art._id}`
                )
                const resJson = await res.json();
                this.art = resJson}catch(e){console.log(e)}
            }
        }
    }
}
</script>
<style>
.text-h2 {
    padding: 20px;
    font-weight: bold;
}
.promo-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size:xx-large;
   /* Asegura que el título ocupe todo el espacio vertical */
}
</style>
