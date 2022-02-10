<template>
  <div class="user">
    <NavBar :username="username" :role="role"/>
    <Websocket />
    <div class="row mx-auto">
      <div class="mx-auto">
        <span class="hola"
          >Hola, <span class="fullName">{{ username }}</span></span
        >
          <button class="btn p-0 mr-auto text-secondary changePasswordButton" data-toggle="modal" data-target="#emailModal" v-on:click="form.email='';form.emailConf=''">
            <i class="fa fa-cog changePasswordIcon"></i>
            <span class="text-secondary changePasswordText"><small>Cambiar contraseña</small></span>
          </button>
        
      </div>
    </div>
    <div class="plantilla">
      <div class="container contenedor_p">
        <div class="row">
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
                  <a
                    class="titulo-noti-btn"
                    href="#"
                    v-on:click="
                      pop = 'notificacion';
                      mostrar(noti, true);
                    "
                    >{{ noti.name_SPORT }}</a
                  >
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
          <div class="col-md-8">
            <div class="tabla-eve">
              <div class="position-relative">
                <button
                    class="btn arrowEvents"
                    style="left:15px;"
                    title="Anterior"
                    v-if="events.length>10 && initEventPage>=10"
                    v-on:click="initEventPage = initEventPage-10; getNextEvents()"
                  >
                    <i class="fa fa-caret-left"></i>
                </button>
                <h3 class="titulo-tablas">Proximos Eventos</h3>
                <button
                    class="btn arrowEvents"
                    style="right:15px;"
                    title="Siguiente"
                    v-if="events.length > 10 && initEventPage+10<events.length"
                    v-on:click="initEventPage = initEventPage+10; getNextEvents()"
                  >
                    <i class="fa fa-caret-right"></i>
                </button>
              </div>
              <hr />
              <div class="row ml-4 mr-4 d-flex bd-highlight">
                <div
                  v-for="event in nextEvents"
                  :key="event.id"
                  class="tar-evento flex-fill bd-highlight"
                  v-on:click="
                        pop = 'evento';
                        mostrar(event, true);
                      "
                >
                  <h5 class="info-titulo">
                    <a
                      href="#"
                      class="info-titulo-ref"
                      
                      >{{ event.event_TITLE }}</a
                    >
                  </h5>
                  <p class="info-fecha">fecha: {{ event.event_INIT }}</p>
                  <p class="info-hora-lugar">
                    hora: {{ event.event_INIT_HOUR }} Lugar:
                    {{ event.name_LOC_SPORT }}
                    <!--<a class="detalles" href="#">Detalles</a>-->
                  </p>
                </div>
              </div>
              <hr />
            </div>

            <div class="tabla-eve">
              <h3 class="titulo-tablas">Eventos a Asistir</h3>
              <hr />
              <div class="row ml-4 mr-4 d-flex bd-highlight">
                <div
                  v-for="event in eventosAsistir"
                  :key="event.id"
                  class="tar-evento flex-fill bd-highlight"
                >
                  <div class="d-flex justify-content-between">
                    <h5 class="info-titulo">
                      <a
                        href="#"
                        class="info-titulo-ref"
                        v-on:click="
                          pop = 'evento';
                          mostrar(event, false);
                        "
                        >{{ event.event_TITLE }}</a
                      >
                    </h5>
                    <button
                      type="button"
                      class="btn quitar mr-3"
                      v-on:click="noAsistir(event.id_EVENT, event.event_TITLE)"
                    >
                      <i class="fa fa-minus"></i>
                    </button>
                  </div>

                  <p class="info-fecha">fecha: {{ event.event_INIT }}</p>
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
    <div class="overlay" v-bind:class="{ active: isActive }">
      <div class="popup">
        <div class="">
          <a
            href="#"
            id="btn-cerrar-popup"
            class="btn-cerrar-popup"
            v-on:click="ocultar()"
          >
            <h4>&times;</h4>
          </a>
          <div v-if="pop == 'notificacion'">
            <h3>Notificacion</h3>
          </div>
          <div v-if="pop == 'evento'">
            <h3>Detalles del evento</h3>
          </div>
        </div>
        <div v-if="pop == 'notificacion'">
          <!-- <h3>Notificacion</h3> -->
          <hr />

          <div class="mx-auto w-75">
            <div class="row mb-3">
              <h5 class="col-12 text-center">{{ descripcionNoti[0] }}!!!</h5>     
            </div>
            <div class="row">
              <h6 class="col-4 text-right">Titulo:</h6>
              <p class="col-8 m-0 text-left">{{ descripcionNoti.slice(1, descripcionNoti.length)[0] }}</p>
            </div>
            <div class="row">
              <h6 class="col-4 text-right">Deporte:</h6>
              <p class="col-8 m-0 text-left">{{ deporteNoti }}</p>
            </div>
            <div class="row">
              <h6 class="col-4 text-right">Fecha:</h6>
              <p class="col-8 m-0 text-left">{{ fechaNoti }}</p>
            </div>
            <div class="row">
              <h6 class="col-4 text-right">Hora:</h6>
              <p class="col-8 m-0 text-left">{{ horaNoti }}</p>
            </div>
          </div>
          <hr />
          <div id="boton-asistir">
            <button type="button" class="btn btn-primary" @click="asistir()">
              Asistir
            </button>
          </div>
        </div>
        <div v-if="pop == 'evento'">
          <!-- <h3>Detalles del evento</h3> -->
          <hr />
          <div class="mx-auto w-75">
            <div class="row">
              <h6 class="col-4 text-right">Nombre:</h6>
              <p class="col-8 m-0 text-left">{{ nombreEvento }}</p>
            </div>
            <div class="row">
              <h6 class="col-4 text-right">Deporte:</h6>
              <p class="col-8 m-0 text-left">{{ deporteEvento }}</p>
            </div>
            <div class="row">
              <h6 class="col-4 text-right">Organizador:</h6>
              <p class="col-8 m-0 text-left">{{ organizadorEvento }}</p>
            </div>
            <div class="row">
              <h6 class="col-4 text-right">Fecha:</h6>
              <p class="col-8 m-0 text-left">{{ fechaEvento }}</p>
            </div>
            <div class="row">
              <h6 class="col-4 text-right">Hora:</h6>
              <p class="col-8 m-0 text-left">{{ horaEvento }}</p>
            </div>
            <div class="row">
              <h6 class="col-4 text-right">Locación:</h6>
              <p class="col-8 m-0 text-left">{{ locacionEvento }}</p>
            </div>
          </div>
          <hr />
          <div v-if="mostrarBotonAsis">
            <div id="boton-asistir">
              <button type="button" class="btn btn-primary" @click="asistir()">
                Asistir
              </button>
              <div class="btn-group mx-0 text-secondary" role="group">|</div>
              <button
                @click="reportEvent()"
                class="btn btn-danger"
                title="Reportar"
              >
                <!-- Borrar -->
                <i class="fa fa-thumbs-down"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Email Modal -->
    <div class="modal fade" id="emailModal" tabindex="-1" role="dialog" aria-labelledby="emailModalTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Cambiar contraseña</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="text-justify">Ingresa el correo electrónico que registraste en OriUN</p>
            <form class="mx-auto" style="width:90%">
              <div class="form-group row">
                  <label class="col-md-5 h5 col-form-label text-right" for="emailBox">Correo</label>
                  <input v-model="form.email" v-on:input="validateEmail()" class="col-md-5 form-control" type="email" id="emailBox" autocomplete="off" required>
              </div>
              <div class="form-group row">
                  <label class="col-md-5 h5 col-form-label text-right" for="confEmailBox">Confirmar correo</label>
                  <input v-model="form.emailConf" v-on:input="checkConfirmation()" class="col-md-5 form-control" type="email" id="confEmailBox" autocomplete="off" required>
              </div>
            </form>
            <p class="text-justify">Te enviaremos un enlace que te permitirá cambiar de contraseña.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" v-on:click="submitFormEmail()">Enviar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/header/NavBar";
