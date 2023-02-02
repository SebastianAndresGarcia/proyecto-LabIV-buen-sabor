<template>
    <v-carousel> <!--hide-delimiters me borra los circulos de las imagenes del slider-->
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" @click="dialog = true"
                    style="cursor:pointer">
                    <v-row justify="center">
                        <div class="text-h2" style="font-weight: bold">
                            Promo {{ i + 1 }}
                        </div>
                    </v-row>
                </v-carousel-item>
            </template>
            <v-card ref="form">
                <v-card-title>
                    <span class="text-h5">Actualizar Datos Empleado</span>
                </v-card-title>

                <form @submit.prevent="crearEmpleado">
                    <v-card-text>
                        v card text
                    </v-card-text>
                    <v-divider class="mt-2"></v-divider>

                    <v-card-actions>
                        <v-btn text color="blue darken-1" @click="dialog = false">
                            Cancel
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn text color="blue darken-1" type="submit">
                            Guardar
                        </v-btn>
                    </v-card-actions>
                </form>
            </v-card>
        </v-dialog>
    </v-carousel>
</template>

<script>

export default {
    name: 'Car-ousel',
    data() {
        return {
            items: [
                {
                    src: '/images/empanadas.jpg'  //src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
                },
                {
                    src: '/images/hamburguesa2.jpg' //src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
                },
                {
                    src: '/images/muzzarella.jpg' //src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
                },
                {
                    src: '/images/lomo.jpg' //src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
                }
            ],
            dialog: false
        }
    },
    methods: {
        async abrirPromo() {

            this.dialog = true
            console.log("abrir promo " + this.dialog)
        }
    }
}
</script>
<style>
.text-h2 {
    padding: 20px;
    font-weight: bold;
}
</style>
