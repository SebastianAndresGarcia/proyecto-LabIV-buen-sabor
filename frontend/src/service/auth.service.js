import axios from "axios";
//const config = require("../config/config.js");

const API_URL = "http://localhost:3000/api/auth/";

const register = (username, password) => {
  console.log("llegó a register")
  return axios.post(API_URL + "signup", {
    username,
    password
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  console.log("en fcion logout remove user")
  localStorage.removeItem("user");
  localStorage.clear()
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const googlelogin = (googleUser) => {
  return axios.post('http://localhost:3000/googlelogin', { 'token': googleUser.getAuthResponse().id_token, 'user': googleUser.getBasicProfile(), 'googleUser': googleUser })
    // .then(response => {
    //   // Si el inicio de sesión es exitoso, redirige al usuario a la página principal
    //   this.$router.push('/');
    // })
    .then((response) => {
      console.log(response)
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    }).catch(error => {
      // Si hay un error, muestra un mensaje de error
      console.error(error);
      alert('Hubo un error al iniciar sesión con Google');
    });
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  googlelogin
};

export default AuthService;