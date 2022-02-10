<template>
  <div class="login">
    <div style="overflow-x: hidden;">
      <img class="background" src="../assets/login_bg.png" alt="">
    </div>
    <div class="container mb-5 pt-4 text-center">
      <div class="pb-5">
        <img class="app-logo" src="../assets/oriun.png" alt="" height="100" />
      </div>
      <div class="card mx-auto">
        <div class="card-header border-bottom-0 bg-transparent">
          <ul
            class="nav nav-tabs justify-content-center"
            id="pills-tab"
            role="tablist"
          >
            <li class="nav-item text-center" id="login-tab">
              <a
                class="nav-link active text-primary"
                id="pills-login-tab"
                data-toggle="pill"
                href="#pills-login"
                role="tab"
                aria-controls="pills-login"
                aria-selected="true"
                >Ingreso</a
              >
            </li>

            <li class="nav-item text-center">
              <a
                class="nav-link text-primary"
                id="pills-register-tab"
                data-toggle="pill"
                href="#pills-register"
                role="tab"
                aria-controls="pills-register"
                aria-selected="false"
                >Registro</a
              >
            </li>
          </ul>
        </div>

        <div class="card-body pb-4">
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-login"
              role="tabpanel"
              aria-labelledby="pills-login-tab"
            >
              <div class="placeholder">Nombre de Usuario</div>
              <form v-on:submit.prevent="submitFormLogin">
                <div class="form-group">
                  <input
                    type="text"
                    name="user_name"
                    class="form-control"
                    id="username"
                    v-model="loginform.user_name"
                    required
                    autofocus
                  />
                </div>
                <div class="placeholder">Contraseña</div>
                <div class="form-group">
                  <input
                    type="password"
                    name="password"
                    class="form-control"
                    id="password"
                    v-model="loginform.password"
                    required
                  />
                </div>
                <div class="text-center pt-4">
                  <vue-hcaptcha
                    sitekey="e3605ee2-18a4-4e7c-9a8e-5885075be08e"
                    @verify="captchaVerified"
                    @error="hCaptchaVerified = false"
                  >
                  </vue-hcaptcha>
                </div>
                <div v-if="loadingElements" class="text-center pt-4">
                  <Spinner :color="color" />
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary">Ingresar</button>
                </div>

                <div class="text-center pt-3">
                  <router-link :to="{ name: 'UnlockAccount' }">
                    <input type="button" class="btn auxiliarButton" value="¿Cuenta bloqueada?">
                  </router-link>
                  <router-link :to="{ name: 'PasswordRecover' }">
                    <input type="button" class="btn auxiliarButton" value="Recuperar Contraseña">
                  </router-link>
                </div>
                <div class="text-center pt-3">
                  
                </div>
              </form>
            </div>

            <div
              class="tab-pane fade"
              id="pills-register"
              role="tabpanel"
              aria-labelledby="pills-register-tab"
            >
              <form v-on:submit.prevent="submitFormRegister">
                <div class="form-group">
                  <input
                    type="text"
                    name="username"
                    id="name"
                    class="form-control"
                    placeholder="Nombre de Usuario"
                    v-model="registerform.user_name"
                    required
                    autofocus
                  />
                </div>

                <div class="form-group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="form-control"
                    placeholder="Correo Electronico"
                    v-model="registerform.email"
                    required
                  />
                </div>

                <div class="form-group">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="form-control"
                    v-model="registerform.password"
                    placeholder="Contraseña"
                    required
                  />
                </div>
                <div class="text-center pt-2 pb-1 container-hint">
                  <transition name="hint" appear>
                    <div
                      v-if="passwordValidation.errors.length > 0"
                      class="hints"
                    >
                      <h5>Pistas</h5>
                      <h5
                        class="reg-validation"
                        v-for="error in passwordValidation.errors"
                        :key="error.id"
                      >
                        {{ error }}<br />
                      </h5>
                    </div>
                    <div v-else>
                      <h5>La contraseña es valida</h5>
                    </div>
                  </transition>
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    name="password_confirmation"
                    id="password-confirm"
                    class="form-control"
                    placeholder="Confirmar Contraseña"
                    v-model="registerform.password_confirmation"
                    required
                  />
                </div>

                <div class="text-center pt-2 pb-1">
                  <button type="submit" class="btn btn-primary">
                    Registrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MySocialChat />
  </div>
</template> 

<script>
import axios from "axios";
import VueHcaptcha from "@hcaptcha/vue-hcaptcha";
import MySocialChat from "../components/social-chat/MySocialChat";
import Spinner from "../components/spinner/Spinner";

