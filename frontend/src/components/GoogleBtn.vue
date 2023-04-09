<template>
    <div align="center">
        <div @click="login" id="customBtn">
            <span class="icon"></span>
            <span class="buttonText">Iniciar sesión con Google</span>
        </div>
    </div>
</template>

<script>
import AuthService from '@/service/auth.service.js'
export default {
    data() {
        return {
            isLogin: false
        }
    },
    mounted() {

    },
    methods: {
        async logOut() {
            const result = await this.$gAuth.signOut();
            this.isLogin = false;
            console.log('result logOut', result);
        },
        async login() {
            try {
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
            } catch (e) {
                console.log(e)
            }
        }
    }
};
</script>

<style type="text/css">
/* .customBtn {
  background: url('../assets/LoginGoogle.png');
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 50px;

  border: solid 0.1px;
  /* box-shadow: 1px 1px 1px grey; 
  white-space: nowrap

} */
#customBtn {
    display: inline-block;
    background: white;
    color: #444;
    width: 70%;
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
    background: url('../assets/g-normal.png') 5px 50% no-repeat;
    display: inline-block;
    vertical-align: middle;
    width: 44px;
    height: 42px;
}

span.buttonText {
    display: inline-block;
    vertical-align: middle;
    justify-content: center;
    padding-left: 42px;
    padding-right: 42px;
    font-size: 14px;
    font-weight: bold;
    /* Use the Roboto font that is loaded in the <head> */
    font-family: 'Roboto', sans-serif;
}
</style>