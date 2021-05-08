<template>
  <popup-modal ref="popup" tabindex="0">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="adviseModalTitle">
          {{ title }}
        </h4>
        <button type="button" class="close" @click="_cancel" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div v-html="message" class="modal-body">
        <!-- {{ message }} -->
      </div>
      <div class="modal-footer">
        <button type="button" id="cancelButton" class="btn btn-secondary" @click="_cancel">
          {{ cancelButton }}
        </button>
        <button v-if="okButton == 'Eliminar' || okButton == 'Descartar'" type="button" id="okButton" class="btn btn-danger" @click="_confirm">
          {{ okButton }}
        </button>
        <button v-else type="button" id="okButton" class="btn btn-primary" @click="_confirm">
          {{ okButton }}
        </button>
        
      </div>
    </div>
  </popup-modal>
</template>


<script>
import PopupModal from "./PopupModal.vue";

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
  }),
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

    // printHello() {
    //   document.onkeydown = function (evt) {
    //     evt = evt || window.event;
    //     var isEscape = false;
    //     if ("key" in evt) {
    //       isEscape = evt.key === "Escape" || evt.key === "Esc";
    //     } else {
    //       isEscape = evt.keyCode === 27;
    //     }
    //     if (isEscape) {
    //       _cancel;
    //       console.log("Escape");
    //     }
    //   };
    // },

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

    
  },
};
</script>

<style scoped>
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