<template>
    <v-card style="margin-top: 10px">
        <v-card-title>
            Articulos Manufacturados

            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" :href="''">
                Cargar Nuevo
            </v-btn>
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
                            {{ manufacturado.precioVenta}}
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
</template>
<script >

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

    mounted() {
        this.getManufacturados()
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

      /*  async deleteinstrumento(idinstrumento) {

            let urlServer = `http://localhost:3001/eliminarInstrumento/${idinstrumento}/`;


            await fetch(urlServer, {
                "method": 'DELETE',

                "headers": {
                    "Content-type": 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                mode: 'cors'

            });
            window.location.reload();
        },*/
        /* async editarinstrumento(idinstrumento){
            href('/Formulario/' + instrumento.id),
         */
    }
}
</script >