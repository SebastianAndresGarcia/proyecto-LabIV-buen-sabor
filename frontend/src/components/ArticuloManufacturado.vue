<template>
    <v-card v-if="manufacturadoParam.length > 0" style="margin-top: 10px">
        <v-card-title>
            Articulos Manufacturados

            <v-spacer></v-spacer>
            <Form-Manufacturado :idrubrogral="manufacturadoParam" @nuevoManufacturado="handleMessage">
            </Form-Manufacturado>
        </v-card-title>
        <v-simple-table class="tabla">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            <b>Denominacion</b>
                        </th>
                        <th class="text-left">
                            <b>imagen</b>
                        </th>
                        <th class="text-left">
                            <b>Precio Venta</b>
                        </th>

                        <th class="text-left">
                            <b>Activo</b>
                        </th>

                        <th class="text-left">
                            algunBoton
                        </th>
                        <th class="text-left">
                            otroBoton
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="manufacturado in manufacturadosData" :key="manufacturado.id" style="padding-top: 5px;">

                        <td>
                            {{ manufacturado.denominacion }}
                        </td>
                        <td>
                            {{ manufacturado.imagen }}
                        </td>
                        <td>
                            {{ manufacturado.precioVenta }}
                        </td>

                        <td>
                            {{ manufacturado.activo }}
                        </td>

                        <td>

                          <!--  <v-btn icon v-bind="attrs" v-on="on" @click="modificarManufacturado(manufacturado._id)">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn> -->
                            <Form-Manufacturado :idrubrogral =  "[manufacturadoParam,manufacturado._id]" >
                            </Form-Manufacturado>
                        </td>
                        <td>
                            <v-btn icon v-bind="attrs" v-on="on" @click="eliminarManufacturado(manufacturado._id)">
                                <v-icon small>
                                    mdi-delete
                                </v-icon>
                            </v-btn>
                        </td>

                    </tr>
                </tbody>
            </template>
        </v-simple-table>

    </v-card>
    <div v-else>
        <h1 class="text-center">Seleccione un Rubro</h1>
    </div>
</template>
<script >
import formmanufacturado from "@/components/FormManufacturados.vue";
export default {
    data() {
        return {
            manufacturadosData: [{
                _id: "",
                tiempoEstimadoCocina: null,
                denominacion: "",
                precioVenta: null,
                imagen: "",
                activo: false,
                detallefacturaid: "",
                detallepedidoid: "",
                detallearticulomanufacturadoid: "",
                rubrogeneralid: ""
            }],
            nuevoArt: false
        }
    },
    components: {
        "Form-Manufacturado": formmanufacturado
    },
    beforeUpdate() {
        console.log("asdasdasdasdasdsa"),
            console.log("manufacturadoParam", this.manufacturadoParam)
        if (this.manufacturadoParam)
            this.getManufacturadosxrubro(this.manufacturadoParam)
    },
    props: ["manufacturadoParam"],
    
    mounted() {
        console.log("manufacturadoParam", this.manufacturadoParam)
        //this.getManufacturados()
        //this.getManufacturadosxrubro(this.manufacturadoParam)
    },

    methods: {
        async getManufacturados() {
            const res = await fetch(
                "http://localhost:3000/articulosmanufacturados"
            );
            const resJson = await res.json();
            console.log(resJson);
            this.manufacturadosData = resJson;
        },
        async getManufacturadosxrubro(parametro) {

            console.log("parametro: " + parametro)
            const res = await fetch(
                "http://localhost:3000/articulosmanufacturadosxrubro/" + parametro
            );
            const resJson = await res.json();
            console.log(resJson);
            this.manufacturadosData = resJson;
        },
        async eliminarManufacturado(id) {
            let urlServer = `http://localhost:3000/eliminarArticuloManufacturado/${id}`;

            const res = await fetch(urlServer, {
                "method": 'DELETE',

                "headers": {
                    "Content-type": 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                mode: 'cors'

            });
            const resJson = await res.json();
            console.log("respuesta: ", resJson)
            if (res.status === 200) {
                console.log(res.status)
                this.getManufacturadosxrubro(this.manufacturadoParam)
            }
        },

        /* async editarinstrumento(idinstrumento){
            href('/Formulario/' + instrumento.id),
         */
        handleMessage(value) {
            this.nuevoArt = value
            if (this.nuevoArt) {
                this.getManufacturadosxrubro(this.manufacturadoParam)
                this.nuevoArt = false
            }

        }
    }
}
</script >