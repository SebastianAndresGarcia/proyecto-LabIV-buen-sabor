<template>
  
    <!-- <div>{{ rubroSeleccionado }}</div> -->
    <div>
      <ul style="list-style: none">
        <li v-for="rubro in subrubros" :key="rubro._id">
          <v-row><v-checkbox
            :label="rubro.denominacion"
            v-model="rubroSeleccionado"
            :value="rubro._id"
          ></v-checkbox>
          <Editar-Rubro v-if="rubro._id" :rubroParam="rubro"></Editar-Rubro>
        </v-row>
          <div v-if="rubro.hijos">
            <ul style="list-style: none">
              <li v-for="subrubro in rubro.hijos" :key="subrubro._id">
               <v-row><v-checkbox
                  :label="subrubro.denominacion"
                  v-model="rubroSeleccionado"
                  :value="subrubro._id"
                ></v-checkbox>
                <Editar-Rubro v-if="subrubro._id" :rubroParam="subrubro" ></Editar-Rubro>
              </v-row> 
                <!-- @change="marcarHijos(subrubro, $event)" esta linea se agrega adentro del checkbox -->
                <sub-rubros
                  v-if="subrubro.hijos"
                  :subrubros="subrubro.hijos"
                  @recibeValordeHijo="handleRubroSelecc"
                />
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  
</template>
  
<script>
import Subrubros from "./Subrubros.vue";
import EditarRubro from "@/components/EditarRubro.vue";
export default {
  name: "sub-rubros",
  data() {
    return {
      rubroSeleccionado: [],
    };
  },
  components: {
    "sub-rubros": Subrubros,
    "Editar-Rubro": EditarRubro
  },
  props: {
    subrubros: Array,
  },
  mounted() {
    console.log("this.subrubros", this.subrubros);
  },
  beforeUpdate() {
    console.log("rubroSeleccionado en Subrubros ", this.rubroSeleccionado);
    this.$emit("changeRubroSeleccionado", { value: this.rubroSeleccionado });
  },
  methods: {
    marcarHijos(rubro, isChecked) {
      console.log("rubro en marcarHijos ", rubro);
      if (rubro.hijos) {
        rubro.hijos.forEach((hijo) => {
          this.rubroSeleccionado = isChecked
            ? [...this.rubroSeleccionado, hijo._id]
            : this.rubroSeleccionado.filter((id) => id !== hijo._id);
          this.marcarHijos(hijo, isChecked);
        });
      }
    },

    async handleRubroSelecc(value) {
      this.rubroSeleccionado=[]
      console.log("value", value);
      this.rubroSeleccionado = value.value;
      console.log(
        "value recibido de sí mismo, Subrubros",
        this.rubroSeleccionado
      );
    },
  },
 
  watch: {
    rubroSeleccionado: function () {
      this.$emit("recibeValordeHijo", { value: this.rubroSeleccionado });
    },
  },
};
</script>
  