import axios from "axios";
import Websocket from "../components/Websocket";
import { toaster } from "./toaster/toaster";

export default {
  name: "Users",
  components: {
    NavBar,
    Websocket,
  },
  props: ["role"],
  watch: {
    newNotification() {
      this.notifications.unshift(this.newNotification[0]);
    },
  },
  data: function () {
    return {
      username: "",
      events: [],
      nextEvents: [],
      notifications: [],
      isActive: false,
      nombreEvento: "",
      descripcionNoti: [],
      deporteNoti: "",
      fechaNoti: "",
      horaNoti: "",
      pop: "",
      deporteEvento: "",
      organizadorEvento: "",
      fechaEvento: "",
      horaEvento: "",
      locacionEvento: "",
      newNotification: [],
      eventosAsistir: [],
      id_user: "",
      id_asistencia: "",
      puedoAsistir: false,
      mostrarBotonAsis: false,
      initEventPage: 0,
      toaster,
      form: { 
        email: '',
        emailConf: '',
      },
      emailConfirmated: false,
      emailValid: false,
    };
  },
  created: function () {
    this.username = this.$route.params.username;
    this.role = this.role
  },
  mounted() {
    this.getNextEvents();
    this.getEvents();
    this.getNotifications();
    this.$root.$on("sportNotifications", (sportNotifications) => {
      console.log("RECEIVED!!!!");
      this.newNotification = JSON.parse(sportNotifications);
      console.log(
        "Received data: ",
        typeof this.newNotification,
        this.newNotification
      );
      this.notify();
    });
    this.getMisEventos();
  },
  methods: {
    getNextEvents() {
      axios
        .get(this.$apiURL + "/events?init="+this.initEventPage+"&size=10", self.username)
        .then((response) => {
          this.nextEvents = response.data;
        })
        .catch((e) => console.log(e));
    },
    getEvents() {
      axios
        .get(this.$apiURL + "/events?init="+this.initEventPage+"&size=10000", self.username)
        .then((response) => {
          this.events = response.data;
        })
        .catch((e) => console.log(e));
    },
    getNotifications() {
      axios
        .get(this.$apiURL + "/usernotifications/?user=" + this.username)
        .then((response) => {
          this.notifications = response.data;
        })
        .catch((e) => console.log(e));
    },

    mostrar(object, boton) {
      this.isActive = true;
      this.id_asistencia = object.id_EVENT;

      if (boton == true) {
        this.mostrarBotonAsis = true;
      } else {
        this.mostrarBotonAsis = false;
      }

      if (this.pop == "notificacion") {
        this.fechaNoti = object.notification_DATE;
        this.descripcionNoti = object.notification_DESCRIPTION.split(":");
        this.deporteNoti = object.name_SPORT;
        this.horaNoti = object.time_NOTIFICATION;
      } else if (this.pop == "evento") {
        console.log(object);
        this.nombreEvento = object.event_TITLE;
        this.deporteEvento = object.name_SPORT;
        this.organizadorEvento = object.user_NAME;
        this.fechaEvento = object.event_INIT;
        this.horaEvento = object.event_INIT_HOUR;
        this.locacionEvento = object.name_LOC_SPORT;
      }
    },
    ocultar() {
      this.isActive = false;
    },
    updateNotifications() {
      console.log("NOTIFICATIONS HAVE CHANGED");
      console.log("this.newNotification: ", this.newNotification);
      console.log("this.notifications", this.notifications);
    },
    notify() {
      var title = "OriUN - Evento de " + this.newNotification[0].name_SPORT;
      // var icon = "../assets/oriun.png";
      var icon =
        "https://drive.google.com/uc?export=view&id=1kMJupb5dGtHu-zEQ4xqlktpQHWYfFdJG";
      // var icon = "https://pics.freeicons.io/uploads/icons/png/5205410931579605509-512.png";
      var body = this.newNotification[0].notification_DESCRIPTION;
      // Let's check if the browser supports notifications
      console.log("We have send you a notification!!!");
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }

      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        this.createNotification(body, icon, title);
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            this.createNotification(body, icon, title);
          }
        });
      }

      // At last, if the user has denied notifications, and you
      // want to be respectful there is no need to bother them any more.
    },
    createNotification(theBody, theIcon, theTitle) {
      var options = {
        body: theBody,
        icon: theIcon,
      };
      var n = new Notification(theTitle, options);
      setTimeout(n.close.bind(n), 5000);
    },
    getMisEventos() {
      axios
        .get(this.$apiURL + "/userassistanceevents?user=" + this.username)
        .then((response) => {
          this.eventosAsistir = response.data;
        })
        .catch((e) => console.log(e));
    },
    noAsistir(id, nombre) {
      let mensaje = "¿Desea dejar de asisitir a este evento: " + nombre + " ?";

      if (window.confirm(mensaje)) {
        axios
          .delete(
            this.$apiURL + "/LeaveEvent?id_user=" +
              this.username +
              "&id_event=" +
              id
          )
          .then((response) => {
            alert("Ya no asistes a ese evento!");
            location.reload(true);
          })
          .catch((e) => console.log(e));
      }
    },
    asistir() {
      let self = this;
      axios
        .post(
          this.$apiURL + "/asistirevent?id_user=" +
            self.username +
            "&id_event=" +
            self.id_asistencia
        )
        .then((result) => {
          self.puedoAsistir = result.data;
          //  if (self.puedoAsistir == true) {
          //    alert("El usuario ha sido regitrado el evento con exito");
          //  } else {
          //    alert("El Usuario ya estaba registrado en el evento");
          //  }
          //    alert("El usuario ha sido regitrado el evento con exito");
          alert("El usuario ha sido regitrado el evento con exito");
          location.reload(true);
        })
        .catch((error) => {
          self.isLoadingEvent = false;
          if (error.response.status == "507") {
            alert("El evento ya ha superado el limite de asistentes");
          }else if(error.response.status == "409"){
            alert("El Usuario ya estaba registrado en el evento");
          }else {
            alert("Error asistiendo al evento");
          }
        });
    },
    reportEvent(){
      axios
      .post(this.$apiURL + "/Reportarevento", {id_EVENT: this.id_asistencia, user_NAME: this.username})
      .then(()=>{
        this.toaster.success("Has reportado un evento como inadecuado");
      })
      .catch((error)=>{
        this.toaster.failure("Error reportando el evento");
        alert(error)
      });
      this.ocultar();
    },
    changePassword(){
      alert("Changing Password")
    },
    checkConfirmation(){
      if(this.form.email === this.form.emailConf){
        try {
          document.getElementById("confEmailBox").classList.add("is-valid");
          document.getElementById("confEmailBox").classList.remove("is-invalid");
        } catch (error) {}
        this.emailConfirmated = true;
      }else{
        try {
          document.getElementById("confEmailBox").classList.add("is-invalid");
          document.getElementById("confEmailBox").classList.remove("is-valid");
        } catch (error) {}
        this.emailConfirmated = false;
      }
    },
    validEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validateEmail() {
      if(this.form.email!=''){
        const email = this.form.email;
        if (this.validEmail(email)) {
          try {
            document.getElementById("emailBox").classList.add("is-valid");
            document.getElementById("emailBox").classList.remove("is-invalid");
          } catch (error) {}
          this.emailValid = true;
        } else {
          try {
            document.getElementById("emailBox").classList.add("is-invalid");
            document.getElementById("emailBox").classList.remove("is-valid");
          } catch (error) {}
          this.emailValid = false;
        }
      }else{
        this.emailValid = false;
      }
    },
    submitFormEmail(){
      if(this.emailValid){
        if(!(this.form.email==this.form.emailConf)){
          this.toaster.failure("Los correos no coinciden");    
        }else{
          axios
          .post(this.$apiURL + "/password-change?email="+this.form.email)
          .then(() => {
              this.toaster.success("Se te ha enviado un correo para que cambies tu contraseña");
              $("#emailModal .close").click();
          })
          .catch((error) => {
              if(error.response.status == 422){
                  this.toaster.failure("Correo NO registrado");  
              }else{
                this.toaster.failure("Hubo un error enviando el correo");
              }            
          });
        }
      }else{
        if(this.form.email == ""){
          this.toaster.failure("Ingresa el correo que registraste en OriUN");  
        }else if(this.form.emailConf == ""){
          this.toaster.failure("Confirma tu correo");  
        }else{
          this.toaster.failure("Correo NO registrado");  
        }
      }
    }
  },
};
</script>

