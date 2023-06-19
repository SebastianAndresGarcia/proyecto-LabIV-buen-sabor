<template>
    <v-card v-if="items.length > 0" max-width="100%" height="100%" class="mx-auto" color="white">
        <v-card-title style="color: black;">
            Mi Carrito
            <v-spacer></v-spacer>
            <v-btn outlined color="white" @click="cerrar()"><v-icon medium color="black">mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-container>
            <v-row dense>
                <input class="inputpromohome" v-model="probando" readonly hidden>
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
                                            <a class="arrow-down_touch" @click="agregarProducto(item, -1, i)"></a>
                                            <input class="inputpromohome" v-model="cantidad[i]" readonly>
                                            <div v-if="conStock[i]">
                                                <a class="arrow-up_touch" @click="agregarProducto(item, 1, i)"></a>
                                            </div>
                                            <div v-else>
                                                <h5><b>No hay más</b></h5>
                                            </div>
                                        </div>
                                    </v-row>
                                    <v-btn color="black" outlined rounded small @click="eliminar(item, cantidad[i])">
                                        <v-icon>mdi-trash-can</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </div>
                            <div v-if="item.imagen">
                                <v-avatar class="ma-3" size="70" tile>
                                    <v-img v-if="String(item.imagen).indexOf('http') >= 0" :src="item.imagen"></v-img>
                                    <v-img v-else :src="`../images/` + item.imagen"></v-img>
                                </v-avatar>
                            </div>
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
        <v-card-text>
            <v-row style="color: black; justify-content: center; margin-top: 20%;" class="mx-0">
                Su carrito se encuentra vacío
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script>
import { eventBus } from "../main";
import { calcularInsumos, controlStock, getArticuloActualizado } from "@/funciones/ControlStock.js"
export default {
    data() {
        return {
            cerrarCarro: false,
            items: [],
            carritoLength: 0,
            eliminaItem: false,
            cantidad: [],
            conStock: [],
            probando: null,
            articulo: null
        };
    },
    mounted() {
        this.getLocalStorage()
    },

    methods: {
        async getmanufacturados(id, cant) {
            console.log("id " + id + " cant " + cant)
            try {
                const res = await fetch(
                    `http://localhost:3000/getManufacturadoXid/${id}`
                )
                const resJson = await res.json();
                console.log("resJson-getManufacturadoxid", resJson);
                this.items.push(resJson);
            } catch (e) {
                const res = await fetch(
                    `http://localhost:3000/ArticuloInsumoxid/${id}`
                )
                const resJson = await res.json();
                console.log("resJson-getManufacturadoxid", resJson);
                this.items.push(resJson);
            }

            this.carritoLength = this.items.length
            this.conStock.push(controlStock(this.items[this.items.length - 1]))
            this.cantidad.push(cant)
            console.log("this.cantidad", this.cantidad)
            console.log("this.items", this.items)
        },
        async getLocalStorage() {

            this.cantidad = []
            this.items = []
            this.conStock = []
            let claves = Object.keys(localStorage);
            let carrovacio = true
            claves.forEach(clave => {
                console.log("Tengo una clave:", clave);
                let valor = localStorage.getItem(clave);
                // Castearlo o convertirlo depende de ti
                //console.log("Tengo un valor: ",JSON.parse(valor));
                try {
                    if (((JSON.parse(localStorage.getItem(clave))).cantidad)) { //para evitar que entre 'user', veo si tiene 'cantidad'
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
        async eliminar(item, cantidad) {
            if (cantidad > 0) {
                this.articulo = await getArticuloActualizado(item._id) //me traigo el manufact/insumo con los stock actualizados
                this.articulo = await calcularInsumos(this.articulo, -cantidad)
            }
            this.items = []
            localStorage.removeItem(item._id)
            this.getLocalStorage()
            eventBus.$emit("elimina-itemcarrito", item._id)
        },
        async agregarProducto(item, j, index) {
            this.probando += 1
            //console.log("this.probando "+this.probando)
            this.cantidad[index] += j
            this.articulo = await getArticuloActualizado(item._id) //me traigo el manufact/insumo con los stock actualizados
            this.articulo = await calcularInsumos(this.articulo, j)
            //console.log("this.item[index] ", this.items[index])
            //this.items = []
            let contStockauxiliar=this.conStock[index]
            console.log("contStockauxiliar "+contStockauxiliar)
            this.conStock[index] = controlStock(this.articulo)
            console.log("this.conStock" + this.conStock[index])

            if (this.cantidad[index] == 0) {
                this.conStock[index] == false
                this.eliminar(item, 0)
            } else {
                localStorage.setItem(item._id, JSON.stringify({ 'cantidad': this.cantidad[index] }))
                if (contStockauxiliar!=this.conStock[index]) { //detecto variaciones del conStock para que me habilite/dehabilite el agregar mas articulos
                    console.log("stocknegativo...actualiza")
                    this.getLocalStorage() 
                }
                eventBus.$emit("elimina-itemcarrito", '0')

            }

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
                console.log("entró a carrito-changed del itemcarrito, data: " + data)
            this.getLocalStorage()
        });
    },
    watch: {
        carritoLength: function () {
            this.$emit('carritoLength', { tamanio: this.carritoLength })
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