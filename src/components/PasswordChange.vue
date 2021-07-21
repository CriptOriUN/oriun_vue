<template>
  <div id="unlockAccount">
    <div class="text-center container">
      <div class="py-5">
        <img src="../assets/oriun.png" alt="" height="80" />
      </div>
      <div class="info w-80 p-5 mb-5">
        <h2 v-if="token">Cambiar contraseña</h2>
        <form class="mt-5 w-75 mx-auto" v-on:submit.prevent="submitFormChange" v-if="token">
            <div class="form-group row mb-2">
                <label class="col-md-5 h5 col-form-label text-right" for="passwordBox">Nueva Contraseña</label>
                <input v-model="form.password" class="col-md-5 form-control" type="password" id="passwordBox" autocomplete="off" placeholder="" required>
            </div>
            <div class="row mt-0">
              <div  class="col-md-5"></div>
              <div  class="col-md-5">
                <transition name="hint" appear>
                <div v-if="passwordValidation.errors.length > 0">
                  <p class="text-left text-danger mb-0">Requisitos:</p>
                  <p class="my-0 text-left ml-3 text-secondary" v-for="error in passwordValidation.errors" :key="error.id">
                    {{ error }}<br />
                  </p>
                </div>
              </transition>
              </div>
              
            </div>
            <div class="form-group row mt-3">
                <label class="col-md-5 h5 col-form-label text-right" for="passwordConfBox">Confirmar contraseña</label>
                <input v-model="form.password_confirmation" v-on:input="checkConfirmation()" class="col-md-5 form-control" type="password" id="passwordConfBox" autocomplete="off" placeholder="" required>
            </div>
            <router-link to="/login">
                <button class="mt-5 btn btn-secondary">Ingresar</button>
            </router-link>
            <button type="submit" class="mt-5 btn submitButton">Cambiar</button>
        </form>
        <h2 v-if="!token">Error cambiando contraseña</h2>
        <div class="w-75 mx-auto" v-if="!token">
          <div style="font-size:150px; color: rgb(206, 18, 18);">
            <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
          </div>
          <p>Ups! Hubo un error en el proceso. Revisa que tengas acceso al correo registrado.
          <br> Intentalo nuevamente.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {toaster} from './toaster/toaster'

export default {
  data: function () {
    return {
      form: { 
        password: '',
        password_confirmation: '',
      },
      toaster,
      token: false,
      rules: [
        { message: "Una letra Minuscula.", regex: /[a-z]+/ },
        { message: "Una letra Mayuscula.", regex: /[A-Z]+/ },
        { message: "8 Caracteres minimo.", regex: /.{8,}/ },
        { message: "Un numero.", regex: /[0-9]+/ },
      ],
      validregex: false,
      passwordConfirmated: false,
    };
  },
  mounted() {
    this.token = this.$route.query.token;
  },
  computed: {
    passwordValidation() {
      var self = this;
      let errors = [];
      for (let condition of this.rules) {
        if (!condition.regex.test(self.form.password)) {
          errors.push(condition.message);
        }
      }
      if (errors.length === 0) {
        self.validregex = true;
        try {
          document.getElementById("passwordBox").classList.add("is-valid");
          document.getElementById("passwordBox").classList.remove("is-invalid");
        } catch (error) {}
        return { valid: true, errors };
      } else {
        self.validregex = false;
        try {
          document.getElementById("passwordBox").classList.add("is-invalid");
          document.getElementById("passwordBox").classList.remove("is-valid");
        } catch (error) {}
        return { valid: false, errors };
      }
    },
  },
  methods: {
    submitFormChange(){
      if(!this.passwordConfirmated){
        this.toaster.failure("Las contraseñas no coinciden");    
      }else{
        if(this.validregex){
          axios
          .post("htthttps://oriun-api.herokuapp.com/confirm-password?token="+this.token+"&password="+this.form.password)
          .then(() => {
              this.toaster.success("Contraseña actualizada con exito");
              setTimeout(() => {
                this.$router.push({name: "Login"})
              }, 2000);
          })
          .catch((error) => {
              if(error.response.status == 409){
                this.toaster.failure("No has cambiado tu contraseña");  
              }else if(error.response.status == 500){
                this.toaster.failure("No tienes permisos para cambiar la contraseña");  
              }else{
                this.toaster.failure("Hubo un error cambiando contraseña");
              }
          });
        }else{
          this.toaster.failure("Tu contraseña NO es muy segura");  
        }
      }
    },
    checkConfirmation(){
      if(this.form.password === this.form.password_confirmation){
        try {
          document.getElementById("passwordConfBox").classList.add("is-valid");
          document.getElementById("passwordConfBox").classList.remove("is-invalid");
        } catch (error) {}
        this.passwordConfirmated = true;
      }else{
        try {
          document.getElementById("passwordConfBox").classList.add("is-invalid");
          document.getElementById("passwordConfBox").classList.remove("is-valid");
        } catch (error) {}
        this.passwordConfirmated = false;
      }
    }
  },
};
</script>

<style scoped>
#unlockAccount {
  background-color: #f0f0f0;
  height: 100vh;
}

.info {
  background-color: white;
}

.btn {
  color: white;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 16pt;
}
.submitButton{
    background-color: #94b43b;
}
</style>