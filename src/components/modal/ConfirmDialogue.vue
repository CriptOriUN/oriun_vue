<template>
  <popup-modal ref="popup" tabindex="0">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title text-center" id="adviseModalTitle">
          {{ title }}
        </h4>
        <button type="button" class="close" @click="_cancel" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="p-3" v-if="message == 'Booking form'">
        <div class="row">
          <div class="col-12 col-lg-6 col-md-6 col-sm-6">
            <ul class="p-0" style="list-style-type: none">
              <li>
                <b>Implemento: </b>
                {{ element.element_NAME }}
              </li>
              <li>
                <b>Descripcion: </b>
                {{ element.description }}
              </li>
              <li>
                <b>Ubicacion: </b>
                {{ element.name_LOCATION }}
              </li>
              <li>
                <b>Deporte: </b>
                {{ element.name_SPORT }}
              </li>
              <li>
                <div class="form-row">
                  <b class="col-sm-4 col-form-label">Duracion: </b>
                  <select
                    class="form-control col-sm-6"
                    name="bookingDuration"
                    id="bookingDuration"
                    v-model="rentDuration"
                    @change="validateTime()"
                  >
                    <option value="30" selected>30 minutos</option>
                    <option value="60">1 hora</option>
                    <option value="120">2 horas</option>
                  </select>
                </div>
              </li>
              <li>
                <b>Retiro: </b> <br />
                <div class="mt-2 ml-3 form-row">
                  <label class="col-sm-3 col-form-label" for="bookingDate"
                    >Dia </label
                  ><input
                    id="bookingDate"
                    class="form-control col-sm-9"
                    type="date"
                    name="bookingDate"
                    :min="'' + today"
                    @focus="limitDate()"
                    @change="validateDate(); validateTime()"
                    required
                  />
                  <small class="text-center invalid-feedback">
                    Atención de Lunes a Viernes
                  </small>
                </div>
                <div class="ml-3 form-row">
                  <label class="col-sm-3 col-form-label" for="bookingTime"
                    >Hora </label
                  ><input
                    id="bookingTime"
                    class="form-control col-sm-9"
                    type="time"
                    name="bookingTime"
                    @change="validateTime()"
                  />
                  <small id="timeFeedback" class="invalid-feedback text-center">Atención de 8:00 a 17:00</small>
                </div>
                <div id="limitTimeWarning" class="mt-1 ml-3 text-center d-none">
                <small class="text-secundary">Para usar este implemento durante {{durationText}}, debes retirarlo antes de las {{upperLimmit}}</small>
                </div>
                <div id="lateTimeWarning" class="mt-1 ml-3 text-center d-none">
                  <small class="text-danger">Estás un poco tarde para esta reserva</small>
                </div>
              </li>
            </ul>
          </div>
          <div class="col-12 col-lg-6 col-md-6 col-sm-6 my-auto">
            <img
              class="d-block mx-auto"
              alt="Imagen"
              :src="'data:image/jpeg;base64,' + element.element_IMAGE"
              onerror="this.onerror=null; this.alt='Image Not Found';
            this.src='https://i.ibb.co/sFpkRp3/no-image.png'"
              style="max-width: 90%; max-height: 200px"
            />
          </div>
        </div>
      </div>
      <div v-else v-html="message" class="modal-body">
        <!-- {{ message }} -->
      </div>
      <div class="modal-footer">
        <button
          type="button"
          id="cancelButton"
          class="btn btn-secondary"
          @click="_cancel"
        >
          {{ cancelButton }}
        </button>
        <button
          v-if="okButton == 'Eliminar' || okButton == 'Descartar' || okButton == 'Penalizar'"
          type="button"
          id="okButton"
          class="btn btn-danger"
          @click="_confirm"
        >
          {{ okButton }}
        </button>
        <button
          v-else-if="message == 'Booking form'"
          type="button"
          id="okButton"
          class="btn btn-primary"
          @click="_confirmBooking"
        >
          {{ okButton }}
        </button>

        <button
          v-else
          type="button"
          id="okButton"
          class="btn btn-primary"
          @click="_confirm"
        >
          {{ okButton }}
        </button>
      </div>
    </div>
  </popup-modal>
