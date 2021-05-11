<template>
   <div class="welcome">
      <NavBar :username="username" />
      <div id="thewelcome">
         <h6>
            Hola,
            <h2>{{ username }}</h2>
         </h6>
      </div>
      <div class="container">
         <div class="row">
            <div class="col-md-6 mb-6">
               <div class="mis-eventos">
                  <h4 class="titulo-eventos">Mis eventos de esta semana</h4>
                  <hr />
                  <div class="row ml-4 mr-4 d-flex bd-highlight">
                     <div
                        v-for="event in events"
                        :key="event.id"
                        class="tar-evento evento flex-fill bd-highlight"
                     >
                        <h4 class="info-titulo">
                           <a
                              href="#"
                              class="info-titulo-ref detalles"
                              v-on:click="
                                 pop = 'evento';
                                 mostrar(event);
                              "
                              >{{ event.event_TITLE }}</a
                           >
                        </h4>
                        <p class="info-fecha">fecha: {{ event.event_INIT }}</p>
                        <p class="info-hora-lugar">
                           hora: {{ event.event_INIT_HOUR }} Lugar:
                           {{ event.name_LOC_SPORT }}
                        </p>
                     </div>
                  </div>
               </div>
            </div>
            <div class="col-md-6">
               <div class="mis-eventos">
                  <h4 class="titulo-eventos">Mis Deportes</h4>
                  <hr />
                  <div
                     v-for="spo in userSport"
                     :key="spo.id"
                     class="ml-3"
                  >
                     <h5 class="titulo-dep">
                        {{ spo.name_SPORT }}
                     </h5>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="overlay" v-bind:class="{ active: isActive }">
         <div class="popup">
            <a
               href="#"
               id="btn-cerrar-popup"
               class="btn-cerrar-popup"
               v-on:click="ocultar()"
               >X</a
            >
            <h3>Detalles del evento</h3>
            <h6>Nombre: {{ nombreEvento }}</h6>
            <h6>Deporte: {{ deporteEvento }}</h6>
            <h6>Organizador: {{ organizadorEvento }}</h6>
            <h6>Fecha: {{ fechaEvento }}</h6>
            <h6>Hora: {{ horaEvento }}</h6>
            <h6>Locación: {{ locacionEvento }}</h6>
         </div>
      </div>
   </div>
</template>

<script>
import NavBar from "./header/NavBar";
import axios from "axios";
// import { events } from "../fake-data";
export default {
   name: "Welcome",
   components: { NavBar },
   data: function() {
      return {
         username: "",
         events: null,
         isActive: false,
         nombreEvento: "",
         deporteEvento: "",
         organizadorEvento: "",
         fechaEvento: "",
         horaEvento: "",
         locacionEvento: "",
         userSport: null,
      };
   },
   created: function() {
      this.username = this.$route.params.username;
   },
   mounted() {
      this.getEvents();
      this.getUserSports();
   },
   methods: {
      getEvents() {
         // console.log(this.username, "hola", self.username);
         // axios.get('https://wise-brook-308119.ue.r.appspot.com/events/',self.username).then(response=>{
         axios
            .get("http://localhost:8081/userevents/?user=" + this.username)
            .then((response) => {
               console.log(response);
               this.events = response.data;
            })
            .catch((e) => console.log(e));
      },
      getUserSports() {
         // console.log(this.username, "hola", self.username);
         // axios.get('https://wise-brook-308119.ue.r.appspot.com/events/',self.username).then(response=>{
         axios
            .get("http://localhost:8081/usersports/?user=" + this.username)
            .then((response) => {
               console.log(response);
               this.userSport = response.data;
            })
            .catch((e) => console.log(e));
      },
      mostrar(objet) {
         this.isActive = true;

         console.log(objet);
         this.nombreEvento = objet.event_TITLE;
         this.deporteEvento = objet.name_SPORT;
         this.organizadorEvento = objet.user_NAME;
         this.fechaEvento = objet.event_INIT;
         this.horaEvento = objet.event_INIT_HOUR;
         this.locacionEvento = objet.name_LOC_SPORT;
      },
      ocultar() {
         this.isActive = false;
      },
   },
};
</script>

<style scoped>
#thewelcome {
   display: flex;
   justify-content: center;
}
.container {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
}
.mis-eventos {
   /* width: 600px; */
   padding: 3%;
   background-color: #94b43b;
   border-radius: 20px;
   margin-bottom: 20px;
   box-shadow: 10px 10px #466b3f;
   color: white;
   justify-content: center;
}
.evento {
   padding: 3%;
   background-color: #466b3f;
   margin: 1vw 0;
   border-radius: 10px;
}
.inline {
   display: inline-flex;
}
.inline_sub {
   margin-right: 5vw;
}
#ref {
   color: #466b3f;
}
#escudo {
   align-self: center;
}
.tar-evento .detalles {
   padding: 0px 5px 0px 5px;
   color: #fff;
   text-decoration: none;
}
.tar-evento .detalles:hover {
   text-decoration: underline;
}
.tar-evento .info-fecha {
   padding: 0px 0px 0px 5px;
   margin-bottom: 0px;
   color: #fff;
}
.tar-evento .info-hora-lugar {
   padding: 0px 0px 0px 5px;
   color: #fff;
}
.overlay {
   background-color: rgba(0, 0, 0, 0.5);
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   visibility: hidden;
}
.overlay .popup {
   background-color: #f8f8f8;
   box-shadow: 0px 0px 1px 0px black;
   border-radius: 3px;
   padding: 20px;
   text-align: center;
   width: 600px;
}
.overlay .popup .btn-cerrar-popup {
   font-size: 16px;
   line-height: 16px;
   display: block;
   text-align: right;
   color: #bbbbbb;
   /* transition: 0.3s ease all; */
}
.overlay .popup .btn-cerrar-popup:hover {
   color: #000;
   text-decoration: none;
}
.overlay .popup .h3 {
   font-size: 36px;
   font-weight: 600px;
   margin-bottom: 10px;
}
.overlay .popup .h6 {
   font-size: 26px;
   font-weight: 300px;
   margin-bottom: 40px;
}

.overlay.active {
   visibility: visible;
}
#thewelcome {
   padding-bottom: 20px;
}
.titulo-eventos {
   text-align: center;
}
.titulo-dep{
   color:#fff;
}
</style>
