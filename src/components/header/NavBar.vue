<template>
  <div class="navigation">
    <nav class="navbar navbar-expand-lg navbar-light mt-2">
      <div class="container-fluid">
        <a href="#" class="navbar-brand">
          <img
            class="logo navbar-brand"
            v-bind:src="'https://i.ibb.co/ScF3rnx/oriun.png'"
            alt=" "
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

        <div class="collapse navbar-collapse" id="navbar">
          <ul
            v-if="role == 'Usuario'"
            class="navbar-nav d-flex justify-content-end"
            id="usuario"
          >
            <li class="nav-item mx-4">
              <router-link
                :to="{ name: 'User', params: { username: this.username } }"
              >
                <a href="# " class="nav-link btn-menu">Inicio</a>
              </router-link>
            </li>
            <li class="nav-item mx-4">
              <router-link
                :to="{ name: 'Welcome', params: { username: this.username } }"
              >
                <a href="# " class="nav-link btn-menu">Perfil</a>
              </router-link>
            </li>
            <li class="nav-item active mx-4">
              <router-link
                :to="{
                  name: 'CreateEvent',
                  params: { username: this.username },
                }"
              >
                <a href="#" class="nav-link btn-menu">Crear Evento</a>
              </router-link>
            </li>

            <li class="nav-item active mx-4">
              <router-link
                :to="{
                  name: 'DispEspacio',
                  params: { username: this.username },
                }"
              >
                <a href="#" class="nav-link btn-menu"
                  >Disponibilidad de Espacio</a
                >
              </router-link>
            </li>

            <li class="nav-item mx-4">
              <router-link
                :to="{ name: 'Searcher', params: { username: this.username } }"
              >
                <a href="# " class="nav-link btn-menu">Buscador</a>
              </router-link>
            </li>
            <li class="nav-item mx-4">
              <router-link
                :to="{ name: 'Elements', params: { username: this.username } }"
              >
                <a href="# " class="nav-link btn-menu">Implementos</a>
              </router-link>
            </li>
            <li class="nav-item mx-4">
              <a v-on:click="closeSession" href="#" class="nav-link btn-menu"
                >Cerrar Sesión</a
              >
            </li>
          </ul>

          <ul
            v-else
            class="navbar-nav d-flex justify-content-end"
            id="bienestar"
          >
            <li class="nav-item mx-4">
              <router-link
                :to="{ name: 'Bienestar', params: { username: this.username } }"
              >
                <a href="# " class="nav-link btn-menu"
                  >Inicio<span class="sr-only">(Actual)</span></a
                >
              </router-link>
            </li>
            <li class="nav-item mx-4">
              <router-link
                :to="{
                  name: 'RegisterModerator',
                  params: { username: this.username },
                }"
              >
                <a href="# " class="nav-link btn-menu">Registrar Moderador</a>
              </router-link>
            </li>
            <li class="nav-item mx-4">
              <router-link
                :to="{
                  name: 'AddLocation',
                  params: { username: this.username },
                }"
                id="products-link"
              >
                <a href="# " class="nav-link btn-menu">Agregar Locacion</a>
              </router-link>
            </li>
            <li class="nav-item mx-4">
              <router-link
                :to="{ name: 'AddStock', params: { username: this.username } }"
                id="products-link"
              >
                <a href="# " class="nav-link btn-menu">Agregar Inventario</a>
              </router-link>
            </li>
            <li class="nav-item active mx-4">
              <router-link
                :to="{
                  name: 'CreateEvent',
                  params: { username: this.username },
                }"
              >
                <a href="#" class="nav-link btn-menu">Crear Evento</a>
              </router-link>
            </li>
            <li class="nav-item active mx-4">
              <router-link
                :to="{
                  name: 'RentalElements',
                  params: { username: this.username },
                }"
              >
                <a href="#" class="nav-link btn-menu">Estado Elementos</a>
              </router-link>
            </li>
            <li class="nav-item mx-4">
              <a v-on:click="closeSession" href="#" class="nav-link btn-menu"
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
import Vue from 'vue'
export default {
  props: ["username", "role"],
  data: function () {
    return {
      role: "",
    };
  },
  methods: {
    closeSession: function () {
      var self = this;
      Vue.$cookies.remove("isAuth")
      self.$router.push({ name: "root" }).catch(() => {});
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

@media (max-width: 992px) {
  .nav-item {
    margin-left: auto !important;
    margin-right: auto !important;
  }
}
</style>