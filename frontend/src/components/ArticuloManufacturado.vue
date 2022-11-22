<template>
    <v-card v-if="manufacturadoParam.length > 0" style="margin-top: 10px">
        <v-card-title>
            Articulos Manufacturados

            <v-spacer></v-spacer>
            <Form-Manufacturado :idrubrogral="manufacturadoParam"></Form-Manufacturado>
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
                            <a :href="'/'" style="text-decoration: none; color: white">
                                <v-icon small class="mr-2">
                                    mdi-pencil
                                </v-icon>
                            </a>
                        </td>
                        <td>
                            <v-icon small>
                                mdi-delete
                            </v-icon>
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
        }
    }
}
</script >