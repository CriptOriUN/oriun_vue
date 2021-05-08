<template>
  <div class="navigation">
    <nav class="navbar navbar-expand-lg navbar-light mt-2">
      <div class="container">
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
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Menu de Navegacion"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="moderatorNavbar">
          <ul class="navbar-nav d-flex justify-content-end">
            <li class="nav-item mx-4 active" id="home">
              <!-- <router-link :to="{ name: 'Welcome', params: { username: this.username }}" id="products-link"> -->
              <a href="/" class="nav-link btn-menu" v-on:click="selectActive()"
                >Home</a
              >
              <!-- </router-link> -->
            </li>
            <li class="nav-item mx-4" id="events">
              <router-link
                href="?tab=events"
                :to="{ name: 'Moderator', query: { tab: 'events' } }"
                class="nav-link btn-menu"
                v-on:click="selectActive()"
                >Eventos</router-link
              >
            </li>
            <li class="nav-item mx-4" id="sports">
              <router-link
                href="?tab=sports"
                :to="{ name: 'Moderator', query: { tab: 'sports' } }"
                class="nav-link btn-menu"
                v-on:click="selectActive()"
                >Deportes</router-link
              >
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
      localStorage.removeItem("isAuth");
      localStorage.removeItem("current_username");
      self.$router.push({ name: "root" });
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

.btn-menu:hover {
  color: #000;
}

.nav-link.btn-menu {
  cursor: pointer;
}
/*# sourceMappingURL=crearEvento.css.map */
</style>