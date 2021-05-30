<template>
  <div class="user">
    <NavBar :username="username" />
    <Websocket />
    <div id="thewelcome">
      <h6>
        Hola,
        <h2>{{ username }}</h2>
      </h6>
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
                      mostrar(noti);
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
              <h3 class="titulo-tablas">Proximos Eventos</h3>
              <hr />
              <div class="row ml-4 mr-4 d-flex bd-highlight">
                <div
                  v-for="event in events"
                  :key="event.id"
                  class="tar-evento flex-fill bd-highlight"
                >
                  <h5 class="info-titulo">
                    <a
                      href="#"
                      class="info-titulo-ref"
                      v-on:click="
                        pop = 'evento';
                        mostrar(event);
                      "
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
        <div v-if="pop == 'notificacion'">
          <h3>Notificacion</h3>
          <h6>Nombre Evento: {{ nombreEvento }}</h6>
          <h6>Descripción: {{ descripcionNoti }}</h6>
          <h6>Deporte: {{ deporteNoti }}</h6>
          <h6>Hora: {{ horaNoti }}</h6>
        </div>
        <div v-if="pop == 'evento'">
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
  </div>
</template>

<script>
import NavBar from "../components/header/NavBar";
import axios from "axios";
import Websocket from "../components/Websocket";

export default {
  name: "Users",
  components: {
    NavBar,
    Websocket,
  },
  watch: {
    newNotification() {
      this.notifications.unshift(this.newNotification[0]);
    },
  },
  data: function () {
    return {
      username: "",
      events: null,
      notifications: null,
      isActive: false,
      nombreEvento: "",
      descripcionNoti: "",
      deporteNoti: "",
      horaNoti: "",
      pop: "",
      deporteEvento: "",
      organizadorEvento: "",
      fechaEvento: "",
      horaEvento: "",
      locacionEvento: "",
      newNotification: null,
    };
  },
  created: function () {
    this.username = this.$route.params.username;
  },
  mounted() {
    // console.log('holanda')
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
  },
  methods: {
    getEvents() {
      // console.log('codigo get')
      axios
        .get("https://wise-brook-308119.ue.r.appspot.com/events?init=1&size=-1", self.username)
        .then((response) => {
          // axios
          //    .get("http://localhost:8081/events?init=1&size=-1/", self.username)
          //    .then((response) => {
          // console.log(response);
          this.events = response.data;
        })
        .catch((e) => console.log(e));
    },
    getNotifications() {
      // console.log("codigo get");
      axios
        .get("https://wise-brook-308119.ue.r.appspot.com/usernotifications/?user=" + this.username)
        .then((response) => {
          // axios
          //    .get("http://localhost:8081/usernotifications/?user="+ this.username)
          // .then((response) => {
          console.log(response);
          this.notifications = response.data;
        })
        .catch((e) => console.log(e));
    },

    mostrar(objet) {
      this.isActive = true;
      if (this.pop == "notificacion") {
        this.descripcionNoti = objet.notification_DESCRIPTION;
        this.deporteNoti = objet.name_SPORT;
        this.horaNoti = objet.time_NOTIFICATION;
      } else if (this.pop == "evento") {
        console.log(objet);
        this.nombreEvento = objet.event_TITLE;
        this.deporteEvento = objet.name_SPORT;
        this.organizadorEvento = objet.user_NAME;
        this.fechaEvento = objet.event_INIT;
        this.horaEvento = objet.event_INIT_HOUR;
        this.locacionEvento = objet.name_LOC_SPORT;
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
      var title = "OriUN - Evento de "+this.newNotification[0].name_SPORT;
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
      console.log("Notificacion!!!!!");
    },
  },
};
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

/* .popup.active{

} */

/*# sourceMappingURL=usuario.css.map */
</style>
