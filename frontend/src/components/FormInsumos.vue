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
                                <v-text-field label="Denominacion*" v-model="insumo.denominacion" required>
                                </v-text-field>
                            </v-col>
                           <v-col cols="12" sm="6" md="6">
                                <v-text-field label="precioCompra*" type="number"
                                    v-model="insumo.precioCompra"
                                    hint="example of helper text only on focus" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field type="number" label="Precio de Venta*"
                                    v-model="insumo.precioVenta" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="stockActual*" type="number" v-model="insumo.stockActual" required placeholder="1.0" step="0.01" min="0">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="stockMinimo*" type="number" v-model="insumo.stockMinimo" required placeholder="1.0" step="0.01" min="0">
                                </v-text-field>
                            </v-col>
                            
                            <v-col cols="12">
                                <v-text-field label="esInsumo?" v-model="insumo.esInsumo" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="unidadMedida" v-model="insumo.unidadMedida" required>
                                </v-text-field>
                            </v-col>
                            <v-col v-if="idrubroarticulo">
                                <v-select label="Seleccione un Rubro" outlined v-model="insumo.RubroArticuloid"
                                    :items="rubros" item-value="_id" item-text="denominacion">
                                    <template v-slot:prepend-item>
                                        
                                        <v-divider class="mt-2"></v-divider>
                                    </template>
                                </v-select>
                                {{ insumo.RubroArticuloid }}
                            </v-col>
                            <v-col v-else cols="12">
                                <v-text-field disabled label="rubroArticuloid" v-model="insumo.RubroArticuloid" required>
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

    data() {
        return {
            dialog: false,
            modal: false,
            insumosData: [],
            nuevoInsumo: false,
            rubros: [],
            
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
    props: { idrubroarticulo: Array, idinsumo: String },
    //props: ["manufacturadoid"],
    beforeUpdate() {
        //console.log("datos select ", this.insumoSeleccionado)
        //this.ArticuloManufacturado.rubrogeneralid = this.idrubrogral
        console.log("idrubroarticulo beforeUpdate ", this.idrubroarticulo)
        console.log("idinsumo beforeUpdate ", this.idinsumo)

    },
    mounted() {
        console.log("idrubroarticulo props ", this.idrubroarticulo)
        console.log("idinsumo props " + this.idinsumo)
        this.insumo.RubroArticuloid=this.idrubroarticulo
        this.getRubrosArticulos()
        //this.getManufacturadoXdenominacion(this.idrubrogral[1]) 
    },
    methods: {

        cerrardialog() {
            this.dialog = false
            this.insumo = new Object({
                'denominacion': "",
                'precioCompra': null,
                'precioVenta': null,
                'stockActual': null,
                'stockMinimo': null,
                'unidadMedida': "",
                'esInsumo': false,
                'RubroArticuloid': this.idrubroarticulo
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
                'RubroArticuloid': this.idrubroarticulo
            })

        },

        async getInsumoXdenominacion(id) {
            const res = await fetch(
                'http://localhost:3000/ArticuloInsumo/' + id
            )
            const resJson = await res.json()
            this.insumo=resJson
            console.log("resJson ", resJson)
            

        },
        async getRubrosArticulos() {
            const res = await fetch(
                "http://localhost:3000/rubros"
            );
            const resJson = await res.json();

            this.rubros = resJson;
            console.log("InsumosArticulos ", this.rubros);
            

        },
    },
    watch: {
        nuevoInsumo: function () {
            this.$emit('nuevoInsumo', this.nuevoInsumo)
        }
    }
};
</script>