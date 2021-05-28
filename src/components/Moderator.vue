<template>
  <div class="moderador">
    <NavBarModerator :username="username" />

    <div class="container mt-5">
      <div class="row mx-auto">
        <div class="welcome">
          <p class="hola mx-auto">Hola,</p>
          <p class="fullName text-center" id="userName">{{ username }}</p>
        </div>
      </div>
      <div class="row justify-content-center mx-auto">
        <!-- <div class="card col-xl-4 col-lg-4 col-md-6 col-12 mt-4"> -->
        <ul class="row nav col-auto d-flex justify-content-between">
          <li class="col-5 mt-4 mx-auto nav-item">
            <!-- <a class="card nav-link" id="events-tab" v-on:click="openEvents()"> -->
            <router-link
              :to="{ name: 'Moderator', query: { tab: 'events' } }"
              class="card nav-link"
              id="events-tab"
            >
              <div class="text-center">Eventos</div>
            </router-link>
          </li>

          <li class="col-5 mt-4 mx-auto nav-item">
            <!-- <a class="card nav-link" id="sports-tab" v-on:click="openSports()"> -->
            <router-link
              :to="{ name: 'Moderator', query: { tab: 'sports' } }"
              class="card nav-link"
              id="sports-tab"
            >
              <div class="text-center">Deportes</div>
            </router-link>
          </li>
        </ul>

        <div class="row mt-5 mb-5">
          <!-- EVENTOS -->
          <div class="mx-auto dynamic-content" id="event-list">
            <div class="card card-tables">
              <div class="card-header mx-auto">
                <h2>Eventos Creados</h2>
                <hr />
              </div>
              <div class="row">
                <label class="switch">
                  <input id="eventsSelector" type="checkbox" v-model="switchChecked"/>
                  <span class="slider round"></span>
                </label>
                <p v-if="switchChecked" class="ml-3">Mostrando todos</p>
                <p v-else class="ml-3">Mostrando solo activos</p>
                <!-- Buscador -->
                <input
                  type="search"
                  placeholder="Buscar"
                  class="form-control"
                  v-model="search"
                />
              </div>
              <div class="card-body">
                <!-- Lista de Eventos-->
                <div class="table-responsive">
                  <table class="table table-bordered table-hover table-options">
                    <thead class="thead-dark text-center">
                      <tr>
                        <th>CREADOR</th>
                        <th>FECHA</th>
                        <th>HORA</th>
                        <th>LUGAR</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody v-for="event in filterEvents" :key="event.id_EVENT" v-bind:id="event.id_EVENT">
                      <tr>
                        <td>{{ event.user_NAME }}</td>
                        <td>{{ event.event_INIT }}</td>
                        <td>
                          {{
                            event.event_INIT_HOUR.slice(
                              event.event_INIT_HOUR.length - 8
                            )
                          }}
                        </td>
                        <td>{{ event.name_LOC_SPORT }}</td>
                        <td>
                          <button
                            class="btn btn-primary"
                            type="button"
                            data-toggle="collapse"
                            :data-target="'#details' + event.id_EVENT"
                            aria-controls="details"
                            aria-expanded="false"
                            title="Ver detalles"
                          >
                            <!-- Ver detalles -->
                            <i class="fa fa-info-circle"></i>
                          </button>
                          <button
                            @click="delEvent(event)"
                            class="btn btn-danger"
                            title="Eliminar"
                          >
                            <!-- Borrar -->
                            <i class="fa fa-minus-circle"></i>
                          </button>
                        </td>
                      </tr>
                      <!-- Detalles de evento-->
                      <tr
                        class="collapse"
                        v-bind:id="['details' + event.id_EVENT]"
                      >
                        <td class="p-3 text-left" colspan="5">
                          <ul class="list-group">
                            <li class="list-group-item py-1">
                              <h6 class="d-inline">Deporte:</h6>
                              <span v-if="event.other_SPORT == null">{{
                                event.name_SPORT
                              }}</span>
                              <span v-else>{{ event.other_SPORT }}</span>
                            </li>
                            <li class="list-group-item py-1">
                              <h6 class="d-inline">Descripcion:</h6>
                              <span>{{ event.event_DESCRIPTION }}</span>
                            </li>
                            <li class="list-group-item py-1">
                              <h6 class="d-inline">Hora Inicio:</h6>
                              <span>{{
                                event.event_INIT_HOUR.slice(
                                  event.event_INIT_HOUR.length - 8
                                )
                              }}</span>
                            </li>
                            <li class="list-group-item py-1">
                              <h6 class="d-inline">Hora Fin:</h6>
                              <span>{{
                                event.event_FINISH_HOUR.slice(
                                  event.event_FINISH_HOUR.length - 8
                                )
                              }}</span>
                            </li>
                            <li class="list-group-item py-1">
                              <h6 class="d-inline">Capacidad:</h6>
                              <span>{{ event.capacity }}</span>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-if="filterEvents.length == 0">
                      <tr style="height: 100px">
                        <td class="align-middle text-center" colspan="5">
                          No hay Eventos para mostrar
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- DEPORTES -->
          <div class="mx-auto dynamic-content" id="sport-list">
            <div class="card card-tables">
              <div class="card-header">
                <h2>Deportes</h2>
                <hr />
              </div>

              <div class="card-body">
                <!-- Lista de Deportes registrados-->
                <div class="table-responsive float-left col-5">
                  <table
                    id="SportsTable"
                    class="table table-bordered table-hover"
                    ref="sportsTable"
                  >
                    <thead class="thead-dark text-center">
                      <tr>
                        <th>REGISTRADOS</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody id="sportsTableRows">
                      <tr
                        v-for="(sport, index) in sportsData"
                        :key="index"
                        v-bind:id="[sport.name_SPORT]"
                      >
                        <td v-if="sport.name_SPORT != 'Otro'">
                          {{ sport.name_SPORT }}
                        </td>
                        <td v-if="sport.name_SPORT != 'Otro'">
                          <button
                            id="show-modal"
                            v-on:click="delSport(sport)"
                            class="btn btn-danger"
                            title="Eliminar"
                          >
                            <i class="fa fa-minus-circle"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="table-responsive float-right col-7">
                  <table
                    id="SugestionsTable"
                    class="table table-bordered table-hover table-options"
                  >
                    <thead class="thead-dark text-center">
                      <tr>
                        <th style="width: 60%">SUGERENCIAS</th>
                        <th>#</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(suggestedSport, index) in suggestedSports"
                        :key="index"
                        v-bind:id="'sugg' + suggestedSport[0]"
                      >
                        <td>{{ suggestedSport[0] }}</td>
                        <td>{{ suggestedSport[1] }}</td>
                        <td>
                          <button
                            v-on:click="addSport(suggestedSport[0])"
                            class="btn btn-primary"
                            title="Registar"
                          >
                            <!-- <button class="btn btn-primary" title="Añadir"> -->
                            <i class="fa fa-plus-circle"></i>
                          </button>
                          <!-- <button
                            v-on:click="delSuggestedSport(suggestedSport[0])"
                            class="btn btn-danger"
                            title="Descartar"
                          >
                            <i class="fa fa-minus-circle"></i>
                          </button> -->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- MODAL -->
        <vue-toastr ref="mytoast"></vue-toastr>
        <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
      </div>

      <!-- <div class="d-flex align-items-center col-xl-3 col-lg-3 col-12 mt-4"> -->
      <div
        class="d-flex align-items-center col-xl-4 col-lg-4 col-8 mx-auto mb-5"
      >
        <img
          class="logoUnal mx-auto"
          src="@/assets/LogoUnal_Black.png"
          alt=" "
        />
      </div>
    </div>
  </div>
