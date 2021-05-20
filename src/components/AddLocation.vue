<template>
    
    <div class="regmoderator">
        <NavBar :username="username"/>
        <div class="container  pt-4 text-center">
            <div class="pb-5">
                <h2>Agregar Locación</h2>
            </div>
            <div class="card mx-auto">
                <div class="title">
                    <br>
                </div>
                <form v-on:submit.prevent="submitFormLocation">
                    <div class="form-group">
                        <input type="text" name="locationname" id="name" class="form-control"
                            placeholder="Nombre Locacion" v-model="locationform.name_LOCATION" required autofocus />
                    </div>
                    <div class="form-group">
                      <div class="form-check form-switch my-check">
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" v-model="locationform.open">
                        <label class="form-check-label" for="flexSwitchCheckDefault">Abierto</label>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="my-check">
                        <label for="locationimage">Imagen: </label>
                        <input type="file" id="locationimage" name="locationimage" accept="image/*" @change="fileSelected" required>
                      </div> 
                      <img v-if="image" :src="image">
                    </div>
                    <div class="text-center pt-2 pb-1">
                        <button type="submit" class="btn btn-primary" >
                            Añadir Locacion
                        </button>
                    </div>
                </form>
                <div class="pb-5 my-check" v-if="exitoso==true">
                    La Locacion fue regitrada con exito
                </div> 
            </div>
        </div>
    </div>
</template> 

<script>
import NavBar from '../components/header/NavBar'
import axios from "axios";

export default {
    name: "AddLocation", 
    components:{
        NavBar
    },
    data: function(){
        return{
            locationform:{
              name_LOCATION:"", 
              open:false, 
              image_LOCATION:"",
            },
            username:"",
            exitoso:false,
            image: ''
        }
    }, 
    created:function(){
        this.username = this.$route.params.username;
    },
    methods:{
      getAdd: function(){
            alert(JSON.stringify(this.locationform))
            console.log(JSON.stringify(this.locationform));
        },
      submitFormLocation: function(){
        var self = this 
        axios
          .post("https://wise-brook-308119.ue.r.appspot.com/glocationsibu",self.locationform)
          .then((result)=>{
            self.locationform.name_LOCATION="" 
            self.locationform.open = false
            self.exitoso=true;
            setTimeout(()=>{
              self.exitoso=false;
            }, 1500)
          })
          .catch((error) => {
            alert("Error no esperado en el servidor.")
        });
      },
      fileSelected(event){
        const file = event.target.files.item(0);
        const reader = new FileReader();
        reader.addEventListener('load', this.imageLoaded);
        reader.readAsDataURL(file);
      },
      imageLoaded(event){
        this.image = event.target.result;
        let imagen = event.target.result.split(",",2)
        this.locationform.image_LOCATION=imagen[1]
      },
    }
} 


</script>


<style scoped>

*{
    font-size: 14pt;
}

img{
  width: 200px;
}

.card {
    width: 600px;
    background-color: #A61C31;
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
  
  .placeholder, .my-check{
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