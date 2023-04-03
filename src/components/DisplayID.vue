<template>
  <v-container align="center">
    <v-card 
      position="absolute"
      elevation="10"
      style="top:10vh; left:10vw; right:40vw; bottom:64vh;">
      <v-avatar style="top:2vh; left:-22vw; right:40vw; bottom:65vh;" size="x-large">
        <v-img
          src="https://cdn.vuetifyjs.com/images/john.jpg"
          alt="John"
        ></v-img>
      </v-avatar>
      <v-card style="top:-6vh; left:1vw" variant="outlined" max-width="40vw">
        <v-card-title class="text-h4" align="left">{{ IDname }}</v-card-title>
        <v-card-subtitle class="text-h6" align="left">Interior Designer</v-card-subtitle>
      </v-card>
      <v-card style="top:-4vh; left:0vw" max-width="48vw">
        <v-card-text class="text-h6" align="left">Rating</v-card-text>
        <v-card-text class="text-h6" align="left">Price</v-card-text>
      </v-card>
    </v-card>
      <v-card 
        height="100vh" 
        position="absolute"
        elevation="5"
        style="top:38vh; left:10vw; right:40vw;">
        <v-card height="40vh">
          <div class="pastProjects">
        <div class="scroll_container">
          <div class="pp">
            <img src="/assets/room1.jpg">
          </div>
          <div class="pp">
            <img src="/assets/room2.jpg">
          </div>
          <div class="pp">
            <img src="/assets/room3.jpg">
          </div>
          <div class="pp">
            <img src="/assets/room4.jpg">
          </div>
        </div>
        </div>
        </v-card>
        <v-card-title class="text-h4" align="left">About Me</v-card-title>
        <v-card-text class="text-h6" align="left">{{ desc }}</v-card-text>
        <v-card-text class="text-h5" align="left">Past Projects</v-card-text>
        <v-card-text class="text-h6" align="left">{{pastProjects}}</v-card-text>
        <v-card-text class="text-h5" align="left">Website</v-card-text>
        <v-card-text class="text-h6" align="left"><a :href="website">{{website}}</a></v-card-text>
      </v-card>
      <v-hover v-slot="{ isHovering, props }">
      <v-card 
        position="fixed" 
        rounded="xl" 
        v-bind="props"
        :elevation="isHovering ? 15 : 6" 
        style="top:10vh; left:60vw; right:5vw;">
          <v-card-title class="text-h4">{{ IDname }}</v-card-title>
          <v-card-subtitle>Interior Designer</v-card-subtitle>
          <v-card-actions>
              <v-row>
                  <v-col class="d-flex justify-start">
                    <v-expansion-panels>
                      <v-expansion-panel elevation="5" rounded="xl">
                        <v-expansion-panel-title color="primary">CONTACT ME</v-expansion-panel-title>
                        <v-expansion-panel-text> Email: {{ IDemail }}</v-expansion-panel-text>
                        <v-expansion-panel-text> Phone: {{ IDphone }}</v-expansion-panel-text>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-col>
                  <v-col class="d-flex justify-end">
                    <v-dialog v-model="engageProj" width="70vw">
                      <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" class="engage" rounded="xl" elevation="4" height="6vh" tonal>Engage a Project</v-btn> <br><br>
                      </template>
                      <v-card>
                        <v-card-title class="text-h4" align="center">Engage a Project with {{ IDname }}</v-card-title>
                        <v-form>
                            <v-container>
                              <v-row>
                                <v-col cols="12" md="4">
                                  <v-combobox 
                                    v-model="idservices"
                                    label="services" 
                                    :items="services" 
                                    multiple 
                                    chips 
                                    hide-selected
                                    color="primary"
                                    :rules="[required]"
                                    ></v-combobox>
                                </v-col>                       
                                <v-col cols="12" md="10">
                                  <v-text-field
                                    v-model="details"
                                    label="Details"
                                    required
                                    color="primary"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-form>
                        <v-card-actions>
                          <v-btn color="primary" block @click="submitRequest">Submit</v-btn>
                        </v-card-actions>
                        <v-card-actions>
                          <v-btn color="primary" block @click="engageProj = false">Close</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-col>
              </v-row>
          </v-card-actions>
      </v-card>
    </v-hover>
  </v-container>
</template>

<script>
import firebaseApp from '../firebase.js';
import {getFirestore} from "firebase/firestore";
import {getDoc, doc, setDoc} from "firebase/firestore";
import {getAuth, onAuthStateChanged} from "firebase/auth"
const db = getFirestore(firebaseApp);

export default {
    data(){
      return{
        user: false,
        useremail: '',
        IDname: '',
        IDemail:'',
        IDphone:'',
        desc:'',
        expertise:'',
        pastProjects: '',
        website:'',
        show: false,
        engageProj: false,
        services: ['Painting', 'Tiling', 'Furniture Layout', 'Hardware', 'Lighting Design'],
        idservices:"",
        details:""
      }
    },
    mounted(){
      const auth = getAuth();
      const user = auth.currentUser
      onAuthStateChanged(auth, (user) => {
          if (user) {
              this.user = user;
              this.useremail = user.email;
              console.log(this.useremail);
              this.display(this.useremail);
          }
      })
    },
    methods:{
      async display(useremail) {
        const db = getFirestore(firebaseApp);
        const docRef = doc(db,"ID_Credentials",String(useremail))
        let credentials = await getDoc(docRef);
        let cred = credentials.data();
        this.IDname = cred.IDname;
        this.IDemail = cred.Email;
        this.IDphone = cred.Phone;
        this.desc = cred.Desc;
        this.pastProjects = cred.PastProjects;
        this.website = cred.Website;
      },
      required(value) {
        if (value.length == 0) {
          return 'Required.';
        }
      },
      async submitRequest() {
        const docRef = await setDoc(doc(db,String(this.useremail).concat("_JR"), String(this.useremail)),{
          CustomerName:this.user.displayName, Service:this.idservices, Details:this.details, Status:"Pending"
        });
        this.engageProj = false;
      }
    }
}
</script>

<style scoped>
.engage {
  width: 12vw;
  background-color: rgb(76, 182, 76);
  color: white;
}

.v-expansion-panels {
width: 13vw;
}
.pastProjects {
  height:100%;
  max-width: 100vw;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  background-color: rgb(168, 198, 224);
}

.pp {
  width: 30vw;
  height: 35vh;
  margin: 10px;
  cursor: pointer;
  background-color: rgb(251, 251, 251);
  display:inline-block;
}

img{
  width:100%;
  height:100%;
}
</style>