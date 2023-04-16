<template>
  <div v-if="rubrosParam.length > 0">
    <!-- <ul style="list-style: none">
      <li v-for="rubro in rubrosParam" :key="rubro._id">
        <input
          type="checkbox"
          v-model="rubro.seleccionado"
          @change="filtrarElementos"
        />
        {{ rubro.denominacion }}
        <sub-rubros :subrubros="rubro.hijos" v-if="rubro.hijos" />
      </li>
    </ul> -->
  </div>
</template>
  
<script>
import Subrubros from "./Subrubros.vue";
import AuthService from "@/service/auth.service";

export default {
  name: "rubro-item",

  data() {
    return {
      rubros: [],
      currentUser: undefined,
    };
  },

  components: {
    "sub-rubros": Subrubros,
  },
  props: ["rubrosParam"],
  beforeMount() {
    this.currentUser = AuthService.getCurrentUser();
    console.log("this.rubrosParam", this.rubrosParam);
    this.verDescendentesRubroArticulo(this.rubrosParam);
  },
  mounted() {},
  methods: {
    async verDescendentesRubroArticulo(rubrosParam) {
      for (let i = 0; i < rubrosParam.length; i++) {
        const res = await fetch(
          `http://localhost:3000/verDescendentesRubroArticulo/${rubrosParam[i]._id}`,
          {
            headers: {
              "x-access-token": this.currentUser.accessToken,
            },
          }
        );
        const resJson = await res.json();
        this.rubros.push(resJson.result);
        console.log("this.rubros ", this.rubros);
      }

      console.log("verDescendentesRubroArticulo ", this.rubros);
    },
  },
};
</script>
  
<!--   
  <script>
  import Subrubros from "@/components/Subrubros.vue";
  
  export default {
    name: "Rubro",
    components: {
        "sub-rubros": Subrubros,
    },
    props: {
      rubro: Object,
    },
    mounted() {
        console.log(rubro)
    },
  };
  </script> -->
  