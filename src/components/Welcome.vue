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
         <div class="row w-100">
            <div class="col-md-6 mb-6">
               <div class="mis-eventos">
                  <h4 class="titulo-eventos">Mis eventos de esta semana</h4>
                  <hr />
                  <div class="row ml-4 mr-4 d-flex bd-highlight">
                     <div
                        v-for="event in events"
                        :key="event.id"
                        class="tar-evento evento flex-fill bd-highlight"
                        v-bind:id="event.id_EVENT"
                     >
                        <div class="ml-3 row">
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
                           <button
                              type="button"
                              class="quitar ml-auto mr-4"
                              @click="delEvent(event)"
                           >
                              <i class="fa fa-minus"></i>
                           </button>
                        </div>
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
                     class="ml-3 d-flex justify-content-between pb-1 deporteOpcion"
                  >
                     <h5 class="titulo-dep">
                        {{ spo.name_SPORT }}
                     </h5>
                     <button
                        type="button"
                        class="btn quitar mr-3"
                        v-on:click="quitarNuevo(spo.name_SPORT)"
                     >
                        <i class="fa fa-minus"></i>
                     </button>
                  </div>
                  <div v-if="agregarDep">
                     <label for="Deporte" class="titulo_bln"
                        >Agregar Deporte</label
                     >
                     <select
                        name=""
                        class="form-control"
                        id="Deporte"
                        v-on:change="registrarNuevo()"
                        v-model="deporteNuevo"
                        required
                     >
                        <option
                           v-for="sport in sports"
                           :key="sport.id"
                           :value="sport.name_SPORT"
                        >
                           {{ sport.name_SPORT }}
                        </option>
                     </select>
                  </div>
                  <div class="d-flex justify-content-center">
                     <button
                        type="button"
                        class="btn btn-success agregar m-1"
                        v-on:click="agregarDeporte()"
                     >
                        <i class="fa fa-plus"></i>
                     </button>
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
      <!-- MODAL -->
      <vue-toastr ref="mytoast"></vue-toastr>
      <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
   </div>
</template>

<script>
import NavBar from "./header/NavBar";
import axios from "axios";
import ConfirmDialogue from "../components/modal/ConfirmDialogue";
// import { events } from "../fake-data";
export default {
  name: "Welcome",
  components: {
    NavBar,
    ConfirmDialogue,
    "vue-toastr": window.VueToastr,
  },
  data: function () {
    return {
      username: "",
      events: null,
      sports: null,
      isActive: false,
      nombreEvento: "",
      deporteEvento: "",
      organizadorEvento: "",
      fechaEvento: "",
      horaEvento: "",
      locacionEvento: "",
      userSport: null,
      agregarDep: false,
      deporteNuevo: "",
    };
  },
  created: function () {
    this.username = this.$route.params.username;
  },
  mounted() {
    this.getEvents();
    this.getUserSports();
    this.getSports();
    this.$refs.mytoast.defaultPosition = "toast-bottom-right";
  },
  methods: {
    getEvents() {
      // console.log(this.username, "hola", self.username);
      axios
        .get("https://wise-brook-308119.ue.r.appspot.com/userevents/?user=" + this.username)
        .then((response) => {
          // axios
          // .get("http://localhost:8081/userevents/?user=" + this.username)
          // .then((response) => {
          console.log(response);
          this.events = response.data;
        })
        .catch((e) => console.log(e));
    },
    getUserSports() {
      // console.log(this.username, "hola", self.username);
      axios
        .get("https://wise-brook-308119.ue.r.appspot.com/usersports/?user=" + this.username)
        .then((response) => {
          // axios
          //    .get("http://localhost:8081/usersports/?user=" + this.username)
          //    .then((response) => {
          console.log(response);
          this.userSport = response.data;
        })
        .catch((e) => console.log(e));
    },
    getSports() {
      axios
        // .get("http://localhost:8081/sports")
        .get("https://wise-brook-308119.ue.r.appspot.com/sports")
        .then((response) => {
          console.log(response);
          this.sports = response.data;
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
    agregarDeporte() {
      this.agregarDep = true;
    },
    registrarNuevo() {
      var band = false;
      // console.log("tam" + this.userSport.length);
      for (var i = 0; i < this.userSport.length; i++) {
        if (this.userSport[i].name_SPORT == this.deporteNuevo) {
          band = true;
          // console.log("entrooooo");
        }
        // console.log("holiwi" + band + this.userSport[i].name_SPORT + this.deporteNuevo);
      }

      if (band) {
        alert("Escoja otro deporte");
      } else {
        axios
          .post(
            "https://wise-brook-308119.ue.r.appspot.com/usersportsreg/?user=" +
              this.username +
              "&sport=" +
              this.deporteNuevo
          )
          // .get("http://localhost:8081/sports")
          .then((response) => {
            // axios
            //    .post(
            //       "http://localhost:8081/usersportsreg/?user=" +
            //          this.username +
            //          "&sport=" +
            //          this.deporteNuevo
            //    )
            //    // .get("http://localhost:8081/sports")
            //    .then((response) => {
            console.log(response);
            // this.userSport = response.data;
            // this.$forceUpdate();
            alert("Se agrego un nuevo deporte");
            location.href = "../";
          })
          .catch((e) => console.log(e));

        this.agregarDep = false;
      }
    },
    quitarNuevo(deporte) {
      axios
        .delete(
          "https://wise-brook-308119.ue.r.appspot.com/usersportsdel/?user=" +
            this.username +
            "&sport=" +
            deporte
        )
        .then((response) => {
          // axios
          //    .delete(
          //       "http://localhost:8081/usersportsdel/?user=" +
          //          this.username +
          //          "&sport=" +
          //          deporte
          //    ).then((response) => {
          alert("deporte eliminado correctamente");
          location.href = "../";
        })
        // .get("http://localhost:8081/sports")
        // .then((response) => {
        //    console.log(response);
        //    this.userSport = response.data;
        //    // this.$forceUpdate();
        //    // alert("Se agrego un nuevo deporte");
        // })
        .catch((e) => console.log(e));

      this.agregarDep = false;

      // console.log("hola" + deporte);
    },
    async delEvent(event) {
      // this.printHello()
      const ok = await this.$refs.confirmDialogue.show({
        title: "Eliminar Evento",
        message:
          "¿Está seguro que desea eliminar el Evento? </br> Esta acción es irreversible.",
        okButton: "Eliminar",
      });
      // If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
        try {
          await axios.delete(
            "https://wise-brook-308119.ue.r.appspot.com/NoEvent?id_event=" +
              event.id_EVENT
          );
          document.getElementById(event.id_EVENT).remove();
          this.success("Evento eliminado");
          setTimeout(() => {
            location.reload();
          }, 1000);
        } catch (error) {
          this.error("Error eliminando evento");
        }
      } else {
      }
    },
    success(msg) {
      this.$refs.mytoast.s({
        msg: msg,
        progressbar: false,
      });
    },
    error(msg) {
      this.$refs.mytoast.e({
        msg: msg,
        progressbar: false,
      });
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
.titulo-dep {
   color: #fff;
}
.agregar {
   border-radius: 100%;
   color: #fff;
   background-color: rgba(0, 0, 0, 0);
   border-color: rgba(0, 0, 0,0);
}
.agregar:hover{
   background-color: green;
}
.quitar {
   border-radius: 100%;
   color: #fff;
   padding: 0px 12px 0px 12px;
}
.quitar:hover{
   background-color:#a12121;
}
</style>
