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
                        <input onfocus="this.select();" class="inputpromohome" v-model="cantidad" onkeyup=""
                            onmouseup="return false;">
                        <a class="arrow-up_touch" @click="agregarProducto(manufacturadoParam._id, 1)"></a>
                    </div>
                </v-row>
            </v-col>
        </v-card-actions>
    </v-card>

</template>
<script>
import { eventBus } from "../main";
export default {

    data() {
        return {
            reserve: false,
            cantidad: 0,
            cambioCarrito: false,
            ca: []
        };
    },
    props: {manufacturadoParam: Object},
    mounted() {
        
        this.getCookie(this.manufacturadoParam._id)
        console.log("manufacturadoParam", this.manufacturadoParam)
        // if (String(this.manufacturadoParam.imagen).indexOf("http") >= 0) {
        //     this.urlImage = this.manufacturadoParam.imagen;
        //     console.log(this.urlImage)
        // } else {
        //     this.urlImage = "../images/" + this.manufacturadoParam.imagen;
        //     console.log(this.urlImage)
        // }
    },
    //beforeUpdate(){this.cambioCarrito=false},
    methods: {
        agregar(id) {
            this.cantidad = 1
            this.reserve = true
            this.cambioCarrito = true
            document.cookie = id + "=" + id + "," + 1
            eventBus.$emit("carrito-changed", this.cambioCarrito)
            //this.cambioCarrito=false
        },
        agregarProducto(id, i) {
            if (i == 0) {
                this.reserve = false
                document.cookie = id + "=; max-age=0";
            } else {
                this.cantidad += i
                document.cookie = id + "=" + id + "," + this.cantidad

                if (this.cantidad == 0) {
                    this.reserve = false
                    document.cookie = id + "=; max-age=0"
                }
                console.log("cookie", document.cookie)
                this.cambioCarrito = true
                eventBus.$emit("carrito-changed", this.cambioCarrito)
                //this.cambioCarrito=false
            }
        },
        async getCookie(id) {
            this.ca = await document.cookie.split(';'); //divido por cookie
            if (document.cookie) {
                for (let i = 0; i < this.ca.length; i++) {
                    if (this.ca[i].includes(id)) { //busco si el producto está incluido en el carrito
                        this.reserve = true
                        this.cantidad = Number(this.ca[i].slice(-1)) //para obtener el último caracter que trae la cantidad
                        //console.log("this.ca[i][this.ca[i].length]"+this.ca[i])
                    }
                }
            }
        },
    },
    created() {
        eventBus.$on("elimina-itemcarrito", async (data) => {
            if (data) {
                console.log("entró al if del itemcarrito, data: " + data)
                this.agregarProducto(data, 0)
            }
            //eventBus.$off("elimina-itemcarrito");
        });
    },
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