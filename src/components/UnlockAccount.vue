<template>
  <div id="unlockAccount">
    <div class="text-center container">
      <div class="py-5">
        <img src="../assets/oriun.png" alt="" height="80" />
      </div>
      <div class="info w-80 p-5 mb-5">
        <h2>Solicitud de desbloqueo</h2>
        <form class="mt-5 w-75 mx-auto" v-on:submit.prevent="checkUser">
            <div class="form-group row">
                <label class="col-md-2 h5 col-form-label text-right" for="userBox">User</label>
                <input v-model="form.username" class="col-md-3 form-control" type="text" id="userBox" autocomplete="off" placeholder="Username" required>
            </div>
            <div class="form-group row">
                <label class="col-md-2 h5 col-form-label text-right" for="messageBox">Mensaje</label>
                <textarea v-model="form.message" class="col-md-10 form-control" id="messageBox" rows="3" placeholder="Escribe un mensaje solicitando del desbloqueo de tu cuenta" required></textarea>
            </div>
            <router-link to="/login">
                <button class="mt-5 btn btn-secondary">Login</button>
            </router-link>
            <button type="submit" class="mt-5 btn submitButton">Enviar</button>
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
        username: '',
        message: '' 
      },
      userExists: false,
      accountBlocked: false,
      toaster,
    };
  },
  methods: {
      checkUser(){
          axios
          .get('http://localhost:8081/user')
          .then((response) => {
              for (let user of response.data){
                  if(user.user_NAME == this.form.username){
                    this.userExists = true;
                    if(!(user.nbanned < 3)){
                        this.accountBlocked = true;
                    }
                    break;
                  }
              }
              this.submitForm();
          });
      },
      submitForm(){
          if(this.userExists){
              if(!this.accountBlocked){
                this.toaster.info("Tu cuenta NO está bloqueda");    
              }else{
                axios
                .post("http://localhost:8081/SoliDesban", { user_NAME: this.form.username, solicitud: this.form.message })
                .then(() => {
                    this.toaster.success("Solicitud enviada correctamente");
                })
                .catch((error) => {
                    if(error.response.status == 409){
                        this.toaster.failure("Parece que ya has enviado una solicitud");    
                    }
                    this.toaster.failure("Hubo un error enviando la solicitud");
                });
              }
          }else{
              this.toaster.failure("El Usuario no esta registrado");
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