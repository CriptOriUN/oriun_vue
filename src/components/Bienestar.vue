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
                            Indumentaria
                        </div>
                    </a>
                </li>
            </ul>

            <div class="row tab-content mt-5 mb-5" id="myTabContent">

                <!-- MODERADORES -->
                <div class="tab-pane fade mx-auto" id="event-list" role="tabpanel" aria-labelledby="events-tab">
                    <div class="card card-tables">
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
                                            <th>CREADOR</th>
                                            <th>FECHA</th>
                                            <th>HORA</th>
                                            <th>LUGAR</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Juan David Pinto</td>
                                            <td>18-03-2021</td>
                                            <td>18:00</td>
                                            <td>La playita</td>
                                            <td class="">
                                                <button class="btn btn-primary" type="button" data-toggle="collapse"
                                                    data-target="#details" aria-controls="details" aria-expanded="false"
                                                    title="Ver detalles">
                                                    <!-- Ver detalles -->
                                                    <i class="fa fa-info-circle"></i>
                                                </button>
                                                <button class="btn btn-danger" title="Eliminar" data-toggle="modal"
                                                    data-target="#adviseModel">
                                                    <!-- Borrar -->
                                                    <i class="fa fa-minus-circle"></i>
                                                </button>
                                            </td>
                                        </tr>

                                        <tr class="collapse " id="details">
                                            <td class="p-3 text-left" colspan='5'>
                                                <ul class="list-group">
                                                    <li class="list-group-item py-1">
                                                        <h6 class="d-inline">Deporte: </h6><span class="">Yoga</span>
                                                    </li>
                                                    <li class="list-group-item py-1">
                                                        <h6 class="d-inline">Descripcion: </h6><span class="">Este es un
                                                            evento de esparcimiento y en el que se van a hacer diversos
                                                            ejercicios de relajacion para ttener un equilibrio de cuerpo
                                                            y mente.</span>
                                                    </li>
                                                    <li class="list-group-item py-1">
                                                        <h6 class="d-inline">Hora Inicio: </h6><span
                                                            class="">12:00</span>
                                                    </li>
                                                    <li class="list-group-item py-1">
                                                        <h6 class="d-inline">Hora Fin: </h6><span class="">15:00</span>
                                                    </li>
                                                    <li class="list-group-item py-1">
                                                        <h6 class="d-inline">Capacidad: </h6><span class="">20</span>
                                                    </li>
                                                </ul>

                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>

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
                                ¿Desea eliminar el evento seleccionado?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-danger">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- INDUMENTARIA -->
                <div class="tab-pane fade mx-auto" id="sport-list" role="tabpanel" aria-labelledby="sport-tab">
                    <div class="card card-tables">
                        <div class="card-header">
                            <h2>Indumentaria</h2>
                            <hr>
                        </div>

                        <div class="card-body">


                            <!-- Lista de Indumentaria-->
                            <div class="table-responsive float-left col-5">
                                <table id="SportsTable" class="table table-bordered table-hover table-striped">
                                    <thead class="thead-dark text-center">
                                        <tr>
                                            <th>REGISTRADOS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Futbol</td>
                                        </tr>
                                        <tr>
                                            <td>Tenis de Mesa</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="table-responsive float-right col-7">
                                <table id="SugestionsTable"
                                    class="table table-bordered table-hover table-striped table-options">
                                    <thead class="thead-dark text-center">
                                        <tr>
                                            <th style="width: 60%">SUGERENCIAS</th>
                                            <th>#</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Cartas</td>
                                            <td>3</td>
                                            <td class="">
                                                <button class="btn btn-primary" title="Añadir">
                                                    <i class="fa fa-plus-circle"></i>
                                                </button>
                                                <button class="btn btn-danger" title="Eliminar">

                                                    <i class="fa fa-minus-circle"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Estoy probando un nombre de deporte sugerido que es muy largo, espero
                                                que
                                                quepa en el campo de la tabla</td>
                                            <td>0</td>
                                            <td class="">
                                                <button class="btn btn-primary" title="Añadir">
                                                    <i class="fa fa-plus-circle"></i>
                                                </button>
                                                <button class="btn btn-danger" title="Eliminar">

                                                    <i class="fa fa-minus-circle"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
import NavBar from './header/NavBar'
export default {
    name: 'Bienestar',
    components: {NavBar}, 
    data: function(){
      return{
          username: "", 
      }  
    },
    created: function(){
        this.username = this.$route.params.username; 
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