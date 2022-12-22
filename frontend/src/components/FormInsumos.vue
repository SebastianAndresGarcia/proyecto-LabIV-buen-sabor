<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <div v-if="(idinsumo == null)">
                    <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                        Crear Insumo
                    </v-btn>
                </div>
                <div v-else>
                    <v-btn icon v-bind="attrs" v-on="on" @click="getInsumoXdenominacion(idinsumo)">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </div>
            </template>

            <v-card ref="form">
                <v-card-title>
                    <span class="text-h5">Crear Insumo</span>
                </v-card-title>

                <form @submit.prevent="crearInsumo">
                    <v-card-text>
                        <v-row>

                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="Denominacion*" v-model="insumo.denominacion"
                                    required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="Tiempo de Cocina*" type="number"
                                    v-model="ArticuloManufacturado.tiempoEstimadoCocina"
                                    hint="example of helper text only on focus" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field type="number" label="Precio de Venta*"
                                    v-model="ArticuloManufacturado.precioVenta" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Imagen*" v-model="ArticuloManufacturado.imagen" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Activo?*" v-model="ArticuloManufacturado.activo" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-row v-for="ins in cantidadInsumos" :key="ins.id">
                                    <v-col>
                                        <v-select label="Seleccione un insumo" outlined
                                            v-model="insumoSeleccionado[ins - 1]" :items="insumosData" item-value="_id"
                                            item-text="denominacion" @change="onchange(insumoSeleccionado)">

                                        </v-select>
                                    </v-col>
                                    <v-col>
                                        <v-text-field label="Cantidad" type="number"
                                            v-model="DetalleArticuloManufacturado[ins - 1].cantidad"></v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-text-field label="Unidad Medida"
                                            v-model="DetalleArticuloManufacturado[ins - 1].unidadMedida">
                                        </v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-btn @click="eliminarInsumo(ins)">Eliminar</v-btn>
                                    </v-col>
                                </v-row>
                                <v-btn @click="crearSelectInsumo">Agregar Insumo</v-btn>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="ArticuloManufacturado.rubrogeneralid" required>
                                </v-text-field>
                            </v-col>

                        </v-row>
                        <small>*Todos los campos son obligatorios</small>
                    </v-card-text>
                    <v-divider class="mt-2"></v-divider>

                    <v-card-actions>

                        <v-btn text color="blue darken-1" @click="cerrardialog">
                            Cancel
                        </v-btn>
                        <v-spacer></v-spacer>

                        <v-btn text color="blue darken-1" type="submit">
                            Guardar
                        </v-btn>
                    </v-card-actions>
                </form>

            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>

