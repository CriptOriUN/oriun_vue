<template>
   <div class="regmoderator">
      <NavBar :username="username"/>
      <div class="container  pt-4 text-center">
         <div class="pb-5">
            <h2>Agregar y Modificar Inventario</h2>
         </div>
         <div class="card mx-auto">
            <div class="card-header border-bottom-0 bg-transparent">
               <ul class="nav nav-tabs justify-content-center" id="pills-tab" role="tablist">
                  <li class="nav-item text-center" id="login-tab">
                     <a class="nav-link active text-primary" id="pills-login-tab" data-toggle="pill"
                        href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Agregar</a>
                  </li>
                  <li class="nav-item text-center">
                     <a class="nav-link text-primary" id="pills-register-tab" data-toggle="pill"
                        href="#pills-register" role="tab" aria-controls="pills-register"
                        aria-selected="false">Actualizar</a>
                  </li>
               </ul>
            </div>
            <div class="card-body pb-4">
               <div class="tab-content" id="pills-tabContent">
                  <div class="tab-pane fade show active" id="pills-login" role="tabpanel"
                     aria-labelledby="pills-login-tab">
                      <form v-on:submit.prevent="submitFormElement">
                          <div class="form-group">
                              <input type="text" name="locationname" id="name" class="form-control"
                                  placeholder="Nombre Elemento" v-model="stockform.element_NAME" required autofocus />
                          </div>
                          <div class="form-group">

                              <label for="Locacion" class="titulo_bln my-check">Locacion</label>
                              <select name="" class="form-control" id="Locacion" v-model="stockform.name_LOCATION" required>
                                  <option disabled value="">Seleccione una locación</option>
                                  <option v-for="locacion in locaciones" :key="locacion.id" :value="locacion.name_LOCATION">{{locacion.name_LOCATION}}</option>
                              </select>

                          </div>
                          <div class="form-group">
                              <label for="Deporte" class="titulo_bln my-check">Deporte </label>
                              <select name="" class="form-control" id="Deporte" v-model="stockform.name_SPORT" required>
                                  <option disabled value="">Seleccione un Deporte</option>
                                  <option v-for="deporte in deportes" :key="deporte.id" :value="deporte.name_SPORT">{{deporte.name_SPORT}}</option>
                              </select>
                      
                          </div>
                          <div class="form-group">
                            <div class="form-check form-switch my-check">
                              <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" v-model="stockform.available">
                              <label class="form-check-label" for="flexSwitchCheckDefault">Disponible</label>
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="my-check">
                              <label for="locationimage">Imagen: </label>
                              <input type="file" id="locationimage" name="locationimage" accept="image/*"  @change="fileSelected" required>
                            </div> 
                            <img v-if="image" :src="image">
                          </div>
                          <div class="form-group">
                            <textarea name="message" placeholder="Descripcion" cols="43" rows="3" v-model="stockform.description" required></textarea>
                          </div>
                          <div class="text-center pt-2 pb-1">
                              <button type="submit" class="btn btn-primary">
                                  Añadir Inventario
                              </button>
                          </div>
                      </form>
                      <div class="pb-5 my-check" v-if="exitoso==true">
                        El elemento fue registrado con exito
                      </div> 
                  </div>
                  <div class="tab-pane fade" id="pills-register" role="tabpanel"
                     aria-labelledby="pills-register-tab">
                      <form v-on:submit.prevent="updateFormElement">
                          <div class="form-group">

                              <label for="Elemento" class="titulo_bln my-check">Elemento</label>
                              <select name="" class="form-control" id="Elemento" v-model="updateform.id_ELEMENT" @change="updname" required>
                                  <option disabled value="">Seleccione un elemento</option>
                                  <option v-for="elemento in elementos" :key="elemento.id" :value="elemento">{{elemento.element_NAME}}</option>
                              </select>

                          </div>
                          <div class="form-group">

                              <label for="Locacion" class="titulo_bln my-check">Locacion</label>
                              <select name="" class="form-control" id="Locacion" v-model="updateform.name_LOCATION" required>
                                  <option disabled value="">Seleccione un elemento</option>
                                  <option v-for="locacion in locaciones" :key="locacion.id" :value="locacion.name_LOCATION">{{locacion.name_LOCATION}}</option>
                              </select>

                          </div>
                          <div class="form-group">
                              <label for="Deporte" class="titulo_bln my-check">Deporte </label>
                              <select name="" class="form-control" id="Deporte" v-model="updateform.name_SPORT" required>
                                  <option disabled value="">Seleccione un elemento</option>
                                  <option v-for="deporte in deportes" :key="deporte.id" :value="deporte.name_SPORT">{{deporte.name_SPORT}}</option>
                              </select>
                      
                          </div>
                          <div class="form-group">
                            <div class="form-check form-switch my-check">
                              <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" v-model="updateform.available">
                              <label class="form-check-label" for="flexSwitchCheckDefault">Disponible</label>
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="my-check">
                              <label for="locationimage">Imagen: </label>
                              <input type="file" id="locationimage" name="locationimage" accept="image/*"  @change="fileSelected" >
                            </div>
                            <img v-if="image" :src="image">
                          </div>
                          <div class="form-group">
                            <textarea name="message" placeholder="Descripcion" cols="43" rows="3" v-model="updateform.description" required></textarea>
                          </div>
                          <div class="text-center pt-2 pb-1">
                              <button type="submit" class="btn btn-primary" v-on:click="getAdd2">
                                  Actualizar Inventario
                              </button>
                          </div>
                      </form>
                      <div class="pb-5 my-check" v-if="exitoso==true">
                        El elemento fue actualizado con exito
                    </div> 
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import NavBar from '../components/header/NavBar'
import axios from "axios";
export default {
    name: "AddStock", 
    components:{
        NavBar
    },
    data: function(){
        return{
            stockform:{
                name_LOCATION:"",
                name_SPORT:"",
                available:false, 
                element_NAME:"",
                element_IMAGE:"", 
                description:"",
            },
            updateform:{
                name_LOCATION:"",
                element_NAME:"",
                name_SPORT:"",
                available:false, 
                id_ELEMENT:"",
                //ELEMENT_IMAGE:"", 
                description:"",
            },
            locaciones:[], 
            deportes:[], 
            elementos:[],
            username:"",
            exitoso:false,
            image: ''
        }
    }, 
    created:function(){
        this.username = this.$route.params.username;
        let self = this;
        axios
        .get("https://wise-brook-308119.ue.r.appspot.com/locationssibu")
            .then((result) => {
                self.locaciones=result.data; 
            }).catch((error) => {
                alert("ERROR Servidor LOCACION");
            });
        axios
        .get("https://wise-brook-308119.ue.r.appspot.com/sports")
            .then((result) => {
                self.deportes=result.data; 
            }).catch((error) => {
                alert("ERROR Servidor DEPORTE");
            });
        axios
        .get("https://wise-brook-308119.ue.r.appspot.com/elements") 
          .then((result => {
            self.elementos = result.data;
          })).catch((error) => {
            alert("Error Servidor ELEMENTOS")
          })
    },
    methods:{
      getAdd: function(){
            alert(JSON.stringify(this.stockform))
            console.log(JSON.stringify(this.stockform));
        },
      getAdd2: function(){
            alert(JSON.stringify(this.updateform))
            console.log(JSON.stringify(this.updateform));
        },
      submitFormElement: function(){
        var self = this 
        axios
          .post("https://wise-brook-308119.ue.r.appspot.com/element",self.stockform)
          .then((result)=>{
            self.stockform.name_LOCATION=self.stockform.name_SPORT=self.stockform.element_NAME=self.stockform.description="";
            self.stockform.available=false;
            self.exitoso=true;
            setTimeout(()=>{
              self.exitoso=false;
            }, 1500)
          })
          .catch((error) => {
            alert("Error no esperado en el servidor.")
        });
      }, 
      updateFormElement: function(){
        var self = this  
        axios
          .put("https://wise-brook-308119.ue.r.appspot.com/elementupd",self.updateform)
          .then((result)=>{
            self.updateform.name_LOCATION=self.updateform.name_SPORT=self.updateform.id_ELEMENT=self.updateform.description="";
            self.updateform.available=false;
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
        this.stockform.element_IMAGE=imagen[1]
      }, 
      updname(event){
        console.log(event.target.value)
      }
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
    background-color: #76232f;
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
  textarea{
    border-radius: 10px;
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