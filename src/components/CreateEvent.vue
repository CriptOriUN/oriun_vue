<template>
   <div class="createevent">
      <NavBar :username="username" />
      <div class="container d-flex justify-content-center">
         <div class="row my-3 pt-4">
            <h2 class="titulo_prin">Crear evento</h2>
         </div>
      </div>

      <div class="container  pt-4">
         <div class="row my-3 justify-content-center">
            <div class="col-md-7 col-10 back pl-4 pr-4">
               <h3 class="titulos tit-det pt-4 pb-4">Detalles Generales</h3>

               <form action="">
                  <label for="titulo" class="titulo_bln"
                     >Titulo Del Evento</label
                  >
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
                           required
                        />
                     </div>
                     <div class="col-6">
                        <label for="fecha-fin" class="titulo_bln"
                           >Fecha Final</label
                        >
                        <input
                           type="date"
                           class="form-control"
                           name="fin"
                           id="fecha_incio_ce"
                           v-model="eventForm.event_END"
                           required
                        />
                     </div>
                  </div>
                  <label for="hora" class="titulo_bln subtitulo">Hora</label>
                  <div class="row">
                     <div class="col-6">
                        <label for="hora-inicio" class="titulo_bln"
                           >Hora Inicial</label
                        >
                        <input
                           type="time"
                           class="form-control mb-4"
                           name="hora_incio"
                           id="hora"
                           v-model="eventForm.event_INIT_HOUR"
                           required
                        />
                     </div>
                     <div class="col-6">
                        <label for="hora-fin" class="titulo_bln"
                           >Hora Final</label
                        >
                        <input
                           type="time"
                           class="form-control mb-4"
                           name="hora"
                           id="hora"
                           v-model="eventForm.event_FINISH_HOUR"
                           required
                        />
                     </div>
                  </div>
                  <label for="Deporte" class="titulo_bln">Deporte</label>
                  <select
                     name=""
                     class="form-control"
                     id="Deporte"
                     v-model="eventForm.name_SPORT"
                     required
                  >
                     <option
                        v-for="sport in sports"
                        :key="sport.id"
                        :value="sport.name_SPORT"
                        >{{ sport.name_SPORT }}
                     </option>
                  </select>

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
                  <select
                     v-model="eventForm.capacity"
                     required
                     class="form-control"
                  >
                     <option>5</option>
                     <option>10</option>
                     <option>20</option>
                     <option>50</option>
                  </select>
                  <div class="row my-5">
                     <div class="col">
                        <h3 class="titulo_lugares tit-det titulo_bln titulos">
                           Lugares Disponibles
                        </h3>
                     </div>
                  </div>

                  <div class="row py-4 seccion">
                     <div
                        v-for="loc in locations"
                        :key="loc.id"
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
                           id="button"
                           type="button"
                        >
                           {{ loc.name_LOC_SPORT }}
                        </button>
                     </div>
                  </div>
               </form>
               <div class="col d-flex flex-row-reverse seccion">
                  <!-- <button
                     v-on:click="mostrarDeportes()"
                     class="btn boton"
                     type="button"
                  >
                     tes
                  </button> -->
                  <button
                     v-on:click="submitEventForm()"
                     class="btn boton mb-4"
                     type="button"
                  >
                     Finalizar
                  </button>
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
   name: "CreateEvents",
   components: {
      NavBar,
   },
   data: function() {
      return {
         username: "",
         sports: null,
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
      };
   },
   created: function() {
      this.username = this.$route.params.username;
   },
   mounted() {
      this.getSports();
      this.getLocations();
   },
   methods: {
      getSports() {
         axios
            // .get("http://localhost:8082/sports")
            .get("https://wise-brook-308119.ue.r.appspot.com/sports")
            .then((response) => {
               console.log(response);
               this.sports = response.data;
            })
            .catch((e) => console.log(e));
      },
      getLocations() {
         axios
            // .get("http://localhost:8082/locationssport")
            .get("https://wise-brook-308119.ue.r.appspot.com/locationssport")
            .then((response) => {
               // console.log("wihs", response);
               this.locations = response.data;
            })
            .catch((e) => console.log(e));
      },
      test() {
         this.eventForm.user_NAME = this.username;
         // this.eventForm.event_INIT_HOUR = this.eventForm.event_INIT_HOUR.concat(':00');
         console.log(this.eventForm);
      },
      submitEventForm: function() {
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
                     // .post("http://localhost:8082/event", this.eventForm)
                     .post(
                        "https://wise-brook-308119.ue.r.appspot.com/event",
                        this.eventForm
                     )
                     .then((response) => {
                        console.log(this.eventForm);
                        alert("Evento Creado con exito");
                        location.href = "../";
                     })
                     .catch((e) => console.log(e));
               }
            } else {
               this.eventForm.other_SPORT = " ";
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

               console.log("quepasa", JSON.stringify(this.eventForm));

               axios
                  // .post("http://localhost:8082/event", this.eventForm)
                  .post(
                     "https://wise-brook-308119.ue.r.appspot.com/event",
                     this.eventForm
                  )
                  .then((response) => {
                     console.log(this.eventForm);
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
   },
};
</script>

<style scoped>
* {
   font-size: 14pt;
}

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
</style>
