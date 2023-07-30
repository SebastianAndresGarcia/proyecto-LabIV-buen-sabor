<template>
  <v-container v-if="currentUser.roles.includes('ROLE_ADMIN')||currentUser.roles.includes('ROLE_CHEF')">
    <v-card style="margin-top: 10px; justify: center">
      <v-row style="justify-content: center; margin-bottom: 10px"
        ><v-card-title>
          <h2><b>Cocina</b></h2>
        </v-card-title>
      </v-row>
      <div v-if="pedidosData.length > 0">
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
                  <b>horaEstimadaFin</b>
                </th>
                <th class="text-left">
                  <b>Ver Detalles</b>
                </th>
                <th class="text-left">
                  <b>Estado</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(pedido, index) in pedidosData"
                :key="index"
                style="padding-top: 5px"
              >
                <td>
                  {{ getFechaFormateada(pedido.fecha) }}
                </td>
                <td>
                  {{ pedido.numero }}
                </td>
                <td>
                  {{ getFechaFormateada(pedido.horaEstimadaFin) }}
                </td>
                <td>
                  <detalle-pedido :pedidoParam="pedido"></detalle-pedido>
                </td>
                <td>
                  {{ pedido.estado }}
                </td>
                <td>
                  <v-btn small color="success" @click="cambiarEstado(pedido)"
                    >Terminado</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
      <div v-else>
        <v-row style="justify-content: center; margin-bottom: 10px"
          ><v-card-subtitle
            ><b>No tienes Pedidos Pendientes</b></v-card-subtitle
          ></v-row
        >
      </div>
    </v-card>
  </v-container>
</template>
<script>
import AuthService from "@/service/auth.service.js";
import detallepedido from "@/components/DetallePedido.vue";
import {horaFormateada} from "@/funciones/horaFormateada.js";
export default {
  components: {
    "detalle-pedido": detallepedido,
  },
  beforeMount() {
    this.currentUser = AuthService.getCurrentUser();
  },
  mounted() {
    this.verificarUsuario(this.currentUser);
    this.getPedidos();
  },
  data() {
    return {
      currentUser: undefined,
      pedidosData: [],
    };
  },

  methods: {
    getFechaFormateada(fecha){
      return horaFormateada(fecha)
    },
    async getPedidos() {

      const res = await fetch(
        "http://localhost:3000/Pedidos/elaboracion", //me traigo solo los pedidos que se encuentran en estado de 'elaboracion'
        {
          headers: {
            "Content-type": "application/json",
            "x-access-token": this.currentUser.accessToken,
          },
          mode: "cors",
        }
      );
      if (res.status == 401) {
        //quiere decir que expiró el token o no está logueado
        AuthService.logout();
        window.location.href = "/Home";
      }
      const resJson = await res.json();
      //console.log(resJson);
      this.pedidosData = resJson;
      // setTimeout(() => this.getPedidos(), 10000) //milisegundos
    },
    async verificarUsuario(currentUser) {
      if (currentUser) {
        if (!currentUser.roles.includes("ROLE_ADMIN")&&!currentUser.roles.includes('ROLE_CHEF')) {
          window.location.href = "/Home";
        }
      } else {
        window.location.href = "/Home";
      }
    },
    async cambiarEstado(pedido) {
      pedido.estado = "terminado"; //al marcar como terminados los pedidos, desaparecen de esta bandeja  y le figura como terminado al cajero/admin
      let urlServer = "http://localhost:3000/actualizarPedido/" + pedido._id;
      let method = "POST";
      const respuesta = await fetch(urlServer, {
        method: method,
        body: JSON.stringify({ estado: "terminado" }),
        headers: {
          "Content-type": "application/json",
          "x-access-token": this.currentUser.accessToken,
        },
        mode: "cors",
      });
      const resJson = await respuesta.json();
      // console.log("respuesta: ", resJson);
      if (respuesta.status === 200) {
        console.log(respuesta.status);
      } else {
        this.respuestaError = resJson.message;
        console.log("mensaje del servidor: " + this.respuestaError);
      }
      this.getPedidos();
    },
  },
};
</script>