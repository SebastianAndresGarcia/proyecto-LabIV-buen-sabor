<template>
  <v-footer dark padless min-width="100%">
    <v-card flat tile class="flex indigo lighten-1 white--text text-center">
      <v-card-text>
        Seguinos
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text pt-0">
        <v-row justify="center" align="center">
          <v-col>
            <v-card-subtitle>
              <h2><p>Contacto</p></h2>

              <p><v-icon>mdi-phone</v-icon> 2615901167</p>
              <p><v-icon>mdi-home</v-icon>Aristides Villanueva 424 - Mendoza</p>
              <p><v-icon>mdi-mail</v-icon> sebagxeneize@mail.com</p>
            </v-card-subtitle>
          </v-col>
          <v-col>
            <strong><dondeestamos-item></dondeestamos-item></strong>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      {{ new Date().getFullYear() }}
      <p>Desarrollador Sebastián García</p>
      <v-divider></v-divider>
    </v-card>
  </v-footer>
</template>

<script>
import dondeestamos from "@/components/DondeEstamos.vue";

export default {
  name: "Foo-ter",
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
  components: {
    "dondeestamos-item": dondeestamos,
  },
};
</script>