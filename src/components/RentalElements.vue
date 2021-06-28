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
      <!-- <div class="form-group">
        
        <select class="form-control" name="state" id="maxRows">
          <option value="5000">Mostrar Todo</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="70">70</option>
          <option value="100">100</option>
        </select>
      </div> -->
      <table
        id="LocationsTable"
        class="table table-bordered table-hover table-striped table-options"
      >
        <thead class="thead-dark text-center">
          <tr>
            <th>Usuario</th>
            <th></th>
          </tr>
        </thead>
        <tbody v-for="alquiler in alquileres" :key="alquiler.id">
          <tr id="alquilerlist">
            <td>{{ alquiler.user_NAME }}</td>
            <td class="">
              <!--button that call collapse-->
              <button
                v-on:click="getElements"
                class="btn btn-primary"
                type="button"
                data-toggle="collapse"
                :data-target="'#details' + alquiler.id_RENT"
                aria-controls="details"
                aria-expanded="false"
                title="Ver detalles"
              >
                <!-- Ver detalles -->
                <i class="fa fa-info-circle"></i>
              </button>
              <button class="btn btn-danger" title="Eliminar">
                <!-- Borrar -->
                <i class="fa fa-minus-circle"></i>
              </button>
            </td>
          </tr>
          <tr class="collapse" v-bind:id="['details' + alquiler.id_RENT]">
            <td class="p-3 text-left" colspan="5">
              <table
                id="IndumentariaTable"
                class="table table-striped table-options"
              >
                <thead class="thead-info">
                  <tr>
                    <th>Elemento(s) Asociados</th>
                    <th></th>
                  </tr>
                </thead>
                <!-- <tbody>
                <tr
                  v-for="element in elementos"
                  :key="element.id"
                  id="usuarioslist"
                >
                  <td v-if="element.name_LOCATION == locacion">
                    {{ element.element_NAME }}
                  </td>
                  <td v-if="element.name_LOCATION == locacion" class="">
                    <button
                      class="btn btn-danger"
                      title="Eliminar"
                      @click="delElement(element.id_ELEMENT)"
                    >
                      
                      <i class="fa fa-minus-circle"></i>
                    </button>
                  </td>
                </tr>
              </tbody> -->
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template> 

<script>
import NavBar from "../components/header/NavBar";
import Spinner from "./spinner/Spinner";
import { toaster } from "../components/toaster/toaster";
import axios from "axios";
export default {
  name: "RentalElements",
  components: {
    NavBar,
    Spinner,
  },
  data: function () {
    return {
      alquileres: [],
      isLoading: true,
      color: "#76232f",
    };
  },

  created: function () {
    this.username = this.$route.params.username;
    let self = this;
    axios
      .get("https://oriun-api.herokuapp.com/alquileresall")
      .then((result) => {
        self.alquileres = result.data;
        self.isLoading = false;
      })
      .catch((error) => {
        alert("ERROR Servidor ALQUILER");
      });
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