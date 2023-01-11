<template>
    <v-card v-if='currentUser.roles.includes("ROLE_ADMIN")' style="margin-top: 15px">

        <v-card-title>
            <v-row class="text-h4" justify="center">Pedidos</v-row>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            
        </v-card-title>
    </v-card>
</template>
<script>

import AuthService from "@/service/auth.service.js"
export default {

    components: {
       
    },
    mounted() {
        this.currentUser = AuthService.getCurrentUser()
        this.verificarUsuario(this.currentUser)
    },
    data() {
        return {
            currentUser: undefined,
            actualizarLista: false
        };
    },
    methods: {
        async getPedidos() {
            const res = await fetch(
                "http://localhost:3000/pedidos"
            );
            const resJson = await res.json();
            console.log(resJson);
            this.pedidosData = resJson;
        },
        async handleMessage(value) {
            this.actualizarLista = value
            if (this.actualizarLista) {
                this.getPedidos()
                this.actualizarLista = false
            }
        },
        async verificarUsuario(currentUser) {
            if (currentUser) {
                if (!currentUser.roles.includes("ROLE_ADMIN")) {
                    window.location.href = "/Home"
                }
            } else {
                window.location.href = "/Home"
            }
        }
    }
};
</script>
<style scoped>
.row {
    text-align: justify;
    align-items: center;
    /**verticalmente */
    display: flex;
    margin-left: 0 auto;
    padding-left: 15%;
    padding-right: 15%;
}

.col {
    justify-content: center;
    text-align: justify;
    margin-left: auto;
}
</style>