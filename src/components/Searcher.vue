<template>
  <div class="createevent">
    <NavBar :username="username" :role=role />
    <div class="container d-flex justify-content-center">
      <div class="row my-3">
        <h2>Buscador</h2>
      </div>
    </div>
    <div class="container d-flex justify-content-center">
      <div class="row my-3">
        <input
          type="text"
          name="key-words"
          id="key-words"
          class="form-control"
          placeholder="Palabras Clave"
          v-model="search"
        />
      </div>
    </div>
    <div v-if="isLoading">
      <!--<p> Cargando... </p>-->
      <div class="loading-icon">
        <Spinner :color="color" />
      </div>
    </div>
    <div v-else class="plantilla">
      <div class="container contenedor_p pb-4">
        <div class="eventos">
          <div class="evento" v-for="evento in filterEvents" :key="evento.id">
            <div class="columnas">
              <div>
                <h4>Nombre: {{ evento.event_TITLE }}</h4>
                <h4>Deporte: {{ evento.name_SPORT }}</h4>
                <h4>Organizador: {{ evento.user_NAME }}</h4>
              </div>
              <div class="center-column">
                <div>
                  <h4>Capacidad: {{ evento.capacity }}</h4>
                  <h4>Fecha Inicio: {{ evento.event_INIT }}</h4>
                  <h4>Fecha Fin: {{ evento.event_END }}</h4>
                </div>
              </div>
              <div>
                <h4>Locación: {{ evento.name_LOC_SPORT }}</h4>
                <h4>Hora Inicio: {{ evento.event_INIT_HOUR }}</h4>
                <h4>Hora Fin: {{ evento.event_FINISH_HOUR }}</h4>
              </div>
            </div>
            <div class="row">
              <button
                class="btn btn-primary mx-3 mt-3"
                type="button"
                data-toggle="collapse"
                :data-target="'#details' +  evento.id_EVENT"
                aria-controls="details"
                aria-expanded="false"
                title="Ver detalles de carga"
                @click="asistir(evento.id_EVENT)"
              >
                Asistir
              </button>
              <button
                @click="reportEvent(evento.id_EVENT)"
                class="btn btn-danger mt-3"
                title="Reportar"
              >
                <!-- Reportar -->
                <i class="fa fa-thumbs-down"></i>
              </button>
            </div>
            <div v-if="isLoadingEvent" class="collapse" v-bind:id="['details' + evento.id_EVENT]">
              <!--<p> Cargando... </p>-->
              <div class="loading-icon">
                <Spinner :color="color" />
              </div>
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
import { toaster } from "./toaster/toaster";
import Spinner from "./spinner/Spinner";

export default {
  name: "Searcher",
  components: {
    NavBar,
    Spinner,
  },
  props: ["role"],
  data: function () {
    return {
      username: "",
      eventos: [],
      search: "",
      puedoAsistir: false,
      toaster,
      isLoading: true,
      isLoadingEvent: false,
      color: "#94B43B",
    };
  },
  created: function () {
    this.username = this.$route.params.username;
    let self = this;
    axios
      .get(this.$apiURL+"/events?init=-1&size=1000")
      .then((result) => {
        self.eventos = result.data;
        self.isLoading = false;
      })
      .catch((error) => {
        alert("ERROR Servidor EVENTOS");
      });
  },
  methods: {
    asistir: function (id_EVENT) {
      let self = this;
      self.isLoadingEvent = true;
      axios
        .post(
          this.$apiURL+"/asistirevent?id_user=" +
            self.username +
            "&id_event=" +
            id_EVENT)
        .then((result) => {
          self.puedoAsistir = result.data;
          self.isLoadingEvent = false;
          self.toaster.success("El usuario ha sido registrado el evento con exito");
        })
        .catch((error) => {
          self.isLoadingEvent = false;
          if (error.response.status == "507") {
            self.toaster.failure("El evento ya ha superado el limite de asistentes");
          }else if(error.response.status == "409"){
            self.toaster.failure("El Usuario ya estaba registrado en el evento");
          }else {
            self.toaster.failure("Error asistiendo al evento");
          }
        });
    },
    reportEvent(id_evento){
      axios
      .post(this.$apiURL+"/Reportarevento", {id_EVENT: id_evento, user_NAME: this.username})
      .then(()=>{
        this.toaster.success("Has reportado un evento como inadecuado");
      })
      .catch((error)=>{
        if(error.response.status == "409"){
          this.toaster.failure("Ya has reportado este evento");
        }else{
          this.toaster.failure("Error reportando el evento");
        }
        // alert(error)
      });
    }
  },
  computed: {
    filterEvents: function () {
      return this.eventos.filter((evento) => {
        if (
          evento.event_TITLE.toLowerCase().match(this.search.toLowerCase()) ||
          evento.name_SPORT.toLowerCase().match(this.search.toLowerCase()) ||
          evento.user_NAME.toLowerCase().match(this.search.toLowerCase()) ||
          evento.name_LOC_SPORT.toLowerCase().match(this.search.toLowerCase())
        ) {
          return evento;
        }
      });
    },
  },
};
</script>

<style scoped>
.plantilla {
  background: #94B43B;
  min-height: 100vh;
}
.plantilla .contenedor_p {
  padding-top: 20px;
}
.evento {
  padding: 2rem;
  margin: 1rem 0;

  background-color: #565a5c;

  color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  /*align-items: center*/
}
.columnas {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

</style>