<template>
    <v-card max-width="100%" class="mx-auto" color="white">

        <v-app-bar outlined elevation="10" src="https://picsum.photos/1920/1080?random">
            <v-toolbar-title>Mi Carrito</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>

        <v-container>
            <v-row dense>
                <v-col v-for="(item, i) in items" :key="i" cols="12">
                    <v-card :color="'white'">
                        <div style="color: black;" class="d-flex flex-no-wrap justify-space-between">

                            <div>
                                <v-card-title class="text-h6" v-text="item.denominacion"></v-card-title>
                                <v-card-subtitle>
                                    <h2>${{ item.precioVenta }}</h2>
                                </v-card-subtitle>

                                <v-card-actions>
                                    <v-row>
                                        <div class="buttons_buy" style="display: flex;">
                                            <a class="arrow-down_touch"
                                                @click="agregarProducto(item._id, -1, i)"></a>
                                            <input class="inputpromohome" v-model="cantidad[i]"
                                                >
                                            <a class="arrow-up_touch"
                                                @click="agregarProducto(item._id, 1)"></a>
                                        </div>
                                    </v-row>
                                    <v-btn color="black" class="ml-2 mt-5" outlined rounded small
                                        @click="eliminar(item._id)">
                                        Eliminar
                                    </v-btn>
                                </v-card-actions>
                            </div>
                            <v-avatar class="ma-3" size="100" tile>
                                <v-img v-if="String(item.imagen).indexOf('http') >= 0" :src="item.imagen"></v-img>
                                <v-img v-else :src="`../images/` + item.imagen"></v-img>
                            </v-avatar>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>
<script>
import { eventBus } from "../main";
export default {
    data() {
        return {
            ca: [],
            c: [],
            aux: [],
            items: [],
            carritoLength: 0,
            eliminaItem: false,
            cantidad: []
        };
    },
    mounted() {
        
        this.getCookie()

    },

    methods: {
        async getmanufacturados(id) {
            let index = (id.split('='))
            console.log("entrando con cookie:" + index[0].trim())
            const res = await fetch(
                `http://localhost:3000/getManufacturadoXid/${index[0].trim()}`
            )
            const resJson = await res.json();
            console.log(resJson);
            this.items.push(resJson);
            this.cantidad.push(Number(id.slice(-1)) )
            console.log("this.cantidad", this.cantidad)
            console.log("this.items", this.items)
        },
        async getCookie() {
            this.cantidad= []
            this.items = []
            console.log("document.cookie" + document.cookie)
            this.ca = await document.cookie.split(';'); //divido por cookie
            console.log("ca", this.ca)
            if (document.cookie)
                this.carritoLength = this.ca.length
            else
                this.carritoLength = 0
            for (let i = 0; i < this.ca.length; i++) {
                
                this.getmanufacturados(this.ca[i])
            }
        },
        async eliminar(id) {
            //document.cookie = id + "=; max-age=0";
            eventBus.$emit("elimina-itemcarrito", id)
            this.getCookie()
        },
        agregarProducto(id, j, index) {
            
                this.cantidad[index] += j
                
                if (this.cantidad[index] == 0) {
                    this.eliminar(id)
                }else{
                    document.cookie = id + "=" + id + "," + this.cantidad[index]
                
                console.log("cookie", document.cookie)
                
                }
                // this.cambioCarrito = true
                // eventBus.$emit("carrito-changed", this.cambioCarrito)
                //this.cambioCarrito=false
            }
        
    },
    created() {
        eventBus.$on("carrito-changed", async (data) => {
            console.log("entró a eventbus del itemcarrito, data: " + data)
            if (data)
                console.log("entró al if del itemcarrito, data: " + data)
            this.getCookie()
            //eventBus.$off("carrito-changed");
        });
    },
    watch: {
        carritoLength: function () {
            this.$emit('carritoLength', this.carritoLength)
        }
    }
}
</script>
<style>
.inputpromohome {
    width: 36px;
    height: 35px;
    margin-right: 4px;
    font-size: 16px;
    text-align: center;
    background: white;
    border: 1px solid #ccc;
    margin-left: 10px;
}
.buttons_buy {
    height: 42px;
    margin: 0px auto;
    width: 141px;
}

.arrow-down_touch {
    background: url(https://static.cotodigital3.com.ar/sitios/cdigi/static/content/images/cdigi/touch_left.png) no-repeat !important;
    width: 43px;
    height: 38px;
    display: inline-block;
    cursor: pointer !important;
    float: left;
    margin-right: 1px;
}

.arrow-up_touch {
    background: url(https://static.cotodigital3.com.ar/sitios/cdigi/static/content/images/cdigi/touch_right.png) no-repeat !important;
    width: 43px;
    height: 38px;
    display: inline-block;
    cursor: pointer !important;
}
</style>