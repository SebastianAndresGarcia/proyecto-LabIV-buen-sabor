<template>
    <v-card elevation="4">
        <v-card-title>GESTION DE ARTICULOS</v-card-title>

        <v-card-text>
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header style="height: 100px; background-color:aqua">
                        <template v-slot:default="{ open }">
                            <v-row no-gutters>
                                <v-col cols="4">
                                    Articulo Manufacturado
                                </v-col>

                            </v-row>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <!--<v-select v-for="manufacturado in manufacturadosData" :key="manufacturado.id" :items="rubros" label="Outlined style" outlined></v-select>-->
                        <v-select v-model="rubros" label="Outlined style" outlined id="rubro" v-for="rubro in rubros" :items="rubros"></v-select>
                        <articulomanufacturado-item></articulomanufacturado-item>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header v-slot="{ open }" style="height: 100px; background-color:greenyellow">
                        <v-row no-gutters>
                            <v-col cols="4">
                                Articulo Insumo
                            </v-col>

                        </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-row no-gutters justify="center">
                            <articuloinsumo-item></articuloinsumo-item>
                        </v-row>

                    </v-expansion-panel-content>
                </v-expansion-panel>


            </v-expansion-panels>
        </v-card-text>
    </v-card>

</template>
<script >
import articuloManufacturado from "@/components/ArticuloManufacturado.vue";
import articuloInsumo from "@/components/ArticuloInsumo.vue";
export default {
    name: "abm-articulos",
    components: {
        "articulomanufacturado-item": articuloManufacturado,
        "articuloinsumo-item": articuloInsumo
    },
    data(){
        return{
            rubros: [],
            rubroSeleccionado: ""
        }
    },
    mounted() {
        this.getRubrosGeneral()
    },

    methods: {
        async getRubrosGeneral() {
            const res = await fetch(
                "http://localhost:3000/rubrosgeneral"
            );
            const resJson = await res.json();
            
            this.rubros = resJson;
            console.log("RUBROS ",this.rubros);
        },

      /*  async deleteinstrumento(idinstrumento) {

            let urlServer = `http://localhost:3001/eliminarInstrumento/${idinstrumento}/`;


            await fetch(urlServer, {
                "method": 'DELETE',

                "headers": {
                    "Content-type": 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                mode: 'cors'

            });
            window.location.reload();
        },*/
        /* async editarinstrumento(idinstrumento){
            href('/Formulario/' + instrumento.id),
         */
    }
};
</script>
<style scoped>
.tabla {
    padding: 5%;
}

a {
    text-decoration: none;
}

.form-inline {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
}

.form-inline label {
    margin: 5px 10px 5px 0;
}

/* Style the input fields */
.form-inline input {
    vertical-align: middle;
    margin: 5px 10px 5px 0;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
}

/* Style the submit button */
.form-inline button {
    padding: 10px 20px;
    background-color: dodgerblue;
    border: 1px solid #ddd;
    color: white;
}

.form-inline button:hover {
    background-color: royalblue;
}

/* Add responsiveness - display the form controls vertically instead of horizontally on screens that are less than 800px wide */
@media (max-width: 800px) {
    .form-inline input {
        margin: 10px 0;
    }

    .form-inline {
        flex-direction: column;
        align-items: stretch;
    }
}
</style>