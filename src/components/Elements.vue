<template>
  <div class="elements">
    <NavBar :username="username" />
    <div class="container d-flex justify-content-center">
      <div class="row my-3 pt-4">
        <h2 class="titulo_prin">Implementos deportivos</h2>
      </div>
    </div>

    <div class="container pt-4 mb-5">
      <div class="row mt-2 justify-content-center">
        <div class="back pl-4 pr-4">
          <!-- <h3 class="titulos tit-det pt-4 pb-4">Detalles Generales</h3> -->
          <!-- Buscador -->
          <input
            type="search"
            placeholder="Buscar"
            class="form-control mt-4"
            v-model="search"
          />
          <!-- Lista de Implementos-->
          <div class="table-responsive mt-4  mb-4">
            <table
              class="table table-bordered table-hover table-options mx-auto"
            >
              <thead class="thead-dark text-center">
                <tr>
                  <th>UBICACION</th>
                  <th>IMPLEMENTO</th>
                  <th>DEPORTE</th>
                  <!-- <th>LUGAR</th> -->
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="element in filterElements" :key="element.id_ELEMENT">
                  <td class="align-middle">{{ element.name_LOCATION }}</td>
                  <td class="align-middle">{{ element.element_NAME }}</td>
                  <td class="align-middle">
                    {{ element.name_SPORT }}
                  </td>
                  <td class="align-middle d-flex justify-content-center">
                    <button
                      class="btn btn-success"
                      title="Solicitar"
                      v-if="element.available"
                      v-on:click="requestElement(element)"
                    >
                      <!-- Borrar -->
                      <!-- <i class="fa fa-minus-circle"></i> -->
                      Solicitar
                    </button>
                    <span class="btn" title="Solicitar" v-else>
                      No disponible
                    </span>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="filterElements.length == 0">
                <tr style="height: 100px">
                  <td class="align-middle text-center" colspan="4">
                    No hay Implementos para mostrar
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- MODAL -->
        <vue-toastr ref="mytoast"></vue-toastr>
        <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
        
      </div>
    </div>
    <div class="container my-5">
    </div>
  </div>
</template>

<script>
import NavBar from "../components/header/NavBar";
import axios from "axios";
import ConfirmDialogue from "../components/modal/ConfirmDialogue";

export default {
  name: "CreateEvents",
  components: {
    NavBar,
    ConfirmDialogue,
    "vue-toastr": window.VueToastr,
  },
  data: function () {
    return {
      username: "",
      sports: null,
      elements: [],
      search: "",
    };
  },
  created: function () {
    this.username = this.$route.params.username;
  },
  mounted: function () {
    axios
      .get("https://wise-brook-308119.ue.r.appspot.com/elements/")
      .then((response) => (this.elements = response.data));
    this.$refs.mytoast.defaultPosition = "toast-bottom-right";
  },
  computed: {
    filterElements: function () {
      return this.elements.filter((element) => {
        if (
          element.name_SPORT.toLowerCase().match(this.search.toLowerCase()) ||
          element.name_LOCATION
            .toLowerCase()
            .match(this.search.toLowerCase()) ||
          element.element_NAME.toLowerCase().match(this.search.toLowerCase())
        ) {
          return element;
        }
      });
    },
  },
  methods: {
    async requestElement(element) {
      // this.printHello()
      const ok = await this.$refs.confirmDialogue.show({
        title: "Solicitar Elemento",
        message:
          "Detalles de la solicitud: \n" +
          " <br> <ul><li><b>Implemento: </b>"+ element.element_NAME + "</li>" + 
          "<li><b>Descripcion: </b>" + element.description + "</li>"+
          "<li><b>Ubicacion: </b>" + element.name_LOCATION + "</li>"+
          "<li><b>Deporte: </b>" + element.name_SPORT + "</li>" +
          "<li><b>Fecha de entrega: </b>" + "?".big().bold() + "</li>"+"</ul>" + 
          "<img class='d-block mx-auto' alt='Imagen del implemento deportivo' src=' data:image/jpg;base64," + element.element_IMAGE + "' height='200'>",
        okButton: "Solicitar",
      });
      // If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
        try {
          await axios.post(
            // "https://wise-brook-308119.ue.r.appspot.com/nosports?sport=" + String(sport.name_SPORT)
          );
          this.success("Solicitud realizada correctamente (No se está realizando ninguna acción)");
        } catch (error) {
          this.error("Error realizando solcitud");
        }
      }
    },
    success(msg) {
      this.$refs.mytoast.s({
        msg: msg,
        progressbar: false,
      });
    },
    error(msg) {
      this.$refs.mytoast.e({
        msg: msg,
        progressbar: false,
      });
    },
    warning(msg) {
      this.$refs.mytoast.w({
        msg: msg,
        progressbar: false,
      });
    },
    info(msg) {
      this.$refs.mytoast.i({
        msg: msg,
        progressbar: false,
      });
    },
  },
};
</script>

<style scoped>
.container {
  font-size: 14pt;
}

.back {
  color: #fff;
  background-color: #94b43b;
  border-radius: 10px;
  box-shadow: 10px 10px #466b3f;
  width: 90%;
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

.form-control {
  width: 200px;
  margin-right: auto;
  margin-left: auto;
  margin-top: -15px;
  margin-bottom: 15px;
}

table {
  border-collapse: separate;
  border-spacing: 0;
  background-color: rgb(233, 236, 239);
  width: 90%;
  border-radius: 15px;
  -moz-border-radius: 15px;
  /* min-width: 350px; */
}

/* top-left border-radius */
table tr:first-child th:first-child {
  border-top-left-radius: 15px;
}

/* top-right border-radius */
table tr:first-child th:last-child {
  border-top-right-radius: 15px;
}

/* bottom-left border-radius */
table tr:last-child td:first-child {
  border-bottom-left-radius: 15px;
}

/* bottom-right border-radius */
table tr:last-child td:last-child {
  border-bottom-right-radius: 15px;
}

table td:last-child {
  padding-left: 0;
  padding-right: 0;
}
</style>