<style scoped>
.fullName {
  color: #212529;
  margin-left: 20px;
  font-size: 26pt;
}

.hola {
  color: #7a7a7a;
  font-size: 20pt;
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
.plantilla .contenedor_p .tabla-eve .tar-evento:hover{
  cursor: pointer;
  background: #324D2D;
}
.plantilla .contenedor_p .tabla-eve .tar-evento .info-titulo {
  padding: 10px 0px 0px 15px;
  color: #fff;
}
.plantilla .contenedor_p .tabla-eve .tar-evento .info-titulo-ref {
  text-decoration: none;
  color: #fff;
}
.plantilla .contenedor_p .tabla-eve .tar-evento .info-titulo-ref:hover {
  text-decoration: underline;
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
  position: relative;
}
.overlay .popup .btn-cerrar-popup {
  color: #bbbbbb;
  position: absolute;
  right: 30px;
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

.quitar {
  border-radius: 100%;
  color: #fff;
  padding: 0px 12px 0px 12px;
}

.changePasswordButton{
  width: 20px;
  position: relative;
  left: 25px;
  bottom: 4px;
  
}
.changePasswordButton .changePasswordText{
  display: none;
  border-radius: 6px;
  width: 120px;
  position: absolute;
  z-index: 1;
  left: 20px;
  bottom: 2px;
  opacity: 0;
  transition: opacity 0.5s;
}

.changePasswordButton:hover .changePasswordIcon{
  transform: rotate(0.25turn);
  transition: 0.2s;
}

.changePasswordButton:hover .changePasswordText {
  display: inline;
  opacity: 1;
}

.changePasswordIcon{
  font-size: 16pt;
}

.arrowEvents{
  font-size:24pt;
  position: absolute;
  top: 0px;
  height: 40px;

}
.btn.arrowEvents:focus, .changePasswordButton:focus {
  outline: none;
  box-shadow: none;
}
.arrowEvents:hover{
  font-size:26pt;
  top: -1pt;
  transition: 0.2s;
}
/* .popup.active{

} */

/*# sourceMappingURL=usuario.css.map */
</style>
