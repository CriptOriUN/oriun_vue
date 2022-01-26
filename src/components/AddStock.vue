<template>
  <div class="regmoderator">
    <NavBar :username="username" />
    <div class="container pt-4 text-center">
      <div class="pb-5">
        <h2>Agregar y Modificar Inventario</h2>
      </div>

      <!--Guia para llevar a cada Pill-->
      <div class="card mx-auto">
        <div class="card-header border-bottom-0 bg-transparent">
          <ul
            class="nav nav-tabs justify-content-center"
            id="pills-tab"
            role="tablist"
          >
            <li class="nav-item text-center" id="login-tab">
              <a
                class="nav-link active text-primary"
                id="pills-login-tab"
                data-toggle="pill"
                href="#pills-login"
                role="tab"
                aria-controls="pills-login"
                aria-selected="true"
                >Agregar</a
              >
            </li>
            <li class="nav-item text-center">
              <a
                class="nav-link text-primary"
                id="pills-register-tab"
                data-toggle="pill"
                href="#pills-register"
                role="tab"
                aria-controls="pills-register"
                aria-selected="false"
                >Actualizar</a
              >
            </li>
          </ul>
        </div>
        <div class="card-body pb-4">
          <!--Pill de creacion-->
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-login"
              role="tabpanel"
              aria-labelledby="pills-login-tab"
            >
              <Spinner
                :color="color"
                v-if="isLoadingLoc && isLoadingSports && isLoadingEle"
              />
              <form v-else v-on:submit.prevent="submitFormElement">
                <div class="form-group">
                  <input
                    type="text"
                    name="locationname"
                    id="name"
                    class="form-control"
                    placeholder="Nombre Elemento"
                    v-model="stockform.element_NAME"
                    required
                    autofocus
                  />
                </div>
                <div class="form-group">
                  <label for="Locacion" class="titulo_bln my-check"
                    >Locacion</label
                  >
                  <select
                    name=""
                    class="form-control"
                    id="Locacion"
                    v-model="stockform.name_LOCATION"
                    required
                  >
                    <option disabled value="">Seleccione una Locación</option>
                    <option
                      v-for="locacion in locaciones"
                      :key="locacion.id"
                      :value="locacion.name_LOCATION"
                    >
                      {{ locacion.name_LOCATION }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="Deporte" class="titulo_bln my-check"
                    >Deporte
                  </label>
                  <select
                    name=""
                    class="form-control"
                    id="Deporte"
                    v-model="stockform.name_SPORT"
                    required
                  >
                    <option disabled value="">Seleccione un Deporte</option>
                    <option
                      v-for="deporte in deportes"
                      :key="deporte.id"
                      :value="deporte.name_SPORT"
                    >
                      {{ deporte.name_SPORT }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <div class="form-check form-switch my-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      v-model="stockform.available"
                    />
                    <label class="form-check-label" for="flexSwitchCheckDefault"
                      >Disponible</label
                    >
                  </div>
                </div>
                <div class="form-group">
                  <div class="my-check">
                    <label for="locationimage">Imagen: </label>
                    <input
                      type="file"
                      id="locationimage"
                      name="locationimage"
                      accept="image/*"
                      @change="fileSelected"
                      required
                    />
                  </div>
                  <img v-if="image" :src="image" />
                </div>
                <div class="form-group">
                  <textarea
                    name="message"
                    placeholder="Descripcion"
                    rows="3"
                    v-model="stockform.description"
                    required
                  ></textarea>
                </div>
                <div class="text-center pt-2 pb-1">
                  <button type="submit" class="btn btn-primary">
                    Añadir Inventario
                  </button>
                </div>
              </form>
            </div>

            <!--Pill de actualizacion-->
            <div
              class="tab-pane fade"
              id="pills-register"
              role="tabpanel"
              aria-labelledby="pills-register-tab"
            >
              <form v-on:submit.prevent="updateFormElement">
                <Spinner :color="color" v-if="isLoadingEle" />
                <div v-else class="form-group">
                  <label class="titulo_bln my-check">Elemento</label>
                  <select
                    name=""
                    class="form-control"
                    id="Elemento"
                    v-model="updateform.id_ELEMENT"
                    required
                  >
                    <option disabled value="">Seleccione un elemento</option>
                    <option
                      v-for="elemento in elementos"
                      :key="elemento.id"
                      :value="elemento.id_ELEMENT"
                    >
                      {{ elemento.element_NAME }}
                    </option>
                  </select>
                </div>
                <div v-if="lookother">
                  <div class="form-group">
                    <label for="Locacion" class="titulo_bln my-check"
                      >Locacion</label
                    >
                    <select
                      name=""
                      class="form-control"
                      id="Locacion"
                      v-model="updateform.name_LOCATION"
                      required
                    >
                      <option
                        v-for="locacion in locaciones"
                        :key="locacion.id"
                        :value="locacion.name_LOCATION"
                      >
                        {{ locacion.name_LOCATION }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="Deporte" class="titulo_bln my-check"
                      >Deporte
                    </label>
                    <select
                      name=""
                      class="form-control"
                      id="Deporte"
                      v-model="updateform.name_SPORT"
                      required
                    >
                      <option disabled value="">Seleccione un deporte</option>
                      <option
                        v-for="deporte in deportes"
                        :key="deporte.id"
                        :value="deporte.name_SPORT"
                      >
                        {{ deporte.name_SPORT }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <div class="form-check form-switch my-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        v-model="updateform.available"
                      />
                      <label
                        class="form-check-label"
                        for="flexSwitchCheckDefault"
                        >Disponible</label
                      >
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="my-check">
                      <label>Imagen: </label>
                      <input
                        type="file"
                        id="locationimage"
                        name="locationimage"
                        accept="image/*"
                        @change="fileSelectedupd"
                      />
                    </div>
                    <img v-if="imageupd" :src="imageupd" />
                  </div>
                  <div class="form-group">
                    <textarea
                      name="message"
                      placeholder="Descripcion"
                      rows="3"
                      v-model="updateform.description"
                      required
                    ></textarea>
                  </div>
                  <div class="text-center pt-2 pb-1">
                    <button
                      type="submit"
                      class="btn btn-primary"
                    >
                      Actualizar Inventario
                    </button>
                  </div>
                </div>
              </form>
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
import Spinner from "../components/spinner/Spinner";
//import {elementsfake} from '../fake-data'
//import {locationsfake} from '../fake-data'
import { toaster } from "./toaster/toaster";
export default {
  name: "AddStock",
  components: {
    NavBar,
    Spinner,
  },
  data: function () {
    return {
      stockform: {
        name_LOCATION: "",
        name_SPORT: "",
        available: false,
        element_NAME: "",
        element_IMAGE: "",
        description: "",
      },
      updateform: {
        name_LOCATION: "",
        element_NAME: "",
        name_SPORT: "",
        available: false,
        id_ELEMENT: "",
        element_IMAGE: "",
        description: "",
      },
      locaciones: [],
      deportes: [],
      elementos: [],
      username: "",
      image: "",
      imageupd: "",
      isLoadingEle: true,
      isLoadingLoc: true,
      isLoadingSports: true,
      lookother: false,
      //elementsfake ,
      selectedindex: "",
      color: "#94B43B",
      //locationsfake ,
      toaster,
    };
  },
  created: function () {
    this.username = this.$route.params.username;
    let self = this;
    // Get de la lista de elementos
    axios
      .get(this.$apiURL+"/Singlelmts?init=-1&size=-1")
      .then((result) => {
        self.elementos = result.data;
        self.isLoadingEle = false;
      })
      .catch((error) => {
        alert("Error Servidor ELEMENTOS");
      });

    // Get de la lista de locaciones
    axios
      .get(this.$apiURL+"/locationssibu")
      .then((result) => {
        self.locaciones = result.data;
        self.isLoadingLoc = false;
      })
      .catch((error) => {
        alert("ERROR Servidor LOCACION");
      });
    // get de la lista de Ddeportes
    axios
      .get(this.$apiURL+"/sports")
      .then((result) => {
        self.deportes = result.data;
        self.isLoadingSports = false;
      })
      .catch((error) => {
        alert("ERROR Servidor DEPORTE");
      });
  },
  methods: {
    // informativo
    getAdd: function () {
      alert(JSON.stringify(this.stockform));
      console.log(JSON.stringify(this.stockform));
    },
    //informativo
    getAdd2: function () {
      alert(JSON.stringify(this.updateform));
      console.log(JSON.stringify(this.updateform));
    },

    // Post del formulario de Registro
    submitFormElement: function () {
      var self = this;
      axios
        .post(this.$apiURL+"/element", self.stockform)
        .then((result) => {
          self.stockform.name_LOCATION = self.stockform.name_SPORT = self.stockform.element_NAME = self.stockform.description = self.image =
            "";
          self.stockform.available = false;
          self.toaster.success("Registro de elemento exitoso")
        })
        .catch((error) => {
          self.toaster.failure("Error no esperado en el servidor.");
        });
    },

    //Post del formulario de actualizacion
    updateFormElement: function () {
      var self = this;
      axios
        .put(this.$apiURL+"/a", self.updateform)
        .then((result) => {
          self.updateform.name_LOCATION = self.updateform.name_SPORT = self.updateform.id_ELEMENT = self.updateform.description = self.image =
            "";
          self.updateform.available = false;
          self.toaster.success("Elemento Actualizado con exito")
        })
        .catch((error) => {
          self.toaster.failure("Error no esperado en el servidor.");
        });
    },

    // seleccion de imagen de registro
    fileSelected(event) {
      const file = event.target.files.item(0);
      const reader = new FileReader();
      reader.addEventListener("load", this.imageLoaded);
      reader.readAsDataURL(file);
    },
    imageLoaded(event) {
      this.image = event.target.result;
      let imagen = event.target.result.split(",", 2);
      this.stockform.element_IMAGE = imagen[1];
    },

    // SEleccion de imagen de actualizacion
    fileSelectedupd(event) {
      const fileupd = event.target.files.item(0);
      const readerupd = new FileReader();
      readerupd.addEventListener("load", this.imageLoadedupd);
      readerupd.readAsDataURL(fileupd);
    },
    imageLoadedupd(event) {
      this.imageupd = event.target.result;
      let imagen = event.target.result.split(",", 2);
      this.updateform.element_IMAGE = imagen[1];
    },
  },
  // verifica las cosas que se hacen al seleccionar el elemento
  watch: {
    "updateform.id_ELEMENT"(value) {
      //alert(value)
      if (value != "") {
        axios
          .get(this.$apiURL+"/MyElement?id=" + value)
          .then((result) => {
            console.log(result.data.name_LOCATION);
            this.lookother = true;
            this.updateform.name_LOCATION = result.data.name_LOCATION;
            this.updateform.name_SPORT = result.data.name_SPORT;
            this.updateform.available = result.data.available;
            this.updateform.description = result.data.description;
            this.updateform.element_IMAGE = result.data.element_IMAGE;
            this.imageupd =
              "data:image/png;base64," + result.data.element_IMAGE;
          })
          .catch((error) => {
            toaster.failure("Hubo un error de busqueda en el sistema");
          });
      } else {
        this.lookother = false;
      }
      // this.selectedindex = this.elementos
      //   .map(function (e) {
      //     return e.id_ELEMENT;
      //   })
      //   .indexOf(value);
      // //alert(this.selectedindex);
      // if (value != "") {
      //   this.lookother = true;
      //   this.updateform.name_LOCATION = this.elementos[
      //     this.selectedindex
      //   ].name_LOCATION;
      //   this.updateform.name_SPORT = this.elementos[
      //     this.selectedindex
      //   ].name_SPORT;
      //   this.updateform.available = this.elementos[
      //     this.selectedindex
      //   ].available;
      //   this.updateform.description = this.elementos[
      //     this.selectedindex
      //   ].description;
      //   this.updateform.element_IMAGE = this.elementos[
      //     this.selectedindex
      //   ].element_IMAGE;
      //   this.imageupd =
      //     "data:image/png;base64," +
      //     this.elementos[this.selectedindex].element_IMAGE;
      // } else {
      //   this.lookother = false;
      // }
    },
  },
};
</script>


<style scoped>
* {
  font-size: 14pt;
}
img {
  width: 200px;
}
textarea {
  width: 500px;
  border: none;
  overflow: auto;
  outline: none;
}
.card {
  width: 600px;
  background-color: #a61c31;
  border-radius: 30px;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0.5, 0.5);
}
button,
.btn-primary {
  background-color: #b1b2b0;
  border: none;
  border-radius: 10px;
  margin-top: 40px;
  width: 80%;
  margin-bottom: 20px;
}

button:hover {
  background-color: gray;
}

.form-control {
  border-radius: 10px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.placeholder,
.my-check {
  float: left;
  /* width:100px; */
  color: white;
  margin-top: 5px;
  margin-bottom: 15px;
  margin-left: 30px;
}

.card-header {
  padding: 0;
}

li.nav-item {
  /* padding: auto; */
  width: 50%;
  /* border-top-left-radius: 15px; */
  margin-top: -1px;
}

.nav-tabs .nav-item.show,
.nav-tabs .nav-link.active {
  background-color: transparent;
  border: none;
  color: white;
}

.nav-link {
  background-color: #76232f;
  border-bottom: 1px;
}

#pills-login-tab {
  border-top-left-radius: 30px;
  /* margin: -1px -1px 0px 0px; */
  margin-left: -1px;
}

#pills-register-tab {
  border-top-right-radius: 30px;
  margin-right: -1px;
  /* border-bottom: 1px solid white; */
  /* border-left: 0.1px solid white; */
}

.nav-tabs .nav-link:focus,
.nav-tabs .nav-link:hover {
  border-color: transparent;
}

.nav-tabs .nav-link {
  border-top-left-radius: 0px;
}
.nav-tabs {
  border-bottom: none;
}
textarea {
  border-radius: 10px;
}

.text-primary {
  color: #7a7a7a !important;
}

.text-primary.active {
  color: white !important;
}

@media (max-width: 470px) {
  .app-logo {
    max-width: 400px;
    width: 70%;
    height: auto;
  }

  .card {
    max-width: 400px;
    width: 80%;
  }

  textarea {
    width: 250px;
  }
}

/* @media only screen and (max-width: 600px) {
    .app-logo{
        max-width: 400px;
        width: 70%;
        height: auto;
    }
  
    .card{
        max-width: 400px;
        width: 80%;
        
    }
  } */
</style>