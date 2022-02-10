<template>
  <div class="dispespacio">
    <NavBar :username="username" :role=role />
    <div class="container d-flex justify-content-center">
      <div class="row my-3">
        <h2>Disponibilidad de Espacio</h2>
      </div>
    </div>
    <div class="light">
      <div class="container">
        <div class="row mt-5 justify-content-center">
          <div class="col-5 col-md-4 col-xl-4 col-lg-4">
            <toggle-switch
              :options="myOptions"
              :disabled="false"
              v-model="optionDate"
              v-on:change="changeDate()"
              class="toggle justify-content-center d-flex py-4"
            />
            <input
              type="date"
              class="form-control mb-5"
              v-on:change="changeDate()"
              v-model="date"
              name="fin"
              id="fechaDispo"
              min="2021-05-01"
            />
          </div>
          <div class="col-11 col-md-8">
            <div class="espacios">
              <h3 class="titulos">Locaciones Ocupadas</h3>
              <hr />
            </div>
            <div class="row espacios ml-4 mr-4 d-flex bd-highlight">
              <div
                class="loc flex-fill bd-highlight p-5"
                v-for="loc in locations"
                :key="loc.id"
              >
                <h4
                  class="localizaciones"
                  @mouseover="
                    hover = true;
                    onlyID(loc[5]);
                  "
                  @mouseleave="hover = false"
                >
                  {{ loc[5] }}
                </h4>
                <span
                  class="more-info py-3"
                  v-if="hover & (loc[5] == locaName)"
                  key="loc[5]"
                  v-bind:id="loc[5]"
                >
                  Fecha Inicial: {{ loc[1] }}<br />
                  Fecha Final: {{ loc[3] }}<br />
                  Hora Inicial: {{ loc[2] }}<br />
                  Hora Final: {{ loc[4] }} <br />
                  Asistentes: <br />
                  {{ asistents[0].user_NAME }}
                </span>
              </div>
              <div
                v-if="locations.length == 0"
                class="loc flex-fill bd-highlight p-5"
              >
                <h4 class="localizaciones">
                  Todas las locaciones estas disponibles
                </h4>
                <h4 class="localizaciones">
                  <i class="fa fa-search"></i>
                </h4>
              </div>
            </div>
          </div>
          <!-- <span class="more-info py-3">
            Fecha Inicial: holaaaa<br />
            Fecha Final: holaaaa<br />
            Hora Inicial: holaaaa<br />
            Hora Final: holaaaa
          </span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/header/NavBar";
import axios from "axios";
export default {
  name: "DispEspacio",

  components: {
    NavBar,
  },
  props: ["role"],
  data: function () {
    return {
      date: "",
      locations: "",
      myOptions: "",
      optionDate: "dia",
      hover: false,
      locaName: "",
      asistents: "",
    };
  },
  created: function () {
    this.username = this.$route.params.username;
    this.getToday();
    this.myOptions = {
      layout: {
        color: "#94b43b",
        backgroundColor: "#24372000",
        selectedColor: "white",
        selectedBackgroundColor: "green",
        borderColor: "#94b43b",
        fontFamily: "Arial",
        fontWeight: "normal",
        fontWeightSelected: "bold",
        squareCorners: false,
        noBorder: false,
      },
      size: {
        fontSize: 1,
        height: 2.5,
        padding: 0.5,
        width: 13,
      },
      items: {
        delay: 0.4,
        preSelected: "Dia",
        disabled: false,
        labels: [
          { name: "Dia", color: "white", backgroundColor: "#94b43b" },
          { name: "Semana", color: "white", backgroundColor: "#94b43b" },
        ],
      },
    };
  },
  mounted: function () {},
  methods: {
    changeDate() {
      if (this.optionDate == "Dia") {
        axios
          .get(this.$apiURL+"/dateevents/?date=" + this.date)
          .then((response) => {
            this.locations = response.data;
          })
          .catch((e) => console.log(e));
      } else if (this.optionDate == "Semana") {
        axios
          .get(this.$apiURL+"/weekevents/?date=" + this.date)
          .then((response) => {
            this.locations = response.data;
          })
          .catch((e) => console.log(e));
      }
    },
    getToday() {
      var fecha = new Date();
      var anio = fecha.getFullYear();
      var dia = fecha.getDate();
      var _mes = fecha.getMonth(); //viene con valores de 0 al 11
      _mes = _mes + 1; //ahora lo tienes de 1 al 12
      if (_mes < 10) {
        //ahora le agregas un 0 para el formato date
        var mes = "0" + _mes;
      } else {
        var mes = _mes.toString();
      }
      if (dia < 10) {
        var dia = "0" + dia;
      } else {
        var dia = dia.toString();
      }

      var hoy = anio + "-" + mes + "-" + dia;
      this.date = hoy;
      axios
        // .get("https://wise-brook-308119.ue.r.appspot.com/sports")
        .get(this.$apiURL+"/dateevents/?date=" + hoy)
        .then((response) => {
          this.locationsDay = response.data;
        })
        .catch((e) => console.log(e));
    },
    onlyID(loc) {
      this.locaName = loc;
      for (var i = 0; i < this.locations.length; i++) {
        if (this.locations[i][5] == loc) {
          axios
            .get(
              this.$apiURL+"/asistents/?id_event=" +
                this.locations[i][0]
            )
            .then((response) => {
              this.asistents = response.data;
            })
            .catch((e) => console.log(e));
        }
      }
    },
  },
};
</script>

<style>
.horario {
  background-color: #94b43b00;
  border-radius: 10px;
}
.horario .titulos {
  color: #000;
  padding: 15px 0 15px 0;
  text-align: center;
  justify-content: center;
  padding-bottom: 0px;
}

.espacios {
  background-color: #94b43b;
  border-radius: 10px;
  box-shadow: 10px 10px #1f341b;
}
.espacios .titulos {
  color: #466b3f;
  padding: 15px 0 15px 0;
  text-align: center;
  padding-bottom: 0px;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.mapa {
  height: 500px;
  /* background-color: #000; */
}

.localizaciones {
  color: #fff;
  text-align: center;
}

.localizaciones:hover {
  cursor: help;
}

.loc {
  padding: 15px;
}

.more-info {
  display: flex;
  position: absolute;
  background-color: #466b3f;
  color: #fff;
  justify-content: center;
  text-align: center;
  /* align-items: center; */
  height: auto;
  width: 240px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

/*# sourceMappingURL=DispoEspacio.css.map */
</style>
