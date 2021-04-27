<template>

    <div class="createevent">
        <NavBar :username="username"/>
        <div class="container d-flex justify-content-center">
            <div class="row my-3 ">
                <h2>Buscador</h2>
            </div>
        </div>
        <div class="container d-flex justify-content-center">
            <div class="row my-3 ">
            <input type="text" name="key-words" id="key-words"
                class="form-control" placeholder="Palabras Clave" v-model="search" />
            </div>
        </div>
        <div class="plantilla">
            <div class="container contenedor_p">
                <div class="eventos" >
                    <div class="evento" v-for="evento in filterEvents" :key="evento.id"> 
                        <div class = "columnas">
                            <div>
                                <h4>Nombre: {{evento.event_TITLE}}<h4>
                                <h4>Deporte: {{evento.name_SPORT}}</h4>
                                <h4>Organizador: {{evento.user_NAME}}</h4>
                            </div> 
                            <div class="center-column">
                                <div>
                                    <h4>Capacidad: {{evento.capacity}}</h4>
                                    <h4>Fecha Inicio: {{evento.event_INIT}}</h4>
                                    <h4>Fecha Fin: {{evento.event_END}}</h4>
                                </div>
                            </div>
                            <div>
                                <h4>Locación: {{evento.name_LOC_SPORT}}</h4>
                                <h4>Hora Inicio: {{evento.event_INIT_HOUR}}</h4>
                                <h4>Hora Fin: {{evento.event_FINISH_HOUR}}</h4>
                            </div>
                        </div>
                        <div id="boton-asistir">
                            <button type="button" class="btn btn-primary">Asistir</button>
                        </div>
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
    name: 'Searcher',
    components: {
    NavBar
  }, 
  data: function(){
      return{
          username: "", 
          eventos:[] ,
          search:''
      }  
    },
    created: function() {
    this.username = this.$route.params.username;
    let self = this;
    axios
    .get("https://wise-brook-308119.ue.r.appspot.com/events")
        .then((result) => {
            self.eventos=result.data; 
        }).catch((error) => {
            alert("ERROR Servidor EVENTOS");
        });
  }, 
  computed:{
      filterEvents: function(){
          return this.eventos.filter((evento) => {
              if(evento.event_TITLE.toLowerCase().match(this.search.toLowerCase())
               || evento.name_SPORT.toLowerCase().match(this.search.toLowerCase()) 
               || evento.user_NAME.toLowerCase().match(this.search.toLowerCase()) 
               || evento.name_LOC_SPORT.toLowerCase().match(this.search.toLowerCase())){
                  return evento
              }
          });
      }
  }
}
</script>

<style scoped>
.plantilla {
  background: #76232F;
  min-height: 100vh; }
  .plantilla .contenedor_p {
    padding-top: 20px;
    } 
    .evento{
        padding: 2rem;
        margin: 1rem 0;

        background-color: #565A5C;

        color: white;
        border-radius: 1rem;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        /*align-items: center*/}
        .columnas{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        #boton-asistir{
            margin: 5px auto;
        }
</style>