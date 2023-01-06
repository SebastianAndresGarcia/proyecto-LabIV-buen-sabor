<template>

    <div>
        <v-btn icon @click="drawer = true">
            <v-icon large>mdi-cart</v-icon>
            <span id="cart_menu_num" class="badge rounded-circle">{{ this.cantidadcarrito }}</span>
        </v-btn>

        <v-navigation-drawer color="white" class="mx-auto" height="100vh" width="25%" v-model="drawer" absolute temporary
            right>
               
            <item-carrito @carritoLength="handleMessage"></item-carrito>
     
        </v-navigation-drawer>
    </div>
</template>

<script>//lang="ts"
import itemcarrito from "@/components/itemcarrito.vue"
export default {

    data() {
        return {
            drawer: false,
            cantidadcarrito: 0
        };
    },
    components:{
        "item-carrito": itemcarrito
    },
    methods:{
        async handleMessage(value) {
            
            console.log("cantidadcarrito"+value)
            this.cantidadcarrito = value
        }
    }
};
</script>
<style >
#cart_menu_num {
    position: absolute;
    bottom: 20px;
    left: 65%;
    background: red;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 2px;
}
</style>
