<template>
  <v-container align="center">
      <div class="createUpdate" v-if="user">
        <h1>CREATE/UPDATE YOUR PORTFOLIO</h1> <br>
          <CloudImage :path="link"/>
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
              <v-col md="4">
                <v-file-input type="file" ref="myfile" label="Profile Photo"></v-file-input>
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
  import { storage } from "../firebase";
  import { ref, uploadBytes } from "firebase/storage";
  import firebaseApp from '../firebase.js';
  import {getFirestore} from "firebase/firestore";
  import {getDoc, doc, updateDoc, setDoc} from "firebase/firestore";
  import {getAuth, onAuthStateChanged} from "firebase/auth"
import CloudImage from "./CloudImage.vue";
    export default {
    data() {
        return {
            user: false,
            uid: "",
            link: "",
            id_name: "",
            id_email: "",
            id_phone: "",
            description: "",
            pastProjects: [{
                    title: "",
                    description: ""
                }],
            services: "",
            website: "",
            reviews: [{
                    description: "",
                    ratings: ""
                }]
        };
    },
    beforeMount() {
        const auth = getAuth();
        const user = auth.currentUser;
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
                this.uid = user.uid;
                console.log(this.uid);
                this.display(this.uid);
                this.link = String(`folder/${this.uid}.png`);
            }
        });
    },
    methods: {
        async display(uid) {
            const db = getFirestore(firebaseApp);
            const docRef = doc(db, "users", String(uid)); //change
            let credentials = await getDoc(docRef);
            let cred = credentials.data();
            this.id_name = cred.name;
            this.id_email = cred.email;
            try {
                const docRef2 = doc(db, "portfolio", String(this.id_email)); //change
                let credentials2 = await getDoc(docRef2);
                let cred2 = credentials2.data();
                this.description = cred2.description;
                this.pastProjects = cred2.PastProjects;
                this.website = cred2.website;
                this.id_phone = cred2.phone;
                this.services = cred2.services;
                this.reviews = cred2.reviews;
            }
            catch {
                this.reviews = [{
                        description: "",
                        ratings: ""
                    }];
            }
        },
        upload: function () {
            console.log(this.link);
            const storageRef = ref(storage, this.link);
            console.log();
            uploadBytes(storageRef, this.$refs.myfile.files[0]).then((snapshot) => {
                console.log("uploaded");
            });
        },
        async uploadChange() {
            const db = getFirestore(firebaseApp);
            let id_name = this.id_name;
            let phone = this.id_phone;
            let email = this.id_email;
            let desc = this.description;
            let pastProjs = this.pastProjects;
            let services = this.services;
            let website = this.website;
            let reviews = this.reviews;
            this.upload();
            await updateDoc(doc(db, "users", String(this.uid)), {
                name: id_name
            });
            await setDoc(doc(db, "portfolio", email), {
                name: id_name,
                email: email,
                phone: phone,
                description: desc,
                PastProjects: pastProjs,
                services: services,
                website: website,
                reviews: reviews
            });
            document.getElementById("credForm").reset();
            this.$router.push("/profile");
        },
        addProj() {
            this.pastProjects.push({
                title: "",
                description: ""
            });
        },
        deleteProj(counter) {
            this.pastProjects.splice(counter, 1);
        }
    },
    components: { CloudImage }
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