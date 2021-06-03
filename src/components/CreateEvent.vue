<template>
  <div class="createevent">
    <NavBar :username="username" />

    <div class="container d-flex justify-content-center">
      <div class="row my-3 pt-4">
        <h2 class="titulo_prin">Crear evento</h2>
      </div>
    </div>

    <div class="container pt-4">
      <div class="row my-3 justify-content-center">
        <div class="col-md-7 col-10 back pl-4 pr-4">
          <h3 class="titulos tit-det pt-4 pb-4">Detalles Generales</h3>

          <form action="">
            <label for="titulo" class="titulo_bln">Titulo Del Evento</label>

            <input
              type="Text"
              class="form-control mb-4"
              id="event_TITLE"
              placeholder="Titulo"
              v-model="eventForm.event_TITLE"
              required
            />

            <label for="descripcion" class="titulo_bln"
              >Descripción del Evento</label
            >

            <textarea
              name="descripcion"
              id="descripcion_ce"
              class="form-control descripcion mb-4"
              v-model="eventForm.event_DESCRIPTION"
              placeholder="Descripción"
              required
            ></textarea>

            <label for="hora" class="titulo_bln subtitulo">Fecha</label>

            <div class="row">
              <div class="col-6">
                <label for="fecha-inicio" class="titulo_bln"
                  >Fecha Inicial</label
                >

                <input
                  type="date"
                  class="form-control"
                  name="fecha_incio"
                  id="fecha_incio_ce"
                  v-model="eventForm.event_INIT"
                  v-on:change="hoy()"
                  required
                  min="2021-05-01"
                />
              </div>

              <div class="col-6">
                <label for="fecha-fin" class="titulo_bln">Fecha Final</label>

                <input
                  type="date"
                  class="form-control"
                  name="fin"
                  id="fecha_fin_ce"
                  v-model="eventForm.event_END"
                  min="2021-05-01"
                  required
                />
              </div>
            </div>

            <label for="hora" class="titulo_bln subtitulo">Hora</label>

            <div class="row">
              <div class="col-6">
                <label for="hora-inicio" class="titulo_bln">Hora Inicial</label>

                <input
                  type="time"
                  class="form-control mb-4"
                  name="hora_incio"
                  id="horaIni"
                  v-model="eventForm.event_INIT_HOUR"
                  required
                />
              </div>

              <div class="col-6">
                <label for="hora-fin" class="titulo_bln">Hora Final</label>

                <input
                  type="time"
                  class="form-control mb-4"
                  name="hora"
                  id="horaFin"
                  v-model="eventForm.event_FINISH_HOUR"
                  required
                />
              </div>
            </div>

            <label for="Deporte" class="titulo_bln">Deporte</label>

            <input
              type="text"
              class="form-control"
              id="Deporte"
              v-model="eventForm.name_SPORT"
              @input="filterSports"
              @focus="modal = true"
              required
            />

            <div id="sportsList" v-if="filteredSports.length > 0 && modal">
              <ul class="sportsList">
                <li
                  v-for="sport in filteredSports"
                  :key="sport.id"
                  @click="setSport(sport)"
                >
                  {{ sport }}
                </li>
              </ul>
            </div>

            <div
              id="sportsList"
              v-if="
                filteredSports.length == 0 &&
                modal &&
                eventForm.name_SPORT != ''
              "
            >
              <ul class="sportsList">
                <li @click="setSport('Otro')">Otro</li>
              </ul>
            </div>

            <label
              for="otroDep"
              class="titulo_bln"
              v-if="this.eventForm.name_SPORT == 'Otro'"
              >Otro Deporte</label
            >

            <input
              v-if="this.eventForm.name_SPORT == 'Otro'"
              type="Text"
              class="form-control mb-4"
              id="other_SPORT"
              placeholder="Deporte"
              v-model="eventForm.other_SPORT"
              required
            />

            <label for="Capacidad" class="titulo_bln">Capacidad</label>

            <input
              type="number"
              v-model="eventForm.capacity"
              required
              class="form-control"
              min="1"
              max="100"
            />

            <div class="row mt-2">
              <div class="col">
                <h3 class="titulo_lugares tit-det titulo_bln titulos">
                  Lugares Disponibles
                </h3>
              </div>
            </div>

            <div class="row py-4 seccion">
              <div
                v-for="(loc, index) in locations"
                :key="index"
                class="col-12 col-sm-6 col-lg-3 mb-4"
              >
                <!-- <a href="#">

                                <img class="card-img" src="images/1.jpg" alt="">

                            </a>

                            <a href="#" onclick="return false;" >

                                <h3 class="nombre-lugar">{{loc.name_LOCATION}}</h3>

                            </a> -->

                <button
                  v-on:click="eventLoc(loc.name_LOC_SPORT)"
                  class="nombre-lugar"
                  :id="'button' + index"
                  type="button"
                >
                  {{ loc.name_LOC_SPORT }}
                </button>
              </div>
            </div>
          </form>

          <div class="col d-flex flex-row-reverse seccion">
            <button
              v-on:click="submitEventForm()"
              class="btn boton mb-4"
              type="button"
            >
              Finalizar
            </button>
          </div>

          <!-- Testing Websocket -->

          <!-- <input v-model="IDeventCreated" type="text" />

          <button type="button" v-on:click="emitEvent();">Notify</button> -->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import NavBar from "../components/header/NavBar";
