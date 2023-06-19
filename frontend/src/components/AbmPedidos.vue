<template>
  <v-container v-if="currentUser.roles.includes('ROLE_ADMIN')">
    <v-card style="margin-top: 10px; justify: center">
      <v-row style="justify-content: center"><v-card-title>
          <h2><b>Pedidos</b></h2>
        </v-card-title>
      </v-row>
      <div v-if="pedidosData.length > 0">
        <v-row align="center">
          <v-col cols="2">
            <v-subheader> Ver </v-subheader>
          </v-col>

          <v-col cols="10">
            <v-select v-model="select" :items="items" item-text="state" item-value="state"></v-select>
          </v-col>
        </v-row>
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
                  <b>Pago</b>
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
                <th class="text-center">
                  <h2><b>Acciones</b></h2>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(pedido, index) in pedidosData" :key="index" style="padding-top: 5px">
                <td>
                  {{ getFechaFormateada(pedido.fecha) }}
                </td>
                <td>
                  {{ pedido.numero }}
                </td>
                <td>
                  {{ pedido.mercadopagodatosid.estado }}
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
                  <div v-if="pedido.estado === 'pendiente'">
                    <v-row style="justify-content: center">
                      <v-btn style="margin-right: 2px" small color="success" @click="cambiarEstado(pedido, 'elaboracion')">Enviar a
                        Cocina</v-btn>
                      <v-btn small color="red" @click="confirmarCancelarPedido(pedido)">Cancelar Pedido</v-btn>
                    </v-row>
                  </div>
                  <div v-else-if="pedido.estado === 'terminado' ||
                    pedido.estado === 'facturado'
                    ">
                    <form-factura style="justify-content: center" :pedidoParam="{
                      pedidoid: pedido._id,
                      facturaid: pedido.facturaid,
                    }"></form-factura>
                  </div>
                  <v-row style="justify-content: center" v-else-if="pedido.estado === 'cancelado'">
                    <!-- <v-btn style="margin-right: 2px" small color="warning" @click="cambiarEstado(pedido, 'pendiente')">Deshacer Cancelar</v-btn> -->
                    <b>SIN EFECTO</b>
                  </v-row>
                  <div v-else>
                    <b>Esperando a la cocina...</b>
                  </div>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
      <div v-else>
        <v-card-subtitle><b>No tienes Pedidos aún</b></v-card-subtitle>
      </div>
    </v-card>
    <!-- <v-dialog v-model="dialog" scrollable max-width="50%">
      <v-card>
          <v-toolbar dark color="warning">
              <v-btn icon dark @click="dialog = false">
                  <v-icon dark>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title> Cancelación de Pedido</v-toolbar-title>
              <v-spacer></v-spacer>
          </v-toolbar>
          <v-divider style="margin-bottom: 2px"></v-divider>
          <v-card-title>
              <b><i>¿Está Seguro de Cancelar este Pedido?</i></b>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
      class="mr-4"
      @click="cambiarEstado(pedido, 'cancelado')"
    >
      Aceptar
    </v-btn>
    <v-btn @click="dialog=false">
      Cerrar
    </v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog> -->
  </v-container>
</template>
<script>
import AuthService from "@/service/auth.service.js";
import detallepedido from "@/components/DetallePedido.vue";
import formfactura from "@/components/FormFactura.vue";
import {horaFormateada} from "@/funciones/horaFormateada.js";
import {borrarPedido} from "@/funciones/BorrarCarrito.js";
export default {
  components: {
    "detalle-pedido": detallepedido,
    "form-factura": formfactura,
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
      dialog: false,
      currentUser: undefined,
      pedidosData: [],
      select: "Pendiente",
      items: [
        { state: "Ver Todo" },
        { state: "Pendiente" },
        { state: "En preparación" },
        { state: "Terminado" },
        { state: "Facturado" },
        { state: "Cancelado" },
      ],
    };
  },

  methods: {
    confirmarCancelarPedido(pedido) {
      if (window.confirm('¿Estás seguro de que deseas cancelar este pedido?')) {
        this.cambiarEstado(pedido, 'cancelado');
        borrarPedido(pedido.detallepedidoid) //lo uso para devolver al stock los insumos del pedido cancelado
      }
    },
    async getPedidos() {
      const res = await fetch("http://localhost:3000/pedidos", {
        headers: {
          "Content-type": "application/json",
          "x-access-token": this.currentUser.accessToken,
        },
        mode: "cors",
      });
      if (res.status == 401) {
        //quiere decir que expiró el token o no está logueado
        AuthService.logout();
        window.location.href = "/Home";
      }
      const resJson = await res.json();
      console.log("resJson", resJson);
      this.pedidosData = resJson;

      //setTimeout(() => this.getPedidos(), 10000) //milisegundos, va repitiendo la llamada cada 10 seg
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
    async cambiarEstado(pedido, status) {
      pedido.estado = status;
      let urlServer = "http://localhost:3000/actualizarPedido/" + pedido._id;
      let method = "POST";
      const respuesta = await fetch(urlServer, {
        method: method,
        body: JSON.stringify({ estado: status }),
        headers: {
          "Content-type": "application/json",
          "x-access-token": this.currentUser.accessToken,
        },
        mode: "cors",
      });
      const resJson = await respuesta.json();
      console.log("respuesta: ", resJson);
      if (respuesta.status === 200) {
        console.log(respuesta.status);
      } else {
        this.respuestaError = resJson.message;
        console.log("mensaje del servidor: " + this.respuestaError);
      }
    },
     getFechaFormateada(fecha){
      return horaFormateada(fecha)
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