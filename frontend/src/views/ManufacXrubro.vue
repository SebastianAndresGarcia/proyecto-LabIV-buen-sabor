<template>
    <div style="margin-top:40px; margin-left: 50px; margin-bottom: 40px; ">
        <v-dialog v-model="alert" max-width="400px"><v-alert color="red" prominent type="warning">Inicie sesión para
                llenar su
                carrito<v-btn text @click="alert = false">X</v-btn></v-alert></v-dialog>
        <div style="margin:20px; display:inline-flex;" v-for="(manufacturado, index) in manufacturadosData"
            :key="index">
            <manufacturado-item :manufacturadoParam="manufacturado" @abrirAlert="handleMessage"></manufacturado-item>
        </div>
    </div>
</template>
<script >
import tarjetamanufacturado from "@/components/TarjetaManufacturado.vue";
export default {
    name: "manufacturados",
    components: {
        "manufacturado-item": tarjetamanufacturado
    },
    mounted() {
        const id = this.$route.params.id //del rubro general
        console.log("idrubrogeneral " + this.$route.params.id)
        this.getmanufacturados(id)
    },
    data() {
        return {
            manufacturadosData: [],
            alert: false
        };
    },
    methods: {
        async getmanufacturados(id) {
            if (id == 0) {
                const res = await fetch(
                    "http://localhost:3000/articulosmanufacturadosInsumos"
                )
                const resJson = await res.json();
                //console.log(resJson);
                this.manufacturadosData = resJson;
            }
            else {
                const res = await fetch(
                    `http://localhost:3000/articulosmanufacturadosxrubro/${id}`
                )
                const resJson = await res.json();
                //console.log(resJson);
                this.manufacturadosData = resJson;
            }
            //console.log("this.manufacturadosData", this.manufacturadosData)
        },
        handleMessage(value) {
            if (value >= 0) {
                console.log("catchemit rubroId " + this.$route.params.id)
                this.getmanufacturados(this.$route.params.id)
            }
            else
                this.alert = true
        }
    }
};
</script>
<style scoped>
.tarjetas {
    justify-content: center;
    display: inline-flex;
    padding-left: 20%;
    padding-right: 20%;
    padding-bottom: 1%;
    margin: 0 auto;

}
</style>