export default {
    name: "register-item",

    data() {
        /*denominacion
precioCompra
precioVenta
stockActual
stockMinimo
unidadMedida
esInsumo
detallefacturaid
detallepedidoid
detallearticulomanufacturadoid
RubroArticuloid

        */
        return {
            dialog: false,
         
            aux: [],
            modal: false,
            insumosData: [],
            insumoSeleccionado: [],
            nuevoManufacturado: false,
            insumo: {
                denominacion: "",
                precioCompra: null,
                precioVenta: null,
                stockActual: null,
                stockMinimo: null,
                unidadMedida: "",
                esInsumo: false,
                //detallefacturaid:
                //detallepedidoid:
                //detallearticulomanufacturadoid:
                RubroArticuloid: ""
            },
    
        };
    },
    props: { idrubroarticulo: String, idinsumo: String },
    //props: ["manufacturadoid"],
    beforeUpdate() {
        //console.log("datos select ", this.insumoSeleccionado)
        //this.ArticuloManufacturado.rubrogeneralid = this.idrubrogral
        console.log("idrubroarticulo beforeUpdate ", this.idrubroarticulo)
        
    },
    mounted() {
        console.log("idrubroarticulo props ", this.idrubroarticulo)
        console.log("idinsumo props " + this.idinsumo)
        this.getInsumos(),
            this.ArticuloManufacturado.rubrogeneralid = this.idrubrogral
        console.log(this.idrubrogral)
        //this.getManufacturadoXdenominacion(this.idrubrogral[1]) 
    },
    methods: {
       
        async eliminarInsumo(i) {
            if (this.idmanufacturado == undefined || this.DetalleArticuloManufacturado[i - 1]._id == undefined) {
                console.log("solo borrar insumo del form")
            } else {
                console.log("borrar insumo de la bd" + this.DetalleArticuloManufacturado[i - 1]._id)
                const id = this.DetalleArticuloManufacturado[i - 1]._id
                let urlServer = `http://localhost:3000/eliminarDetalleArticuloManufacturado/${id}`;
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
                }
            }
            console.log("indice " + i)
            console.log("this.insumoSeleccionado.length " + this.insumoSeleccionado.length)
            this.cantidadInsumos = this.cantidadInsumos - 1;
            this.insumoSeleccionado.splice(i - 1, 1);
            console.log("insumoSeleccionado ", this.insumoSeleccionado)
            this.DetalleArticuloManufacturado.splice(i - 1, 1)
            console.log(this.DetalleArticuloManufacturado)

        },
        cerrardialog() {
            this.dialog = false
            this.cantidadInsumos = null
            this.insumoSeleccionado = []
            this.DetalleArticuloManufacturado = []
            this.ArticuloManufacturado = new Object({
                'tiempoEstimadoCocina': null,
                'denominacion': "",
                'precioVenta': null,
                'imagen': "",
                'activo': null, 'rubrogeneralid': this.idrubrogral
            })
        },
        async crearInsumo() { //también cumple la función de actualizar según el props activo
            this.nuevoInsumo = false
            console.log("entró");

            console.log(this.insumo);
            if (this.idrubroarticulo) {
                let urlServer = "http://localhost:3000/crearArticuloInsumo";
                let method = "POST";
                const respuesta = await fetch(urlServer, {
                    method: method,
                    body: JSON.stringify(this.insumo),
                    headers: {
                        "Content-type": "application/json",
                    },
                    mode: "cors",
                });
                const resJson = await respuesta.json()
                console.log("respuesta: ", resJson)
                if (respuesta.status === 200) {
                    console.log(respuesta.status)
                    this.dialog = false;
                    this.nuevoInsumo = true
                } else {
                    this.respuestaError = resJson.message
                    console.log("mensaje del servidor: " + this.respuestaError)
                }
            } else {
                let urlServer = "http://localhost:3000/ActualizarInsumo/" + this.idinsumo;
                let method = "POST";
                const respuesta = await fetch(urlServer, {
                    method: method,
                    body: JSON.stringify(this.insumo),
                    headers: {
                        "Content-type": "application/json",
                    },
                    mode: "cors",
                });
                const resJson = await respuesta.json()
                console.log("respuesta: ", resJson)
                if (respuesta.status === 200) {
                    console.log(respuesta.status)
                    this.dialog = false;
                    this.nuevoInsumo = true
                } else {
                    this.respuestaError = resJson.message
                    console.log("mensaje del servidor: " + this.respuestaError)
                }
            }
                
            this.insumo = new Object({
                'denominacion': "",
                'precioCompra': null,
                'precioVenta': null,
                'stockActual': null,
                'stockMinimo': null,
                'unidadMedida': "",
                'esInsumo': false,
                'RubroArticuloid': ""
            })

        },
        
        async getInsumoXdenominacion(id) {
            const res = await fetch(
                'http://localhost:3000/getManufacturadoXdenominacion/' + id
            )
            const resJson = await res.json()

            console.log("resJson ", resJson)
            this.ArticuloManufacturado = new Object({

                'tiempoEstimadoCocina': resJson.tiempoEstimadoCocina,
                'denominacion': resJson.denominacion,
                'precioVenta': resJson.precioVenta,
                'imagen': resJson.imagen,
                'activo': resJson.activo,
                'rubrogeneralid': resJson.rubrogeneralid,
            })

            this.DetalleArticuloManufacturado = (
                resJson.detallearticulomanufacturadoid
                //'cantidad': resJson.detallearticulomanufacturadoid.cantidad,
                //'unidadMedida': resJson.detallearticulomanufacturadoid.unidadMedida
            )
            this.cantidadInsumos = this.DetalleArticuloManufacturado.length
            for (let i = 0; i < this.cantidadInsumos; i++) {
                this.insumoSeleccionado.push(resJson.detallearticulomanufacturadoid[i].ArticuloInsumoid)
            }
            console.log('this.cantidadInsumos', this.cantidadInsumos),
                console.log('this.DetalleArticuloManufacturado', this.DetalleArticuloManufacturado),
                console.log('this.insumoSeleccionado', this.insumoSeleccionado)

        }
    },
    watch: {
        nuevoManufacturado: function () {
            this.$emit('nuevoManufacturado', this.nuevoManufacturado)
        }
    }
};
</script>