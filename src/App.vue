<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import Login from './components/Login.vue'
import NavBar from './components/header/NavBar'
import CreateEvent from './components/CreateEvent.vue'
export default {
  name: 'App',
  components: {}, 
  data: function(){
    is_auth: localStorage.getItem('is_auth') || false
  },
  methods: {

  },
  beforeCreate: function(){
    localStorage.setItem('current_username', 'nrrojasfe') 
    localStorage.setItem('is_auth', true)

    this.$router.push({name:"Welcome",params:{username:'nrrojasfe'}})
  }
}
// por el momento se va a poner un beforecreate 
// ya que hay problemas de la integracion para el login 


</script>

<style>

</style>
