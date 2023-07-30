<template>
    <div style="margin-top:40px; margin-left: 50px; margin-bottom: 40px; ">
        <v-dialog v-model="alert" max-width="400px"><v-alert color="red" prominent type="warning">Inicie sesión para
                cargar su
                carrito<v-btn text @click="alert = false">X</v-btn></v-alert></v-dialog>
        <div style="margin:20px; display:inline-table;" v-for="(manufacturado, index) in manufacturadosData" :key="index">
            <!-- <div v-if="manufacturado.esInsumo!=null">BEBIDAS</div> -->
            <manufacturado-item :manufacturadoParam="manufacturado" @abrirAlert="handleMessage"></manufacturado-item>
            
        </div>
    </div>
</template>
<script>
import tarjetamanufacturado from "@/components/TarjetaManufacturado.vue";
import AuthService from "@/service/auth.service.js"
export default {
    name: "manufacturados",
    components: {
        "manufacturado-item": tarjetamanufacturado
    },
    mounted() {
        this.currentUser = AuthService.getCurrentUser()
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
                    "http://localhost:3000/articulosmanufacturadosInsumos" //se trae los manufacturados mas los articulos insumos(bebidas)
                )
                const resJson = await res.json();
                //console.log(resJson);
                this.manufacturadosData = resJson;
            }
            else {
                const res = await fetch(
                    `http://localhost:3000/articulosmanufacturadosxrubro/${id}` //busca en manufacturados 
                )
                const resJson = await res.json();
                //console.log(resJson);
                this.manufacturadosData = resJson;
            }
            if (this.manufacturadosData.length == 0) { 
                const res = await fetch(
                    `http://localhost:3000/insumosXrubro/${id}` //si no encontró nada anteriormente busca en los artículos insumos
                )
                const resJson = await res.json();
                //console.log(resJson);
                this.manufacturadosData = resJson;
            }
            //console.log("this.manufacturadosData", this.manufacturadosData)
        },
        handleMessage(value) {
            if (value >= 0 && this.currentUser) {
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