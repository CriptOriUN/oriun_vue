<template>
   <div class="welcome">
      <NavBar :username="username"/>
      <div id="thewelcome">
         <h6>
            Hola,
            <h2>{{username}}</h2>
         </h6>
      </div>
      <div class="container">
         <div class="mis-eventos">
            <h4>Mis eventos de esta semana</h4>
            <div v-for="event in events"
               :key="event.id" 
               class="evento">
               <h6>Fecha: {{event.EVENT_INIT}}</h6>
               <div class = "inline">
                  <h6 class = "inline_sub">Hora Inicio: {{event.EVENT_INIT_HOUR}}</h6>
                  <h6>Hora Fin: {{event.EVENT_FINISH_HOUR}}</h6>
               </div>
               <div class = "inline">
                  <h6 class = "inline_sub">Lugar:{{event.NAME_LOC_SPORT}}</h6>
                  <a id= "ref" href="https://www.w3schools.com" target="_blank">Ver Detalles</a>
               </div>
            </div>
         </div>
             <img id="escudo" src="../assets/escudo_unal.jpg" alt="escudo unal" width="500px" height="auto">
      </div>
   </div>
</template>

<script>
import NavBar from './header/NavBar';
import { events } from '../fake-data';
export default {
    name: 'Welcome',
    components: {NavBar}, 
    data: function(){
      return{
          username: "", 
          events
      }  
    },
    created: function(){
        this.username = this.$route.params.username; 
    }
}
</script>>

<style scoped >
#thewelcome{
    display: flex;
    justify-content: center;
}
.container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;}
    .mis-eventos{
        width: 600px;
        padding: 3%; 
        background-color: #94B43B;
        border-radius: 20px;
        margin-bottom: 20px;
        color: white;}
    .evento{
        padding: 3%;
        background-color: #B1B2B0;
        margin: 1vw 0;
        border-radius: 10px}
        .inline{
            display: inline-flex;}
        .inline_sub{
            margin-right: 5vw;} 
        #ref{
            color: #466B3F;}
    #escudo{
        align-self: center;}
</style>