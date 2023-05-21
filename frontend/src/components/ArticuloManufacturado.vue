<template>
    <v-card v-if="manufacturadoParam" style="margin-top: 10px">
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

                        <th class="text-center">
                            MODIFICAR
                        </th>
                        <th class="text-left">
                            ELIMINAR
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="manufacturado in manufacturadosData" :key="manufacturado.id" style="padding-top: 5px;">

                        <td>
                            {{ manufacturado.denominacion }}
                        </td>
                        <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis;">
                            {{ manufacturado.imagen }}
                        </td>
                        <td>
                            {{ manufacturado.precioVenta }}
                        </td>

                        <td>
                            {{ manufacturado.activo }}
                        </td>

                        <td>
                            <Form-Manufacturado :idmanufacturado="manufacturado.denominacion"
                                @nuevoManufacturado="handleMessage">
                            </Form-Manufacturado>
                        </td>
                        <td>
                            <v-btn icon @click="eliminarManufacturado(manufacturado._id)">
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
    props: ["manufacturadoParam"], //recibe el props de AbmArticulos

    mounted() {
        console.log("manufacturadoParam", this.manufacturadoParam)
        this.getManufacturadosxrubro(this.manufacturadoParam)
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
            if (parametro == 0) {
                console.log("parametro: " + parametro)
                const res = await fetch(
                    "http://localhost:3000/articulosmanufacturados/"
                );
                const resJson = await res.json();
                console.log(resJson);
                this.manufacturadosData = resJson;
            }
            else {
                const res = await fetch(
                    `http://localhost:3000/articulosmanufacturadosxrubro/${parametro}`
                );
                const resJson = await res.json();
                console.log(resJson);
                this.manufacturadosData = resJson;
            }
        },
        async eliminarManufacturado(id) {
            console.log("eliminar manufact " + id)
            // let urlServer = `http://localhost:3000/eliminarArticuloManufacturado/${id}`;

            // const res = await fetch(urlServer, {
            //     "method": 'DELETE',

            //     "headers": {
            //         "Content-type": 'application/json',
            //         'Access-Control-Allow-Origin': '*'
            //     },
            //     mode: 'cors'

            // });
            // const resJson = await res.json();
            // console.log("respuesta: ", resJson)
            // if (res.status === 200) {
            //     console.log(res.status)
            //     this.getManufacturadosxrubro(this.manufacturadoParam)
            // }
        },

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