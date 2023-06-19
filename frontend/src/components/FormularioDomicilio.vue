<template>
  <v-container>
    <form @submit.prevent="crearDomicilio">
      <!--RubroGeneral-->
      <v-card-text>
        <v-container>
          <v-col cols="12">
            <v-row>
              <v-text-field label="calle" v-model="domicilio.calle" required>
              </v-text-field>
            </v-row>
            <v-row>
              <v-text-field label="Barrio" v-model="domicilio.barrio" required>
              </v-text-field>
            </v-row>
            <v-row>
              <v-text-field label="numero" v-model="domicilio.numero" required>
              </v-text-field>
            </v-row>
            <v-row>
              <v-text-field label="localidad" v-model="domicilio.localidad" required>
              </v-text-field>
            </v-row>
          </v-col>
        </v-container>
      </v-card-text>
      <v-col cols="12">
        <h4 style="color: red; text-align: center">{{ respuestaError }}</h4>
      </v-col>
      <v-divider class="mt-2"></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-container>
          <v-row justify="center" style="margin-bottom: 20px">
            <v-btn color="blue darken-1" text type="submit"> Guardar </v-btn>
            <v-btn color="blue darken-1" text @click="cerrar()">
              Salir
            </v-btn>
          </v-row>
        </v-container>
      </v-card-actions>
    </form>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      domicilio: {calle:'',barrio:'',numero:'',localidad:'', userid:''},
      userId: "",
      respuestaError: ''
    };
  },
  mounted(){
    this.domicilio.userid = JSON.parse(localStorage.getItem("user")).id;
  },
  methods:{
    async crearDomicilio() {
 
      let urlServer = "http://localhost:3000/crearDomicilio";
      let method = "POST";

      const respuesta = await fetch(urlServer, {
        method: method,
        body: JSON.stringify(this.domicilio),
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",

      });
      const resJson = await respuesta.json()
      console.log("respuesta: ", resJson)
      if (respuesta.status === 200) {
        this.$emit('nuevoDomicilio', true)
      } else {

        this.respuestaError = resJson
        console.log("mensaje del servidor: " + this.respuestaError)
      }      
    },
    async cerrar(){
        this.$emit('nuevoDomicilio', false)
    }
  },
  
};
</script>
