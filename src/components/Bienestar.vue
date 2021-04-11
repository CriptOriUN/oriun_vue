<template>
    <div class="bienestar">
        <NavBar :username="username"/>
        <h1>Pagina de Bienestar</h1>
    </div>
</template> 

<script>
import NavBar from './header/NavBar'
export default {
    name: 'Bienestar',
    components: {NavBar}, 
    data: function(){
      return{
          username: "", 
      }  
    },
    created: function(){
        this.username = this.$route.params.username; 
    }
}
</script> 

<style scoped>

</style>