<template>
    <v-dialog v-model="dialog" persistent max-width="20%" style="margin-top: 0; margin-bottom: 0;">
        <template>
            <v-card class="mx-auto my-12" max-width="100%" height="100%" style="margin-top: 0; margin-bottom: 0;">
                <template slot="progress">
                    <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                </template>
                <div v-if="estado.estadoCompra">
                    <v-img height="50%" src="/images/successfull.jpg"></v-img>
                    <v-card-title>Compra Exitosa</v-card-title>
                    <v-card-subtitle>Vea el estado de su pedido en 'Mis Compras'</v-card-subtitle>
                    <v-card-actions>
                        <v-btn rounded color="success" href="http://localhost:8080/MisCompras">
                            Ir a Ver Mi Compra
                        </v-btn>
                    </v-card-actions>
                </div>
                <div v-else="!estado.estadoCompra">
                    <v-img height="250" src="/images/failed.jpg"></v-img>
                    <v-card-title>Algo salió mal, intente mas tarde</v-card-title>
                    <v-card-actions>
                        <v-btn color="deep-purple lighten-2" rounded @click="dialog = false">
                            Cerrar
                        </v-btn>
                    </v-card-actions>
                </div>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
import AuthService from '@/service/auth.service.js'
export default {
    data() {
        return {
            dialog: false,
            usuario: {
                username: "",
                password: "",
            },
            respuestaError: ''
        }
    },
    mounted() {
        // console.log("estado props "+this.estado)
        // if(this.estado){
        // this.dialog=this.estado
        // console.log(this.estado)}
    },
    beforeUpdate() {
        console.log("estado props ", this.estado)
        if (this.estado) {
            this.dialog = this.estado.dialog
            //console.log(this.estado)
        }
    },
    props: ["estado"],
    methods: {
        async ingresar() {
            console.log("entró a loguearse");
            AuthService.login(this.usuario.username, this.usuario.password).then(
                () => {
                    //navigate("/Home");
                    window.location.href = "/Home"
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.respuestaError = (resMessage);
                }
            );
        },
    }
};
</script>