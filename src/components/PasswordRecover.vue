<template>
  <div id="unlockAccount">
    <div class="text-center container">
      <div class="py-5">
        <img src="../assets/oriun.png" alt="" height="80" />
      </div>
      <div class="info w-80 p-5 mb-5">
        <h2>Recuperar contraseña</h2>
        <form class="mt-5 w-75 mx-auto" v-on:submit.prevent="submitFormReset" v-if="token">
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
            <button type="submit" class="mt-5 btn submitButton">Recuperar</button>
        </form>
        <form class="mt-5 w-75 mx-auto" v-on:submit.prevent="submitFormRequest" v-else>
            <div class="form-group row">
                <label class="col-md-5 h5 col-form-label text-right" for="emailBox">Correo Electrónico</label>
                <input v-model="form.email" class="col-md-5 form-control" type="email" id="emailBox" autocomplete="off" placeholder="" required>
            </div>
            <div class="form-group row">
                <label class="col-md-5 h5 col-form-label text-right" for="confBox">Confirmar correo</label>
                <input v-model="form.emailConf" class="col-md-5 form-control" type="email" id="confBox" autocomplete="off" placeholder="" required>
            </div>
            <router-link to="/login">
                <button class="mt-5 btn btn-secondary">Ingresar</button>
            </router-link>
            <button type="submit" class="mt-5 btn submitButton">Recuperar</button>
        </form>
        
        
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
        email: '',
        emailConf: '',
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
    submitFormRequest(){
      if(!(this.form.email==this.form.emailConf)){
        this.toaster.failure("Los correos no coinciden");    
      }else{
        axios
        .post("https://oriun-api.herokuapp.com/password-request?email="+this.form.email)
        .then(() => {
            this.toaster.success("Se te ha enviado un correo para que recuperes tu contraseña");
        })
        .catch((error) => {
            if(error.response.status == 422){
                this.toaster.failure("El Usuario no esta registrado");  
            }else{
              this.toaster.failure("Hubo un error enviandote el correo");
            }
        });
      }
    },
    submitFormReset(){
      if(!this.passwordConfirmated){
        this.toaster.failure("Las contraseñas no coinciden");    
      }else{
        if(this.validregex){
          axios
          .post("https://oriun-api.herokuapp.com/confirm-password?token="+this.token+"&password="+this.form.password)
          .then(() => {
              this.toaster.success("Contraseña recuperada con exito");
              setTimeout(() => {
                this.$router.push({name: "Login"})
              }, 1000);
          })
          .catch((error) => {
              if(error.response.status == 409){
                this.toaster.failure("No has cambiado tu contraseña");  
              }else if(error.response.status == 500){
                this.toaster.failure("Token expirado o erróneo");  
              }else{
                this.toaster.failure("Hubo un error recuperado contraseña");
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