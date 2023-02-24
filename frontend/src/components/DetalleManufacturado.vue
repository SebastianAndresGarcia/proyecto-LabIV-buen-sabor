<template>

    <v-dialog v-model="dialog" persistent max-width="700px">

        <template v-slot:activator="{ on, attrs }"></template>
        <v-card v-if="manufacturado">

            <template slot="progress">
                <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>
            <v-img height="250" :src="manufacturado.imagen">
                <v-row style="justify-content: left" v-if="manufacturado.descuento > 0">
                    <div class="circle " style="font: bold; color: red;">
                        <h4><b>-{{ manufacturado.descuento }} % OFF</b></h4>
                    </div>
                </v-row></v-img>
            <v-card-title>
                <span class="text-h5">{{ manufacturado.denominacion }}</span>
            </v-card-title>
            <v-card-text>
                <v-row align="center" class="mx-0">
                    <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>
                    <div class="grey--text ms-4">
                        4.5 (413)
                    </div>
                </v-row>
                <div v-if="manufacturado.descuento > 0" class="my-4 text-subtitle-1">
                    <del>${{ manufacturado.precioVenta }}</del>&nbsp&nbsp$<b>{{
                        manufacturado.precioVenta - (manufacturado.precioVenta * manufacturado.descuento) / 100
                    }}</b>
                </div>
                <div v-else class="my-4 text-subtitle-1">${{ manufacturado.precioVenta }}</div>
                <div>Alguna descripción</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-actions>
                <v-col>
                    <v-row style="justify-content:center">
                        <div v-if="reserve == false" style="display: flex">
                            <v-btn color="success" @click="agregar(manufacturado._id)">
                                Agregar al Carrito
                            </v-btn>
                        </div>
                    </v-row>

                    <v-row>
                        <div v-if="reserve == true" class="buttons_buy" style="display: flex;">
                            <a class="arrow-down_touch" @click="agregarProducto(manufacturado._id, -1)"></a>
                            <input readonly class="inputpromohome" v-model="cantidad">
                            <div v-if="conStock"> <a class="arrow-up_touch"
                                    @click="agregarProducto(manufacturado._id, 1)"></a></div>
                            <div v-else>
                                <h5><b>No hay más</b></h5>
                            </div>
                        </div>
                    </v-row>

                    <v-row style="justify-content:left">
                        <v-btn text color="black" @click="cerrar()">
                            CERRAR
                        </v-btn>
                    </v-row>
                </v-col>
            </v-card-actions>

        </v-card>
        <v-dialog v-model="alert" max-width="400px">
            <v-alert color="red" prominent type="warning">
                Inicie sesión para llenar su carrito<v-btn text @click="alert = false">X</v-btn>
            </v-alert>
        </v-dialog>
    </v-dialog>

</template>
<script>
import { eventBus } from "../main";
import AuthService from "@/service/auth.service.js"
import { controlStock, calcularInsumos } from "@/funciones/ControlStock.js"
export default {
    name: 'Car-ousel',
    data() {
        return {
            alert: false,
            reserve: false,
            cantidad: 0,
            cambioCarrito: false,
            alert: false,
            carritoLocalstorage: {},
            currentUser: undefined,
            items: [{}], //no funciona el carrousel si no lo inicializo así
            dialog: false,
            articulo: null,
            limpiar: true,
            conStock: true
        }
    },
    props: ["manufacturado"],
    mounted() {
        this.currentUser = AuthService.getCurrentUser()
    },
    beforeUpdate() {
        console.log("entró", this.manufacturado)
        if (this.manufacturado) {
            this.dialog = true
            this.getLocalStorage(this.manufacturado._id)
        }
        if (this.manufacturado) this.conStock = controlStock(this.manufacturado.detallearticulomanufacturadoid)
    },
    methods: {
        async cerrar() {
            this.dialog = false
            this.$emit('limpiarObjeto', { close: true })
            //this.$emit('limpiarObjeto', true)
        },
        async agregar(id) {
            if (this.currentUser) {
                this.cantidad = 1
                this.reserve = true
                this.cambioCarrito = true
                window.localStorage.setItem(id, JSON.stringify({ 'cantidad': this.cantidad }));
                eventBus.$emit("carrito-changed", this.cambioCarrito)
                //eventBus.$emit("elimina-itemcarrito", '0')
                await calcularInsumos(this.manufacturado.detallearticulomanufacturadoid, this.cantidad)
                this.$emit('limpiarObjeto', { actualizarCarrousel: true })
            } else {
                this.alert = true
            }
        },
        async agregarProducto(id, i) {
            if (i == 0) {
                this.reserve = false
                window.localStorage.removeItem(id)
            } else {
                this.cantidad += i
                window.localStorage.setItem(id, JSON.stringify({ 'cantidad': this.cantidad }))
                if (this.cantidad == 0) {
                    this.reserve = false
                    window.localStorage.removeItem(id)
                }
                console.log("cookie", document.cookie)
                this.cambioCarrito = true
                //eventBus.$emit("carrito-changed", this.cambioCarrito)
                await calcularInsumos(this.manufacturado.detallearticulomanufacturadoid, i)
                this.$emit('limpiarObjeto', { actualizarCarrousel: true })
                eventBus.$emit("carrito-changed", this.cambioCarrito)
                //this.cambioCarrito=false
            }
            await this.getLocalStorage(this.manufacturado._id) //está línea actualiza la vista gral del componente padre cuando se elimina desde el carrito
            
        },
        async getLocalStorage(id) {
            if (localStorage.getItem(id)) {
                this.reserve = true
                this.cantidad = (JSON.parse(localStorage.getItem(id))).cantidad
            }
            else {
                this.reserve = false
                this.cantidad = 0
            }
        },
    },
    created() {
        eventBus.$on("elimina-itemcarrito", async (data) => {
            console.log("antes de entrar if itemcarrito, data: " + data)
            if (data != 0) {
                console.log("entró al if del itemcarrito, data: " + data)
                this.agregarProducto(data, 0)
                this.$emit('limpiarObjeto', { actualizarCarrousel: true })
            }
            else {
              //  this.getLocalStorage(this.manufacturado._id)
            }
        });
    }
}
</script>
<style>
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