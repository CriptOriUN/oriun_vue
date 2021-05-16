<template>
  <div id="confirmation">
    <div class="text-center container">
      <div class="py-5">
        <img src="../assets/oriun.png" alt="" height="80" />
      </div>
      <div class="info w-80 p-5 mb-5">
        <h2 v-if="confirmation">Cuenta Activada</h2>
        <h2 v-if="somethingWrong">Error Activando tu cuenta</h2>
        <div class="icon my-4">
          <i v-if="confirmation" class="symbol fa fa-check-circle" style="color: #94b43b"></i>
          <i v-if="somethingWrong" class="symbol fa fa-times-circle-o" style="color: #ce1212"></i>
          <i class="fa fa-envelope"></i>
        </div>
        <div v-if="confirmation" class="message">
          Tu email ha sido verificado. Ahora tu cuenta en OriUN esta activa.
          <br />
          Puedes iniciar sesion.
        </div>
        <div v-if="somethingWrong" class="message">
          Ups! Hubo un error verificando tu email. Revisa que tengas acceso al correo registrado.
          <br />
          Intentalo nuevamente.
        </div>
        <router-link :to="{ name: 'Login' }" v-if="confirmation">
          <button class="mt-5 btn" style="background-color: #94b43b">Login</button>
        </router-link>
        <router-link :to="{ name: 'Login' }" v-if="somethingWrong">
          <button class="mt-5 btn" style="background-color: #ce1212">Volver al registro</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      confirmation: false,
      somethingWrong: false,
    };
  },

  created: function () {
    axios
      .post("https://wise-brook-308119.ue.r.appspot.com/confirm-account", null, {
        method: "post",
        params: {
          token: this.$route.query.token,
        },
      })
      .then((response) => {
        console.log(response);
        this.confirmation = true;
      })
      .catch((error) => {
        console.log(error);
        this.somethingWrong = true;
      });
  },
};
</script>

<style scoped>
#confirmation {
  background-color: #f0f0f0;
  height: 100vh;
}

.info {
  background-color: white;
}

.icon {
  width: 100px;
  /* padding: 50px; */
  margin-left: auto;
  margin-right: auto;
  position: relative;
  /* z-index: 1; */
}

.fa-envelope {
  font-size: 100px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}

.symbol {
  font-size: 60px;
  position: absolute;
  top: 60px;
  left: 70px;
  z-index: 3;
  border-radius: 30px;
  background: white;
  width: 60px;
}

.message {
  margin-top: 170px;
}

.btn {
  color: white;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 16pt;
}
</style>