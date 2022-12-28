<template>
    <v-card max-width="100%" class="mx-auto" color="white">
        
        <v-app-bar outlined elevation="10" src="https://picsum.photos/1920/1080?random">
            <v-toolbar-title>Mi Carrito</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>

        <v-container >
            <v-row dense>
                <v-col v-for="(item, i) in items" :key="i" cols="12">
                    <v-card  :color="'white'" >
                        <div style="color: black;" class="d-flex flex-no-wrap justify-space-between">
                            
                            <div >
                                <v-card-title class="text-h6" v-text="item.denominacion"></v-card-title>
                                <v-card-subtitle>  <h2>${{item.precioVenta}}</h2></v-card-subtitle>

                                <v-card-actions>
                                    <v-btn color="black" class="ml-2 mt-5" outlined rounded small>
                                        Eliminar
                                    </v-btn>
                                </v-card-actions>
                            </div>
                            <v-avatar class="ma-3" size="100" tile>
                                <v-img :src="item.imagen"></v-img>
                            </v-avatar>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>
<script>
export default {
    data() {
        return {

            items: [
            
            ],
        };
    },
    mounted(){
        this.getmanufacturados(0)
    },
    methods:{
        async getmanufacturados(id) {
            if (id == 0) {
                const res = await fetch(
                    "http://localhost:3000/articulosmanufacturados"
                )
                const resJson = await res.json();
                console.log(resJson);
                this.items = resJson;
            }
            else {
                const res = await fetch(
                    `http://localhost:3000/articulosmanufacturadosxrubro/${id}`
                )
                const resJson = await res.json();
                //console.log(resJson);
                this.items = resJson;
            }
            console.log("this.items", this.items)
        }
    }
};
</script>