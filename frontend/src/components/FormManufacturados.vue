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
                                <v-text-field label="Denominacion*" v-model="artmanufacturado.denominacion" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="Tiempo de Cocina*" v-model="artmanufacturado.tiempoEstimadoCocina"
                                    hint="example of helper text only on focus" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Precio de Venta*" v-model="artmanufacturado.precioVenta" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Imagen*" v-model="artmanufacturado.imagen" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Activo?*" v-model="artmanufacturado.activo" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-row v-for="ins in cantidadInsumos" :key="ins.id">
                                    <v-col>
                                        <v-select label="Seleccione un insumo" outlined
                                            v-model="insumoSeleccionado" :items="insumosData" item-value="_id"
                                            item-text="denominacion" @change="onchange(insumoSeleccionado)">

                                        </v-select>
                                    </v-col>
                                    <v-col>
                                        <v-text-field label="Cantidad" number 
                                            ></v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-text-field label="Unidad Medida" 
                                            >
                                        </v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-btn @click="eliminarInsumo(ins)">Eliminar</v-btn>
                                    </v-col>
                                </v-row>
                                <v-btn @click="crearSelectInsumo">Agregar Insumo</v-btn>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field hidden v-model="artmanufacturado.rubrogeneralid" required>
                                </v-text-field>
                            </v-col>

                        </v-row>
                        <small>*Todos los campos son obligatorios</small>
                    </v-card-text>
                    <v-divider class="mt-2"></v-divider>

                    <v-card-actions>

                        <v-btn text color="blue darken-1" @click="dialog = false">
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
            artmanufacturado: {
                tiempoEstimadoCocina: null,
                denominacion: "",
                precioVenta: null,
                imagen: "",
                activo: null,
                rubrogeneralid: ""
            },
            detalleartmanufacturado: [{
                cantidad: 0,
                unidadMedida: "",
                articuloInsumoid: ""
            }],


        };
    },
    props: ["idrubrogral"],
    beforeUpdate() {
        //console.log("datos select ", this.insumoSeleccionado)
    },
    mounted() {
        console.log("idrubrogral props " + this.idrubrogral)
        this.getInsumos(),
            this.artmanufacturado.rubrogeneralid = this.idrubrogral
    },
    methods: {
        crearSelectInsumo() {
            this.cantidadInsumos = this.cantidadInsumos + 1;
            console.log("cantidad de select: " + this.cantidadInsumos);
        },
        eliminarInsumo(i) {
            console.log("indice " + i)
            console.log("this.insumoSeleccionado.length " + this.insumoSeleccionado.length)
            this.cantidadInsumos = this.cantidadInsumos - 1;
            this.insumoSeleccionado.splice(i - 1, 1);
            console.log("insumoSeleccionado ", this.insumoSeleccionado)

        },
        async crearManufacturado() {
            console.log("entró");
            console.log(this.artmanufacturado);
            let urlServer = "http://localhost:3000/crearArticuloManufacturado";
            let method = "POST";

            const respuesta = await fetch(urlServer, {
                method: method,
                body: JSON.stringify(this.artmanufacturado),
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
            } else {

                this.respuestaError = resJson.message
                console.log("mensaje del servidor: " + this.respuestaError)
            }
            this.artmanufacturado = []
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
          /*  console.log("insumosData.length " + insumosData.length)
            for (let i = 0; i < insumosData.length; i++) {
                console.log(insumosData[i])
                if (id == insumosData[i]._id) {
                    console.log("entró")
                    this.detalleartmanufacturado.push(insumosData[i].unidadMedida, insumosData[i]._id, 0)
                    //this.detalleartmanufacturado[i].unidadMedida = insumosData[i].unidadMedida
                    console.log(this.detalleartmanufacturado[i])
                    id=[]
                    break
                }
            } */
        }
    },
};
</script>