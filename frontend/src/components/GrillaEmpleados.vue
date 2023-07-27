<template>
  <v-card v-if="empleados.length > 0" style="margin-top: 10px; justify: center">
    <v-simple-table class="tabla">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              <b>Nombre</b>
            </th>
            <th class="text-left">
              <b>Apellido</b>
            </th>
            <th class="text-left">
              <b>Usuario</b>
            </th>
            <th class="text-left">
              <b>Mail</b>
            </th>
            <th class="text-left">
              <b>Rol</b>
            </th>
            <th class="text-left">
              <b>Borrado</b>
            </th>
            <th class="text-center">
              <b>Actualizar</b>
            </th>

            <th class="text-left">
              <b>Dar de Baja</b>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(empleado, index) in empleados" :key="index" style="padding-top: 5px">
            <td>
              {{ empleado.nombre }}
            </td>
            <td>
              {{ empleado.apellido }}
            </td>
            <td>
              {{ empleado.username }}
            </td>
            <td>
              {{ empleado.email }}
            </td>
            <td>
              {{ empleado.roles[0].name }}
            </td>
            <td>
              {{ empleado.borrado }}
            </td>
            <td>
              <Form-Empleado
                :datoEmpleado="empleado"
                @nuevoEmpleado="handleMessage"
              ></Form-Empleado>
            </td>
            <td>
              <v-btn icon small @click="bajaEmpleado(empleado._id)">
                <v-icon small> mdi-delete </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import AuthService from "@/service/auth.service.js";
import FormEmpleado from "@/components/FormEmpleados.vue";
export default {
  data() {
    return {
      empleado: {},
      actualizadoEmpleado: false,
    };
  },
  components: {
    "Form-Empleado": FormEmpleado,
  },
  beforeMount() {
    this.currentUser = AuthService.getCurrentUser();
    console.log(this.empleados)
  },
  props: ["empleados"],
  methods: {
    async bajaEmpleado(idempleado) {
      let urlServer = `http://localhost:3000/bajaEmpleado/${idempleado}/`;
      await fetch(urlServer, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-access-token": this.currentUser.accessToken,
        },
        mode: "cors",
      });
       this.actualizadoEmpleado = true;
    },
    async handleMessage(value) {
      this.actualizadoEmpleado = value;
    },
  },
  watch: {
    actualizadoEmpleado: function () {
      this.$emit("actualizadoEmpleado", this.actualizadoEmpleado);
      this.actualizadoEmpleado = false;
    },
  },
};
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