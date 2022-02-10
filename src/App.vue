<template>
  <div id="app">
    <router-view v-on:logeado="logIn"></router-view>
    <Websocket v-if="is_auth" />
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import Websocket from "./components/Websocket";
export default {
  data: function () {
    return {
      is_auth: Vue.$cookies.get("isAuth") || false,
    };
  },
  components: {
    Websocket,
  },
  methods: {
    // esto nos lleva a user_auth si no esta autenticado, en caso contrario al usuario actual
    updateAuth: function (token) {
      var self = this;
      self.is_auth = Vue.$cookies.get("isAuth") || false;
      console.log(self.is_auth);

      if (self.is_auth == false) {
        if (
          !(self.$route.path == "/confirm-account") &&
          !(self.$route.path == "/unlock-account") &&
          !(self.$route.path == "/password-reset") &&
          !(self.$route.path == "/password-change")
        ) {
          self.$router.push({ name: "Login" }).catch(() => {});
        }
      } else if (self.$route.path == "/password-change") {
      } else {
        axios
          .get(this.$apiURL + "/userinfo?token=" + token.split(" ")[1])
          .then((result) => {
            let username = result.data["jti"];
            let role = result.data["sub"]; 
            console.log(username) 
            console.log(role)
            if (role === "Usuario") {
              self.$router
                .push({
                  name: "User",
                  params: { username: username, role: role },
                })
                .catch(() => {});
            } else if (role === "Moderador") {
              self.$router
                .push({
                  name: "Moderator",
                  params: { username: username, role: role },
                  query: this.$route.query,
                })
                .catch(() => {});
            } else {
              self.$router
                .push({
                  name: "Bienestar",
                  params: { username: username, role: role },
                })
                .catch(() => {});
            }
          });
      }
    },
    // nos lleva al metodo de update
    logIn: function (TOKEN) {
      console.log(TOKEN.split(" ")[1]);
      Vue.$cookies.set("isAuth", true);
      this.updateAuth(TOKEN);
    },
  },
  // esto sucede de inicio, llevandonos al al root, y ademas haciendo el userupdate, por lo q nos llevara a userauth
  created: function () {
    // this.$router.push({name:"root"})
    this.updateAuth("");
  },
};
</script>

<style>
</style>
