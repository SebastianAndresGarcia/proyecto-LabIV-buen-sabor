<template>
  <div>
    <!-- <div>{{ rubroSeleccionado }}</div> -->
    <div>
      <ul style="list-style: none">
        <li v-for="rubro in subrubros" :key="rubro._id">
          <v-checkbox
            :label="rubro.denominacion"
            v-model="rubroSeleccionado"
            :value="rubro._id"
          ></v-checkbox>

          <div v-if="rubro.hijos">
            <ul style="list-style: none">
              <li v-for="subrubro in rubro.hijos" :key="subrubro._id">
                <v-checkbox
                  :label="subrubro.denominacion"
                  v-model="rubroSeleccionado"
                  :value="subrubro._id"
                ></v-checkbox>
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
  </div>
</template>
  
<script>
import Subrubros from "./Subrubros.vue";

export default {
  name: "sub-rubros",
  data() {
    return {
      rubroSeleccionado: [],
    };
  },
  components: {
    "sub-rubros": Subrubros,
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
  