import axios from "axios";

export default {
  name: "CreateEvents",
  components: {
    NavBar,
  },
  data: function () {
    return {
      username: "",
      sports: [],
      locations: null,
      eventForm: {
        user_NAME: "",
        name_LOC_SPORT: "",
        name_SPORT: "",
        event_DESCRIPTION: "",
        event_INIT: "",
        event_END: "",
        capacity: 0,
        other_SPORT: null,
        event_INIT_HOUR: "",
        event_FINISH_HOUR: "",
        event_TITLE: "",
      },
      sportsNames: [],
      filteredSports: [],
      modal: false,
      IDeventCreated: null,
    };
  },
  created: function () {
    this.username = this.$route.params.username;
  },
  mounted() {
    this.getSports();
    this.getLocations();
    var fecha = new Date();
    var anio = fecha.getFullYear();
    var dia = fecha.getDate();
    var _mes = fecha.getMonth(); //viene con valores de 0 al 11
    _mes = _mes + 1; //ahora lo tienes de 1 al 12
    if (_mes < 10) {
      //ahora le agregas un 0 para el formato date
      var mes = "0" + _mes;
    } else {
      var mes = _mes.toString;
    }
    document.getElementById("fecha_incio_ce").min =
      anio + "-" + mes + "-" + dia;
    document.getElementById("fecha_fin_ce").min = anio + "-" + mes + "-" + dia;
  },
  methods: {
    getSports() {
      axios
        .get("https://wise-brook-308119.ue.r.appspot.com/sports")
        .then((response) => {
          console.log("SPORTS", response);
          this.sports = response.data;
          this.sports.forEach((sport) => {
            this.sportsNames.push(sport.name_SPORT);
          });
        })
        .catch((e) => console.log(e));
    },
    getLocations() {
      axios
        .get("https://wise-brook-308119.ue.r.appspot.com/locationssport")
        .then((response) => {
          // console.log("wihs", response);
          this.locations = response.data;
        })
        .catch((e) => console.log(e));
    },
    emitEvent() {
      console.log(this.IDeventCreated);
      this.$nextTick(() => {
        this.$root.$emit("eventCreated", this.IDeventCreated);
      });
    },

    hoy() {
      var fecha = new Date();
      var anio = fecha.getFullYear();
      var dia = fecha.getDate();
      var _mes = fecha.getMonth(); //viene con valores de 0 al 11
      _mes = _mes + 1; //ahora lo tienes de 1 al 12
      if (_mes < 10) {
        //ahora le agregas un 0 para el formato date
        var mes = "0" + _mes;
      } else {
        var mes = _mes.toString;
      }
      document.getElementById("fecha_fin_ce").min = this.eventForm.event_INIT;
      // console.log("llega aqui papu", this.eventForm.event_INIT);
    },
    submitEventForm: function () {
      console.log(JSON.stringify(this.eventForm));
      // this.eventForm.name_LOC_SPORT = "Cancha IEI";

      if (
        this.eventForm.event_TITLE == "" ||
        this.eventForm.event_TITLE == null ||
        this.eventForm.event_TITLE == " "
      ) {
        alert("El campo titulo esta vacio");
      } else if (
        this.eventForm.event_DESCRIPTION == "" ||
        this.eventForm.event_DESCRIPTION == null ||
        this.eventForm.event_DESCRIPTION == " "
      ) {
        alert("El campo Descripción esta vacio");
      } else if (
        this.eventForm.event_INIT == "" ||
        this.eventForm.event_INIT == null ||
        this.eventForm.event_INIT == " "
      ) {
        alert("El campo Fecha Inicial esta vacio");
      } else if (
        this.eventForm.event_END == "" ||
        this.eventForm.event_END == null ||
        this.eventForm.event_END == " "
      ) {
        alert("El campo Fecha Final esta vacio");
      } else if (
        this.eventForm.event_INIT_HOUR == "" ||
        this.eventForm.event_INIT_HOUR == null ||
        this.eventForm.event_INIT_HOUR == " "
      ) {
        alert("El campo Hora Inicial esta vacio");
      } else if (
        this.eventForm.event_FINISH_HOUR == "" ||
        this.eventForm.event_FINISH_HOUR == null ||
        this.eventForm.event_FINISH_HOUR == " "
      ) {
        alert("El campo Hora Final esta vacio");
      } else if (
        this.eventForm.name_SPORT == "" ||
        this.eventForm.name_SPORT == null ||
        this.eventForm.name_SPORT == " "
      ) {
        alert("El campo Deporte esta vacio");
      } else if (!this.sportsNames.includes(this.eventForm.name_SPORT)) {
        alert("Si el Deporte seleccionado no esta registrado, elige 'Otro'");
      } else if (
        this.eventForm.capacity == "" ||
        this.eventForm.capacity == null ||
        this.eventForm.capacity == " "
      ) {
        alert("El campo Capacidad esta vacio");
      } else if (
        this.eventForm.name_LOC_SPORT == "" ||
        this.eventForm.name_LOC_SPORT == null ||
        this.eventForm.name_LOC_SPORT == " "
      ) {
        alert("Por favor escoja un Lugar");
      } else {
        if (this.eventForm.name_SPORT == "Otro") {
          if (
            this.eventForm.other_SPORT == "" ||
            this.eventForm.other_SPORT == null ||
            this.eventForm.other_SPORT == " "
          ) {
            alert("Por favor escriba otra actividad");
          } else if (
            this.sportsNames
              .map((sport) => sport.toLowerCase())
              .includes(this.eventForm.other_SPORT.toLowerCase())
          ) {
            alert(
              "La actividad eligida se encuentra registrada. Seleccionala en el campo 'Deporte'"
            );
          } else {
            this.eventForm.user_NAME = this.username;
            this.eventForm.event_FINISH_HOUR = this.eventForm.event_FINISH_HOUR.concat(
              ":00"
            );
            this.eventForm.event_INIT_HOUR = this.eventForm.event_INIT_HOUR.concat(
              ":00"
            );

            this.eventForm.event_FINISH_HOUR = this.eventForm.event_FINISH_HOUR.substring(
              0,
              8
            );
            this.eventForm.event_INIT_HOUR = this.eventForm.event_INIT_HOUR.substring(
              0,
              8
            );

            console.log("quepasa2", JSON.stringify(this.eventForm));

            axios
              .post(
                "https://wise-brook-308119.ue.r.appspot.com/event",
                this.eventForm
              )
              .then((response) => {
                console.log(this.eventForm);
                this.IDeventCreated = response.data.id_EVENT;
                this.emitEvent();
                alert("Evento Creado con exito");
                location.href = "../";
              })
              .catch((e) => console.log(e));
          }
        } else {
          // this.eventForm.other_SPORT = null;
          this.eventForm.user_NAME = this.username;
          this.eventForm.event_FINISH_HOUR = this.eventForm.event_FINISH_HOUR.concat(
            ":00"
          );
          this.eventForm.event_INIT_HOUR = this.eventForm.event_INIT_HOUR.concat(
            ":00"
          );

          this.eventForm.event_FINISH_HOUR = this.eventForm.event_FINISH_HOUR.substring(
            0,
            8
          );
          this.eventForm.event_INIT_HOUR = this.eventForm.event_INIT_HOUR.substring(
            0,
            8
          );

          // console.log("quepasa", JSON.stringify(this.eventForm));

          axios
            .post(
              "https://wise-brook-308119.ue.r.appspot.com/event",
              this.eventForm
            )
            .then((response) => {
              console.log("EVENTO CREADO: ", response);
              this.IDeventCreated = response.data.id_EVENT;
              this.emitEvent();
              alert("Evento Creado con exito");
              location.href = "../";
            })
            .catch((e) => console.log(e));
        }
      }
    },
    eventLoc(location) {
      this.eventForm.name_LOC_SPORT = location;
      // console.log("aqui", this.eventForm);
    },
    filterSports() {
      this.filteredSports = this.sportsNames.filter((sport) => {
        return sport
          .toLowerCase()
          .includes(this.eventForm.name_SPORT.toLowerCase());
      });
    },
    setSport(sport) {
      this.eventForm.name_SPORT = sport;
      this.modal = false;
    },
  },
};
</script>

