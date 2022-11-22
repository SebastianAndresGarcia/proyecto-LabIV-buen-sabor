<template>
    <v-card v-if="insumoParam.length > 0" style="margin-top: 10px; justify:center">
        <v-card-title>
            Articulos Insumos

            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" :href="'/Formulario/0'">
                Crear Insumo
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
                            <b>Precio Compra</b>
                        </th>
                        <th class="text-left">
                            <b>Precio Venta</b>
                        </th>

                        <th class="text-left">
                            <b>Stock actual</b>
                        </th>

                        <th class="text-left">
                            <b>Stock mínimo</b>
                        </th>
                        
                        <th class="text-left">
                            <b>Unidad Medida</b>
                        </th>
                        
                        <th class="text-left">
                            <b>Es Insumo</b>
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
                    <tr v-for="insumo in insumosData" :key="insumo.id" style="padding-top: 5px;">

                        <td>
                            {{ insumo.denominacion }}
                        </td>
                        <td>
                            {{ insumo.precioCompra }}
                        </td>
                        <td>
                            {{ insumo.precioVenta}}
                        </td>

                        <td>
                            {{ insumo.stockActual }}
                        </td>

                        <td>
                            {{ insumo.stockMinimo }}
                        </td>

                        <td>
                            {{ insumo.unidadMedida }}
                        </td>

                        <td>
                            {{ insumo.esInsumo }}
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

export default {
    data() {
        return {
            insumosData: [{
                _id:"",
                denominacion: "",
                precioCompra: null,
                precioVenta: null,
                stockActual: null,
                stockMinimo: null,
                unidadMedida: "",
                esInsumo: false,
                detallefacturaid: [],
                detallepedidoid: [],
                detallearticulomanufacturadoid: [],
                RubroArticuloid: ""
            }],
        }
    },
    beforeUpdate(){ 
        console.log("asdasdasdasdasdsa"),
        console.log("insumoParam", this.insumoParam)
        if(this.insumoParam)
            this.getInsumos(this.insumoParam)
    },
    props: ["insumoParam"],
    mounted() {
        console.log("insumoParam", this.insumoParam)
            //   this.getInsumos()
    },

    methods: {
        async getInsumos(parametro) {
            console.log(parametro)
            const res = await fetch(
                //estoy sería para que busque por rubro pero no puedo hacer busquedas y modificaciones en el json anidado "http://localhost:3000/ArticulosInsumosxrubro/"+parametro
                "http://localhost:3000/articulosinsumos"
                );
            const resJson = await res.json();
            console.log(resJson);
            this.insumosData = resJson;
        },

        /*async deleteinstrumento(idinstrumento) {

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
        },
        /* async editarinstrumento(idinstrumento){
            href('/Formulario/' + instrumento.id),
         */
    }
}
</script >