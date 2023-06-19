<template>
    <v-container>
        <v-row v-if="dlioElegido == ''" class="text-center justify-center">
            <v-col><b>Elegir Domicilio de Entrega</b></v-col>
            <v-col><v-btn small fab dark color="success" @click="dialog = true">
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn></v-col>
        </v-row>
        <v-row v-else class="text-center justify-center">
            <v-col><b>{{
                dlioElegido.calle +
                " " +
                dlioElegido.numero +
                " " +
                dlioElegido.localidad
            }}</b></v-col>
            <v-col><v-btn small outlined @click="dialog = true"> Cambiar </v-btn></v-col>
        </v-row>

        <v-dialog v-model="dialog" scrollable max-width="600px">
            <v-card>
                <v-card-title>Domicilio de entrega</v-card-title>
                <v-divider style="margin-bottom: 2px"></v-divider>
                <v-card-text style="max-height: 300px">
                    <v-radio-group v-model="dlioElegido" column v-if="domicilios.length > 0"> 
                        <v-card-subtitle>Elija un domicilio de su lista
                        para recibir el pedido:</v-card-subtitle>
                        
                        <v-radio v-for="(dlio, index) in domicilios" :key="index"
                            :label="dlio.barrio + ' ' + dlio.calle + ' - ' + dlio.numero + ' - ' + dlio.localidad"
                            :value="dlio" @change="dialog = false"></v-radio>
                    </v-radio-group>
                    <v-card-subtitle v-else>No tiene domicilios agregados</v-card-subtitle>
                    <v-row v-if="formDlio">
                        <formularioDomicilio @nuevoDomicilio="handleNuevoDlio"></formularioDomicilio>
                    </v-row>
                    <!-- <v-btn v-else small outlined @click="formDlio = true">Agregue Otro Domicilio</v-btn> -->
                    <v-row class="text-center justify-center" v-else> <v-col cols="4"><b>Agregue un nuevo Domicilio</b></v-col>
                        <v-col cols="4"> <v-btn small fab dark color="success" @click="formDlio = true">
                                <v-icon dark>mdi-plus</v-icon></v-btn>
                            </v-col>
                        </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                        Salir
                    </v-btn>

                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import formularioDomicilio from "@/components/FormularioDomicilio.vue";
export default {
    data() {
        return {
            dialog: false,
            dlioElegido: "",
            domicilios: [],
            userId: "",
            formDlio: false,
        };
    },
    components: { formularioDomicilio },
    mounted() {
        this.userId = JSON.parse(localStorage.getItem("user")).id;
        this.getDomiciliosxId(this.userId);
    },
    methods: {
        async getDomiciliosxId(id) {
            const res = await fetch(`http://localhost:3000/usuarioDlios/${id}`);
            const resJson = await res.json();
            this.domicilios = resJson;
        },
        async handleNuevoDlio(value) {
            console.log(value);
            if (value) {
                this.getDomiciliosxId(this.userId);
            }
            this.formDlio = false;
        },
    },
    watch: {
        dlioElegido: function () {
            this.$emit("domicilioElegido", this.dlioElegido._id);
        },
    },
};
</script>
