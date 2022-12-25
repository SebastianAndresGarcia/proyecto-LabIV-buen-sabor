<template>

    <v-card class="justify-center" max-width="350">
        <template slot="progress">
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
        </template>

        <a :href="'./Detallemanufacturado/' + manufacturadoParam._id">
            <span v-if="manufacturadoParam.imagen.indexOf('http') >= 0">
                <v-img height="250" :src="this.manufacturadoParam.imagen" />
            </span>
            <span v-else>
                <v-img height="250" :src="'/images/' + manufacturadoParam.imagen" alt="Image" />
            </span>
        </a>
        <v-card-title>{{ manufacturadoParam.denominacion }}</v-card-title>

        <v-card-text>
            <v-row align="center" class="mx-0">
                <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>
                <div class="grey--text ms-4">
                    4.5 (413)
                </div>
            </v-row>

            <div class="my-4 text-subtitle-1">
                $ {{ manufacturadoParam.precioVenta }}
            </div>

            <div>Alguna descripción</div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-actions>
            <v-btn color="deep-purple lighten-2" text @click="reserve">
                Agregar al Carrito
            </v-btn>
        </v-card-actions>
    </v-card>

    <!-- <v-row class="tarjetas">

        <v-col align="center" justify="center">
            <br>
            <h6>{{ manufacturadoParam.denominacion }}</h6>

            <a :href="'./Detallemanufacturado/' + manufacturadoParam._id">
                <span v-if="manufacturadoParam.imagen.indexOf('http') >= 0">
                    <img :src="this.manufacturadoParam.imagen" style="max-width: 260px;" />

                </span>
                <span v-else>
                    <img :src="'/images/' + manufacturadoParam.imagen" style="max-width: 260px;" alt="Image" />
                </span>
            </a>
            <br /><br />
        </v-col >
        <v-col cols="6">
            <br />
            <h4>$ {{ manufacturadoParam.precioVenta }}</h4>
        </v-col>

    </v-row>
-->
</template>
<script>

export default {

    data() {
        return {
            urlImage: String
        };
    },
    props: ["manufacturadoParam"],
    mounted() {
        if (String(this.manufacturadoParam.imagen).indexOf("http") >= 0) {
            this.urlImage = this.manufacturadoParam.imagen;
            console.log(this.urlImage)
        } else {
            this.urlImage = "../images/" + this.manufacturadoParam.imagen;
            console.log(this.urlImage)
        }
    }
};
</script>
<style scoped>

</style>