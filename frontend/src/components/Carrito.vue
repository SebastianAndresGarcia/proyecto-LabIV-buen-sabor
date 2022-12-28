<template>

    <div>
        <v-btn icon @click="drawer = true">
            <v-icon large>mdi-cart</v-icon>
            <span id="cart_menu_num" class="badge rounded-circle">5</span>
        </v-btn>

        <v-navigation-drawer color="white" class="mx-auto" height="700" width="25%" v-model="drawer" absolute temporary
            right>
               
            <item-carrito></item-carrito>
            
            <!-- <v-list nav dense>
                <v-list-item-group color="black" v-model="group" active-class="deep-purple--text text--accent-4">
                    <v-list-item  :href="'./'">
                        <v-list-item-icon>
                            <v-icon color="black">mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title> Home </v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon color="black">mdi-account</v-icon>
                        </v-list-item-icon>
                        <login-item></login-item>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>
                        <register-item></register-item>
                    </v-list-item>

                </v-list-item-group>
            </v-list>-->

        </v-navigation-drawer>
    </div>
</template>

<script>//lang="ts"
import itemcarrito from "@/components/itemcarrito.vue"
export default {

    data() {
        return {
            drawer: false,
            group: null,
            items: [
        {
          color: '#1F7087',
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People',
        }
      ],
        };
    },
    components:{
        "item-carrito": itemcarrito
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