<style scoped>
/* * {
   font-size: 14pt;
} */

.back {
  color: #fff;
  background-color: #94b43b;
  border-radius: 10px;
  box-shadow: 10px 10px #466b3f;
}
.back .titulos {
  padding-left: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.back .titulo_bln {
  padding-left: 10px;
  margin-bottom: 10px;
}
.back .form-control {
  margin-bottom: 15px;
}
.back .nombre-lugar {
  text-align: center;
  color: #fff;
  background: rgba(255, 255, 255, 0);
  border-color: rgba(255, 255, 255, 0);
  font-size: 25px;
}
.back #button:active {
  color: #550000;
  background: rgba(255, 255, 255, 0);
  border-color: rgba(255, 255, 255, 0);
}
.back #button:active {
  color: #550000;
  background: rgba(255, 255, 255, 0);
  border-color: rgba(255, 255, 255, 0);
}
.tit-det {
  font-size: 30px;
}
.titulo_prin {
  font-size: 30px;
}
.descripcion {
  max-height: 60px;
  min-height: 50px;
}
.boton {
  background: #565a5c;
  color: #fff;
  width: 150px;
  padding-right: 15px;
  text-align: center;
}
.subtitulo {
  font-size: 25px;
}
.sportsList {
  list-style-type: none;
  background-color: white;
  color: #495057;
  padding-left: 0px;
  border: 1px solid;
  margin-top: -15px;
}
.nombre-lugar:focus {
  color: green;
}

.sportsList li {
  cursor: pointer;
  padding-left: 15px;
}
.sportsList li:hover {
  background: #1e90ff;
  color: white;
}
</style>