export default {
  name: "Login",
  components: { VueHcaptcha, MySocialChat, Spinner },
  data: function () {
    return {
      rules: [
        { message: "Una letra Minuscula.", regex: /[a-z]+/ },
        { message: "Una letra Mayuscula.", regex: /[A-Z]+/ },
        { message: "8 Caracteres minimo.", regex: /.{8,}/ },
        { message: "Un numero.", regex: /[0-9]+/ },
      ],
      registerform: {
        user_name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      loginform: {
        user_name: "",
        password: "",
      },
      validregex: false,
      hCaptchaVerified: false,
      loadingElements: false,
      color: "#466B3F",
    };
  },
  computed: {
    passwordValidation() {
      var self = this;
      let errors = [];
      for (let condition of this.rules) {
        if (!condition.regex.test(self.registerform.password)) {
          errors.push(condition.message);
        }
      }
      if (errors.length === 0) {
        self.validregex = true;
        return { valid: true, errors };
      } else {
        self.validregex = false;
        return { valid: false, errors };
      }
    },
  },
  methods: {
    submitFormLogin: function () {
      //alert(JSON.stringify(this.loginform))
      if (this.hCaptchaVerified == true) {
        var self = this;
        this.loadingElements = true;
        axios
          .get(
            this.$apiURL+"/userstate?user=" + self.loginform.user_name
          )
          .then((result) => {
            if (result.data) {
              axios
                .post(this.$apiURL+"/userlog/", self.loginform)
                .then((result) => {
                  self.$emit(
                    "logeado",
                    result.data.TOKEN
                  );
                  this.loadingElements = false;
                })
                .catch((error) => {
                  this.loadingElements = false;
                  // alert(error.response.status)
                  if (error.response.status == "404")
                    alert("Contraseña Erronea.");
                  else if (error.response.status == "406")
                    alert("Tu cuenta ha sido bloqueda.");
                });
            } else {
              this.loadingElements = false;
              alert("No has verificado tu cuenta.");
            }
          })
          .catch((error) => {
            this.loadingElements = false;
            if (error.response.status == "422")
              alert("Usuario no encontrado.");
          });
      } else {
        this.loadingElements = false;
        alert("El Captcha no se ha verificado o se hizo de manera incorrecta");
      }
    },
    submitFormRegister: function () {
      var self = this;

      if (
        self.registerform.password === self.registerform.password_confirmation
      ) {
        if (self.validregex == true) {
          axios
            .post(
              this.$apiURL+"/userreg?user=" +
                self.registerform.user_name +
                "&password=" +
                self.registerform.password +
                "&email=" +
                self.registerform.email
            )
            .then((result) => {
              alert(
                "Se te ha enviado un correo de verificacion a " +
                  self.registerform.email
              );
              // self.$emit('logeado', self.registerform.user_name, "Usuario")
            })
            .catch((error) => {
              if (error.response.status == "422")
                alert("El Usuario ya existe.");
            });
        } else {
          alert("NO estan cumpliendose las condiciones de la contraseña");
        }
      } else {
        alert("Error de digitacion: Las contraseñas no coinciden");
      }
    },
    captchaVerified(e) {
      if (e) this.hCaptchaVerified = true;
      else this.hCaptchaVerified = false;
    },
  },
};
</script>


<style scoped>
* {
  font-size: 14pt;
  
}

.background{
  z-index: -1;
  position: fixed;
  max-height: 100vh;  
}

.card {
  width: 350px;
  background-color: #94b43b;
  border-radius: 30px;
}

button,
.btn-primary {
  background-color: #7a7a7a;
  border: none;
  border-radius: 10px;
  margin-top: 40px;
  width: 80%;
  margin-bottom: 20px;
}

.form-control {
  border-radius: 10px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.placeholder {
  float: left;
  /* width:100px; */
  color: white;
  margin-top: 5px;
  margin-bottom: 15px;
  margin-left: 30px;
}

.card-header {
  padding: 0;
}

li.nav-item {
  /* padding: auto; */
  width: 50%;
  /* border-top-left-radius: 15px; */
  margin-top: -1px;
}

.nav-tabs .nav-item.show,
.nav-tabs .nav-link.active {
  background-color: transparent;
  border: none;
  color: white;
}

.nav-link {
  background-color: #466b3f;
  border-bottom: 1px;
}

#pills-login-tab {
  border-top-left-radius: 30px;
  /* margin: -1px -1px 0px 0px; */
  margin-left: -1px;
}

#pills-register-tab {
  border-top-right-radius: 30px;
  margin-right: -1px;
  /* border-bottom: 1px solid white; */
  /* border-left: 0.1px solid white; */
}

.nav-tabs .nav-link:focus,
.nav-tabs .nav-link:hover {
  border-color: transparent;
}

.nav-tabs .nav-link {
  border-top-left-radius: 0px;
}

.nav-tabs {
  border-bottom: none;
}

.container-hint h5 {
  color: white;
  font-size: small;
  margin-left: auto;
  margin-right: auto;
}

.text-primary {
  color: #7a7a7a !important;
}

.text-primary.active {
  color: white !important;
}

.auxiliarButton{
  color: #7a7a7a;
  font-size: 12pt;
}

.auxiliarButton:hover{
  color: white;
}

@media (max-width: 470px) {
  .app-logo {
    max-width: 400px;
    width: 70%;
    height: auto;
  }

  .card {
    max-width: 400px;
    width: 80%;
  }
}

/* @media only screen and (max-width: 600px) {
    .app-logo{
        max-width: 400px;
        width: 70%;
        height: auto;
    }
  
    .card{
        max-width: 400px;
        width: 80%;
        
    }
  } */
</style>