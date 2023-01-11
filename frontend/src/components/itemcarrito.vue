<template>
    <v-card v-if="items.length > 0" max-width="100%" height="100%" class="mx-auto" color="white">
        <v-card-title style="color: black;">
            Mi Carrito
            <v-spacer></v-spacer>
            <v-btn outlined color="white" @click="cerrar()"><v-icon medium color="black">mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-container>
            <v-row dense>
                <v-col v-for="(item, i) in items" :key="i" cols="12">
                    <v-card :color="'white'">
                        <div style="color: black;" class="d-flex flex-no-wrap justify-space-between">

                            <div>
                                <div class="text-overline mt-2" v-text="item.denominacion"></div>
                                <v-card-subtitle>
                                    <h2>${{ item.precioVenta }}</h2>
                                </v-card-subtitle>

                                <v-card-actions>
                                    <v-row>
                                        <div class="buttons_buy" style="display: flex;">
                                            <a class="arrow-down_touch" @click="agregarProducto(item._id, -1, i)"></a>
                                            <input class="inputpromohome" v-model="cantidad[i]" readonly>
                                            <a class="arrow-up_touch" @click="agregarProducto(item._id, 1, i)"></a>
                                        </div>
                                    </v-row>
                                    <v-btn color="black" outlined rounded small
                                            @click="eliminar(item._id)">
                                            <v-icon>mdi-trash-can</v-icon>
                                        </v-btn>
                                </v-card-actions>
                            </div>
                            <v-avatar class="ma-3" size="70" tile>
                                <v-img v-if="String(item.imagen).indexOf('http') >= 0" :src="item.imagen"></v-img>
                                <v-img v-else :src="`../images/` + item.imagen"></v-img>
                            </v-avatar>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
            <v-row style="justify-content: center; margin-top: 5%;" dense>
                <v-btn block rounded color="success" href="http://localhost:8080/micarrito">Finalizar Compra</v-btn>
            </v-row>
        </v-container>
    </v-card>
    <v-card v-else class="mx-auto" color="white" height="100%">
        <v-card-title style="color: black;">
            Mi Carrito
            <v-spacer></v-spacer>
            <v-btn outlined color="white" @click="cerrar()"><v-icon medium color="black">mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text >
            <v-row style="color: black; justify-content: center; margin-top: 20%;" class="mx-0">
                Su carrito se encuentra vacío
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script>
import { eventBus } from "../main";
export default {
    data() {
        return {
            cerrarCarro: false,
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
        async getmanufacturados(id, cant) {
            console.log("id " + id + " cant " + cant)
            // let index = (id.split('='))
            // console.log("entrando con cookie:" + index[0].trim())
            // const res = await fetch(
            //     `http://localhost:3000/getManufacturadoXid/${index[0].trim()}`
            // )
            // const resJson = await res.json();
            // console.log(resJson);
            // this.items.push(resJson);
            // this.cantidad.push(Number(id.slice(-1)))
            // console.log("this.cantidad", this.cantidad)
            // console.log("this.items", this.items)
            const res = await fetch(
                `http://localhost:3000/getManufacturadoXid/${id.trim()}`
            )
            const resJson = await res.json();
            console.log(resJson);
            this.items.push(resJson);
            this.carritoLength = this.items.length
            this.cantidad.push(cant)
            console.log("this.cantidad", this.cantidad)
            console.log("this.items", this.items)
        },
        async getCookie() {
            // this.cantidad = []
            // this.items = []
            // console.log("document.cookie" + document.cookie)
            // this.ca = await document.cookie.split(';'); //divido por cookie
            // console.log("ca", this.ca)
            // if (document.cookie)
            //     this.carritoLength = this.ca.length
            // else
            //     this.carritoLength = 0
            // for (let i = 0; i < this.ca.length; i++) {

            //     this.getmanufacturados(this.ca[i])
            // }
            this.cantidad = []
            this.items = []
            let claves = Object.keys(localStorage);
            let carrovacio = true
            claves.forEach(clave => {
                console.log("Tengo una clave:", clave);
                let valor = localStorage.getItem(clave);
                // Castearlo o convertirlo depende de ti
                //console.log("Tengo un valor: ",JSON.parse(valor));
                try {
                    if (((JSON.parse(localStorage.getItem(clave))).cantidad)) {
                        console.log("En esa clave el valor es:", Number((JSON.parse(localStorage.getItem(clave))).cantidad))
                        this.getmanufacturados(clave, Number((JSON.parse(localStorage.getItem(clave))).cantidad))
                        carrovacio = false
                    }
                } catch (err) {
                    console.log("err: " + err)
                }
            });
            if (carrovacio) {
                this.carritoLength = 0
            }
        },
        async eliminar(id) {
            //document.cookie = id + "=; max-age=0";
            window.localStorage.removeItem(id)
            eventBus.$emit("elimina-itemcarrito", id)
            this.getCookie()
        },
        agregarProducto(id, j, index) {
            this.cantidad[index] += j
            if (this.cantidad[index] == 0) {
                this.eliminar(id)
            } else {
                localStorage.setItem(id, JSON.stringify({ 'cantidad': this.cantidad[index] }))
                document.cookie = id + "=" + id + "," + this.cantidad[index]
                console.log("cookie", document.cookie)
                eventBus.$emit("elimina-itemcarrito", '0')
                eventBus.$emit("carrito-changed", this.cambioCarrito)
            }
            // this.cambioCarrito = true
            // eventBus.$emit("carrito-changed", this.cambioCarrito)
            //this.cambioCarrito=false
        },
        cerrar() {
            this.cerrarCarro = true
            console.log("this.cerrarCarro" + this.cerrarCarro)
            this.$emit('carritoLength', { close: this.cerrarCarro })
        }
    },
    created() {
        eventBus.$on("carrito-changed", async (data) => {
            if (data)
                console.log("entró al if del itemcarrito, data: " + data)
            this.getCookie()
            //eventBus.$off("carrito-changed");
        });
    },
    watch: {
        carritoLength: function () {
            this.$emit('carritoLength', { tamanio: this.carritoLength })
            //this.cerrarCarro=true
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