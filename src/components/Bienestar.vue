<template>
    <div class="bienestar">
        <NavBar :username="username"/>
        <div class="container mt-5 ">
        <div class="row mx-auto">
            <div class="welcome">
                <p class="hola mx-auto">Hola,</p>
                <p class="fullName text-center" id="userName">{{username}}</p>
            </div>

        </div>
        <div class="row justify-content-center mx-auto" id="myTab" role="tablist">
            <!-- <div class="card col-xl-4 col-lg-4 col-md-6 col-12 mt-4"> -->
            <ul class="row nav col-auto d-flex justify-content-between">
                <li class="col-5 mt-4 mx-auto nav-item">
                    <a href="#event-list" class="card nav-link" id="events-tab" data-toggle="tab">
                        <div class="text-center">
                            Moderadores
                        </div>
                    </a>
                </li>

                <li class="col-5 mt-4 mx-auto nav-item">
                    <a href="#sport-list" class="card nav-link" id="sports-tab" data-toggle="tab">
                        <div class="text-center">
                            Locaciones
                        </div>
                    </a>
                </li>
            </ul>

            <div class="row tab-content mt-5 mb-5" id="myTabContent">

                <!-- MODERADORES -->
                <div class="tab-pane fade mx-auto" id="event-list" role="tabpanel" aria-labelledby="events-tab">
                    <div class="card card-tables text-center">
                        <div class="card-header mx-auto">
                            <h2>Moderadores</h2>
                            <hr>
                        </div>
                        <div class="card-body">

                            <!-- Lista de Moderadores-->
                            <div class="table-responsive">
                                <table id="EventsTable"
                                    class="table table-bordered table-hover table-striped table-options">
                                    <thead class="thead-dark text-center">
                                        <tr>
                                            <th>USERNAME</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="usuario in usuarios" :key="usuario.id"  id="usuarioslist">
                                            <td v-if="usuario.rol_NAME=='Moderador'">{{usuario.user_NAME}}</td>
                                            <td v-if="usuario.rol_NAME=='Moderador'" class="">
                                                <button class="btn btn-danger" title="Eliminar" data-toggle="modal"
                                                    data-target="#adviseModel">
                                                    <!-- Borrar -->
                                                    <i class="fa fa-minus-circle"></i>
                                                </button>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                            <a href="#" class="btn btn-primary">Agregar</a>
                        </div>

                    </div>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="adviseModel" tabindex="-1" role="dialog" aria-labelledby="adviseModelTitle"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="adviseModalTitle">Advertencia!
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                ¿Desea eliminar el moderador seleccionado?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-danger">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- LOCACIONES -->
                <div class="tab-pane fade mx-auto" id="sport-list" role="tabpanel" aria-labelledby="sport-tab">
                    <div class="card card-tables text-center">
                        <div class="card-header">
                            <h2>Locaciones</h2>
                            <hr>
                        </div>

                        <div class="card-body">
                            <!-- Lista de Locaciones-->
                            <div class="table-responsive">
                                <table id="LocationsTable"
                                    class="table table-bordered table-hover table-striped table-options">
                                    <thead class="thead-dark text-center">
                                        <tr>
                                            <th>LOCATION</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="locacion in locaciones" :key="locacion.id" >
                                        <tr id="usuarioslist">
                                            <td>{{locacion.name_LOCATION}}</td>
                                            <td class="">
                                                <!--button that call collapse-->
                                                <button v-on:click="getElements" class="btn btn-primary" type="button" data-toggle="collapse"
                                                    :data-target="'#details' + locacion.name_LOCATION.replace(/ /g, '')" aria-controls="details" aria-expanded="false"
                                                    title="Ver detalles">
                                                    <!-- Ver detalles -->
                                                    <i class="fa fa-info-circle"></i>
                                                </button>
                                                <button class="btn btn-danger" title="Eliminar" data-toggle="modal"
                                                    data-target="#locationModel">
                                                    <!-- Borrar -->
                                                    <i class="fa fa-minus-circle"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr class="collapse " v-bind:id="['details' + locacion.name_LOCATION.replace(/ /g, '')]">
                                            <td class="p-3 text-left" colspan='5'>
                                                <table id="IndumentariaTable"
                                                    class="table table-striped table-options">
                                                    <thead class="thead-info">
                                                        <tr>
                                                            <th>Indumentaria</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="element in inventario[locacion.name_LOCATION]" :key="element.id"  id="usuarioslist">
                                                            <td >{{element.element_NAME}}</td>
                                                            <td class="">
                                                                <button class="btn btn-danger" title="Eliminar" data-toggle="modal"
                                                                    data-target="#elementModel">
                                                                    <!-- Borrar -->
                                                                    <i class="fa fa-minus-circle"></i>
                                                                </button>
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <a href="#" class="btn btn-primary">Agregar</a>
                        </div>
                    </div>
                </div>
                <!-- Modal -->
                <div class="modal fade" id="elementModel" tabindex="-1" role="dialog" aria-labelledby="elementModelTitle"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="adviseModalTitle">Advertencia!
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                ¿Desea eliminar el Elemento seleccionado?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-danger">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
                 <!-- Modal -->
                <div class="modal fade" id="locationModel" tabindex="-1" role="dialog" aria-labelledby="locationModelTitle"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="locationModalTitle">Advertencia!
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                ¿Desea eliminar la indumentaria seleccionada?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-danger">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>




        <!-- <div class="d-flex align-items-center col-xl-3 col-lg-3 col-12 mt-4"> -->
        <div class="d-flex align-items-center col-xl-4 col-lg-4 col-8  mx-auto mb-5">
            <img class="logoUnal mx-auto" src="../assets/LogoUnal_Black.png" alt=" ">
        </div>
    </div>
    </div>
