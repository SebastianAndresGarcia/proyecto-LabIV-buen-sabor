<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" temporary max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn block text v-bind="attrs" v-on="on"><v-icon>mdi-account</v-icon> Iniciar sesión </v-btn>
      </template>

      <v-card ref="form">
        <v-card-title>
          <span class="text-h5">Iniciar sesión</span>
        </v-card-title>
        <template>
          <div id="gSignInWrapper">
            <span class="label">Sign in with:</span>
            <div @click="login" id="customBtn" class="customGPlusSignIn">
              <span class="icon"></span>
              <span class="buttonText">Google</span>
            </div>
          </div>
          <!--https://www.youtube.com/watch?v=qMFytZ-JI9g
            https://stackoverflow.com/questions/60367946/how-to-add-google-authentication-to-vue-js-using-typescript-and-component-style -->
          <div id="name"></div>
        </template>
        <form @submit.prevent="ingresar">
          <v-card-text>
            <v-container>
              <v-row>

                <v-col cols="12">
                  <v-text-field label="Nombre de usuario" v-model="usuario.username" required>
                  </v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field label="Contraseña" v-model="usuario.password" type="password" required>
                  </v-text-field>
                </v-col>

              </v-row>

            </v-container>
          </v-card-text>
          <v-col cols="12">
            <h4 style="color: red; text-align: center;">{{ respuestaError }} </h4>
          </v-col>
          <v-divider class="mt-2"></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-container>
              <v-row justify="center" style="margin-bottom: 20px">
                <v-btn color="blue darken-1" text type="submit">
                  Ingresar
                </v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Salir
                </v-btn>
              </v-row>
              <v-row>
                <v-col>
                  <a style="text-decoration: none; color: blue darken-1;" @click="dialog = false">
                    Olvidó su contraseña?
                  </a>
                </v-col>
                <v-col>
                  <a style="text-decoration: none; color: blue darken-1;" @click="dialog = false">
                    No tiene cuenta??
                  </a>
                </v-col>

              </v-row>
            </v-container>
          </v-card-actions>

        </form>
      </v-card>

    </v-dialog>
  </v-row>
</template>

<script>
import AuthService from '@/service/auth.service.js'
export default {
  data() {
    return {
      dialog: false,
      usuario: {
        username: "",
        password: "",
      },
      respuestaError: '',
      clientId: "718567861607-j4em7bfk0olk22ecvuulcl7nqucmf6a7.apps.googleusercontent.com",
      isLogin: false
    }
  },
  mounted() {
    
  },
  methods: {
    async ingresar() {
      console.log("entró a loguearse");
      AuthService.login(this.usuario.username, this.usuario.password).then(
        () => {
          //navigate("/Home");
          window.location.href = "/Home"
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.respuestaError = (resMessage);
        }
      );
    },
    async signInWithGoogle() {
      console.log("entró a signIn")
      var googleUser = {};

      window.gapi.load('auth2', function () {
        console.log("entró a gapi")
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        const auth2 = gapi.auth2.init({
          client_id: '718567861607-j4em7bfk0olk22ecvuulcl7nqucmf6a7.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          plugin_name: 'PLUGIN',
          scope: 'email'
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        var element = (document.getElementById('customBtn'));
        auth2.attachClickHandler(element, {},
          function (googleUser) {
            document.getElementById('name').innerText = "Signed in: " +
              googleUser.getBasicProfile().getName();
          }, function (error) {
            alert(JSON.stringify(error, undefined, 2));
          });
      });
    },
    err(msg) {
      typeof console !== "undefined" &&
        console.error(`[g-signin-button] ${msg}`);
    },
    attachSignin(element) {
      console.log(element.id);
      auth2.attachClickHandler(element, {},
        function (googleUser) {
          document.getElementById('name').innerText = "Signed in: " +
            googleUser.getBasicProfile().getName();
        }, function (error) {
          alert(JSON.stringify(error, undefined, 2));
        });
    },
    async logOut() {
      const result = await this.$gAuth.signOut();
      this.isLogin = false;
      console.log('result', result);
    },
    async login() {
      const googleUser = await this.$gAuth.signIn();
      console.log("googleUser", googleUser);
      console.log("getId", googleUser.getId());
      console.log("getBaseProfile", googleUser.getBasicProfile());
      console.log("getAuthResponse", googleUser.getAuthResponse());
      console.log(
        "getAuthResponse",
        this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse()
      );
      this.isLogin = this.$gAuth.isAuthorized;
      // document.getElementById('name').innerText = "Signed in: " +
      //   googleUser.getBasicProfile().getName();
      AuthService.googlelogin(googleUser).then(
        () => {
          //navigate("/Home");
          window.location.href = "/Home"
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.respuestaError = (resMessage);
        }
      );
    }
  }
};
</script>

<style type="text/css">

#customBtn {
  display: inline-block;
  background: white;
  color: #444;
  width: 190px;
  border-radius: 5px;
  border: thin solid #888;
  box-shadow: 1px 1px 1px grey;
  white-space: nowrap;
}

#customBtn:hover {
  cursor: pointer;
}

span.label {
  font-family: serif;
  font-weight: normal;
}

span.icon {
  background: url('https://user-images.githubusercontent.com/5500716/57735626-940ed100-76e8-11e9-8444-1a7ae461e92a.png') transparent 5px 50% no-repeat;
  display: inline-block;
  vertical-align: middle;
  width: 42px;
  height: 42px;
}

span.buttonText {
  display: inline-block;
  vertical-align: middle;
  padding-left: 42px;
  padding-right: 42px;
  font-size: 14px;
  font-weight: bold;
  /* Use the Roboto font that is loaded in the <head> */
  font-family: 'Roboto', sans-serif;
}
</style>