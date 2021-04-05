<template>
    <div class="navigation">
        <nav class="navbar navbar-expand-lg navbar-light mt-2">
        <div class="container">
            <a href="#" class="navbar-brand">
                <img class="logo navbar-brand " v-bind:src="'https://i.ibb.co/ScF3rnx/oriun.png'" alt=" ">
            </a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Menu de Navegacion">
				<span class="navbar-toggler-icon"></span>
			</button>

            <div class="collapse navbar-collapse " id="navbar">
                <ul class="navbar-nav d-flex justify-content-end">
                    <li class="nav-item mx-4">
                        <router-link :to="{ name: 'Welcome', params: { username: this.username }}" id="products-link">
                        <a href="# " class="nav-link btn-menu">Mi Cuenta<span class="sr-only ">(Actual)</span></a>
                        </router-link>
                    </li>
                    <li class="nav-item mx-4">
                        <router-link to="/" id="products-link">
                        <a href="# " class="nav-link btn-menu">Buscador</a>
                        </router-link>
                    </li>
                    <li class="nav-item active mx-4">
                        <router-link :to="{ name: 'CreateEvent', params: { username: this.username }}" id="products-link">
                        <a href="#" class="nav-link btn-menu">Crear Evento</a>
                        </router-link>
                    </li>
                    <li class="nav-item mx-4 ">
                        <router-link to="/" id="products-link">
                        <a href="# " class="nav-link btn-menu ">Cerrar Sesión</a>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    </div>
</template> 

<script>
export default {
    props:['username']
}
</script>

<style scoped>

.logo {
  width: 100px; }

.navbar-nav {
  width: 100%; }

.btn-menu:hover {
  color: #000; }

/*# sourceMappingURL=crearEvento.css.map */
</style>