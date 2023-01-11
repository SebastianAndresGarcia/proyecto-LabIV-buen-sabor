import axios from "axios";
//const config = require("../config/config.js");

const API_URL = "http://localhost:3000/api/auth/";

const register = (username,  password) => {
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

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;