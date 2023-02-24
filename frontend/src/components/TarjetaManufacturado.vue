<template>

    <v-card class="justify-center" max-width="350" :disabled="!conStock && cantidad == 0" elevation="5">
        <template slot="progress">
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
        </template>

        <div v-if="manufacturadoParam.imagen" style="text-decoration:none; cursor:pointer" @click="abrirDetalleManufacturado(manufacturadoParam)">
            <span v-if="manufacturadoParam.imagen.indexOf('http') >= 0">
                <v-img height="250" :src="this.manufacturadoParam.imagen">
                    <v-row v-if="manufacturadoParam.descuento > 0">
                        <div class="circle " style="font: bold; color: red;">
                            <h4><b>-{{ manufacturadoParam.descuento }} % OFF</b></h4>
                        </div>
                    </v-row></v-img>
            </span>
            <span v-else>
                <v-img height="250" :src="'/images/' + manufacturadoParam.imagen" alt="Image">
                    <v-row justify="center" v-if="manufacturadoParam.descuento > 0">
                        <div class="text-h3" style="font-weight: bold">
                            <h3>-{{ manufacturadoParam.descuento }} %</h3>
                        </div>
                    </v-row></v-img>
            </span>
        </div>
        <detalle-manufacturado :manufacturado="art" @limpiarObjeto="handlefunction"></detalle-manufacturado>
        <v-card-title>{{ manufacturadoParam.denominacion }}</v-card-title>

        <v-card-text>
            <v-row align="center" class="mx-0">
                <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>
                <div class="grey--text ms-4">
                    4.5 (413)
                </div>
            </v-row>
            <div v-if="manufacturadoParam.descuento>0" class="my-4 text-subtitle-1">
                <del>${{ manufacturadoParam.precioVenta }}</del>&nbsp&nbsp$<b>{{ manufacturadoParam.precioVenta-(manufacturadoParam.precioVenta*manufacturadoParam.descuento)/100 }}</b>
            </div>
            <div v-else class="my-4 text-subtitle-1">${{ manufacturadoParam.precioVenta }}</div>
            <div>Alguna descripción</div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-actions>
            <v-col v-if="conStock">
                <v-row>
                    <div v-if="reserve == false">
                        <v-btn color="deep-purple lighten-2" text @click="agregar(manufacturadoParam._id)">
                            Agregar al Carrito
                        </v-btn>
                    </div>
                </v-row>
                <v-row>
                    <div v-if="reserve == true" class="buttons_buy" style="display: flex;">
                        <a class="arrow-down_touch" @click="agregarProducto(manufacturadoParam._id, -1)"></a>
                        <input readonly class="inputpromohome" v-model="cantidad">
                        <a class="arrow-up_touch" @click="agregarProducto(manufacturadoParam._id, 1)"></a>
                    </div>
                </v-row>
            </v-col>
            <v-col v-else-if="!conStock && cantidad > 0">
                <v-row>
                    <div v-if="reserve == false">
                        <v-btn color="deep-purple lighten-2" text @click="agregar(manufacturadoParam._id)">
                            Agregar al Carrito
                        </v-btn>
                    </div>
                </v-row>
                <v-row align="center">
                    <div v-if="reserve == true" class="buttons_buy" style="display: flex;">
                        <a class="arrow-down_touch" @click="agregarProducto(manufacturadoParam._id, -1)"></a>
                        <input readonly class="inputpromohome" v-model="cantidad">
                        <h5><b>No hay más</b></h5>
                    </div>
                </v-row>
            </v-col>
            <v-col v-else>
                <b> SIN STOCK</b>
            </v-col>
        </v-card-actions>
    </v-card>

