<template>
  <div class="navigation">
    <nav class="navbar navbar-expand-lg navbar-light mt-2">
      <div class="container-fluid">
        <a href="/" class="navbar-brand">
          <img
            class="logo navbar-brand"
            v-bind:src="'https://i.ibb.co/ScF3rnx/oriun.png'"
            alt="OriUN"
          />
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#moderatorNavbar"
          aria-controls="moderatorNavbar"
          aria-expanded="false"
          aria-label="Menu de Navegacion"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="moderatorNavbar">
          <ul class="navbar-nav d-flex justify-content-end">
            <li class="nav-item mx-4 active" id="home">
              <!-- <router-link :to="{ name: 'Welcome', params: { username: this.username }}" id="products-link"> -->
              <div
                class="nav-link btn-menu"
                v-on:click="
                  goHome();
                  selectActive();
                "
              >
                Home
              </div>
              <!-- </router-link> -->
            </li>
            <li class="nav-item mx-4" id="events">
              <div
                class="nav-link btn-menu"
                v-on:click="
                  goEvents();
                  selectActive();
                "
              >
                Eventos
              </div>
            </li>
            <li class="nav-item mx-4" id="sports">
              <div
                class="nav-link btn-menu"
                v-on:click="
                  goSports();
                  selectActive();
                "
              >
                Deportes
              </div>
            </li>
            <li class="nav-item mx-4">
              <a v-on:click="closeSession" href="/" class="nav-link btn-menu"
                >Cerrar Sesión</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template> 

<script>
export default {
  props: ["username"],
  mounted: function () {
    this.selectActive();
  },
  methods: {
    closeSession: function () {
      var self = this;
      self.$cookies.remove("isAuth")
      self.$router.push({ name: "root" }).catch(() => {});
    },
    selectActive() {
      // Get the container element
      var btnContainer = document.getElementById("moderatorNavbar");

      // Get all buttons with class="btn" inside the container
      var btns = btnContainer.getElementsByClassName("nav-link");

      // Loop through the buttons and add the active class to the current/clicked button
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
          var current = document.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
          this.className += " active";
        });
      }
    },
    goHome() {
      this.$router.push({ path: "moderator" }).catch(() => {});
    },
    goEvents() {
      this.$router
        .push({ path: "moderator", query: { tab: "events" } })
        .catch(() => {});
    },
    goSports() {
      this.$router
        .push({ path: "moderator", query: { tab: "sports" } })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.logo {
  width: 100px;
}

.navbar-nav {
  width: 100%;
}

.btn-menu {
  color: #000;
}

.btn-menu:hover {
  color: #000;
}

.nav-link.btn-menu {
  cursor: pointer;
}

@media (max-width: 992px) {
  .nav-item {
    margin-left: auto !important;
    margin-right: auto !important;
  }
}
</style>