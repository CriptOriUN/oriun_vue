<template>

    <div class="createevent">
        <NavBar :username="username"/>
        <div class="container d-flex justify-content-center">
            <div class="row my-3 ">
                <h2>Crear evento</h2>
            </div>
        </div>

       <div class="plantilla">
        <div class="container contenedor_p">
            <div class="row my-3">
                <div class="col">
                    <h3 class="titulos">Detalles Generales:</h3>

                    <form action="">
                        <div class="form-group row seccion">
                            <div class="col-12 col-md-6 mb-3">
                                <label for="titulo" class="titulo_bln">Titulo Del Evento</label>
                                <input type="Text" class="form-control" id="event_TITLE" placeholder="Titulo" v-model="eventForm.event_TITLE">
                            </div>
                            <div class="col-12 col-md-6 mb-3">
                                <label for="descripcion" class="titulo_bln">Descripción del Evento:</label>
                                <textarea name="descripcion" id="descripcion_ce" class="form-control descripcion" v-model="eventForm.event_DESCRIPTION" placeholder="Descripción" required></textarea>
                            </div>
                            
                        </div>
                    </form>

                    <form action="">
                        <div class="form-group row seccion">
                                <!-- <div class="col-12 col-md-6 mb-3 fecha">
                                    <label for="fecha" class="titulo_bln">Fecha</label>
                                    <input type="date" class="form-control" id="fecha_ce" >
                                </div> -->
                            <div class="col-12 col-md-6 mb-3">
                                <label for="hora" class="titulo_bln">Fecha</label>
                                <div class="row">
                                    <div class="col-6">
                                        <label for="fecha-inicio" class="titulo_bln">Fecha Inicial</label>
                                        <input type="date" class="form-control" name="fecha_incio" id="fecha_incio_ce" v-model="eventForm.event_INIT" required>
                                    </div>
                                    <div class="col-6">
                                        <label for="fecha-fin" class="titulo_bln">Fecha Final</label>
                                        <input type="date" class="form-control" name="fin" id="fecha_incio_ce" v-model="eventForm.event_END" required>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-6 mb-3">
                                <label for="hora" class="titulo_bln">Hora</label>
                                <div class="row">
                                    <div class="col-6">
                                        <label for="hora-inicio" class="titulo_bln">Hora Inicial</label>
                                        <input type="time" class="form-control" name="hora_incio" id="hora" value="00:00:01" max="21:00:00" min="06:00:00" v-model="eventForm.event_INIT_HOUR" required>
                                    </div>
                                    <div class="col-6">
                                        <label for="hora-fin" class="titulo_bln">Hora Final</label>
                                        <input type="time" class="form-control" name="hora" id="hora" v-model="eventForm.event_FINISH_HOUR" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <form action="">
                        <div class="form-group row seccion">
                            <div class="col-12 col-md-6 mb-3">
                                <label for="Deporte" class="titulo_bln">Deporte</label>
                                 <select name="" class="form-control" id="Deporte" v-model="eventForm.name_SPORT" required>
                                    <option v-for="sport in sports" :key="sport.id" :value="sport.name_SPORT">{{sport.name_SPORT}}</option>
                                </select>
                                <!-- <span>Seleccionado: {{ selected }}</span> -->
                            </div>
                            <div class="col-12 col-md-6 mb-3">
                                <label for="Capacidad" class="titulo_bln">Capacidad</label>
                               <select v-model="eventForm.capacity" required class="form-control">
                                    <option>5</option>
                                    <option>10</option>
                                    <option>20</option>
                                    <option>50</option>
                                    <!-- <option>>50</option> -->
                                </select>
                            </div>
                            
                        </div>
                        <!-- <div class="form-group-row seccion-des">
                            <div class="col">
                                <label for="descripcion" class="titulo_bln">Descripcion del Evento:</label>
                                <textarea name="descripcion" id="descripcion_ce" class="form-control descripcion" v-model="eventForm.event_DESCRIPTION" required></textarea>
                            </div>
                        </div> -->
                    </form>

                    <form action="">

                    </form>


                </div>
            </div>
            <!-- la resolucion de las imegens seran 480x480px -->
            <div class="row my-5">
                <div class="col">
                    <h3 class="titulo_lugares titulo_bln titulos">Lugares Disponibles</h3>
                </div>

            </div>

            <div class="row py-4 seccion">

                <div v-for="loc in locations" :key="loc.id" class="col-12 col-sm-6 col-lg-3 mb-4">
                    <a href="#">
                        <img class="card-img" src="images/1.jpg" alt="">
                    </a>
                    <h3 class="nombre-lugar">{{loc.name_LOCATION}}</h3>
                </div>

            </div>

            <div class="row pb-5">
                <div class="col d-flex flex-row-reverse seccion">
                    <!-- <button v-on:click="test()" class="btn boton" type="submit">Finalizar</button> -->
                    <button v-on:click="submitEventForm()" class="btn boton" type="submit">Finalizar</button>
                </div>
            </div>

        </div>
    </div>

    </div>
