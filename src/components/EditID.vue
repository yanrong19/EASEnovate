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
                <v-text-field v-model="id_email" id="id_email" label="Email"></v-text-field>
              </v-col>
              <v-col md="3">
                <v-text-field v-model="id_phone" id="id_phone" label="Phone"></v-text-field>
              </v-col>
            </v-row>
          </v-card> <br>
            <v-card class="px-3 py-1">
              <h3>About Yourself</h3> <br>
            <v-row>
              <v-col>
                <v-text-field v-model="description" id="description" label="Description" height="20vh"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="pastProjects" id="pastProjects" label="Past Projects"></v-text-field>
              </v-col>
              <v-col>
                <v-combobox
                v-model="services" 
                id="services"
                label="Services"
                multiple 
                chips
                ></v-combobox>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="8">
                <v-text-field v-model="website" id="website" label="Website"></v-text-field>
              </v-col>
            </v-row>
          </v-card> <br>
            <v-btn id="uploadbutton" color="green" rounded="xl" elevation="4" height="5vh" tonal v-on:click="uploadChange">Upload</v-btn>
        </v-form>
      </div>
  </v-container>
  </template>
  
  <script>
  import firebaseApp from '../firebase.js';
  import {getFirestore} from "firebase/firestore";
  import {doc,setDoc} from "firebase/firestore";
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
            pastProjects:'',
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
              }
          })
        },
        methods: {
          uploadPhoto(){
            let photo = this.$refs.file;
            photo.click();
            console.log(photo)
          },
          async uploadChange(){
            const db = getFirestore(firebaseApp);
            let id_name = this.id_name;
            let email = this.id_email;
            let phone = this.id_phone;
            let desc = this.description;
            console.log(desc)
            let pastProjs = this.pastProjects;
            let services = this.services;
            let website = this.website;
            
            const docRef = await setDoc(doc(db,"ID_Credentials", this.useremail),{
              IDname:id_name, Email:email, Phone:phone, Desc:desc, PastProjects:pastProjs, Services:services, Website:website
            });
            document.getElementById("credForm").reset();
            this.$router.push("/home");
          },
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