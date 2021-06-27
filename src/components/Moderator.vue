<template>
  <div class="moderador">
    <NavBarModerator :username="username" />

    <div class="container-fluid mt-4">
      <div class="row mx-auto">
        <div class="mx-auto">
          <span class="hola"
            >Hola, <span class="fullName">{{ username }}</span></span
          >
        </div>
      </div>
      <div class="row justify-content-center mx-auto">
        <!-- HOME -->
        <div class="dynamic-content" id="home-tab">
          <div class="row mt-5 mx-auto d-flex justify-content-between">
            <div class="col-md-7 mb-3" id="reports-card">
              <div class="card card-tables">
                <div class="card-header mx-auto">
                  <h2>Eventos Reportados</h2>
                  <hr />
                </div>
                <div class="card-body">
                  <!-- Lista de Eventos reportados-->
                  <div class="table-responsive">
                    <table
                      class="table table-bordered table-hover table-options"
                    >
                      <thead class="thead-dark text-center">
                        <tr>
                          <th>EVENTO</th>
                          <th>CREADOR</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody v-if="loadingReports">
                        <tr style="height: 100px">
                          <td class="align-middle text-center" colspan="3">
                            <Spinner :color="color" />
                          </td>
                        </tr>
                      </tbody>
                      <tbody
                        v-else
                        v-for="event in reportedEvents"
                        :key="event.id_EVENT"
                        :id="'report_'+event.id_EVENT"
                      >
                        <tr>
                          <td>{{ event.event_TITLE }}</td>
                          <td>{{ event.user_NAME }}</td>
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
                            <div class="btn-group mx-0 text-secondary" role="group">|</div>
                            <button
                              @click="dismissReport(event)"
                              class="btn btn-success"
                              title="Descartar"
                            >
                              <!-- Borrar -->
                              <i class="fa fa-thumbs-up"></i>
                            </button>      
                            <button
                              @click="penalizeEvent(event)"
                              class="btn btn-danger"
                              title="Penalizar"
                            >
                              <!-- Borrar -->
                              <i class="fa fa-thumbs-down"></i>
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
                                <h6 class="d-inline">Lugar:</h6>
                                <span>{{ event.name_LOC_SPORT }}</span>
                              </li>
                              <li class="list-group-item py-1">
                                <h6 class="d-inline">Fecha:</h6>
                                <span>{{ event.event_INIT }}</span>
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
                      <tbody v-if="reportedEvents.length == 0 && !loadingReports">
                        <tr style="height: 100px">
                          <td class="align-middle text-center" colspan="3">
                            No se han reportado eventos
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-5 mb-3" id="requests-card">
              <div class="card card-tables">
                <div class="card-header mx-auto">
                  <h2>Solicitudes</h2>
                  <hr />
                </div>
                <div class="card-body">
                  <div v-if="loadingRequests" style="height: 100px" class="align-middle text-center">    
                    <Spinner :color="color" />
                  </div>
                  <div
                    v-for="(request, index) in unlockRequests"
                    :key="index"
                    class="card mb-3"
                    style="border-radius: 10px"
                    :id="request.user_NAME+'_request'"
                  >
                    <div class="d-flex card-header p-0">
                      <h5 class="m-2 ml-3 text-left">{{ request.user_NAME }}</h5>
                      <button @click="unlock(request.user_NAME)" class="btn ml-auto p-0 my-0 text-primary" title="Desbloquear">
                        <!-- Aceptar -->
                        <i class="fa fa-unlock"></i>
                      </button>
                      <div class="btn-group mx-0 text-secondary" role="group">|</div>
                      <button @click="dismissRequest(request.user_NAME)" class="btn mr-1 p-0 my-0 text-danger" title="Descartar">
                        <!-- Borrar -->
                        <i class="fa fa-trash"></i>
                      </button>
                    </div>
                    <hr class="mt-0" />
                    <div class="card-body py-3 px-2">
                      {{ request.solicitud }}
                    </div>
                  </div>
                  <div v-if="unlockRequests.length == 0 && !loadingRequests" style="height: 100px" class="align-middle text-center">
                          No hay sugerencias para mostrar
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-5 mb-5" style="width: 85%">
          <!-- EVENTOS -->
          <div class="mx-auto dynamic-content" id="event-list">
            <div class="card card-tables">
              <div class="card-header mx-auto">
                <h2>Eventos Creados</h2>
                <hr />
              </div>
              <div class="row">
                <label class="switch">
                  <input
                    id="eventsSelector"
                    type="checkbox"
                    v-model="switchChecked"
                  />
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
                    <tbody v-if="loadingEvents">
                      <tr style="height: 100px">
                        <td class="align-middle text-center" colspan="5">
                          <Spinner :color="color" />
                        </td>
                      </tr>
                    </tbody>
                    <tbody
                      v-else
                      v-for="event in filterEvents"
                      :key="event.id_EVENT"
                      v-bind:id="event.id_EVENT"
                    >
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
                    <tbody v-if="filterEvents.length == 0 && !loadingEvents">
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
                <div class="table-responsive float-left col-md-5">
                  <table
                    id="SportsTable"
                    class="table table-bordered table-hover"
                    ref="sportsTable"
                  >
                    <thead class="thead-dark text-center">
                      <tr>
                        <th>REGISTRADOS</th>
                        <th class="py-0">
                          <button
                            v-on:click="newSport()"
                            class="btn text-white newSport"
                            title="Nuevo"
                          >
                            <i class="fa fa-plus-circle"></i>
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody id="sportsTableRows">
                      <tr v-if="loadingSports" style="height: 100px">
                        <td class="align-middle text-center" colspan="2">
                          <Spinner :color="color" />
                        </td>
                      </tr>
                      <tr
                        v-else
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

                <div class="table-responsive float-right col-md-7">
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
                      <tr v-if="loadingSuggSports" style="height: 100px">
                        <td class="align-middle text-center" colspan="3">
                          <Spinner :color="color" />
                        </td>
                      </tr>
                      <tr
                        v-else
                        v-for="(suggestedSport, index) in suggestedSports"
                        :key="index"
                        v-bind:id="'sugg' + suggestedSport[0]"
                      >
                        <td>{{ suggestedSport[0] }}</td>
                        <td class="text-center">{{ suggestedSport[1] }}</td>
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
                      <tr
                        v-if="suggestedSports.length == 0 && !loadingSuggSports"
                        style="height: 100px"
                      >
                        <td class="align-middle text-center" colspan="3">
                          No hay sugerencias para mostrar
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
    <MySocialChat />
  </div>
