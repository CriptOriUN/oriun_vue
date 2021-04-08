<template>
  <div id="app">
    <router-view v-on:logeado="logIn"></router-view>
  </div>
</template>

<script>

import Login from './components/Login.vue'
import NavBar from './components/header/NavBar'
import CreateEvent from './components/CreateEvent.vue'
export default {
  data: function(){
    return {
      is_auth: localStorage.getItem('isAuth') || false,
    }
  }, 
  
   methods: {
     // esto nos lleva a user_auth si no esta autenticado, en caso contrario al usuario actual
     updateAuth: function(){
      var self = this
      self.is_auth  = localStorage.getItem('isAuth') || false
      if(self.is_auth == false)
        self.$router.push({name: "Login"})
      else{
        let username = localStorage.getItem("current_username")
        self.$router.push({name: "Welcome", params:{ username: username }})
      }  
    },
     init: function(){
       let username = localStorage.getItem('current_username');
       this.$router.push({name: "Welcome", params:{username:username}});
    },
     getAll: function(){
       //if(this.route.name!="products"){
         //this.count++;
         //console.log(this.$router.push({name:"products"}))
         this.$router.push({name:"CreateEvent"})
       //}
     }, 
     closeSession: function(){
        localStorage.removeItem('isAuth')
        localStorage.removeItem('current_username')
        this.updateAuth()
     },
     // nos lleva al metodo de update 
     logIn: function(username){
       
       localStorage.setItem('current_username',username)
       localStorage.setItem('isAuth', true)
       this.updateAuth()
     }
     
   },
   // esto sucede de inicio, llevandonos al al root, y ademas haciendo el userupdate, por lo q nos llevara a userauth
   created: function(){
     this.$router.push({name:"root"})
     this.updateAuth()
     }
}



</script>

<style>

</style>
