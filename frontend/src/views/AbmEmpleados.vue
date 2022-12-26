<template>
    <v-card>
        <v-card-title>
            Empleados
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <!--<v-btn color="primary" small dark class="mb-2" :href="'/Formulario/0'">
                Nuevo Empleado
            </v-btn>-->
            <Form-Empleado @nuevoEmpleado="handleMessage"> </Form-Empleado>
        </v-card-title>

       <!-- <v-row class="row" align="center" justify="center">
            <form class="row">
                <v-row class="row">
                    <v-col class="col" cols="6" sm="3" md="3">
                        <v-text-field type="number" placeholder="ingresevalor" label="preciomin" v-model="preciomin"
                            required></v-text-field>
                    </v-col>
                    <v-col class="col" cols="6" sm="3" md="3">
                        <v-text-field type="number" placeholder="ingresevalor" label="preciomax" v-model="preciomax"
                            required></v-text-field>
                    </v-col>
                    <v-col class="col" cols="6" md="2">
                        <v-btn dark x-small @click="filtrarporprecio(preciomin, preciomax)">
                            Filtrar
                        </v-btn><br />
                        <v-btn dark x-small :href="'./Grillaempleados'">
                            Limpiar
                        </v-btn>
                    </v-col>
                </v-row>
            </form>
        </v-row>-->
        <empleado-item :empleados="empleadosData"></empleado-item>
        
    </v-card>
</template>
<script >
import grillaEmpleados from "@/components/GrillaEmpleados.vue"
import FormEmpleado from "@/components/FormEmpleados.vue"
export default {

    components: {
        'empleado-item': grillaEmpleados,
        'Form-Empleado': FormEmpleado
    },
    mounted() {
        this.getEmpleados()
    },
    data() {
        return {
            empleadosData: [
                /**
    _id
    username
    email
    password
    nombre
    apellido
    fechaNacimiento
    telefono
    borrado
    roles */
            ],
            preciomax: undefined,
            preciomin: undefined
        };
    },
    methods: {
        async getEmpleados() {
            const res = await fetch(
                "http://localhost:3000/empleados"
            );
            const resJson = await res.json();
            console.log(resJson);
            this.empleadosData = resJson;
        },
        async handleMessage(value){
            this.nuevoEmp=value
            if (this.nuevoEmp) {
                this.getEmpleados()
                this.nuevoEmp=false
            }
        }
        /*   async filtrarporprecio(preciomin, preciomax) {
   
               const res = await fetch(
                   "http://localhost:3000/empleados"
               );
               console.log("preciomin" + preciomin)
               console.log("preciomax" + Number(preciomax))
               //this.empleadosData = resJson;
               //if (Number(preciomax) != null && Number(preciomax) != NaN && Number(preciomax) != 0) {
               //this.empleadosData = resJson;
               if (Number(preciomax) > 0 && Number(preciomin) > 0) {
                   const resJson = await res.json();
                   console.log("funcion filtrar ", resJson);
                   this.empleadosData.splice(0, this.empleadosData.length);
                   for (let i of resJson) {
                       if (Number(preciomin) <= Number(i.precio) && Number(preciomax) >= Number(i.precio)) {
                           this.empleadosData.push(i)
                       }
                   }
               } else //if (Number(preciomax) == undefined || Number(preciomax) == 0 || Number(preciomax) == null || this.empleadosData.length == 0) {
                   window.location.reload();
           }, */

       
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