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
        <detalle-manufacturado :manufacturado="art"></detalle-manufacturado>
        <!-- <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }"></template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ art.denominacion }}</span>
                </v-card-title>
                <template slot="progress">
                    <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                </template>
                <v-img height="250" :src="art.imagen" />
                <v-card-text>
                    <v-row align="center" class="mx-0">
                        <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>
                        <div class="grey--text ms-4">
                            4.5 (413)
                        </div>
                    </v-row>
                    <div class="my-4 text-subtitle-1">
                        $ {{ art.precioVenta }}
                    </div>
                    <div>Alguna descripción</div>
                </v-card-text>

                <v-divider class="mx-4"></v-divider>

                <v-card-actions>
                    <v-col>
                        <v-row>
                            <div>
                                <v-btn color="deep-purple lighten-2" text>
                                    Agregar al Carrito
                                </v-btn>
                            </div>
                        </v-row>
                        <v-row>
                                <div  class="buttons_buy" style="display: flex;">
                                    <a class="arrow-down_touch" @click="agregarProducto(item._id, -1)"></a>
                                    <input readonly class="inputpromohome" v-model="cantidad">
                                    <a class="arrow-up_touch" @click="agregarProducto(item._id, 1)"></a>
                                </div>
                            </v-row> 
                        <v-row>
                            <v-btn text color="blue darken-1" @click="dialog = false">
                                Cancel
                            </v-btn>
                        </v-row>
                    </v-col>
                </v-card-actions>

            </v-card>
        </v-dialog> -->
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
            this.dialog = true
            this.art = {item, 'dialog':this.dialog}
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