</template> 

<script>
import NavBar from './header/NavBar';
import axios from "axios";
export default {
    name: 'Bienestar',
    components: {NavBar}, 
    data: function(){
      return{
          usuarios: [], 
          locaciones:[], 
          inventario:{},
      }  
    },
    methods: {
        /*
        getElements: function(location_id){
            let self = this; 
            axios
            .get("http://localhost:8081/elntofsibu?name_location="+location_id)
                .then((result) => {
                    self.inventario[location_id]=result.data; 
                }).catch((error) => {
                    alert("ERROR Servidor");
                });
            alert(JSON.stringify(inventario[location_id]))
        }
        */
        getElements: function(location_id){
            alert(JSON.stringify(inventario))
        }
    },
    created: function(){
        this.username = this.$route.params.username;
        let self = this;
        axios
        .get("http://localhost:8081/user")
            .then((result) => {
                self.usuarios=result.data; 
            }).catch((error) => {
                alert("ERROR Servidor MODERADOR");
            });
        axios
        .get("http://localhost:8081/locationssibu")
            .then((result) => {
                self.locaciones=result.data; 
            }).catch((error) => {
                alert("ERROR Servidor LOCACION");
            });
                        
        var i 
        for(i=0 ; i<self.locaciones.length ; i++){
            axios
                .get("http://localhost:8081/elntofsibu")
                    .then((result) => {
                        self.inventario[locaciones[i].name_LOCATION]=result.data; 
                    }).catch((error) => {
                        alert("ERROR Servidor ELEMENTO");
                });
        }
                
    }
}
</script> 

<style scoped>
.logo {
  width: 100px; }
  
.navbar-nav {
  width: 100%;
}

.navbar-toggler{
  margin-right: 30px;
}

.card.nav-link{
  height: 100px;
  background-color: #76232f;
  border-radius: 30px;
  padding: 0px;
  border: none;
  overflow: hidden;
  color: white;
  font-size: 35pt;

}

.card.nav-link:hover{
  top: -2px;
  transition: 0.5s;
  text-decoration: none;
  color: #B1B2B0;
}

.card div{
  margin: auto;
}

.table-options td:last-child{
  text-align: center;
  padding-left: 0px;
  padding-right: 0px;
}

.table td{
  vertical-align: middle;
}

.card-tables button{
  width: 40px;
  height: 40px;
  /* margin: 5px; */
  
}

.tab-pane.fade{
  /* background-color: #94B43B; */
  width: 80%;
}

.card-header{
  background-color: transparent;
  border: none;
  width: 100%;
  text-align: center!important;
}

.card-tables{
  background-color: #B1B2B0;
  border-radius: 20px;
  border: none;
  height: fit-content;
}

.list-group-item{
  /* width: 50%; */
  background-color: transparent;
  border: none;
}

.card-tables button:hover{
  font-size: 1.5rem;
  padding: 0 0.53rem;
  /* font-size: 1rem; */
  transition: 0.1s;
}

.card-tables .card-body{
  margin-top: -20px;
  width: 95%;
}

.fullName{
  width: 100%;
  font-size: 26pt;
}


.welcome{
  width: 100%;
}

.hola{
  width: 50%;
  color: #7a7a7a;
  font-size: 20pt;
  margin: -10px auto;
}



ul{
  list-style-type: none;
  padding: 0;
 
}

.row{
  width: 100%;
}

table{
  background-color: #e9ecef;
}


.logoUnal{
  display: inline-block;
  width: 85%;
  padding-left: 10px;
  padding-right: 10px;

}




@media (max-width: 768px) {
  .welcome{
    font-size: 100pt;
    width: 100%;
    /* margin-top: -25px; */
    
  }

  .card.nav-link{
    font-size: 25pt;
    height: 80px;
    margin: auto -15px;
    /* background-color: red; */
  }

  .hola{
    font-size: 15pt;
    /* margin-bottom: 0px; */
  }
  .fullName{
    font-size: 20pt;
    /* margin-bottom: 0px; */
  }

  .logoUnal{
    margin-bottom: 0px;
  }
}
      
@media (max-width: 576px){
  .card.nav-link{
    height: 60px;
    font-size: 15pt;
    border-radius: 20px;
    
  }
}
</style>