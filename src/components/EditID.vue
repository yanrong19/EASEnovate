<template>
  <v-container align="center">
      <div class="createUpdate" v-if="user">
        <h1>CREATE/UPDATE YOUR PORTFOLIO</h1>
        <div class="photo">
            <input type="file" ref="file" style="display: none" @change="previewImage" accept="image/*"/>
            <v-icon icon="mdi-face"></v-icon>
            <button id = "profilePicBtn" v-on:click="uploadPhoto"><v-img src="/assets/photo.png" :width="75"></v-img></button>
            <br><br>
        </div>
        <v-form id="credForm">
          <v-card class="px-3 py-1">
            <h3>Personal Details</h3><br>
            <v-row>
              <v-col md="12">
                <v-text-field v-model="id_name" id="id_name" label="Name"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="5">
                <v-text-field v-model="id_email" id="id_email" disabled></v-text-field>
              </v-col>
              <v-col md="3">
                <v-text-field v-model="id_phone" id="id_phone" label="Phone"></v-text-field>
              </v-col>
            </v-row>
          </v-card> <br>
            <v-card class="px-3 py-1">
              <h3>Your Portfolio</h3> <br>
            <v-row>
              <v-col>
                <v-textarea 
                v-model="description" 
                id="description" 
                label="Description" 
                height="20vh" 
                clearable 
                no-resize
                autogrow
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="5">
                <v-combobox
                v-model="services" 
                id="services"
                label="Services"
                multiple 
                chips
                ></v-combobox>
              </v-col>
              <v-col md="7">
                <v-text-field v-model="website" id="website" label="Website"></v-text-field>
              </v-col>
            </v-row>
            <h3>Past Projects</h3> <br>
            <v-row>
                <v-btn class="mx-4" @click="addProj">Add Past Project</v-btn>
            </v-row> <br>
            <div class="previous"
                  v-for="(pastProj, counter) in pastProjects"
                  v-bind:key="counter">
            <v-row>
                  <v-col md="3">
                    <v-text-field v-model="pastProj.title" label="Title"></v-text-field>
                    <v-btn class="mx-4" rounded="xl" @click="deleteProj(counter)">X</v-btn>
                  </v-col>
                  <v-col md="9">
                    <v-textarea 
                      v-model="pastProj.description"
                      class="textarea"
                      label="Description"  
                      clearable 
                      no-resize
                      autogrow
                    ></v-textarea>
                  </v-col>
            </v-row>
          </div>
          </v-card> <br>
            <v-btn id="uploadbutton" color="green" rounded="xl" elevation="4" height="5vh" tonal v-on:click="uploadChange">Upload</v-btn>
        </v-form>
      </div>
  </v-container>
  </template>
  
  <script>
  import firebaseApp from '../firebase.js';
  import {getFirestore} from "firebase/firestore";
  import {getDoc, doc, updateDoc} from "firebase/firestore";
  import {getAuth, onAuthStateChanged} from "firebase/auth"
    export default {
        data(){
          return{
            user: false,
            useremail: '',
            id_name:'',
            id_email:'',
            id_phone:'',
            description:'',
            pastProjects:[{
              title:'',
              description:''
            }],
            services:'',
            website:'',
          }
        },
        mounted(){
          const auth = getAuth();
          const user = auth.currentUser
          onAuthStateChanged(auth, (user) => {
              if (user) {
                  this.user = user;
                  this.useremail = user.email;
                  this.display(this.useremail);
              }
          })
        },
        methods: {
          async display(useremail) { //how to get ID reference when clicked into profile
            const db = getFirestore(firebaseApp);
            const docRef = doc(db,"Users",String(useremail)) //change
            let credentials = await getDoc(docRef);
            let cred = credentials.data();
            this.id_name = cred.IDname;
            this.id_email = cred.Email;
            this.id_phone = cred.Phone;
            //this.services = cred.Services;
            this.description = cred.Desc;
            this.pastProjects = cred.PastProjects;
            this.website = cred.Website;
            this.services = cred.Services;
          },
          uploadPhoto(){
            let photo = this.$refs.file;
            photo.click();
            console.log(photo)
          },
          async uploadChange(){
            const db = getFirestore(firebaseApp);
            let id_name = this.id_name;
            let phone = this.id_phone;
            let desc = this.description;
            console.log(desc)
            let pastProjs = this.pastProjects;
            let services = this.services;
            let website = this.website;
            
            const docRef = await updateDoc(doc(db,"Users", this.useremail),{
              IDname:id_name, Phone:phone, Desc:desc, PastProjects:pastProjs, Services:services, Website:website
            });
            document.getElementById("credForm").reset();
            this.$router.push("/displayid");
          },
          addProj(){
            this.pastProjects.push({
              title:'',
              description: ''
            })
          },
          deleteProj(counter){
            this.pastProjects.splice(counter,1);
          }
        }
  }
  </script>
  
  <style scoped>
  .v-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    display: inline-block;
    text-align: center;
  }
  </style>