<template>
  <v-app>
    <div class="navigation">
      <top-nav-bar></top-nav-bar>
    </div>

    <v-main>
      <router-view />
    </v-main>

  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import NavBarTop from "@/components/NavBarTop.vue";
import footer from "@/components/Footer.vue";

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    "top-nav-bar": NavBarTop,
    "footer": footer,
  }
});
</script>
<style>

</style>