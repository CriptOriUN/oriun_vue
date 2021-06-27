<template>
  <div id="app">
    <router-view v-on:logeado="logIn"></router-view>
    <Websocket v-if="is_auth"/>
  </div>
</template>

<script>
import Websocket from "./components/Websocket";
export default {
  data: function () {
    return {
      is_auth: localStorage.getItem("isAuth") || false,
    };
  },
  components: {
    Websocket,
  },
  methods: {
    // esto nos lleva a user_auth si no esta autenticado, en caso contrario al usuario actual
    updateAuth: function () {
      var self = this;
      self.is_auth = localStorage.getItem("isAuth") || false;

      if (self.is_auth == false){
        if(!(self.$route.path == '/confirm-account') && !(self.$route.path == '/unlock-account')){
          self.$router.push({ name: "Login" }).catch(()=>{});
        }        
      } 
      else {
        let username = localStorage.getItem("current_username");
        let role = localStorage.getItem("my_role");
        if (role === "Usuario") {
          self.$router.push({ name: "User", params: { username: username } }).catch(()=>{});
        } else if (role === "Moderador") {
          self.$router.push({
            name: "Moderator",
            params: { username: username },
            query: this.$route.query,
          }).catch(()=>{});
        } else {
          self.$router.push({
            name: "Bienestar",
            params: { username: username },
          }).catch(()=>{});
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
    // this.$router.push({name:"root"})
    this.updateAuth();
    
  },
};
</script>

<style>
</style>
