<template>
    <v-container>
        <v-card v-if="miscompras.length > 0" style="margin-top: 10px; justify:center">
            <v-simple-table class="tabla">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                                <b>Fecha</b>
                            </th>
                            <th class="text-left">
                                <b>Pedido N°</b>
                            </th>
                            <th class="text-left">
                                <b>Estado</b>
                            </th>
                            <th class="text-left">
                                <b>Total</b>
                            </th>
                            <th class="text-left">
                                <b>Ver Detalles</b>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(compra, index) in miscompras" style="padding-top: 5px;">

                            <td>
                                {{ compra.fecha }}
                            </td>
                            <td>
                                {{ compra.numero }}
                            </td>
                            <td>
                                {{ compra.estado }}
                            </td>
                            <td>
                                {{ compra.total }}
                            </td>
                            <td>
                                <v-btn small>
                                    VER DETALLE
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card>
    </v-container>
</template>
<script>

export default {
    data() {
        return {
            miscompras: []
        }
    },
    components: {
        
    },
    mounted() {
        console.log(document.URL)
        this.comprasUsuario((JSON.parse(localStorage.getItem('user'))).id)
    },

    methods: {
        async comprasUsuario(id) {
            const res = await fetch(
                `http://localhost:3000/pedidosxid/${id}/`
            );
            const resJson = await res.json();
            console.log(resJson);
            this.miscompras = resJson
        }
        
    }
}    
</script>

<style>
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