</template> 

<script>
import NavBarModerator from "../components/header/NavBarModerator.vue";
import axios from "axios";
import Vue from "vue";
import ConfirmDialogue from "../components/modal/ConfirmDialogue";

export default {
  name: "Moderator",
  components: {
    NavBarModerator,
    ConfirmDialogue,
    "vue-toastr": window.VueToastr,
  },

  data: function () {
    return {
      username: "",
      events: [],
      allevents: [],
      sportsData: [],
      suggestedSports: [],
      search: "",
      switchChecked: false,
    };
  },
  watch: {
    "$route.query.tab": {
      immediate: true,
      handler(tab) {
        this.showTab();
      },
    },  

  },
  created: function () {
    this.username = this.$route.params.username;
  },
  mounted: function () {
    axios
      .get("https://wise-brook-308119.ue.r.appspot.com/events?init=0&size=-1")
      .then((response) => (this.events = response.data));
    axios
      .get("https://wise-brook-308119.ue.r.appspot.com/eventsall/")
      .then((response) => (this.allevents = response.data));
    axios
      .get("https://wise-brook-308119.ue.r.appspot.com/sports/")
      .then((response) => (this.sportsData = response.data));

    axios
      .get("https://wise-brook-308119.ue.r.appspot.com/otherscount/")
      .then((response) => (this.suggestedSports = response.data));

    this.$refs.mytoast.defaultPosition = "toast-bottom-right";
    this.showTab();
  },
  methods: {
    async addSport(suggestedSport) {
      const ok = await this.$refs.confirmDialogue.show({
        title: "Registrar deporte sugerido",
        message:
          "¿Está seguro que desea registar " +
          suggestedSport.bold().big() +
          "?",
        okButton: "Registrar",
      });
      if (ok) {
        try {
          await axios.post("https://wise-brook-308119.ue.r.appspot.com/g/", {
            name_SPORT: suggestedSport,
          });

          var table = document.getElementById("sportsTableRows");
          var row = table.insertRow(0);
          row.innerHTML = table.lastChild.innerHTML;
          row.id = suggestedSport;
          row.firstChild.innerHTML = suggestedSport;
          this.success("Deporte Registrado");
          setTimeout(() => {
            location.reload();
          }, 1000);
        } catch (error) {
          this.error("Error registrando deporte");
        }
      } else {
      }
    },
    async delSport(sport) {
      // this.printHello()
      const ok = await this.$refs.confirmDialogue.show({
        title: "Eliminar Deporte",
        message:
          "¿Está seguro que desea eliminar " +
          sport.name_SPORT.bold().big() +
          "? </br> Esta acción es irreversible",
        okButton: "Eliminar",
      });
      // If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
        try {
          await axios.delete(
            "https://wise-brook-308119.ue.r.appspot.com/nosports?sport=" + String(sport.name_SPORT)
          );
          document.getElementById(sport.name_SPORT).remove();
          this.success("Deporte Eliminado");
          setTimeout(() => {
            location.reload();
          }, 1000);
        } catch (error) {
          this.error("Error eliminando deporte");
          this.warning(
            "Intente eliminando primero los eventos asociados a este deporte"
          );
        }
      }
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
          await axios
            .delete("https://wise-brook-308119.ue.r.appspot.com/NoEvent?id_event=" + event.id_EVENT)
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

    async delSuggestedSport(suggestedSport) {
      const ok = await this.$refs.confirmDialogue.show({
        title: "Descartar sugerencia",
        message:
          "¿Está seguro que desea descartar la sugerencia de registrar " +
          suggestedSport.bold().big() +
          " en los deportes? </br> </br> Este deporte no se volverá a mostrar en las sugerencias",
        okButton: "Descartar",
      });
      // If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
        try {
          console.log("Registrar evento - Error Intencionado", e);
          document.getElementById(suggestedSport).remove();
          this.success("Evento eliminado");
          location.reload();
        } catch (error) {
          this.error("Error descartando sugerencia");
          this.warning(
            "Intente eliminando primero los eventos asociados a este deporte"
          );
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
    warning(msg) {
      this.$refs.mytoast.w({
        msg: msg,
        progressbar: false,
      });
    },
    info(msg) {
      this.$refs.mytoast.i({
        msg: msg,
        progressbar: false,
      });
    },
    getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    showTab() {
      var dynamicContent = this.getParameterByName("tab");
      console.log("dynamicContent", dynamicContent);
      // Check if the URL parameter is apples
      if (dynamicContent == "events") {
        console.log("events-tab");
        document.getElementById("sport-list").style.display = "none";
        document.getElementById("event-list").style.display = "block";
      }
      // Check if the URL parameter is oranges
      else if (dynamicContent == "sports") {
        console.log("sports-tab");
        document.getElementById("event-list").style.display = "none";
        document.getElementById("sport-list").style.display = "block";
      }
    },
  },
  computed: {
    filterEvents: function () {
      var target = this.events;
      if(this.switchChecked){
        target = this.allevents;
      }
      return target.filter((event) => {
        if (
          event.event_TITLE.toLowerCase().match(this.search.toLowerCase()) ||
          event.name_SPORT.toLowerCase().match(this.search.toLowerCase()) ||
          event.name_LOC_SPORT.toLowerCase().match(this.search.toLowerCase()) ||
          event.user_NAME.toLowerCase().match(this.search.toLowerCase()) ||
          event.event_DESCRIPTION.toLowerCase().match(this.search.toLowerCase())
        ) {
          return event;
        }
        if (event.other_SPORT != null) {
          if (
            event.other_SPORT.toLowerCase().match(this.search.toLowerCase())
          ) {
            return event;
          }
        }
      });
    },
  },
};
</script> 

<style scoped>
.logo {
  width: 100px;
}
.navbar-nav {
  width: 100%;
}
.navbar-toggler {
  margin-right: 30px;
}
.card.nav-link {
  height: 100px;
  background-color: #76232f;
  border-radius: 30px;
  padding: 0px;
  border: none;
  overflow: hidden;
  color: white;
  font-size: 35pt;
  cursor: pointer;
}
.card.nav-link:hover {
  top: -2px;
  transition: 0.5s;
  text-decoration: none;
  color: #b1b2b0;
}
.card div {
  margin: auto;
}
.table-options td:last-child {
  text-align: center;
  padding-left: 0px;
  padding-right: 0px;
}
.table td {
  vertical-align: middle;
}
.card-tables button {
  width: 40px;
  height: 40px;
  /* margin: 5px; */
}
.dynamic-content {
  /* background-color: #94B43B; */
  width: 80%;
  display: none;
}
.card-header {
  background-color: transparent;
  border: none;
  width: 100%;
  text-align: center !important;
}
.card-tables {
  background-color: #b1b2b0;
  border-radius: 20px;
  border: none;
  height: fit-content;
}
.list-group-item {
  /* width: 50%; */
  background-color: transparent;
  border: none;
}
.card-tables button:hover {
  font-size: 1.5rem;
  padding: 0 0.53rem;
  /* font-size: 1rem; */
  transition: 0.1s;
}

#SportsTable td:last-child {
  text-align: center;
}

.card-tables .card-body {
  margin-top: -20px;
  width: 95%;
}
.fullName {
  width: 100%;
  font-size: 26pt;
}
.welcome {
  width: 100%;
}
.hola {
  width: 50%;
  color: #7a7a7a;
  font-size: 20pt;
  margin: -10px auto;
}
ul {
  list-style-type: none;
  padding: 0;
}
.row {
  width: 100%;
}

.logoUnal {
  display: inline-block;
  width: 85%;
  padding-left: 10px;
  padding-right: 10px;
}

.form-control {
  width: 200px;
  margin-right: 45px;
  margin-left: auto;
  margin-top: -15px;
  margin-bottom: 15px;
}

table {
  background-color: #e9ecef;
  /* min-width: 350px; */
}

/* Toggle Switch */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 23px;
  margin-left: 40px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 17px;
  width: 17px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
input:checked + .slider {
  background-color: #2196f3;
}
input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}
input:checked + .slider:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}
/* Rounded sliders */
.slider.round {
  border-radius: 22px;
}
.slider.round:before {
  border-radius: 50%;
}

@media (max-width: 768px) {
  .welcome {
    font-size: 100pt;
    width: 100%;
    /* margin-top: -25px; */
  }
  .card.nav-link {
    font-size: 25pt;
    height: 80px;
    margin: auto -15px;
    /* background-color: red; */
  }
  .hola {
    font-size: 15pt;
    /* margin-bottom: 0px; */
  }
  .fullName {
    font-size: 20pt;
    /* margin-bottom: 0px; */
  }
  .logoUnal {
    margin-bottom: 0px;
  }
}
@media (max-width: 576px) {
  .card.nav-link {
    height: 60px;
    font-size: 15pt;
    border-radius: 20px;
  }
}
</style>