</template>


<script>
import PopupModal from "./PopupModal.vue";
import { toaster } from "../toaster/toaster";

export default {
  name: "ConfirmDialogue",

  components: { PopupModal },

  data: () => ({
    // Parameters that change depending on the type of dialogue
    title: undefined,
    message: undefined, // Main text content
    okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
    cancelButton: "Cancelar", // text for cancel button

    // Private variables
    resolvePromise: undefined,
    rejectPromise: undefined,
    element: null,
    today: null,
    rentDate: new Date(),
    rentDuration: 30,
    rentTime: '00:00',
    durationText: '30 minutos',
    upperLimmit: '16:30',
    sthInvalid: true,
    toaster,
  }),
  mounted() {
    this.$root.$on("newBooking", (element) => {
      this.element = element;
    });
    // document.getElementById("bookingDate").min = "2021-07-01";
  },
  methods: {
    show(opts = {}) {
      this.title = opts.title;
      this.message = opts.message;
      this.okButton = opts.okButton;

      if (opts.cancelButton) {
        this.cancelButton = opts.cancelButton;
      }

      // Once we set our config, we tell the popup modal to open
      this.$refs.popup.open();

      // Return promise so the caller can get results
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },

    _confirmBooking() {
      var emptyDate = document.getElementById('bookingDate').value == '';
      var emptyTime = document.getElementById('bookingTime').value == '';
      if(emptyDate || emptyTime){
        this.sthInvalid = true;
      }
      if (this.sthInvalid) {
        this.toaster.failure("Revisa las entradas de la reserva");
      } else {
        this.$nextTick(() => {
          console.log("Date emitted", this.rentDate);
          this.$refs.popup.close();
          this.resolvePromise(true);
        });
      }
    },
    _confirm() {
      this.$refs.popup.close();
      this.resolvePromise(true);
    },

    _cancel() {
      this.$refs.popup.close();
      this.resolvePromise(false);
      // Or you can throw an error
      // this.rejectPromise(new Error('User cancelled the dialogue'))
    },

    // Booking methods
    limitDate() {
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
      document.getElementById("bookingDate").min = anio + "-" + mes + "-" + dia;
    },
    validateDate() {
      var bookingDate = document.getElementById("bookingDate").value;
      var date = new Date(bookingDate);
      if (date.getDay() == 5 || date.getDay() == 6) {
        document.getElementById("bookingDate").classList.add("is-invalid");
        this.sthInvalid = true;
        try {
          document.getElementById("bookingDate").classList.remove("is-valid");
        } catch (error) {}
      } else {
        this.sthInvalid = false;
        document.getElementById("bookingDate").classList.add("is-valid");
        this.rentDate = bookingDate;
        this.$root.$emit("updateBooking", this.rentDate, this.rentTime, this.rentDuration);
        try {
          document.getElementById("bookingDate").classList.remove("is-invalid");
        } catch (error) {}
      }
    },
    validateTime() {
      try{
        document.getElementById("timeFeedback").classList.remove("d-none");
      }catch(error){}      
      var today = new Date().toISOString().split('T')[0];
      var bookingTime = document.getElementById("bookingTime").value;
      var bookingDate = document.getElementById("bookingDate").value;
      var duration = document.getElementById('bookingDuration');
      this.durationText = duration.options[duration.selectedIndex].text;
      
      if(bookingTime != ''){
        var time = new Date();
        time.setHours(bookingTime.split(":")[0], bookingTime.split(":")[1]);
        var rentDuration = this.rentDuration;
        var closeTime = new Date(new Date().setHours(17,0));
        var upperLimmit = new Date(closeTime - rentDuration * 60000);
        this.upperLimmit = upperLimmit.getHours() + ':' + ("0" + upperLimmit.getMinutes()).slice(-2);
        if (time.getHours() < 8 || time > upperLimmit){
          this.sthInvalid = true;          
          if(time > upperLimmit){
            document.getElementById("limitTimeWarning").classList.remove("d-none");
          }else{
            document.getElementById("limitTimeWarning").classList.add("d-none");
          }
          document.getElementById("bookingTime").classList.add("is-invalid");
          try {
            document.getElementById("bookingTime").classList.remove("is-valid");
          } catch (error) {}
        } else {
          if(bookingDate != ''){
            if(bookingDate == today){
              var now = new Date();
              var inputTime = bookingTime.split(":");
              if(parseInt(inputTime[0]) < parseInt(now.getHours())){
                this.sthInvalid = true; 
                document.getElementById("lateTimeWarning").classList.remove("d-none");
                try{
                  document.getElementById("bookingTime").classList.add("is-invalid");
                  document.getElementById("timeFeedback").classList.add("d-none");
                }catch(error){alert(error)}
                
              }else if (parseInt(inputTime[0]) == parseInt(now.getHours())) {
                if(parseInt(inputTime[1]) <= parseInt(now.getMinutes())){
                  this.sthInvalid = true; 
                  document.getElementById("lateTimeWarning").classList.remove("d-none");
                  try{
                    document.getElementById("bookingTime").classList.add("is-invalid");
                    document.getElementById("timeFeedback").classList.add("d-none");
                  }catch(error){alert(error)}
                }else{
                  document.getElementById("lateTimeWarning").classList.add("d-none");
                  document.getElementById("bookingTime").classList.add("is-valid");
                  try{
                    document.getElementById("timeFeedback").classList.remove("d-none");
                    document.getElementById("bookingTime").classList.remove("is-invalid");
                  }catch(error){alert(error)}
                  this.emitBooking(bookingTime);
                }
              }else{
                document.getElementById("lateTimeWarning").classList.add("d-none");
                document.getElementById("bookingTime").classList.add("is-valid");
                try{
                    document.getElementById("timeFeedback").classList.remove("d-none");
                    document.getElementById("bookingTime").classList.remove("is-invalid");
                  }catch(error){alert(error)}
                this.emitBooking(bookingTime);
              }         
            }else{
              this.emitBooking(bookingTime);
              document.getElementById("bookingTime").classList.add("is-valid");
              try{
                  document.getElementById("timeFeedback").classList.remove("d-none");
                  document.getElementById("bookingTime").classList.remove("is-invalid");
                }catch(error){alert(error)}
            }
          }
        }
        // console.log(time)
      }
    },
    emitBooking(bookingTime){
      this.sthInvalid = false;
      this.rentTime = bookingTime;
      this.$root.$emit("updateBooking", this.rentDate, this.rentTime, this.rentDuration);
      document.getElementById("bookingTime").classList.add("is-valid");
      try {
        document.getElementById("bookingTime").classList.remove("is-invalid");
      } catch (error) {}
      try {
        document.getElementById("limitTimeWarning").classList.add("d-none");
      } catch (error) {}
      try {
        document.getElementById("lateTimeWarning").classList.add("d-none");
      } catch (error) {}
    }
  },
};
</script>

<style scoped>
.modal-content {
  /* max-height: calc( 100vh - 50px ); */
  max-height: 80vh;
  overflow-y: auto;
}

.modal-body {
  max-height: 300px;
  /* overflow-y: scroll; */
}

/* .btns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.ok-btn {
  color: red;
  text-decoration: underline;
  line-height: 2.5rem;
  cursor: pointer;
}

.cancel-btn {
  padding: 0.5em 1em;
  background-color: #d5eae7;
  color: #35907f;
  border: 2px solid #0ec5a4;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
} */
</style>