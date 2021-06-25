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
        <div class="back px-4">
          <!-- <h3 class="titulos tit-det pt-4 pb-4">Detalles Generales</h3> -->
          <div
            class="d-flex justify-content-between row mt-4 searcher-selector mx-auto"
          >
            <!--		Show Numbers Of Rows 		-->
            <div class="d-flex form-group">
              <p class="mb-0 pt-2 mr-2">Mostar</p>
              <select v-model="maxNumRows" class="form-control" id="maxRows">
                <option value="-1">All</option>
                <option value="5" >5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <p class="mb-0 pt-2 ml-2">Filas</p>
            </div>
            <!-- Buscador -->
            <input
              type="search"
              placeholder="Buscar"
              class="form-control"
              v-model="search"
            />
          </div>
          <!-- Lista de Implementos-->
          <div class="table-responsive">
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
                <tr v-if="loadingElements" style="height: 100px">
                  <td class="align-middle text-center" colspan="4">
                    <Spinner :color="color"/>
                  </td>                 
                </tr>
                <tr v-else v-for="element in filterElements" :key="element.id_ELEMENT">
                  <td class="align-middle">{{ element.name_LOCATION }}</td>
                  <td class="align-middle">{{ element.element_NAME }}</td>
                  <td class="align-middle">
                    {{ element.name_SPORT }}
                  </td>
                  <td class="align-middle d-flex justify-content-center">
                    <button
                      class="btn btn-success"
                      title="Reservar"
                      :id="element.id_ELEMENT"
                      v-if="element.available"
                      v-on:click="getElementByID(element.id_ELEMENT)"
                      style="width:100px"
                    >
                      <span v-if="loadingBooking && element.id_ELEMENT == bookingElementID" class="spinner-border spinner-border-sm" role="status"></span>
                      <span v-else>Reservar</span>

                    </button>
                    <span class="btn" title="Reservar" v-else>
                      No disponible
                    </span>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="filterElements.length == 0 && !loadingElements">
                <tr style="height: 100px">
                  <td class="align-middle text-center" colspan="4">
                    No hay Implementos para mostrar
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mb-5" id="labelPages">
            <nav aria-label="">
              <ul class="pagination pagination-sm justify-content-center">
                <li id="prevLabel" class="page-item disabled" @click="goPrev()">
                  <a class="page-link">Previous</a>
                </li>
                <li
                  v-for="page in pages"
                  class="page-item"
                  :key="page"
                  :ref="'page' + page"
                >
                  <div class="page-link" @click="currentPage = page">
                    {{ page }}
                  </div>
                </li>
                <li id="nextLabel" class="page-item" @click="goNext()">
                  <a class="page-link">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <!-- MODAL -->
        <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/header/NavBar";
import axios from "axios";
import ConfirmDialogue from "../components/modal/ConfirmDialogue";
import {toaster} from './toaster/toaster'
import Spinner from "../components/spinner/Spinner";

