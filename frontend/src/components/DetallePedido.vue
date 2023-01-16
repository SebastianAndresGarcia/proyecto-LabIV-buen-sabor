<template>
    <v-container>
        <v-row justify="center">
            <v-dialog v-model="dialog" temporary width="60%" height="100%">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" @click="dialog = true" dark  v-bind="attrs" v-on="on">
                        Ver Detalle
                    </v-btn>
                </template>

                <v-card block style=" background-color:beige;">
                    <v-row><v-card-title> Pedido N° {{ pedido.numero }}</v-card-title></v-row>
                    <v-row v-for="(item, i) in pedido.detallepedidoid" :key="i"
                        style="align: center; justify-content: center; ">
                        <v-col>
                            <v-avatar size="80" tile>
                                <v-img v-if="String(item.articulomanufacturadoid.imagen).indexOf('http') >= 0"
                                    :src="item.articulomanufacturadoid.imagen"></v-img>
                                <v-img v-else :src="`../images/` + item.articulomanufacturadoid.imagen"></v-img>
                            </v-avatar>
                        </v-col>
                        <v-col>
                            <h3 class="text-overline ml-2"><b> {{ item.articulomanufacturadoid.denominacion }}</b></h3>
                        </v-col>
                        <v-col>
                            <v-row style="justify-content: center"><v-card-subtitle><b>Cantidad {{
                                item.cantidad
                            }}</b></v-card-subtitle>
                            </v-row>
                        </v-col>
                        <v-col style="justify-content: left">
                            <v-row style="justify-content: left"><v-card-subtitle><b>SubTotal ${{
                                item.subtotal
                            }}</b></v-card-subtitle></v-row>
                        </v-col>
                    </v-row>
                    <v-row style="justify-content: right;">
                        <v-btn text color="blue darken-1" @click="dialog = false">
                            Cerrar
                        </v-btn>
                    </v-row>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>
<script>

export default {
    data() {
        return {
            items: [],
            dialog: false,
            pedido: {}
        };
    },
    props: ["pedidoParam"],
    mounted() {
        //this.Pedidoxid(this.pedidoParam)
        this.pedido = this.pedidoParam
    },

    methods: {

    }
}
</script>
<style>

</style>