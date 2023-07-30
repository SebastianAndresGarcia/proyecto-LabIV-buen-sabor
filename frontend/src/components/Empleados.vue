<template>
  <v-card
    style="margin-top: 15px"
  >
    <v-card-title>
      <v-row class="text-h4" justify="center">Listado de empleados</v-row>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <Form-Empleado @nuevoEmpleado="handleMessage"> </Form-Empleado>
    </v-card-title>
    <empleado-item
      :empleados="empleadosData"
      @actualizadoEmpleado="handleMessage"
    ></empleado-item>
  </v-card>
</template>
<script >
import grillaEmpleados from "@/components/GrillaEmpleados.vue";
import FormEmpleado from "@/components/FormEmpleados.vue";
import AuthService from "@/service/auth.service.js";
export default {
  components: {
    "empleado-item": grillaEmpleados,
    "Form-Empleado": FormEmpleado,
  },
  beforeMount() {
    this.currentUser = AuthService.getCurrentUser();
  },
  mounted() {
    this.verificarUsuario(this.currentUser);
    this.getEmpleados();
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
      currentUser: undefined,
    };
  },
  methods: {
    async getEmpleados() {
      const res = await fetch("http://localhost:3000/empleados", {
        headers: {
          "Content-type": "application/json",
          "x-access-token": this.currentUser.accessToken,
        },
      });
      if (res.status == 401) {
        //quiere decir que expiró el token o no está logueado
        alert('sesion expirada, vuelva a iniciar sesión')
        AuthService.logout();
        window.location.href = "/Home";
      }
      const resJson = await res.json();
      // console.log("abmempleadosGet ", resJson);
      this.empleadosData = resJson;
    },
    async handleMessage(value) {
      this.nuevoEmp = value;
      if (this.nuevoEmp) {
        this.getEmpleados();
        this.nuevoEmp = false;
      }
    },
    async verificarUsuario(currentUser) {
      if (currentUser) {
        if (!currentUser.roles.includes("ROLE_ADMIN")) {
          window.location.href = "/Home";
        }
      } else {
        window.location.href = "/Home";
      }
    },
  },
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