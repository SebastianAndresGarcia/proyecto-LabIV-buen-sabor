<template>
    <v-card v-if="insumoParam.length > 0" style="margin-top: 10px; justify:center">
        <v-card-title>
            Articulos Insumos

            <v-spacer></v-spacer>
            <Form-Insumo :idrubroarticulo="insumoParam" @nuevoInsumo="handleMessage">
            </Form-Insumo>
        </v-card-title>
        <v-simple-table class="tabla" v-if="insumosData">
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
                            <Form-Insumo :idinsumo="insumo.denominacion"
                                @nuevoManufacturado="handleMessage">
                            </Form-Insumo>
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
        <div v-else>
            <h3 class="text-center">No existen insumos para esta categoría</h3>
        </div>
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
            this.getInsumosXrubro(this.insumoParam)
    },
    props: ["insumoParam"],
    mounted() {
        console.log("insumoParam", this.insumoParam)
            //   this.getInsumos()
    },

    methods: {
        async getInsumosXrubro(parametro) {
            console.log(parametro)
            const res = await fetch(
                `http://localhost:3000/articulosinsumosXrubro/${parametro}`
                );
            const resJson = await res.json();
            console.log(resJson);
            this.insumosData = resJson;
        },

       
    }
}
</script >