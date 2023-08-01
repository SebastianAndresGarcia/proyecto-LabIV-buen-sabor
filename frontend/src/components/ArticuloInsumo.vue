<template>
    <v-card v-if="insumoParam.insumoSeleccionado" style="margin-top: 10px; justify:center">
        <v-card-title>
            Articulos Insumos
            <v-spacer></v-spacer>
            <!-- <Form-Insumo :idrubroarticulo="insumoParam.insumoSeleccionado" @nuevoInsumo="handleMessage"> -->
                <Form-Insumo :articuloParam="{'idrubroarticulo':insumoParam.insumoSeleccionado, 'esInsumo': insumoParam.esInsumo}" @nuevoInsumo="handleMessage">
            </Form-Insumo>
        </v-card-title>
        <v-simple-table class="tabla"> <!--v-if="!insumosData==null"-->
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
                            <b>Es Ingrediente</b>
                        </th>

                        <th class="text-left">
                            Editar
                        </th>
                        <th class="text-left">
                            Eliminar
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
                            {{ insumo.precioVenta }}
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
                            <!-- <Form-Insumo :idinsumo="insumo.denominacion" @nuevoInsumo="handleMessage"> -->
                                <Form-Insumo :articuloParam="{'idinsumo':insumo.denominacion, 'esInsumo': insumoParam.esInsumo}" @nuevoInsumo="handleMessage">
                            </Form-Insumo>
                        </td>
                        <td>
                            <v-btn icon @click="eliminarInsumo(insumo._id)">
                                <v-icon small>
                                    mdi-delete
                                </v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <!--  <div v-else>
                    <h3 class="text-center">No existen insumos para esta categoría</h3>
                </div> -->
    </v-card>
    <div v-else>
        <h1 class="text-center">Seleccione un Rubro</h1>
    </div>
</template>
<script >
import AuthService from "@/service/auth.service.js";
import forminsumo from "@/components/FormInsumos.vue";
export default {
    data() {
        return {
            insumosData: [{
                _id: "",
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
    components: {
        "Form-Insumo": forminsumo
    },
    beforeUpdate() {
        
        console.log("asdasdasdasdasdsa")
            //console.log("insumoParam", this.insumoParam)
        if(this.insumoParam.insumoSeleccionado)
            this.getInsumosXrubro(this.insumoParam.insumoSeleccionado)
    },
    props: ["insumoParam"],
    mounted() {
        this.currentUser = AuthService.getCurrentUser();
        console.log("insumoParam", this.insumoParam)
        this.getInsumosXrubro(this.insumoParam.insumoSeleccionado)
    },

    methods: {
        async getInsumosXrubro(parametro) {
            //console.log("parametroGetInsumos " + parametro+" length "+parametro.length)
            if (parametro.length == 0) {
                const res = await fetch(
                    `http://localhost:3000/articulosinsumos/${this.insumoParam.esInsumo}` //true para que me traiga los insumos
                );
                const resJson = await res.json();
                console.log(resJson);
                //if(resJson!=null)
                this.insumosData = resJson;
            } else {
                const res = await fetch(
                    `http://localhost:3000/articulosinsumosXrubro/${parametro}`
                );
                const resJson = await res.json();
                console.log(resJson);
                this.insumosData = resJson;
            }
        },
        handleMessage(value) {
            this.nuevoArt = value
            if (this.nuevoArt) {
                this.getInsumosXrubro(this.insumoParam.insumoSeleccionado)
                this.nuevoArt = false
            }
        },
        async eliminarInsumo(id) {
            let urlServer = `http://localhost:3000/EliminarInsumo/${id}`;
            const res = await fetch(urlServer, {
                "method": 'DELETE',
                "headers": {
                    "Content-type": 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    "x-access-token": this.currentUser.accessToken,
                },
                mode: 'cors'
            });
            const resJson = await res.json();
            console.log("respuesta: ", resJson)
            if (res.status === 200) {
                console.log(res.status)
                this.getInsumosXrubro(this.insumoParam.insumoSeleccionado)
            }
        },
    }
}
</script >