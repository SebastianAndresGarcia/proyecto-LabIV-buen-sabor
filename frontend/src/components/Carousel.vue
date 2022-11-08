<template>
    <v-carousel > <!--hide-delimiters me borra los circulos de las imagenes del slider-->
        <a :href="'./'" style="text-decoration: none">
            <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
                <v-row justify="center">
                    <div class="text-h2" style="font-weight: bold">
                        Promo {{ i + 1 }}
                    </div>
                </v-row>
            </v-carousel-item>
        </a>
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
            ]
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