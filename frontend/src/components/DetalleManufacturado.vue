<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }"></template>
        <v-card v-if="articulo">
            <v-card-title>
                <span class="text-h5">{{ articulo.denominacion }}</span>
            </v-card-title>
            <template slot="progress">
                <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>
            <v-img height="250" :src="articulo.imagen" />
            <v-card-text>
                <v-row align="center" class="mx-0">
                    <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>
                    <div class="grey--text ms-4">
                        4.5 (413)
                    </div>
                </v-row>
                <div class="my-4 text-subtitle-1">
                    $ {{ articulo.precioVenta }}
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
                        <v-btn text color="blue darken-1" @click="cerrar()">
                            Cancel
                        </v-btn>
                    </v-row>
                </v-col>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>
<script>

export default {
    name: 'Car-ousel',
    data() {
        return {
            items: [{}], //no funciona el carrousel si no lo inicializo así
            dialog: false,
            articulo: null
        }
    },
    props: {manufacturado:Object},
    beforeUpdate() {
        console.log("entró",this.manufacturado)
        if(this.manufacturado.dialog){
            this.dialog=true
            this.articulo=this.manufacturado.art
        }
    },
    methods: {
        async cerrar(){
            
            this.dialog=false
        }
    }
}
</script>