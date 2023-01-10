<template>

    <v-card class="justify-center" max-width="350">
        <template slot="progress">
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
        </template>

        <a :href="'./Detallemanufacturado/' + manufacturadoParam._id">
            <span v-if="manufacturadoParam.imagen.indexOf('http') >= 0">
                <v-img height="250" :src="this.manufacturadoParam.imagen" />
            </span>
            <span v-else>
                <v-img height="250" :src="'/images/' + manufacturadoParam.imagen" alt="Image" />
            </span>
        </a>
        <v-card-title>{{ manufacturadoParam.denominacion }}</v-card-title>

        <v-card-text>
            <v-row align="center" class="mx-0">
                <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>
                <div class="grey--text ms-4">
                    4.5 (413)
                </div>
            </v-row>

            <div class="my-4 text-subtitle-1">
                $ {{ manufacturadoParam.precioVenta }}
            </div>

            <div>Alguna descripción</div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-actions>
            <v-col>
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
        </v-card-actions>
    </v-card>

</template>
<script>
import { eventBus } from "../main";
import AuthService from "@/service/auth.service.js"
export default {

    data() {
        return {
            reserve: false,
            cantidad: 0,
            cambioCarrito: false,
            alert: false,
            carritoLocalstorage: {},
            currentUser: undefined
        };
    },
    props: {manufacturadoParam: Object},
    mounted() {
        this.getLocalStorage(this.manufacturadoParam._id)
        console.log("manufacturadoParam", this.manufacturadoParam)
        this.currentUser=AuthService.getCurrentUser()
    },
    methods: {
        agregar(id) {
            if(this.currentUser){
            this.cantidad = 1
            this.reserve = true
            this.cambioCarrito = true
            window.localStorage.setItem(id, JSON.stringify({'cantidad': this.cantidad}));
            document.cookie = id + "=" + id + "," + 1
            eventBus.$emit("carrito-changed", this.cambioCarrito)
            //this.cambioCarrito=false
            }else 
            this.alert=true
            this.$emit('abrirAlert', this.alert)
        },
        agregarProducto(id, i) {
            if (i == 0) {
                this.reserve = false
                window.localStorage.removeItem(id)
                document.cookie = id + "=; max-age=0";
            } else {
                this.cantidad += i
                window.localStorage.setItem(id, JSON.stringify({'cantidad': this.cantidad}))
                document.cookie = id + "=" + id + "," + this.cantidad

                if (this.cantidad == 0) {
                    this.reserve = false
                    window.localStorage.removeItem( id)
                    document.cookie = id + "=; max-age=0"
                }
                console.log("cookie", document.cookie)
                this.cambioCarrito = true
                eventBus.$emit("carrito-changed", this.cambioCarrito)
                //this.cambioCarrito=false
            }
            this.getLocalStorage(this.manufacturadoParam._id) //está línea actualiza la vista gral del componente padre cuando se elimina desde el carrito
        },
        async getLocalStorage(id) {
            
            if(localStorage.getItem(id)){
                this.reserve = true
                this.cantidad = (JSON.parse(localStorage.getItem(id))).cantidad
                //console.log("this.cantidad: "+this.cantidad)
            }

        },
    },
    created() {
        eventBus.$on("elimina-itemcarrito", async (data) => {
            if (data!=0) {
                console.log("entró al if del itemcarrito, data: " + data)
                this.agregarProducto(data, 0)
            }
            else{
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
</style>