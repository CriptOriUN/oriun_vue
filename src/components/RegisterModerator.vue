<template>
  <div class="regmoderator">
    <NavBar :username="username" />
    <div class="container pt-4 text-center">
      <div class="pb-5">
        <h2>Registrar Moderador</h2>
      </div>
      <div class="card mx-auto">
        <div class="title">
          <br />
        </div>
        <form v-on:submit.prevent="submitFormRegister">
          <div class="form-group">
            <input
              type="text"
              name="username"
              id="name"
              class="form-control"
              placeholder="Username"
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
              placeholder="Email"
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
              placeholder="Set a password"
              required
            />
          </div>

          <div class="form-group">
            <input
              type="password"
              name="password_confirmation"
              id="password-confirm"
              class="form-control"
              placeholder="Confirm password"
              v-model="registerform.password_confirmation"
              required
            />
          </div>

          <div class="text-center pt-2 pb-1">
            <button type="submit" class="btn btn-primary">Register</button>
          </div>
        </form>
        <div class="pb-5" v-if="exitoso == true">
          El usuario fue regitrado con exito
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import NavBar from "../components/header/NavBar";
import axios from "axios";

export default {
  name: "RegisterModerator",
  components: {
    NavBar,
  },
  data: function () {
    return {
      registerform: {
        user_name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      exitoso: false,
      username: "",
    };
  },
  created: function () {
    this.username = this.$route.params.username;
  },
  methods: {
    submitFormRegister: function () {
      var self = this;

      if (
        self.registerform.password === self.registerform.password_confirmation
      ) {
        axios
          .post(
            "https://wise-brook-308119.ue.r.appspot.com/modreg?user=" +
              self.registerform.user_name +
              "&password=" +
              self.registerform.password,
            {
              params: {
                user: self.registerform.user_name,
                password: self.registerform.password,
              },
            }
          )
          .then((result) => {})
          .catch((error) => {
            if (error.response.status == "422")
              alert("ERROR 422: El Moderador ya existe.");
          });
      } else {
        alert("Error de digitacion: Las contraseñas no coinciden");
      }
    },
  },
};
</script>


<style scoped>
* {
  font-size: 14pt;
}

.card {
  width: 350px;
  background-color: #a61c31;
  border-radius: 30px;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0.5, 0.5);
}

button,
.btn-primary {
  background-color: #b1b2b0;
  border: none;
  border-radius: 10px;
  margin-top: 40px;
  width: 80%;
  margin-bottom: 20px;
}

button:hover {
  background-color: gray;
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

.text-primary {
  color: #7a7a7a !important;
}

.text-primary.active {
  color: white !important;
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