</template> 

<script>
import NavBarModerator from "../components/header/NavBarModerator.vue";
import axios from "axios";
import ConfirmDialogue from "../components/modal/ConfirmDialogue";
import { toaster } from "./toaster/toaster";
import Spinner from "../components/spinner/Spinner";
import MySocialChat from "../components/social-chat/MySocialChat";
export default {
  name: "Moderator",
  components: {
    NavBarModerator,
    ConfirmDialogue,
    Spinner,
    MySocialChat,
  },

  data: function () {
    return {
      username: "",
      events: [],
      reportedEvents: [],
      allevents: [],
      unlockRequests: [],
      sportsData: [],
      sportsNames: [],
      suggestedSports: [],
      search: "",
      switchChecked: false,
      toaster,
      loadingEvents: true,
      loadingSports: true,
      loadingSuggSports: true,
      loadingReports: true,
      loadingRequests: true,
      color: "#76232F",
      newSportInput: null,
      newSportInputValid: false,
    };
  },
  watch: {
    "$route.query.tab": {
      immediate: true,
      handler(tab) {
        try{
          this.showTab();
        }catch(error){}
        
      },
    },
  },
  created: function () {
    this.username = this.$route.params.username;
  },
  mounted: function () {
    axios
      .get("https://oriun-api.herokuapp.com/events?init=0&size=-1")
      .then((response) => (this.events = response.data));
    axios
      .get("https://oriun-api.herokuapp.com/EventosReportados")
      .then((response) => (this.reportedEvents = response.data, this.loadingReports = false));
    axios
      .get("https://oriun-api.herokuapp.com/Solicitudsall")
      .then((response) => (this.unlockRequests = response.data, this.loadingRequests = false));
    axios
      .get("https://oriun-api.herokuapp.com/eventsall/")
      .then(
        (response) => (
          (this.allevents = response.data), (this.loadingEvents = false)
        )
      );
    axios.get("https://oriun-api.herokuapp.com/sports/").then((response) => {
      this.sportsData = response.data;
      this.loadingSports = false;
      this.sportsData.forEach((element) => {
        this.sportsNames.push(
          element.name_SPORT
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
        );
      });
    });

    axios
      .get("https://oriun-api.herokuapp.com/otherscount/")
      .then(
        (response) => (
          (this.suggestedSports = response.data),
          (this.loadingSuggSports = false)
        )
      );

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
          await axios.post("https://oriun-api.herokuapp.com/g/", {
            name_SPORT: suggestedSport,
          });

          var table = document.getElementById("sportsTableRows");
          var row = table.insertRow(0);
          row.innerHTML = table.lastChild.innerHTML;
          row.id = suggestedSport;
          row.firstChild.innerHTML = suggestedSport;
          this.toaster.success("Deporte Registrado");
          setTimeout(() => {
            location.reload();
          }, 1000);
        } catch (error) {
          this.toaster.failure("Error registrando deporte");
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
            "https://oriun-api.herokuapp.com/nosports?sport=" + String(sport.name_SPORT)
          );
          document.getElementById(sport.name_SPORT).remove();
          this.toaster.success("Deporte Eliminado");
          setTimeout(() => {
            location.reload();
          }, 1000);
        } catch (error) {
          this.toaster.failure("Error eliminando deporte");
        }
      }
    },
    async unlock(user) {
      // this.printHello()
      const ok = await this.$refs.confirmDialogue.show({
        title: "Desbloquear cuenta",
        message:
          "¿Está seguro que desea desbloquear la cuenta de " +
          user.bold().big() +
          "?",
        okButton: "Desbloquear",
      });
      // If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
        try {
          await axios.delete(
            "https://oriun-api.herokuapp.com/###########?user=" + String(user)
          );
          // document.getElementById(sport.name_SPORT).remove();
          this.toaster.success("Cuenta desbloqueada");
          setTimeout(() => {
            location.reload();
          }, 1000);
        } catch (error) {
          this.toaster.failure("Error desbloqueando cuenta");
        }
      }
    },
    async dismissRequest(user) {
      // this.printHello()
      const ok = await this.$refs.confirmDialogue.show({
        title: "Descartar solicitud",
        message:
          "¿Está seguro que desea descartar la solicitud de " +
          user.bold().big() +
          "? </br> Esta acción es irreversible",
        okButton: "Descartar",
      });
      // If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
        try {
          await axios.delete(
            "https://oriun-api.herokuapp.com/OlvidarSoli?user=" + String(user)
          );
          document.getElementById(user+'_request').remove();
          this.toaster.success("Solicitud descartada");
          setTimeout(() => {
            location.reload();
          }, 1000);
        } catch (error) {
          this.toaster.failure("Error descartando solicitud");
        }
      }
    },
    async dismissReport(event) {
      // this.printHello()
      const ok = await this.$refs.confirmDialogue.show({
        title: "Descartar reporte",
        message:
          "¿Está seguro que desea descartar el reporte del evento " +
          event.event_TITLE.bold().big() +
          "? </br> Esta acción es irreversible",
        okButton: "Descartar",
      });
      // If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
        try {
          await axios.delete(
            "https://oriun-api.herokuapp.com/PerdonReporte?id_event=" + String(event.id_EVENT)
          );
          document.getElementById('report_'+event.id_EVENT).remove();
          this.toaster.success("Reporte descartado");
          setTimeout(() => {
            location.reload();
          }, 1000);
        } catch (error) {
          this.toaster.failure("Error descartando reporte");
        }
      }
    },
    async penalizeEvent(event) {
      // this.printHello()
      const ok = await this.$refs.confirmDialogue.show({
        title: "Penalizar evento",
        message:
          "¿Está seguro que desea penalizar a " +
          event.user_NAME.bold().big() +
          " por la creación del evento " +
          event.event_TITLE.bold().big() +
          "? </br> Esta acción es irreversible",
        okButton: "Penalizar",
      });
      // If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
        try {
          await axios.delete(
            "https://oriun-api.herokuapp.com/#########?user=" + String(event.user_NAME)
          );
          document.getElementById('report_'+event.id_EVENT).remove();
          this.toaster.success("Usuario penalizado");
          setTimeout(() => {
            location.reload();
          }, 1000);
        } catch (error) {
          this.toaster.failure("Error penalizando usuario");
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
          await axios.delete(
            "https://oriun-api.herokuapp.com/NoEvent?id_event=" + event.id_EVENT
          );
          document.getElementById(event.id_EVENT).remove();
          this.toaster.success("Evento eliminado");
          setTimeout(() => {
            location.reload();
          }, 1000);
        } catch (error) {
          this.toaster.failure("Error eliminando evento");
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
          console.log("Descartar sugerencia - Error Intencionado", e);
          document.getElementById(suggestedSport).remove();
          this.toaster.success("Sugerencia descartada");
          location.reload();
        } catch (error) {
          this.toaster.failure("Error descartando sugerencia");
          this.toaster.failure(
            "Elimine primero los eventos asociados a este deporte"
          );
        }
      } else {
      }
    },
    newSport() {
      var formExists = document.getElementById("newSportName") || false;

      if (!formExists) {
        var table = document.getElementById("sportsTableRows");
        var row = table.insertRow(0);
        row.innerHTML =
          '<tr><td colspan="2"><div class="input-group"><input type="text" id="newSportName" class="mr-4 form-control" name="newSport" placeholder="Deporte" autocomplete="off"><div id="newSportInvalidFeedback" class="order-last invalid-feedback"></div><div class="input-group-append my-auto"><button title="Registrar" id="newSportSubmit" class="btn btn-primary p-0 mr-2" style="height: 30px;width: 30px; visibility:hidden"><i class="fa fa-check"></i></button><button title="Cancelar" id="newSportCancel" class="btn btn-secondary p-0" style="height: 30px;width: 30px" ><i class="fa fa-times"></i></button></div></div></td></tr>';

        this.$nextTick(() => {
          document
            .getElementById("newSportName")
            .addEventListener("input", () => {
              this.checkInput();
            });
          document
            .getElementById("newSportSubmit")
            .addEventListener("click", () => {
              this.newSportSubmit();
            });
          document
            .getElementById("newSportCancel")
            .addEventListener("click", () => {
              row.remove();
            });
        });
      }
    },
    checkInput() {
      var newSportName = document.getElementById("newSportName").value.trim();
      this.newSportInput = newSportName;
      if (newSportName != "") {
        if (
          this.sportsNames.includes(
            newSportName
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
          )
        ) {
          this.newSportInputValid = false;
          console.log(this.sportsNames, newSportName);
          try {
            document.getElementById("newSportInvalidFeedback").innerText =
              "Este deporte ya está registrado";
            document.getElementById("newSportName").classList.add("is-invalid");
            document.getElementById("newSportSubmit").style.visibility =
              "hidden";
          } catch (error) {}
        } else {
          this.newSportInputValid = true;
          try {
            document
              .getElementById("newSportName")
              .classList.remove("is-invalid");
            document.getElementById("newSportSubmit").style.visibility =
              "visible";
          } catch (error) {}
        }
      } else {
        this.newSportInputValid = false;
        try {
          document.getElementById("newSportInvalidFeedback").innerText =
            "No debe estar vacio";
          document.getElementById("newSportName").classList.add("is-invalid");
          document.getElementById("newSportSubmit").style.visibility = "hidden";
        } catch (error) {}
      }
    },
    async newSportSubmit() {
      if (this.newSportInputValid) {
        try {
          await axios.post("https://oriun-api.herokuapp.com/g/", {
            name_SPORT: this.newSportInput,
          });

          this.toaster.success("Deporte Registrado");
          setTimeout(() => {
            location.reload();
          }, 1000);
        } catch (error) {
          this.toaster.failure("Error registrando deporte");
        }
      }
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
      // console.log("dynamicContent", dynamicContent);
      // Check if the URL parameter is apples
      if (dynamicContent == "events") {
        // console.log("events-tab");
        document.getElementById("event-list").style.display = "block";
        document.getElementById("home-tab").style.display = "none";
        document.getElementById("sport-list").style.display = "none";
        
      }
      // Check if the URL parameter is oranges
      else if (dynamicContent == "sports") {
        // console.log("sports-tab");
        document.getElementById("home-tab").style.display = "none";
        document.getElementById("event-list").style.display = "none";
        document.getElementById("sport-list").style.display = "block";
      } else {
        // console.log("home-tab");
        document.getElementById("home-tab").style.display = "block";
        document.getElementById("event-list").style.display = "none";
        document.getElementById("sport-list").style.display = "none";
      }
    },
  },
  computed: {
    filterEvents: function () {
      var target = this.events;
      if (this.switchChecked) {
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
  width: 90%;
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

.newSport {
  margin-top: -28px;
}

#SportsTable td:last-child {
  text-align: center;
}

.card-tables .card-body {
  margin-top: -20px;
  width: 95%;
}
.fullName {
  color: #212529;
  margin-left: 20px;
  font-size: 26pt;
}

.hola {
  color: #7a7a7a;
  font-size: 20pt;
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