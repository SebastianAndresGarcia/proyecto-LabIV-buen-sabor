<template>
    <v-container>

        <v-dialog v-model="dialog" temporary width="60%" height="100%">
            <template v-slot:activator="{ on, attrs }">
                <v-btn @click="dialog = true" icon  v-bind="attrs" v-on="on">
                    
                    <v-icon large>mdi-eye</v-icon>
                    
                </v-btn>
            </template>

            <v-card style="overflow: hidden;"> <!--overflow son las barras que aparece para scrollear la vista-->
                <div style="margin:2%">
                    <v-row><v-card-title> Pedido N° {{ pedidoParam.numero }}</v-card-title></v-row>
                    <v-row v-for="(item, i) in detalle" :key="i"
                        style="align-content: center; justify-content: center; ">
                        <v-col cols="2" style="justify-content: center">
                            <v-row style="justify-content: center"><v-avatar style="justify-content: center" size="80"
                                    tile>
                                    <v-img v-if="String(item.articulomanufacturadoid.imagen).indexOf('http') >= 0"
                                        :src="item.articulomanufacturadoid.imagen"></v-img>
                                    <v-img v-else :src="`../images/` + item.articulomanufacturadoid.imagen"></v-img>
                                </v-avatar></v-row>
                        </v-col>
                        <v-col cols="4" style="justify-content: center">
                            <v-row style="justify-content: center"><v-card-title><b> {{
                                item.articulomanufacturadoid.denominacion
                            }}</b></v-card-title></v-row>
                        </v-col>
                        <v-col cols="3" style="justify-content: center;">
                            <v-row style="justify-content: center"><v-card-subtitle><b>Cantidad {{
                                item.cantidad
                            }}</b></v-card-subtitle>
                            </v-row>
                        </v-col>
                        <v-col cols="3" style="justify-content: center;">
                            <v-row style="justify-content: center"><v-card-subtitle><b>SubTotal ${{
                                item.subtotal
                            }}</b></v-card-subtitle></v-row>
                        </v-col>
                    </v-row>
                    <v-row style="justify-content: right; margin-right: 2%;"><v-card-title><b>Total ${{
                        pedido.total
                    }}</b></v-card-title></v-row>
                    <v-row style="justify-content: right;">
                        <v-btn text color="blue darken-1" @click="dialog = false">
                            Cerrar
                        </v-btn>
                    </v-row>
                </div>
            </v-card>

        </v-dialog>

    </v-container>
</template>
<script>

export default {
    data() {
        return {
            items: [],
            dialog: false,
            pedido: {},
            detalle: []
        };
    },
    props: ["pedidoParam"],
    mounted() {
        //this.Pedidoxid(this.pedidoParam)
        console.log("pedidoParam",this.pedidoParam)
        if(this.pedidoParam.detallepedidoid)
            this.detalle = this.pedidoParam.detallepedidoid
        else
            this.detalle = this.pedidoParam.detallefacturaid
    },

    methods: {

    }
}
</script>
<style>

</style>