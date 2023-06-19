<template>
    <v-container>
        <v-row v-if="dlioElegido == ''" class="text-center justify-center" align="center">
            <v-col cols="10" sm="8" md="8"><b>Elegir un Domicilio de Entrega</b></v-col>
            <v-col cols="10" sm="4" md="4"><v-btn small fab dark color="success" @click="dialog = true">
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn></v-col>
        </v-row>
        <v-row v-else class="text-center justify-center">
            <v-col cols="10" sm="8" md="8"><b>{{
                dlioElegido.calle +
                " " +
                dlioElegido.numero +
                " " +
                dlioElegido.localidad
            }}</b></v-col>
            <v-col cols="10" sm="4" md="4"><v-btn small outlined @click="dialog = true"> Cambiar </v-btn></v-col>
        </v-row>

        <v-dialog v-model="dialog" scrollable max-width="50%">
            <v-card>

                <v-toolbar dark color="black">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon dark>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title> Domicilio de entrega</v-toolbar-title>
                    <v-spacer></v-spacer>

                </v-toolbar>

                <v-divider style="margin-bottom: 2px"></v-divider>
                <v-card-text>
                    <v-card style=" margin-bottom: 5px;">
                        <v-radio-group v-model="dlioElegido" column v-if="domicilios.length > 0">
                            <!-- <v-card-subtitle>Elija un domicilio para recibir su pedido:</v-card-subtitle> -->
                            <v-radio v-for="(dlio, index) in domicilios" :key="index"
                                :label="dlio.barrio + ' ' + dlio.calle + ' - ' + dlio.numero + ' - ' + dlio.localidad"
                                :value="dlio" @change="dialog = false"></v-radio>
                        </v-radio-group>

                        <v-card-subtitle v-else>No tiene domicilios agregados</v-card-subtitle>
                    </v-card>
                    <v-row v-if="formDlio">
                        <formularioDomicilio @nuevoDomicilio="handleNuevoDlio"></formularioDomicilio>
                    </v-row>
                    <!-- <v-btn v-else small outlined @click="formDlio = true">Agregue Otro Domicilio</v-btn> -->
                    <v-row class="text-left justify-left" align="center" v-else> <v-col cols="auto"><b>Agregue un nuevo
                                Domicilio</b></v-col>
                        <v-col cols="auto"> <v-btn small fab dark color="success" @click="formDlio = true">
                                <v-icon dark>mdi-plus</v-icon></v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>


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
