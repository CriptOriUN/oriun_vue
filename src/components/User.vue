<template>
  <div class="user">
    <NavBar :username="username" />
    <div id="thewelcome" class="container">
      <h6 class="mx-auto">
        Hola,
        <h2>{{ username }}</h2>
      </h6>
      <button type="button" class="icon-button mt-3 mr-5">
        <span class="material-icons">notifications</span>
        <span class="icon-button__badge">{{ notifications.length }}</span>
      </button>
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
                  <a class="titulo-noti-btn" href="#">{{ noti.name_SPORT }}</a>
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
                  <h5 class="info-titulo">{{ event.event_TITLE }}</h5>
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
  </div>
</template>

<script>
import NavBar from "../components/header/NavBar";
import axios from "axios";

export default {
  name: "Users",
  components: {
    NavBar,
  },
  data: function () {
    return {
      username: "",
      events: null,
      notifications: [],
      allnotifications: [],
      userSports: [],
    };
  },
  created: function () {
    this.username = this.$route.params.username;
  },
  mounted() {
    // console.log('holanda')

    // this.push().then(() => {
      this.getEvents();
      this.getUserSports();
    // });

    // this.getAllNotifications();
    this.getNotifications();

    // this.test();
  },
  methods: {
    getEvents() {
      console.log("GET EVENT");
      axios
        .get(
          "http://localhost:8081/events/",
          //  "https://wise-brook-308119.ue.r.appspot.com/events/",
          self.username
        )
        .then((response) => {
          console.log(response);
          this.events = response.data;
        });
      // .catch((e) => console.log(e));
    },
    getUserSports() {
      console.log("GET USER SPORTS");
      axios
        .get(
          "http://localhost:8081/usersports" +
            //  "https://wise-brook-308119.ue.r.appspot.com/usersports" +
            "?user=" +
            this.username
        )
        .then((response) => {
          this.userSports = response.data;
          console.log("UserSports:", this.userSports);
          console.log("Length user Sports: ", this.userSports.length);
          console.log("Lenght: ", this.allnotifications.length);
          // this.getNotifications();
        });
    },
    // getAllNotifications() {
    //   console.log('GET ALL NOTIFICATIONS');
    //    axios
    //    .get("http://localhost:8081/notifications")
    //    .then((response) => {
    //       // console.log(response);
    //       this.allnotifications = response.data;
    //       console.log("Lenght All Notifications: ",this.allnotifications.length);
    //     })

    // },
    // getNotifications() {
    //   console.log("GET NOTIFICATIONS");
    //   console.log("Lenght All Notifications: ", this.allnotifications.length);
    //   this.notifications = [];
    //   for (var i = 0; i < this.allnotifications.length; i++) {
    //     if (this.allnotifications[i].name_SPORT in this.userSports) {
    //       this.notifications.concat(this.allnotifications[i]);
    //     }
    //   }
    // },
    // async push() {
    //   var source = new EventSource("http://localhost:8081/push");
    //   source.onmessage = function (event) {
    //     let data = JSON.parse(event.data);
    //     this.allnotifications = data;
    //     console.log("running");
    //   };
    // },
    getNotifications() {
      axios
        .get(
          "http://localhost:8081/usersports" +
            //  "https://wise-brook-308119.ue.r.appspot.com/usersports" +
            "?user=" +
            this.username
        )
        .then((response) => {
          this.userSports = response.data;
          // console.log(userSports)
          for (var i = 0; i < this.userSports.length; i++) {
            axios
              .get(
                "http://localhost:8081/sportnotifications" +
                  //  "https://wise-brook-308119.ue.r.appspot.com/sportnotifications" +
                  "?sport=" +
                  this.userSports[i].name_SPORT
              )
              .then((response) => {
                this.notifications = this.notifications.concat(response.data);
                // console.log(this.sportNotifications);
              });
          }
          // console.log(sportNotifications);
        });
    },
    // test() {
    //   // var source = new EventSource("push");
    //   // var source = new EventSource("https://wise-brook-308119.ue.r.appspot.com/push");
    //   var source = new EventSource("http://localhost:8081/push");
    //   // console.log("source", source);

    //   source.onmessage = function (event) {
    //     // console.log("Hola");
    //     let data = JSON.parse(event.data);
    //     // console.log(data.length)
    //     this.allnotifications = data;
    //     // document.getElementById("fecha").innerHTML = data.substr(0, 10);
    //     // document.getElementById("hora").innerHTML = data.substr(11, 8);
    //     // console.log("data: ", data);
    //   };
    // },
  },
};


// 

// import { RSocketClient, JsonSerializer, IdentitySerializer } from 'rsocket-core';
// import RSocketWebSocketClient from 'rsocket-websocket-client';

// // backend ws endpoint
// const wsURL = 'ws://localhost:6565/rsocket';

// // rsocket client
// const client = new RSocketClient({
//     serializers: {
//         data: JsonSerializer,
//         metadata: IdentitySerializer
//     },
//     setup: {
//         keepAlive: 60000, 
//         lifetime: 180000,
//         dataMimeType: 'application/json',
//         metadataMimeType: 'message/x.rsocket.routing.v0',
//     },
//     transport: new RSocketWebSocketClient({
//         url: wsURL
//     })
// });

// // error handler
// const errorHanlder = (e) => console.log(e);
// // response handler
// const responseHanlder = (payload) => {
//     const li = document.createElement('li');
//     li.innerText = payload.data;
//     li.classList.add('list-group-item', 'small')
//     document.getElementById('result').appendChild(li);
// }

// // request to rsocket-websocket and response handling
// const numberRequester = (socket, value) => {
//     socket.requestStream({
//         data: value,
//         metadata: String.fromCharCode('number.stream'.length) + 'number.stream'
//     }).subscribe({
//         onError: errorHanlder,
//         onNext: responseHanlder,
//         onSubscribe: subscription => {
//             subscription.request(100); // set it to some max value
//         }
//     })
// }

// // once the backend connection is established, register the event listeners
// client.connect().then(socket => {
//     document.getElementById('n').addEventListener('change', ({srcElement}) => {
//         numberRequester(socket, parseInt(srcElement.value));
//     })
// }, errorHanlder);


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

.icon-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  color: #333333;
  background: #dddddd;
  border: none;
  outline: none;
  border-radius: 50%;
}

.icon-button:hover {
  cursor: pointer;
}

.icon-button:active {
  background: #cccccc;
}

.icon-button__badge {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 25px;
  height: 25px;
  background: red;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
/*# sourceMappingURL=usuario.css.map */
</style>
