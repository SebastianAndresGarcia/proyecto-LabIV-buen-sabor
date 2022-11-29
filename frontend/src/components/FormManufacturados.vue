<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> Crear Manufacturado </v-btn>
            </template>
            <v-card ref="form">
                <v-card-title>
                    <span class="text-h5">Crear Articulo Manufacturado</span>
                </v-card-title>

                <form @submit.prevent="crearManufacturado">
                    <v-card-text>
                        <v-row>

                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="Denominacion*" v-model="ArticuloManufacturado.denominacion"
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
        return {
            dialog: false,
            cantidadInsumos: null,
            aux: [],
            modal: false,
            insumosData: [],
            insumoSeleccionado: [],
            nuevoManufacturado: false,
            ArticuloManufacturado: {
                tiempoEstimadoCocina: null,
                denominacion: "",
                precioVenta: null,
                imagen: "",
                activo: null,
                rubrogeneralid: ""
            },
            DetalleArticuloManufacturado: [],

        };
    },
    props: ["idrubrogral"],
    beforeUpdate() {
        //console.log("datos select ", this.insumoSeleccionado)
        this.ArticuloManufacturado.rubrogeneralid = this.idrubrogral
    },
    mounted() {
        console.log("idrubrogral props " + this.idrubrogral)
        this.getInsumos(),
        this.ArticuloManufacturado.rubrogeneralid = this.idrubrogral
    },
    methods: {
        crearSelectInsumo() {
            this.DetalleArticuloManufacturado.push({ 'unidadMedida': "", 'articuloInsumoid': "", 'cantidad': null })
            this.cantidadInsumos = this.cantidadInsumos + 1;
            console.log("cantidad de select: " + this.cantidadInsumos);
        },
        eliminarInsumo(i) {
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
            this.ArticuloManufacturado=null
        },
        async crearManufacturado() {
            this.nuevoManufacturado = false
            console.log("entró");
            console.log(this.ArticuloManufacturado);
            let urlServer = "http://localhost:3000/crearArticuloManufacturado";
            let method = "POST";

            const respuesta = await fetch(urlServer, {
                method: method,
                body: JSON.stringify({ 'ArticuloManufacturado': this.ArticuloManufacturado, 'DetalleArticuloManufacturado': this.DetalleArticuloManufacturado }),
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
                this.nuevoManufacturado = true
            } else {

                this.respuestaError = resJson.message
                console.log("mensaje del servidor: " + this.respuestaError)
            }
            
            this.cantidadInsumos = null
            this.insumoSeleccionado = []
            this.DetalleArticuloManufacturado = []
        },
        async getInsumos() {
            console.log()
            const res = await fetch(
                //estoy sería para que busque por rubro pero no puedo hacer busquedas y modificaciones en el json anidado "http://localhost:3000/ArticulosInsumosxrubro/"+parametro
                "http://localhost:3000/articulosinsumos"
            );
            const resJson = await res.json();
            console.log("insumosData", resJson);
            this.insumosData = resJson;
        },
        onchange(id) {
            console.log("enviado desde el select " + id)
            const indice = id[id.length - 1]
            console.log("insumosData: ", this.insumosData)
            console.log("insumosData.length " + this.insumosData.length)
            for (let i = 0; i < this.insumosData.length; i++) {
                console.log(this.insumosData[i])
                if (indice == this.insumosData[i]._id) {
                    console.log("entró")
                    //this.DetalleArticuloManufacturado.push({'unidadMedida': this.insumosData[i].unidadMedida, 'articuloInsumoid': this.insumosData[i]._id})
                    this.DetalleArticuloManufacturado[this.DetalleArticuloManufacturado.length - 1].unidadMedida = this.insumosData[i].unidadMedida
                    this.DetalleArticuloManufacturado[this.DetalleArticuloManufacturado.length - 1].articuloInsumoid = this.insumosData[i]._id
                    console.log(this.DetalleArticuloManufacturado)

                    break
                }
            }
        }
    },
    watch: {
        nuevoManufacturado: function () {
            this.$emit('nuevoManufacturado', this.nuevoManufacturado)
        }
    }
};
</script>