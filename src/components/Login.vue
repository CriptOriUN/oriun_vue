<template>
    
    <div class="login">
        <div class="container  pt-4 text-center">
            <div class="pb-5">
                <img class="app-logo" src="../assets/oriun.png" alt="" height="100" />
            </div>
            <div class="card mx-auto">
                <div class="card-header border-bottom-0 bg-transparent">
                    <ul class="nav nav-tabs justify-content-center" id="pills-tab" role="tablist">
                        <li class="nav-item text-center" id="login-tab">
                            <a class="nav-link active text-primary" id="pills-login-tab" data-toggle="pill"
                                href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Log
                                In</a>
                        </li>

                        <li class="nav-item text-center">
                            <a class="nav-link text-primary" id="pills-register-tab" data-toggle="pill"
                                href="#pills-register" role="tab" aria-controls="pills-register"
                                aria-selected="false">Sign Up</a>
                        </li>
                    </ul>
                </div>

                <div class="card-body pb-4">
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-login" role="tabpanel"
                            aria-labelledby="pills-login-tab">
                            <div class="placeholder">Username</div>
                            <form  v-on:submit.prevent="submitFormLogin">
                                <div class="form-group">
                                    <input type="text" name="user_name" class="form-control" id="username" 
                                    v-model="loginform.user_name" required autofocus />
                                </div>
                                <div class="placeholder">Password</div>
                                <div class="form-group">
                                    <input type="password" name="password" class="form-control" id="password"
                                        v-model="loginform.password" required />
                                </div>

                                <div class="text-center pt-4">
                                    <button type="submit" class="btn btn-primary">Login</button>
                                </div>

                                <div class="text-center pt-3">
                                    <!-- <a class="btn btn-link text-primary" href="#"
                        >Forgot Your Password?</a
                      > -->
                                </div>
                            </form>
                        </div>

                        <div class="tab-pane fade" id="pills-register" role="tabpanel"
                            aria-labelledby="pills-register-tab">
                            <form v-on:submit.prevent="submitFormRegister">
                                <div class="form-group">
                                    <input type="text" name="username" id="name" class="form-control"
                                        placeholder="Username" v-model="registerform.user_name" required autofocus />
                                </div>

                                <div class="form-group">
                                    <input type="email" name="email" id="email" class="form-control" placeholder="Email"
                                    v-model="registerform.email" required />
                                </div>

                                <div class="form-group">
                                    <input type="password" name="password" id="password" class="form-control"
                                        v-model="registerform.password" placeholder="Set a password" required />
                                </div>

                                <div class="form-group">
                                    <input type="password" name="password_confirmation" id="password-confirm"
                                        class="form-control" placeholder="Confirm password" 
                                        v-model="registerform.password_confirmation" required />
                                </div>

                                <div class="text-center pt-2 pb-1">
                                    <button type="submit" class="btn btn-primary">
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template> 

<script>
import axios from "axios";

export default {
    name: "Login", 
    data: function(){
        return{
            registerform:{
                user_name:"",
                email:"",
                password:"", 
                password_confirmation:""
            },
            loginform : {
                user_name:"", 
                password:""
            }
        }
    }, 
    methods:{
      submitFormLogin: function(){
        //alert(JSON.stringify(this.loginform))
        var self = this
        /*
        axios
          .post("http://localhost:8081/userlog/",{
                params: {
                    user: self.loginform.username, 
                    password: self.loginform.password
                }})
          .then((result)=>{
            self.$emit('logeado', self.loginform.username)
          })
          .catch((error) => {
              if (error.response.status == "404")
                  alert("ERROR 404: Usuario no encontrado.");
              if (error.response.status == "406")
                  alert("ERROR 403: Contraseña Erronea.");  
         });*/
         
         axios
          .post("http://localhost:8081/userlog/",self.loginform)
          .then((result)=>{
            self.$emit('logeado', self.loginform.user_name)
          })
          .catch((error) => {
              if (error.response.status == "404")
                  alert("ERROR 404: Usuario no encontrado.");
              if (error.response.status == "406")
                  alert("ERROR 403: Contraseña Erronea.");  
         });
         
         /*
         axios
          .post("https://new-ecommerce-api.herokuapp.com/customer/auth",self.loginform)
          .then((result)=>{
            self.$emit('logeado', self.loginform.username)
          })
          .catch((error) => {
              if (error.response.status == "404")
                  alert("ERROR 404: Usuario no encontrado.");
              if (error.response.status == "403")
                  alert("ERROR 403: Contraseña Erronea.");  
         });
         */
         
      }, 
      submitFormRegister: function(){
        var self = this
        
        if (self.registerform.password === self.registerform.password_confirmation){
          axios
            .post("http://localhost:8081/userreg/",{
                  params: {
                      user: self.loginform.username, 
                      password: self.loginform.password
                  }})
            .then((result)=>{
              self.$emit('logeado', self.loginform.username)
            })
            .catch((error) => {
                if (error.response.status == "404")
                    alert("ERROR 404: Usuario no encontrado.");
                if (error.response.status == "406")
                    alert("ERROR 403: Contraseña Erronea.");  
          });
        }else{
          alert("Error de digitacion: Las contraseñas no coinciden");
        }
      }
    }
} 


</script>


<style scoped>

*{
    font-size: 14pt;
}


.card {
    width: 350px;
    background-color: #94B43B;
    border-radius: 30px;
    
  }
  
  button, .btn-primary{
    background-color: #B1B2B0;
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
  
  li.nav-item  {
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
    background-color: #466B3F;
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

  .nav-tabs{
    border-bottom: none;
  }

  
 
  .text-primary {
    color: #7a7a7a !important;
  }
  
  .text-primary.active {
    color: white !important;
  }
  
  @media (max-width: 470px) {
    .app-logo{
        max-width: 400px;
        width: 70%;
        height: auto;
    }
  
    .card{
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