</template>

<script>
import NavBar from '../components/header/NavBar'
import axios from "axios";

export default {
    name: 'CreateEvents',
    components: {
    NavBar
  }, 
  data: function(){
      return{
          username: "", 
          sports:null,
          locations:null,
          eventForm:{
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
            event_TITLE: ""
          }
      }  
    },
    created: function() {
        this.username = this.$route.params.username;
    },
    mounted(){
        this.getSports();
        this.getLocations();
    },
    methods:{
        getSports(){
            axios.get('http://localhost:8081/sports').then(response=>{
                console.log(response)
                this.sports = response.data
            }).catch(e=>console.log(e))
        },
        getLocations(){
            axios.get('http://localhost:8081/locationssibu').then(response=>{
                console.log(response)
                this.locations = response.data
            }).catch(e=>console.log(e))
        },
        test(){
            this.eventForm.user_NAME = this.username;
            this.eventForm.name_LOC_SPORT = "Cancha IEI";
            // this.eventForm.event_INIT_HOUR = this.eventForm.event_INIT_HOUR.concat(':00');
            console.log(this.eventForm);
        },
        submitEventForm: function(){
            this.eventForm.user_NAME = this.username;
            this.eventForm.name_LOC_SPORT = "Cancha IEI";
            this.eventForm.event_FINISH_HOUR = this.eventForm.event_FINISH_HOUR.concat(':00');
            this.eventForm.event_INIT_HOUR = this.eventForm.event_INIT_HOUR.concat(':00');
            axios
            // .post("http://localhost:8081/event", JSON.stringify(this.eventForm))
            .post("http://localhost:8081/event", this.eventForm)
            .then(response =>{
                console.log(eventForm),data();
            })
            .catch(e=>console.log(e));
        }
        
    }
   
}
</script>

<style scoped>
.logo {
  width: 100px; }

.navbar-nav {
  width: 100%; }

.btn-menu:hover {
  color: #000; }

.plantilla {
  background: #94b43b;
  min-height: 100vh; }
  .plantilla .contenedor_p {
    padding-top: 20px; }
    .plantilla .contenedor_p .fecha {
      padding-top: 32px; }
    .plantilla .contenedor_p .seccion {
      padding-left: 80px;
      padding-right: 80px; }
    .plantilla .contenedor_p .seccion-des {
      padding-left: 65px;
      padding-right: 65px; }
      .plantilla .contenedor_p .seccion-des .descripcion {
        max-height: 100px;
        min-height: 25px; }
    .plantilla .contenedor_p .titulos {
      padding-left: 80px; }
  .plantilla .nombre-lugar {
    text-align: center;
    color: #fff; }

.card {
  border-radius: 30px; }

.titulo_lugares {
  justify-content: center; }

.boton {
  background: #565a5c;
  color: #fff;
  width: 150px;
  padding-right: 15px;
  text-align: center;}

.titulo_bln {
  color: #fff; }

/*# sourceMappingURL=crearEvento.css.map */

</style>