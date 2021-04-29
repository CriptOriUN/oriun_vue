<template>
   <div class="user">
      <NavBar :username="username" />
      <div id="thewelcome">
         <h6>
            Hola,
            <h2>{{ username }}</h2>
         </h6>
      </div>
      <div class="plantilla">
         <div class="container contenedor_p">
            <div class="row ">
               <div class="col-md-4 mb-4">
                  <div class="tabla-noti">
                     <h3 class="titulo-tablas">Notificaciones</h3>
                     <hr />
                     <!-- crear en fake notifications -->
                     <div
                        v-for="noti in notifications"
                        :key="noti.id"
                        class="notification"
                     >
                        <h5 class="titulo-noti">
                           <a class="titulo-noti-btn" href="#">{{
                              noti.name_SPORT
                           }}</a>
                        </h5>
                        <p class="parrafo-noti">
                           {{ noti.notification_DESCRIPTION }}
                        </p>
                        <hr />
                     </div>
                     <!-- <button
                        v-on:click="mostrarTodo()"
                        class="btn boton"
                        type="botton"
                     >
                        Mostrar Todo
                     </button> -->
                  </div>
               </div>
               <div class="col-md-8 ">
                  <div class="tabla-eve ">
                     <h3 class="titulo-tablas">Proximos Eventos</h3>
                     <hr />
                     <div class="row ml-4 mr-4 d-flex bd-highlight">
                        <div
                           v-for="event in events"
                           :key="event.id"
                           class="tar-evento flex-fill bd-highlight"
                        >
                           <h5 class="info-titulo">{{ event.event_TITLE }}</h5>
                           <p class="info-fecha">
                              fecha: {{ event.event_INIT }}
                           </p>
                           <p class="info-hora-lugar">
                              hora: {{ event.event_INIT_HOUR }} Lugar:
                              {{ event.name_LOC_SPORT }}
                              <!--<a class="detalles" href="#">Detalles</a>-->
                           </p>
                        </div>
                     </div>
                     <hr />
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>

import NavBar from '../components/header/NavBar'

import axios from "axios";

export default {
    name: 'Users',
    components: {
    NavBar
  }, 
  data: function(){
      return{
          username: "", 
          events:null, 
          notifications:null
      }  
    },
    created: function() {
    this.username = this.$route.params.username;

  },
  mounted(){
    // console.log('holanda')
    this.getEvents();
    this.getNotifications();
  },
  methods:{
    getEvents(){
      // console.log('codigo get')
      axios.get('https://wise-brook-308119.ue.r.appspot.com/events/',self.username).then(response=>{
        console.log(response)
        this.events = response.data
      }).catch(e=>console.log(e))

    },
    getNotifications(){
      console.log('codigo get')
      axios.get('https://wise-brook-308119.ue.r.appspot.com/usernotifications/',self.username).then(response=>{
        console.log(response)
        this.notifications = response.data
      }).catch(e=>console.log(e))
    }

  }
}
</script>

<style scoped>
#thewelcome {
   display: flex;
   justify-content: center;
}
.plantilla {
   background: #fff;
   /* background: url(../assets/login_bg.png); */
   min-height: 100vh;
}
.plantilla .contenedor_p {
   padding-top: 20px;
}
.plantilla .contenedor_p .fecha {
   padding-top: 32px;
}
.plantilla .contenedor_p .tabla-noti {
   background: #94b43b;
   border-radius: 10px;
   box-shadow: 10px 10px #466b3f;
}
.plantilla .contenedor_p .tabla-noti .titulo-tablas {
   color: #fff;
   padding: 15px 0 15px 0;
   text-align: center;
   padding-bottom: 0px;
}
.plantilla .contenedor_p .tabla-noti .titulo-noti {
   color: #fff;
   padding: 0px 20px 0px 20px;
}
.plantilla .contenedor_p .tabla-noti .parrafo-noti {
   color: #fff;
   padding: 0px 20px 0px 20px;
}
.plantilla .contenedor_p .tabla-eve {
   background: #94b43b;
   border-radius: 10px;
   box-shadow: 10px 10px #466b3f;
}
.plantilla .contenedor_p .tabla-eve .titulo-tablas {
   padding: 15px 0 15px 0;
   padding-bottom: 0px;
   text-align: center;
   color: #fff;
}
.plantilla .contenedor_p .tabla-eve .tar-evento {
   background: #466b3f;
   border-radius: 10px;
   margin: 8px 8px 8px 8px;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   color: #fff;
}
.plantilla .contenedor_p .tabla-eve .tar-evento .info-titulo {
   padding: 10px 0px 0px 15px;
   color: #fff;
}
.plantilla .contenedor_p .tabla-eve .tar-evento .info-fecha {
   padding: 0px 0px 0px 15px;
   margin-bottom: 0px;
   color: #fff;
}
.plantilla .contenedor_p .tabla-eve .tar-evento .info-hora-lugar {
   padding: 0px 0px 0px 15px;
   color: #fff;
}
.plantilla .contenedor_p .tabla-eve .tar-evento .detalles {
   padding: 0px 20px 0px 15px;
   color: #000;
   text-decoration: none;
   color: #466b3f;
}
.plantilla .contenedor_p .tabla-eve .tar-evento .detalles:hover {
   text-decoration: underline;
}

.titulo-noti-btn {
   text-decoration: none;
   color: #fff;
}
.titulo-noti-btn:hover {
   text-decoration: underline;
}
.card {
   border-radius: 30px;
}

.titulo_lugares {
   justify-content: center;
}

.boton {
   background: #565a5c;
   color: #fff;
   width: 150px;
}

.titulo_bln {
   color: #fff;
}

/*# sourceMappingURL=usuario.css.map */
</style>
