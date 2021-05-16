<template>
  <div id="app">
    <router-view v-on:logeado="logIn"></router-view>
  </div>
</template>

<script>
import Login from "./components/Login.vue";
import NavBar from "./components/header/NavBar";
import CreateEvent from "./components/CreateEvent.vue";
export default {
  data: function () {
    return {
      is_auth: localStorage.getItem("isAuth") || false,
    };
  },

  methods: {
    // esto nos lleva a user_auth si no esta autenticado, en caso contrario al usuario actual
    updateAuth: function () {
      var self = this;
      self.is_auth = localStorage.getItem("isAuth") || false;

      // if (self.is_auth == false) self.$router.push({ name: "Login" });
      // else {
      //   let username = localStorage.getItem("current_username");
      //   let role = localStorage.getItem("my_role");
      //   if (role === "Usuario") {
      //     self.$router.push({ name: "User", params: { username: username } });
      //   } else if (role === "Moderador") {
      //     self.$router.push({
      //       name: "Moderator",
      //       params: { username: username },
      //       query: this.$route.query,
      //     });
      //   } else {
      //     self.$router.push({
      //       name: "Bienestar",
      //       params: { username: username },
      //     });
      //   }
      // }
      
      if (self.is_auth == true){
        let username = localStorage.getItem("current_username");
        let role = localStorage.getItem("my_role");
        if (role === "Usuario") {
          self.$router.push({ name: "User", params: { username: username } });
        } else if (role === "Moderador") {
          self.$router.push({
            name: "Moderator",
            params: { username: username },
            query: this.$route.query,
          });
        } else {
          self.$router.push({
            name: "Bienestar",
            params: { username: username },
          });
        }
      }
    },
    // nos lleva al metodo de update
    logIn: function (username, role) {
      localStorage.setItem("current_username", username);
      localStorage.setItem("my_role", role);
      localStorage.setItem("isAuth", true);
      this.updateAuth();
    },
  },
  // esto sucede de inicio, llevandonos al al root, y ademas haciendo el userupdate, por lo q nos llevara a userauth
  created: function () {
    //  this.$router.push({name:"root"})
    this.updateAuth();
  },
};
</script>

<style>
</style>
