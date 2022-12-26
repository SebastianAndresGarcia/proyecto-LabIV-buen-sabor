<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <div v-if="(datoEmpleado)">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </div>
                <div v-else>
                    <v-btn color="primary" small dark class="mb-2" v-bind="attrs" v-on="on">
                        Nuevo Empleado
                    </v-btn>
                </div>

            </template>

            <v-card ref="form">
                <v-card-title v-if="datoEmpleado">
                    <span class="text-h5">Actualizar Datos Empleado</span>
                </v-card-title>
                <v-card-title v-else>
                    <span class="text-h5">Crear Empleado</span>
                </v-card-title>

                <form @submit.prevent="crearEmpleado">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="Nombre*" v-model="empleado.nombre" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="Apellido*" type="text" v-model="empleado.apellido"
                                    hint="example of helper text only on focus" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field type="text" label="Username*" v-model="empleado.username" required>
                                </v-text-field>
                            </v-col>
                            <v-col class="d-flex" cols="12" sm="6">
                                <v-select :items="items" label="Rol" item-value="name" item-text="name" v-model="empleado.roles.name"></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="email*" type="mail" v-model="empleado.email" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Teléfono*" v-model="empleado.telefono" type="Number" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Borrado*" v-model="empleado.borrado" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                    :return-value.sync="fechaNacimiento" transition="scale-transition" offset-y
                                    min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="empleado.fechaNacimiento" label="Fecha de Nacimiento"
                                            prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                            :rules="[v => !!v || 'Obligatorio']" required></v-text-field>
                                    </template>
                                    <v-date-picker v-model="empleado.fechaNacimiento" no-title scrollable required>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu = false">
                                            Salir
                                        </v-btn>
                                        <v-btn text color="primary" @click="$refs.menu.save(fechaNacimiento)">
                                            OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
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
            items: [],
            dialog: false,
            modal: false,
            menu: false,
            fechaNacimiento: null,
            menu2: false,
            nuevoEmpleado: false,
            empleado: {
                username: "",
                email: "",
                password: "",
                nombre: "",
                apellido: "",
                fechaNacimiento: null,
                telefono: null,
                borrado: false,
                roles:{name:''}
            },

        };
    },
    props: ["datoEmpleado"],

    mounted() {
        this.getRoles()
        console.log("datoEmpleado", this.datoEmpleado)
        if (this.datoEmpleado)
            this.empleado = this.datoEmpleado
            this.empleado.roles=this.datoEmpleado.roles[0]
        //this.getManufacturadoXdenominacion(this.idrubrogral[1]) 
    },
    methods: {

        cerrardialog() {
            this.dialog = false
            if(!this.datoEmpleado)
            this.empleado = new Object({
                username: "",
                email: "",
                password: "",
                nombre: "",
                apellido: "",
                fechaNacimiento: null,
                telefono: null,
                borrado: false,
                roles:{name:''}
            })
        },
        async crearEmpleado() { //también cumple la fción de actualizar un empleado
            this.nuevoEmpleado = false
            console.log("entró");

            if (!this.empleado._id) {
                let urlServer = "http://localhost:3000/api/auth/signup";
                let method = "POST";
                const respuesta = await fetch(urlServer, {
                    method: method,
                    body: JSON.stringify(this.empleado),
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
                    this.nuevoEmpleado = true
                } else {
                    this.respuestaError = resJson.message
                    console.log("mensaje del servidor: " + this.respuestaError)
                }
            } else {
                let urlServer = "http://localhost:3000/ActualizarUsuario";
                let method = "POST";
                const respuesta = await fetch(urlServer, {
                    method: method,
                    body: JSON.stringify(this.empleado),
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
                    this.nuevoEmpleado = true
                } else {
                    this.respuestaError = resJson.message
                    console.log("mensaje del servidor: " + this.respuestaError)
                }
            }

            this.empleado = new Object({
                username: "",
                email: "",
                password: "",
                nombre: "",
                apellido: "",
                fechaNacimiento: null,
                telefono: null,
                borrado: false,
                roles:{name:''}
            })

        },

        async getRoles() {
            const res = await fetch(
                'http://localhost:3000/Roles'
            )
            const resJson = await res.json()
            this.items = resJson
            console.log("resJson ", resJson)
        }
    },
    watch: {
        nuevoEmpleado: function () {
            this.$emit('nuevoEmpleado', this.nuevoEmpleado)
        }
    }
};
</script>