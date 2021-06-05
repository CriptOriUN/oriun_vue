<template>
  <div class="bienestar">
    <NavBar :username="username" />
    <div class="container mt-5">
      <div class="row mx-auto">
        <div class="welcome">
          <p class="hola mx-auto">Hola,</p>
          <p class="fullName text-center" id="userName">{{ username }}</p>
        </div>
      </div>
      <div class="row justify-content-center mx-auto" id="myTab" role="tablist">
        <!-- <div class="card col-xl-4 col-lg-4 col-md-6 col-12 mt-4"> -->
        <ul class="row nav col-auto d-flex justify-content-between">
          <li class="col-5 mt-4 mx-auto nav-item">
            <a
              href="#event-list"
              class="card nav-link"
              id="events-tab"
              data-toggle="tab"
            >
              <div class="text-center">Moderadores</div>
            </a>
          </li>

          <li class="col-5 mt-4 mx-auto nav-item">
            <a
              href="#sport-list"
              class="card nav-link"
              id="sports-tab"
              data-toggle="tab"
            >
              <div class="text-center">Locaciones</div>
            </a>
          </li>
        </ul>

        <div class="row tab-content mt-5 mb-5" id="myTabContent">
          <!-- MODERADORES -->
          <div
            class="tab-pane fade mx-auto"
            id="event-list"
            role="tabpanel"
            aria-labelledby="events-tab"
          >
            <div class="card card-tables text-center">
              <div class="card-header mx-auto">
                <h2>Moderadores</h2>
                <hr />
              </div>

              <div class="card-body">
                <div v-if="isLoading">
                  <!--<p> Cargando... </p>-->
                  <div class="loading-icon">
                    <Spinner :color="color" />
                  </div>
                </div>

                <!-- Lista de Moderadores-->
                <div v-else class="table-responsive">
                  <table
                    id="EventsTable"
                    class="table table-bordered table-hover table-striped table-options"
                  >
                    <thead class="thead-dark text-center">
                      <tr>
                        <th>USERNAME</th>
                        <th>Activo</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="usuario in usuarios"
                        :key="usuario.id"
                        id="usuarioslist"
                      >
                        <td v-if="usuario.rol_NAME == 'Moderador'">
                          {{ usuario.user_NAME }}
                        </td>
                        <td v-if="usuario.rol_NAME == 'Moderador'">
                          <div class="form-check form-switch">
                            <b-form-checkbox
                              switch
                              size="lg"
                              v-model="usuario.enabled"
                              @change="toggleenabled(usuario)"
                            ></b-form-checkbox>
                          </div>
                        </td>
                        <td v-if="usuario.rol_NAME == 'Moderador'" class="">
                          <button class="btn btn-danger" title="Eliminar">
                            <!-- Borrar -->
                            <i
                              class="fa fa-minus-circle"
                              @click="delModerador(usuario.user_NAME)"
                            ></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- LOCACIONES -->
          <div
            class="tab-pane fade mx-auto"
            id="sport-list"
            role="tabpanel"
            aria-labelledby="sport-tab"
          >
            <div class="card card-tables text-center">
              <div class="card-header">
                <h2>Locaciones</h2>
                <hr />
              </div>

              <div class="card-body">
                <div v-if="isLoadingLoc && isLoadingEle">
                  <!--<p> Cargando... </p>-->
                  <div class="loading-icon">
                    <Spinner :color="color" />
                  </div>
                </div>
                <!-- Lista de Locaciones-->
                <div v-else class="table-responsive">
                  <table
                    id="LocationsTable"
                    class="table table-bordered table-hover table-striped table-options"
                  >
                    <thead class="thead-dark text-center">
                      <tr>
                        <th>LOCATION</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody v-for="locacion in locaciones" :key="locacion.id">
                      <tr id="usuarioslist">
                        <td>{{ locacion }}</td>
                        <td class="">
                          <!--button that call collapse-->
                          <button
                            v-on:click="getElements"
                            class="btn btn-primary"
                            type="button"
                            data-toggle="collapse"
                            :data-target="
                              '#details' + locacion.replace(/ /g, '')
                            "
                            aria-controls="details"
                            aria-expanded="false"
                            title="Ver detalles"
                          >
                            <!-- Ver detalles -->
                            <i class="fa fa-info-circle"></i>
                          </button>
                          <button class="btn btn-danger" title="Eliminar">
                            <!-- Borrar -->
                            <i
                              class="fa fa-minus-circle"
                              @click="delLocation(locacion)"
                            ></i>
                          </button>
                        </td>
                      </tr>
                      <tr
                        class="collapse"
                        v-bind:id="['details' + locacion.replace(/ /g, '')]"
                      >
                        <td class="p-3 text-left" colspan="5">
                          <table
                            id="IndumentariaTable"
                            class="table table-striped table-options"
                          >
                            <thead class="thead-info">
                              <tr>
                                <th>Indumentaria</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="element in elementos"
                                :key="element.id"
                                id="usuarioslist"
                              >
                                <td v-if="element.name_LOCATION == locacion">
                                  {{ element.element_NAME }}
                                </td>
                                <td
                                  v-if="element.name_LOCATION == locacion"
                                  class=""
                                >
                                  <button
                                    class="btn btn-danger"
                                    title="Eliminar"
                                    @click="delElement(element.id_ELEMENT)"
                                  >
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
              </div>
            </div>
          </div>
        </div>
        <!-- MODAL -->
        <vue-toastr ref="mytoast"></vue-toastr>
      </div>
      <!-- <div class="d-flex align-items-center col-xl-3 col-lg-3 col-12 mt-4"> -->
      <div
        class="d-flex align-items-center col-xl-4 col-lg-4 col-8 mx-auto mb-5"
      >
        <img
          class="logoUnal mx-auto"
          src="../assets/LogoUnal_Black.png"
          alt=" "
        />
      </div>
    </div>
    <MySocialChat />
  </div>