</template>
<script>
import detallemanufacturado from "@/components/DetalleManufacturado.vue"
import { eventBus } from "../main";
import AuthService from "@/service/auth.service.js"
import { controlStock, calcularInsumos } from "@/funciones/ControlStock.js"
export default {

    data() {
        return {
            art: null,
            reserve: false,
            cantidad: 0,
            cambioCarrito: false,
            alert: false,
            carritoLocalstorage: {},
            currentUser: undefined,
            conStock: true
        };
    },
    components: {
        "detalle-manufacturado": detallemanufacturado
    },
    props: { manufacturadoParam: Object },
    mounted() {
        this.getLocalStorage(this.manufacturadoParam._id)
        //console.log("manufacturadoParam", this.manufacturadoParam)
        this.currentUser = AuthService.getCurrentUser()
        this.conStock = controlStock(this.manufacturadoParam)
        //console.log("conStock ", this.conStock)
    },
    beforeUpdate() {
        this.conStock = controlStock(this.manufacturadoParam)
        //console.log("conStock beforeUpdate", this.conStock)
    },
    methods: {
        async agregar(id) {
            if (this.currentUser) {
                this.cantidad = 1
                this.reserve = true
                this.cambioCarrito = true
                window.localStorage.setItem(id, JSON.stringify({ 'cantidad': this.cantidad }));
                console.log("insumos agregar ", this.manufacturadoParam)
                await calcularInsumos(this.manufacturadoParam, this.cantidad)
                this.conStock = controlStock(this.manufacturadoParam)
                console.log("entró conStock " + this.conStock)
                this.$emit('abrirAlert', 1)
                eventBus.$emit("carrito-changed", this.cambioCarrito)
                //this.cambioCarrito=false
            } else
                this.$emit('abrirAlert', 0)
        },
        async agregarProducto(id, i) {
            if (i == 0) {
                this.reserve = false
                window.localStorage.removeItem(id)

            } else {
                this.cantidad += i
                window.localStorage.setItem(id, JSON.stringify({ 'cantidad': this.cantidad }))
                console.log("insumos agregarProducto ", this.manufacturadoParam)
                await calcularInsumos(this.manufacturadoParam, i)
                this.conStock = controlStock(this.manufacturadoParam)
                this.$emit('abrirAlert', 1)
                eventBus.$emit("carrito-changed", this.cambioCarrito)
                if (this.cantidad == 0) {
                    this.reserve = false
                    window.localStorage.removeItem(id)
                }
                //this.cambioCarrito=false
            }
            this.getLocalStorage(this.manufacturadoParam._id) //está línea actualiza la vista gral del componente padre cuando se elimina desde el carrito
            this.cambioCarrito = true
            
        },
        async getLocalStorage(id) {
            if (localStorage.getItem(id)) {
                this.reserve = true
                this.cantidad = (JSON.parse(localStorage.getItem(id))).cantidad
                //console.log("this.cantidad: "+this.cantidad)
            }
            else {
                this.reserve = false
                this.cantidad = 0
            }
        },
        async abrirDetalleManufacturado(item) {
            this.art = item
        },
        async handlefunction(value) {
            console.log("value", value)
            if (value.close) {
                this.art = null
                this.$emit('abrirAlert', 1)
            }
            if (value.actualizarCarrousel) {
                try {
                    const res = await fetch(
                        `http://localhost:3000/getManufacturadoXid/${this.art._id}`
                    )
                    const resJson = await res.json();
                    this.art = resJson
                    this.getLocalStorage(this.art._id)
                } catch (e) { }
            }
        }
    }
    ,
    created() {
        eventBus.$on("elimina-itemcarrito", async (data) => {
            if (data != 0) { //revisar bien si sirve este if, si no borrar
                console.log("entró al elimina-itemcarrito en TarjetaManufacturado, data: " + data)
                this.agregarProducto(data, 0)
                this.$emit('abrirAlert', 1)
                //eventBus.$emit("carrito-changed", this.cambioCarrito= true)
            }
            else {
                console.log("entró al else")
                this.$emit('abrirAlert', 1)
                this.getLocalStorage(this.manufacturadoParam._id)
            }

        });
    }
};
</script>
<style scoped>
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

.text-h4 {
    padding: 20px;
    font-weight: bold;
}

.circle {
    margin: 5%;
    font-weight: bold;
    padding: 5%;
    background: rgb(250, 251, 252);
    border-radius: 50%;
    border-style: solid;
    border-color: black;
}
</style>