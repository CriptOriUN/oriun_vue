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
                        <h3>Detalles Generales:</h3>
                        <form action="">
                            <div class="form-group row">
                                <div class="col-12 col-md-6 mb-3 fecha">
                                    <label for="fecha" class="titulo_bln">Fecha</label>
                                    <input type="date" class="form-control" id="fecha_ce">
                                </div>
                                <div class="col-12 col-md-6 mb-3">
                                    <label for="hora" class="titulo_bln">Hora</label>
                                    <div class="row">
                                        <div class="col-6">
                                            <label for="hora-inicio" class="titulo_bln">Hora Inicio</label>
                                            <input type="time" class="form-control" name="hora_incio" id="hora_ini_ce">
                                        </div>
                                        <div class="col-6">
                                            <label for="hora-fin" class="titulo_bln">Hora Fin</label>
                                            <input type="time" class="form-control" name="hora" id="hora_fin_ce">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <form action="">
                            <div class="form-group row">
                                <div class="col-12 col-md-6 mb-3">
                                    <label for="Deporte" class="titulo_bln">Deporte</label>
                                    <select name="" class="form-control" id="">
                                        <option value="Futbol">Futbol</option>
                                        <option value="Baloncesto">Baloncesto</option>
                                        <option value="Tennis">Tennis</option>
                                        <option value="...">...</option>
                                    </select>
                                </div>

                            </div>
                            <div class="form-group-row">
                                <div class="col">
                                    <label for="descripcion" class="titulo_bln">Descripcion del Evento:</label>
                                    <textarea name="descripcion" id="descripcion_ce" class="form-control"></textarea>
                                </div>
                            </div>
                        </form>

                        <form action="">

                        </form>


                    </div>
                </div>
                <!-- la resolucion de las imegens seran 480x480px -->
                <div class="row my-5">
                    <div class="col">
                        <h3 class="titulo_lugares titulo_bln">Lugares Disponibles</h3>
                    </div>

                </div>

                <div class="row py-4">
                    <div class="col-12 col-sm-6 col-lg-3 mb-4">
                        <div class="card">
                            <a href="#">
                                <img class="card-img-top" src="images/1.jpg" alt="">
                            </a>
                            <div class="card-body">
                                <h3 class="card-title">Concha Acustica</h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-3 mb-4">
                        <div class="card">
                            <a href="#">
                                <img class="card-img-top" src="images/1.jpg" alt="">
                            </a>
                            <div class="card-body">
                                <h3 class="card-title">Concha Acustica</h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-3 mb-4">
                        <div class="card">
                            <a href="#">
                                <img class="card-img-top" src="images/1.jpg" alt="">
                            </a>
                            <div class="card-body">
                                <h3 class="card-title">Concha Acustica</h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-3 mb-4">
                        <div class="card">
                            <a href="#">
                                <img class="card-img-top" src="images/1.jpg" alt="">
                            </a>
                            <div class="card-body">
                                <h3 class="card-title">Concha Acustica</h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-3 mb-4">
                        <div class="card">
                            <a href="#">
                                <img class="card-img-top" src="images/1.jpg" alt="">
                            </a>
                            <div class="card-body">
                                <h3 class="card-title">Concha Acustica</h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-3 mb-4">
                        <div class="card">
                            <a href="#">
                                <img class="card-img-top" src="images/1.jpg" alt="">
                            </a>
                            <div class="card-body">
                                <h3 class="card-title">Concha Acustica</h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-3 mb-4">
                        <div class="card">
                            <a href="#">
                                <img class="card-img-top" src="images/1.jpg" alt="">
                            </a>
                            <div class="card-body">
                                <h3 class="card-title">Concha Acustica</h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-3 mb-4">
                        <div class="card">
                            <a href="#">
                                <img class="card-img-top" src="images/1.jpg" alt="">
                            </a>
                            <div class="card-body">
                                <h3 class="card-title">Concha Acustica</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row pb-5">
                    <div class="col d-flex flex-row-reverse">
                        <button class="btn boton" type="submit">Finalizar</button>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/header/NavBar'
export default {
    name: 'CreateEvents',
    components: {
    NavBar
  }, 
  data: function(){
      return{
          username: "", 
      }  
    },
    created: function() {
    this.username = this.$route.params.username;
  }
}
</script>

<style scoped>
.plantilla {
  background: #94b43b;
  min-height: 100vh; }
  .plantilla .contenedor_p {
    padding-top: 20px; }
    .plantilla .contenedor_p .fecha {
      padding-top: 32px; }

.card {
  border-radius: 30px; }

.titulo_lugares {
  justify-content: center; }

.boton {
  background: #565a5c;
  color: #fff;
  width: 150px; }

.titulo_bln {
  color: #fff; }
</style>