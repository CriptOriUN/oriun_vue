<template>
  <div class="regmoderator">
    <NavBar :username="username" />
    <div class="container pt-4 text-center">
      <div class="pb-5">
        <h2>Agregar y Modificar Locacion</h2>
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
              <form v-on:submit.prevent="submitFormLocation">
                <div class="form-group">
                  <input
                    type="text"
                    name="locationname"
                    id="name"
                    class="form-control"
                    placeholder="Nombre Locacion"
                    v-model="locationform.name_LOCATION"
                    required
                    autofocus
                  />
                </div>
                <div class="form-group">
                  <div class="form-check form-switch my-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      v-model="locationform.open"
                    />
                    <label class="form-check-label" for="flexSwitchCheckDefault"
                      >Abierto</label
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
                <div class="text-center pt-2 pb-1">
                  <button type="submit" class="btn btn-primary">
                    Añadir Locacion
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
              <form v-on:submit.prevent="submitupdlocationform">
                <Spinner :color="color" v-if="isLoadingLoc" />
                <div v-else class="form-group">
                  <label class="titulo_bln my-check">Locación</label>
                  <select
                    name=""
                    class="form-control"
                    id="Elemento"
                    v-model="updatelocationform.name_LOCATION"
                    required
                  >
                    <option disabled value="">Seleccione una locación</option>
                    <option
                      v-for="locacion in locaciones"
                      :key="locacion.id"
                      :value="locacion"
                    >
                      {{ locacion }}
                    </option>
                  </select>
                  <div v-if="lookother">
                    <div class="form-group">
                      <div class="form-check form-switch my-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckDefault"
                          v-model="updatelocationform.open"
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckDefault"
                          >Abierto</label
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
                          @change="fileSelectedupd"
                        />
                      </div>
                      <img v-if="imageupd" :src="imageupd" />
                    </div>
                    <div class="text-center pt-2 pb-1">
                      <button type="submit" class="btn btn-primary">
                        Actualizar Inventario
                      </button>
                    </div>
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
import { toaster } from "./toaster/toaster";
import Spinner from "./spinner/Spinner";
export default {
  name: "AddLocation",
  components: {
    NavBar,
    Spinner,
  },
  data: function () {
    return {
      locationform: {
        name_LOCATION: "",
        open: false,
        image_LOCATION: "",
      },
      updatelocationform: {
        name_LOCATION: "",
        open: false,
        image_LOCATION: "",
      },
      username: "",
      image: "",
      toaster,
      locaciones: [],
      lookother: false,
      isLoadingLoc: true,
      color: "#94B43B",
      selectedindex: "",
      imageupd: "",
    };
  },
  created: function () {
    this.username = this.$route.params.username;
    let self = this;
    axios
      .get(
        this.$apiURL+"/Singlelsibu?init=-1&size=-1"
      )
      .then((result) => {
        self.locaciones = result.data;
        self.isLoadingLoc = false;
      })
      .catch((error) => {
        alert("ERROR Servidor LOCACION");
      });
  },
  methods: {
    getAdd: function () {
      alert(JSON.stringify(this.locationform));
      console.log(JSON.stringify(this.locationform));
    },
    submitFormLocation: function () {
      var self = this;
      axios
        .post(
          this.$apiURL+"/glocationsibu",
          self.locationform
        )
        .then((result) => {
          self.locationform.name_LOCATION = "";
          self.locationform.open = false;
          this.toaster.success("Locacion Agregada con exito");
        })
        .catch((error) => {
          this.toaster.failure(
            "Error en el sistema, la locacion no se registro con exito"
          );
        });
    },
    submitupdlocationform: function () {
      var self = this;
      axios
        .put(
          this.$apiURL+"/updlocation",
          self.updatelocationform
        )
        .then((result) => {
          //self.locaciones[self.selectedindex] = self.updatelocationform
          //alert(JSON.stringify(self.locaciones[self.selectedindex]))
          self.updatelocationform.name_LOCATION = "";
          self.updatelocationform.open = false;
          self.toaster.success("Locacion Actualizada con exito");
          self.lookother = false;
        })
        .catch((error) => {
          this.toaster.failure(
            "Error en el sistema, la locacion no se actualizo con exito"
          );
        });
    },
    fileSelected(event) {
      const file = event.target.files.item(0);
      const reader = new FileReader();
      reader.addEventListener("load", this.imageLoaded);
      reader.readAsDataURL(file);
    },
    imageLoaded(event) {
      this.image = event.target.result;
      let imagen = event.target.result.split(",", 2);
      this.locationform.image_LOCATION = imagen[1];
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
      this.updatelocationform.image_LOCATION = imagen[1];
    },
  },
  watch: {
    "updatelocationform.name_LOCATION"(value) {
      if (value != "") {
        axios
          .get(
            this.$apiURL+"/myLSbyId/?name=" + value
          )
          .then((result) => {
            this.lookother = true;

            this.updatelocationform.open = result.data.open;

            this.updatelocationform.image_LOCATION = result.data.image_LOCATION;
            this.imageupd =
              "data:image/png;base64," + result.data.image_LOCATION;
          })
          .catch((error) => {
            toaster.failure("Hubo un error de busqueda en el sistema");
          });
      } else {
        this.lookother = false;
      }
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