<template>
  <div>
    <NavBar :username="username" />
    <div v-if="isLoading">
      <Spinner :color="color" />
    </div>
    <div class="body" v-else>
      <div class="card-header">
        <h2>Estado Elementos</h2>
        <hr />
      </div>
      <table
        id="LocationsTable"
        class="table table-bordered table-hover table-striped table-options"
      >
        <thead class="thead-dark text-center">
          <tr>
            <th>Locacion</th>
            <th></th>
          </tr>
        </thead>
        <tbody v-for="locacion in locaciones" :key="locacion.id">
          <tr id="locacionlist">
            <td>{{ locacion }}</td>
            <td class="">
              <!--button that call collapse-->
              <button
                v-on:click="getReservas(locacion)"
                class="btn btn-primary"
                type="button"
                title="Ver detalles"
              >
                <!-- Ver detalles -->
                <i class="fa fa-info-circle"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- MODAL -->
      <rental-dialogue ref="rentalDialogue"></rental-dialogue>
    </div>
  </div>
</template> 

<script>
import NavBar from "../components/header/NavBar";
import Spinner from "./spinner/Spinner";
import { toaster } from "../components/toaster/toaster";
import RentalDialogue from "../components/modal/RentalDialogue";
import axios from "axios";
export default {
  name: "RentalElements",
  components: {
    NavBar,
    Spinner,
    RentalDialogue,
  },
  data: function () {
    return {
      alquileres: [],
      locaciones: [],
      reservas: {},
      isLoading: true,
      habilitado: false,
      color: "#76232f",
      locacionact: null,
      mostrarReservacion: null,
      toaster,
    };
  },

  created: function () {
    this.username = this.$route.params.username;
    this.reservas = {};
    let self = this;

    axios
      .get(this.$apiURL+"/Singlelsibu?init=-1&size=-1")
      .then((result) => {
        self.locaciones = result.data;
        self.isLoading = false;
      })
      .catch((error) => {
        alert("ERROR Servidor LOCACION");
      });
  },

  watch: {
    mostrarReservacion() {
      this.requestReservacion(this.mostrarReservacion);
    },
  },
  methods: {
    getReservas: function (locacion) {
      axios
        .get(this.$apiURL+"/lapluse?name_loc=" + locacion)
        .then((result) => {
          this.mostrarReservacion = result.data;
          Vue.set(this.reservas, locacion, result.data);
          this.habilitado = true;
          this.locacionact = locacion;
        })
        .catch((error) => {
          alert(error);
        });
    },

    async requestReservacion(element) {
      console.log("reserva", element);
      this.$root.$emit("newBooking", element);
      const ok = await this.$refs.rentalDialogue
        .show({
          title: "Detalles de reserva(s) en " + this.locacionact,
          message: "Booking form",

          okButton: "Strike a Usuario",
        })
        .then((result) => {
          axios
            .put(this.$apiURL+"/banuser?user=" + result)
            .then((response) => {
              this.toaster.success("Al Usuario "+result+" se le ha puesto un STRIKE");
            });
        }).catch((error) => { 
          axios
            .delete(this.$apiURL+"/noAlquiler?id="+error)
            .then((response)=>{
              this.toaster.success("la RESERVA fue ELIMINADA con EXITO")
            });
        });

      // If you throw an error, the method will terminate here unless you surround it wil try/catch
      // if (ok) {
      //   console.log("reserva realizada");
      // }
    },
  },
};
</script>

<style scoped>
.body {
  background-color: brown;
  padding: 1rem 5rem 5rem 5rem;
  margin: 10% 3% 10% 3%;
  border-radius: 20px;
}
.body:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0.5, 0.5);
}
.table {
  margin-top: 20px;
  margin: auto;
  width: 100%;
  background-color: #e9ecef;
  overflow: hidden;
}
td {
  text-align: center;
  vertical-align: center;
}
.form-group {
  width: 30%;
}
.card-header {
  background-color: transparent;
  border: none;
  width: 100%;
  display: table;
  margin-bottom: 1rem;
}
h2 {
  display: table-cell;
  text-align: center !important;
  color: white;
  vertical-align: middle;
}

@media (max-width: 768px) {
  .body {
    padding: 1rem;
  }
}
</style>