<!-- *Reportes en excel: Ranking comidas más pedidas en un periodo de tiempo determinado
Ingresos (recaudaciones) por períodos de tiempo. Diario / Mensual
Cantidad de pedidos agrupados por cliente en un determinado periodo de tiempo.
Monto de Ganancia en un periodo de tiempo (ventas - costos) -->
<template>
  <v-card
    style="margin: 10px"
    v-if="currentUser.roles.includes('ROLE_ADMIN')"
    elevation="4">
    <v-row style="margin: 10px; justify-content: center">
        <v-card-title><b>CENTRO DE ESTADISTICAS</b></v-card-title>
    </v-row>

    <v-card-text>
      <v-expansion-panels multiple>
        <items-ranking :user="currentUser"></items-ranking>

        <item-recaudaciones :user="currentUser"></item-recaudaciones>
 
        <item-ganancias :user="currentUser"></item-ganancias>

        <item-clientes :user="currentUser"></item-clientes>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>
<script>
import AuthService from "@/service/auth.service.js";
import masvendidos from "@/components/MasVendidos.vue";
import comprasclientes from "@/components/RankingClientes.vue";
import recaudaciones from "@/components/Recaudaciones.vue";
import ganancias from "@/components/Ganancias.vue";
export default {
  name: "estadisticas",
  components: {
    "items-ranking": masvendidos,
    "item-clientes": comprasclientes,
    "item-recaudaciones": recaudaciones,
    "item-ganancias": ganancias,
  },
  data() {
    return {
      currentUser: undefined,
      maspedidos: null,
      ingresos: null,
      pedidosxcliente: null,
      fecha: null,
    };
  },
  beforeMount() {
    this.currentUser = AuthService.getCurrentUser();
  },
  mounted() {
    this.verificarUsuario(this.currentUser);
  },

  methods: {
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