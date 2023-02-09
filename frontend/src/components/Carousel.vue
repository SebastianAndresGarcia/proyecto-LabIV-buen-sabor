<template>
    <v-carousel> <!--hide-delimiters me borra los circulos de las imagenes del slider-->
        <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.imagen" @click="abrirPromo(item)"
            style="cursor:pointer">
            <v-row justify="center">
                <div class="text-h2" style="font-weight: bold">
                    Promo {{ i + 1 }}
                </div>
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
            items: [{}], //no funciona el carrousel si no lo inicializo así
            dialog: false,
            art: null
        }
    },
    mounted() {
        this.getPromociones()
    },
    methods: {
        async getPromociones() {
            const res = await fetch(
                `http://localhost:3000/getPromociones`
            )
            const resJson = await res.json();

            this.items = resJson;
            console.log(this.items);
        },
        async abrirPromo(item) {
            this.art = item
        },
        async handlefunction(value){
            console.log("value",value)
            if(value.close)
                {this.art= null}
            if(value.actualizarCarrousel)    {
                this.getPromociones()
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
</style>
