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
      <div v-if="element.length > 0">
        <div v-for="elemento in element" :key="elemento.id">
          <div class="p-3" v-if="message == 'Booking form'">
            <div class="row">
              <div class="col-12 col-lg-6 col-md-6 col-sm-6">
                <ul class="p-0" style="list-style-type: none">
                  <li>
                    <b>Implemento: </b>
                    {{ elemento.element_NAME }}
                  </li>
                  <li>
                    <b>Descripcion: </b>
                    {{ elemento.description }}
                  </li>
                  <li>
                    <b>Deporte: </b>
                    {{ elemento.name_SPORT }}
                  </li>
                  <li>
                    <b>Usuario: </b>
                    {{ elemento.user_NAME }}
                  </li>
                </ul>
              </div>
              <!-- <div class="col-12 col-lg-6 col-md-6 col-sm-6 my-auto">
            <img
              class="d-block mx-auto"
              alt="Imagen"
              :src="'data:image/jpeg;base64,' + element.element_IMAGE"
              onerror="this.onerror=null; this.alt='Image Not Found';
            this.src='https://i.ibb.co/sFpkRp3/no-image.png'"
              style="max-width: 90%; max-height: 200px"
            />
          </div> -->
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
              type="button"
              id="okButton"
              class="btn btn-primary"
              @click="_confirm(elemento.user_NAME)"
            >
              {{ okButton }}
            </button>
          </div>
        </div>
      </div>
      <div v-else class="col-12 col-lg-6 col-md-6 col-sm-6">
        No hay reservas asociadas a la locacion
      </div>
    </div>
  </popup-modal>
</template>


<script>
import PopupModal from "./PopupModal.vue";
import { toaster } from "../toaster/toaster";

export default {
  name: "RentalDialogue",

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
    rentTime: "00:00",
    durationText: "30 minutos",
    upperLimmit: "16:30",
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

   
    _confirm(username) {
      this.$refs.popup.close();
      this.resolvePromise(username);
    },

    _cancel() {
      this.$refs.popup.close();
      this.resolvePromise(false);
      // Or you can throw an error
      // this.rejectPromise(new Error('User cancelled the dialogue'))
    },

   
   
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