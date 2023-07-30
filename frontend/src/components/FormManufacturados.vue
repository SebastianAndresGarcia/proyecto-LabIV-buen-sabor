<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="700px">
            <template v-slot:activator="{ on, attrs }">
                <div v-if="(idmanufacturado == null)">
                    <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                        Crear Manufacturado
                    </v-btn>
                </div>
                <div v-else>
                    <v-btn icon v-bind="attrs" v-on="on" @click="getManufacturadoXdenominacion(idmanufacturado)">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </div>
            </template>

            <v-card ref="form">
                <v-card-title>
                    <span class="text-h5">Crear Articulo Manufacturado</span>
                </v-card-title>

                <form @submit.prevent="crearManufacturado">
                    <v-card-text>
                        <v-row>

                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="Denominacion*" v-model="ArticuloManufacturado.denominacion" required>
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
                                <v-row> <v-text-field class="ml-4 " label="seleccione imagen local o pegue una url web"
                                        v-model="ArticuloManufacturado.imagen" required>
                                    </v-text-field>
                                    <v-btn class="mr-4 mt-2" color="primary"
                                        @click="openFilePicker">Adjuntar</v-btn></v-row>
                            </v-col>
                            <v-col cols="12" >
                                <v-textarea label="Descripcion" outlined no-resize rows="2"
                                   v-model="ArticuloManufacturado.descripcion"></v-textarea>
                            </v-col>
                            <input type="file" ref="fileInput" style="display: none" @change="handleFileChange">

                            <v-col cols="12">
                                <v-select label="¿Está Activo?" outlined item-text="state" item-value="value"
                                    v-model="ArticuloManufacturado.activo" :items="items">
                                </v-select>
                            </v-col>
                            <v-col>
                                <v-container>
                                    <v-row style=" justify-content: center">
                                        <v-col cols="3">
                                            <v-text-field solo flat readonly value="¿ Es Promoción ?"></v-text-field>
                                        </v-col>
                                        <v-col cols="1">
                                            <v-checkbox v-model="enabled" @click="conDescuento()" hide-details></v-checkbox>
                                        </v-col>

                                        <v-col cols="3">
                                            <div v-if="enabled">
                                                <v-text-field outlined type="number" :disabled="!enabled"
                                                    label="Descuento %" required
                                                    v-model="ArticuloManufacturado.descuento"></v-text-field>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-col>
                            <v-col cols="12">
                                <v-row v-for="ins in cantidadInsumos" :key="ins.id">
                                    <v-col cols="4">
                                        <v-select label="Seleccione un insumo" outlined
                                            v-model="insumoSeleccionado[ins - 1]" :items="insumosData" item-value="_id"
                                            item-text="denominacion" @change="onchange(insumoSeleccionado)">

                                        </v-select>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-text-field label="Cantidad" type="number" placeholder="1.0" step="0.01" min="0"
                                            v-model="DetalleArticuloManufacturado[ins - 1].cantidad"></v-text-field>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-text-field label="Unidad Medida" readonly solo flat
                                            v-model="DetalleArticuloManufacturado[ins - 1].unidadMedida">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-btn @click="eliminarInsumo(ins)">Eliminar</v-btn>
                                    </v-col>
                                </v-row>
                                <v-btn @click="crearSelectInsumo">Agregar Insumo</v-btn>
                            </v-col>
                            <v-col v-if="idrubrogral">
                                <v-select label="Seleccione un Rubro" outlined
                                    v-model="ArticuloManufacturado.rubrogeneralid" :items="rubros" item-value="_id"
                                    item-text="denominacion">
                                    <template v-slot:prepend-item>

                                        <v-divider class="mt-2"></v-divider>
                                    </template>
                                </v-select>
                                {{ ArticuloManufacturado.rubrogeneralid }}
                            </v-col>
                            <v-col cols="12" v-else>
                                <v-text-field disabled label="rubrogeneralid" v-model="ArticuloManufacturado.rubrogeneralid"
                                    required>
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
import AuthService from "@/service/auth.service.js"
import { eventBus } from '@/main';
export default {
    name: "register-item",
    data() {
        return {
            items: [
                { state: 'NO', value: false },
                { state: 'SI', value: true },
            ],
            rubros: [],
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
                descripcion: '',
                precioVenta: null,
                imagen: "",
                activo: null,
                rubrogeneralid: "",
                descuento: null
            },
            DetalleArticuloManufacturado: [],
            enabled: false,
            currentUser: undefined,
            imagenRutaLocal: null
        };
    },
    props: { idrubrogral: Array, idmanufacturado: String },
    //props: ["manufacturadoid"],
    beforeUpdate() {
 
    },
    mounted() {
        this.currentUser = AuthService.getCurrentUser()
 
        this.getInsumos(),
            this.ArticuloManufacturado.rubrogeneralid = this.idrubrogral
        
        this.getRubrosGeneral()
        //this.getManufacturadoXdenominacion(this.idrubrogral[1]) 
    },
    methods: {
        openFilePicker() {
            this.$refs.fileInput.click();
        },
        handleFileChange(event) {
            const fileInput = this.$refs.fileInput;
            if (fileInput && fileInput.files && fileInput.files.length > 0) {
                const filename = fileInput.files[0].name;
                this.ArticuloManufacturado.imagen = "/images/" + filename;
                // console.log(this.imagenRutaLocal)
            }
        },
        crearSelectInsumo() {
            this.DetalleArticuloManufacturado.push({ 'unidadMedida': "", 'articuloInsumoid': "", 'cantidad': null })
            this.cantidadInsumos = this.cantidadInsumos + 1;
            console.log("cantidad de select: " + this.cantidadInsumos);
        },
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
                        'Access-Control-Allow-Origin': '*',
                        'x-access-token': this.currentUser.accessToken
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
                'descripcion': '',
                'precioVenta': null,
                'imagen': "",
                'activo': null, 'rubrogeneralid': this.idrubrogral,
                'descuento': null
            })
        },
        async crearManufacturado() { //también cumple la función de actualizar según el props activo
            this.nuevoManufacturado = false
            console.log("entró");

            console.log(this.ArticuloManufacturado);
            if (this.idrubrogral) {
                let urlServer = "http://localhost:3000/crearArticuloManufacturado";
                let method = "POST";
                const respuesta = await fetch(urlServer, {
                    method: method,
                    body: JSON.stringify({ 'ArticuloManufacturado': this.ArticuloManufacturado, 'DetalleArticuloManufacturado': this.DetalleArticuloManufacturado }),
                    headers: {
                        "Content-type": "application/json",
                        'x-access-token': this.currentUser.accessToken
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
            } else {
                let urlServer = "http://localhost:3000/actualizarArticuloManufacturado/" + this.idmanufacturado;
                let method = "POST";
                const respuesta = await fetch(urlServer, {
                    method: method,
                    body: JSON.stringify({ 'ArticuloManufacturado': this.ArticuloManufacturado, 'DetalleArticuloManufacturado': this.DetalleArticuloManufacturado }),
                    headers: {
                        "Content-type": "application/json",
                        'x-access-token': this.currentUser.accessToken
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
            }
            this.cantidadInsumos = null
            this.insumoSeleccionado = []
            this.DetalleArticuloManufacturado = []
            this.ArticuloManufacturado = new Object({
                'tiempoEstimadoCocina': null,
                'denominacion': "",
                'descripcion': "",
                'precioVenta': null,
                'imagen': "",
                'activo': null,
                'rubrogeneralid': this.idrubrogral,
                'descuento': null
            })

        },
        async getRubrosGeneral() {
            const res = await fetch(
                "http://localhost:3000/rubrosgeneral"
            );
            const resJson = await res.json();

            this.rubros = resJson;
            // console.log("RUBROS ", this.rubros);
            // console.log("RUBROS tamaño", this.rubros.length);
        },
        async getInsumos() {
            console.log()
            const res = await fetch(
                "http://localhost:3000/articulosinsumos/true"
            );
            const resJson = await res.json();
            // console.log("insumosData", resJson);
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
                    // console.log("entró")
                    this.DetalleArticuloManufacturado[this.DetalleArticuloManufacturado.length - 1].unidadMedida = this.insumosData[i].unidadMedida
                    this.DetalleArticuloManufacturado[this.DetalleArticuloManufacturado.length - 1].articuloInsumoid = this.insumosData[i]._id
                    // console.log(this.DetalleArticuloManufacturado)
                    break
                }
            }
        },
        async getManufacturadoXdenominacion(id) {
            const res = await fetch(
                'http://localhost:3000/getManufacturadoXdenominacion/' + id
            )
            const resJson = await res.json()

            // console.log("resJson ", resJson)
            this.ArticuloManufacturado = new Object({

                'tiempoEstimadoCocina': resJson.tiempoEstimadoCocina,
                'denominacion': resJson.denominacion,
                'descripcion': resJson.descripcion,
                'precioVenta': resJson.precioVenta,
                'imagen': resJson.imagen,
                'activo': resJson.activo,
                'rubrogeneralid': resJson.rubrogeneralid,
                'descuento': resJson.descuento
            })
            if (this.ArticuloManufacturado.descuento > 0) {
                this.enabled = true
            }
            this.DetalleArticuloManufacturado = (
                resJson.detallearticulomanufacturadoid
                //'cantidad': resJson.detallearticulomanufacturadoid.cantidad,
                //'unidadMedida': resJson.detallearticulomanufacturadoid.unidadMedida
            )
            this.cantidadInsumos = this.DetalleArticuloManufacturado.length
            for (let i = 0; i < this.cantidadInsumos; i++) {
                this.insumoSeleccionado.push(resJson.detallearticulomanufacturadoid[i].ArticuloInsumoid)
            }
            // console.log('this.cantidadInsumos', this.cantidadInsumos),
            //     console.log('this.DetalleArticuloManufacturado', this.DetalleArticuloManufacturado),
            //     console.log('this.insumoSeleccionado', this.insumoSeleccionado)
        },
        async conDescuento() {
            if (!this.enabled) {
                this.ArticuloManufacturado.descuento = 0
            }
        }
    },
    created() {
        eventBus.$on("nuevoRubro", async (data) => {
            if (data == true) {
                this.getRubrosGeneral();
            }
        });
    },
    watch: {
        nuevoManufacturado: function () {
            this.$emit('nuevoManufacturado', this.nuevoManufacturado)
        }
    }
};
</script>