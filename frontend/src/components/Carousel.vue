<template>
    <v-carousel  hide-delimiters >
        <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
           <v-row justify="center">
                <div class="text-h2" style="font-weight: bold" >
                    Promo {{ i + 1 }}
                </div>
            </v-row>
        </v-carousel-item>
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
                    src: '/images/hamburguesa1.jpg' //src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
                },
                {
                    src: '/images/muzzarella.jpg' //src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
                },
                {
                    //src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
                }
            ]
        }
    }
}
</script>
<style>
.text-h2{
    padding: 20px;
    font-weight: bold;
}

</style>