export default {
  name: "CreateEvents",
  components: {
    NavBar,
    ConfirmDialogue,
    Spinner,
  },
  data: function () {
    return {
      username: "",
      elements: [],
      elementsAll: [],
      elementShow: null,
      numElements: 3,
      search: "",
      initElementPage: 0,
      maxNumRows: 5,
      numPages: 3,
      pages: [],
      currentPage: 1,
      toaster,
      loadingElements: true,
      loadingBooking: false,
      color: "#94B43B",
      bookingElementID: -1,
      rentDate: new Date(),
    };
  },
  watch: {
    maxNumRows() {
      this.getElements();
      this.auxListPages();
      this.currentPage = 1;
    },
    currentPage() {
      this.getElements();
      this.setPage();
      // this.$refs['page'+this.currentPage].
    },
    elementShow(){
      this.requestElement(this.elementShow);
    }
  },
  created: function () {
    this.username = this.$route.params.username;
    this.getNumElements();
    this.getElements();
    this.getAllElements();
    
  },
  computed: {
    filterElements: function () {
      var elementsArray = this.elements;
      if(this.search != ""){
        elementsArray = this.elementsAll;
      }
      return elementsArray.filter((element) => {
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
  mounted(){
    this.$root.$on("updateBookingDate", (rentDate) => {
      this.rentDate = rentDate;
      console.log("DATE RECEIVED!", rentDate)
    });
  },
  methods: {
    getElementByID(elementID){
      this.loadingBooking = true;
      this.bookingElementID = elementID;
      axios
        .get("https://oriun-api.herokuapp.com/MyElement?id=" + elementID)
        .then((response) => (this.elementShow = response.data, this.loadingBooking = false));
    },
    getElements() {
      if (this.maxNumRows == -1) {
        this.elements = this.elementsAll;
      } else {
        this.initElementPage = (this.currentPage - 1) * this.maxNumRows;
        axios
          .get(
            "https://oriun-api.herokuapp.com/Singlelmts?init=" +
              this.initElementPage +
              "&size=" +
              this.maxNumRows
          )
          .then((response) => (this.elements = response.data, this.loadingElements = false));
      }
    },
    getAllElements() {
      axios
        .get(
          "https://oriun-api.herokuapp.com/Singlelmts?init=0&size=-1"
        )
        .then((response) => (this.elementsAll = response.data));
    },
    getNumElements() {
      axios
        .get("https://oriun-api.herokuapp.com/nelements")
        .then(
          (response) => (
            (this.numElements = response.data), this.auxListPages()
          )
        );
    },
    auxListPages() {
      this.pages = [];
      if(this.maxNumRows == -1){
        this.numPages = 1;
      }else{
        this.numPages = Math.ceil(this.numElements / Math.abs(this.maxNumRows));
      }
      for (let i = 1; i <= this.numPages; i++) {
        this.pages.push(i);
      }
      this.$nextTick(() => {
        this.setPage();
      });
    },
    setPage() {
      var tempList = document
        .getElementById("labelPages")
        .getElementsByClassName("active");
      Array.prototype.forEach.call(tempList, function (element) {
        element.classList.remove("active");
      });
      let item = this.$refs["page" + this.currentPage];
      item[0].classList.add("active");
      if (this.currentPage > 1 && this.numPages > 1) {
        document.getElementById("prevLabel").classList.remove("disabled");
      } else {
        try {
          document.getElementById("prevLabel").classList.add("disabled");
        } catch (e) {}
      }
      if (this.currentPage == this.numPages) {
        document.getElementById("nextLabel").classList.add("disabled");
      } else {
        try {
          document.getElementById("nextLabel").classList.remove("disabled");
        } catch (e) {}
      }
    },
    goPrev() {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
      }
    },
    goNext() {
      if (this.currentPage < this.numPages) {
        this.currentPage = this.currentPage + 1;
      }
    },
    
    async requestElement(element) {
      console.log("element", element);
      this.$root.$emit("newBooking",element);
      const ok = await this.$refs.confirmDialogue.show({
        title: "Detalles de la reserva",
        message: "Booking form",
          // "<div class='row'><div class='col-6'><ul style='list-style-type:none;'><li><b>Implemento: </b>" +
          // element.element_NAME +
          // "</li>" +
          // "<li><b>Descripcion: </b>" +
          // element.description +
          // "</li>" +
          // "<li><b>Ubicacion: </b>" +
          // element.name_LOCATION +
          // "</li>" +
          // "<li><b>Deporte: </b>" +
          // element.name_SPORT +
          // "</li>" +
          // "<li><b>Retiro: </b> <br>" +
          // "<div class='ml-3'>" +
          // "<label class='mr-5' for='bookingDate'>Dia </label><input id='bookingDate' class='ml-3' type='date' name='bookingDate'><br>" +
          // "</div>" + 
          // "<div class='mt-3 ml-3'>" +
          // "<label class='' for='bookingTime'>Hora </label><input @focus='limitDate()' id='bookingTime' class='ml-3' type='time' name='bookingTime'>" +
          // "</div>" + 
          // "</li>" +
          // "</ul></div>" +
          // "<div class='col-6'><img class='d-block mx-auto' alt='Imagen' src=' data:image/jpg;base64," +
          // element.element_IMAGE +
          // "' onerror=\"this.onerror=null; this.alt='Image Not Found'; this.src=\'https://i.ibb.co/sFpkRp3/no-image.png\'\" style='max-width:90%; max-height:200px'></div></div>",
        okButton: "Reservar",
      });
      
      
      
      // If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
        try {
          await axios
            .post(
            "https://oriun-api.herokuapp.com/gAlquiler", {user_NAME: this.username, id_ELEMENT: element.id_ELEMENT, rent_DATE: this.rentDate}
            );
          this.toaster.success(
            "Reserva realizada correctamente"
          );
        } catch (error) {
          this.toaster.failure("Error realizando reserva");
        }
      }
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

.searcher-selector {
  margin-bottom: -15px;
  width: 90%;
}
#maxRows {
  width: 50px;
  padding: 2px;
}

.pagination a {
  color: black;
}
.page-link:hover {
  cursor: pointer;
}


</style>