</template> 

<script>
import NavBar from "./header/NavBar";
import axios from "axios";
import { usersfake } from "../fake-data";
import Spinner from "./spinner/Spinner";
import Vue from "vue";
import { toaster } from "../components/toaster/toaster";
import MySocialChat from "../components/social-chat/MySocialChat";
export default {
  name: "Bienestar",
  components: {
    NavBar,
    usersfake,
    Spinner,
    MySocialChat,
  },
  data: function () {
    return {
      usuarios: [],
      locaciones: [],
      elementos: [],
      usersfake,
      isLoading: true,
      isLoadingLoc: true,
      isLoadingEle: true,
      color: "#76232f",
      toaster,
    };
  },
  methods: {
    getElements: function (location_id) {
      alert(JSON.stringify(inventario));
    },
    delModerador: function (value) {
      /*
      let index = this.usersfake
        .map(function (e) {
          return e.user_NAME;
        })
        .indexOf(value);
      axios.delete();
      this.$delete(this.usersfake, index);
      this.success("Moderador eliminado con exito");*/
    },
    delElement: function (value) {
      let index = this.elementos
        .map(function (e) {
          return e.id_ELEMENT;
        })
        .indexOf(value);
      // Array.prototype.deepIndexOf = function (val) {
      //   for (var i = 0; i < this.length; i++) {
      //     if (this[i] == val) return [i];
      //     var insideIndex = this[i].deepIndexOf ? this[i].deepIndexOf(val) : -1;
      //     if (insideIndex != -1) return [i].concat(insideIndex);
      //   }
      //   return -1;
      // };

      // let index = this.elementos.deepIndexOf(value);

      axios
        .delete(
          "https://wise-brook-308119.ue.r.appspot.com/noelements?id=" + value
        )
        .then((result) => {
          this.$delete(this.elementos, index);
          this.toaster.success("Elemento eliminado con exito");
        })
        .catch((error) => {
          this.toaster.failure("Error eliminando Elemento");
        });
    },
    delLocation: function (value) {
      // let index = this.locaciones
      //   .map(function (e) {
      //     return e.name_LOCATION;
      //   })
      //   .indexOf(value);

      let filtro = (element) => element == value;
      let index = this.locaciones.findIndex(filtro);
      alert(index);
      axios
        .delete(
          "https://wise-brook-308119.ue.r.appspot.com/nolsibu?name=" + value
        )
        .then((result) => {
          this.$delete(this.locaciones, index);
          this.toaster.success("Locación eliminada con exito");
        })
        .catch((error) => {
          this.toaster.failure("Error eliminando Locación");
        });
    },
    toggleenabled(user) {
      //alert(JSON.stringify(user))
    },
  },
  created: function () {
    this.username = this.$route.params.username;
    let self = this;
    axios
      .get("https://wise-brook-308119.ue.r.appspot.com/user")
      .then((result) => {
        self.usuarios = result.data;
        self.isLoading = false;
      })
      .catch((error) => {
        alert("ERROR Servidor MODERADOR");
      });
    axios
      .get(
        "https://wise-brook-308119.ue.r.appspot.com/Singlelsibu?init=-1&size=-1"
      )
      .then((result) => {
        self.locaciones = result.data;
        self.isLoadingLoc = false;
      })
      .catch((error) => {
        alert("ERROR Servidor LOCACION");
      });

    axios
      .get(
        "https://wise-brook-308119.ue.r.appspot.com/Singlelmts?init=-1&size=-1"
      )
      .then((result) => {
        self.elementos = result.data;
        self.isLoadingEle = false;
      })
      .catch((error) => {
        alert("ERROR Servidor ELEMENTOS");
      });
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
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0.5, 0.5);
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

.tab-pane.fade {
  /* background-color: #94B43B; */
  width: 80%;
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

table {
  background-color: #e9ecef;
}

.logoUnal {
  display: inline-block;
  width: 85%;
  padding-left: 10px;
  padding-right: 10px;
}

.register {
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
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