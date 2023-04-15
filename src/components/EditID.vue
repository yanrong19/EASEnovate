<!-- Component for Interior Designers to edit their profile/portfolio or create one if they have not done so -->
<template>
    <v-container align="center">
        <div class="createUpdate" v-if="user">
            <v-form id="credForm">
                <!-- card for inputing basic details such as name, phone and profile picture (email cannot be changed) -->
                <v-card class="px-3 py-1" width="80%">
                    <v-card-item>
                        <h1>Update Your Portfolio</h1>
                        <br />
                        <div
                            position="absolute"
                        >
                            <CloudImage :path="link" /> 
                        </div>
                    </v-card-item>
                    <v-card-item>
                        <h3>Personal Details</h3>
                        <br />
                        <v-row>
                            <v-col md="12">
                                <v-text-field
                                    v-model="id_name"
                                    id="id_name"
                                    label="Name"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col md="5">
                                <v-text-field
                                    v-model="id_email"
                                    id="id_email"
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col md="3">
                                <v-text-field
                                    v-model="id_phone"
                                    id="id_phone"
                                    label="Phone"
                                ></v-text-field>
                            </v-col>
                            <v-col md="4">
                                <v-file-input
                                    type="file"
                                    ref="myfile"
                                    label="Profile Photo"
                                ></v-file-input>
                            </v-col>
                        </v-row>
                    </v-card-item>
                </v-card>
                <br />
                <!-- card for inputing portfolio details such as feature project picture, descriptions, website, services provided and past projects-->
                <v-card class="px-3 py-1" width="80%">
                    <h3>Your Portfolio</h3>
                    <br />
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
                            <v-select
                                chips
                                v-model="services"
                                :items="allServices"
                                label="Select"
                                multiple
                                hint="Pick your provided services"
                                persistent-hint
                            ></v-select>
                        </v-col>
                        <v-col md="7">
                            <v-text-field
                                v-model="website"
                                id="website"
                                label="Website"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <!-- interior designers allowed to add as many past projects as they want, they may also delete previously inputted past projects -->
                    <h3>Past Projects</h3>
                    <br />
                    <v-row>
                        <v-btn class="mx-4" @click="addProj"
                            >Add Past Project</v-btn
                        >
                    </v-row>
                    <br />
                    <div
                        class="previous"
                        v-for="(pastProj, counter) in pastProjects"
                        v-bind:key="counter"
                    >
                        <v-row>
                            <v-col md="3">
                                <v-text-field
                                    v-model="pastProj.title"
                                    label="Title"
                                ></v-text-field>
                                <v-btn
                                    class="mx-4"
                                    rounded="xl"
                                    @click="deleteProj(counter)"
                                    >X</v-btn
                                >
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
                </v-card>
                <br />
                <!-- color="primary" -->
                <v-btn
                    id="uploadbutton"
                    elevation="4"
                    height="5vh"
                    v-on:click="uploadChange"
                    >Upload</v-btn
                >
            </v-form>
        </div>
    </v-container>
</template>

<script>
    import { storage } from "../firebase";
    import { ref, uploadBytes } from "firebase/storage";
    import firebaseApp from "../firebase.js";
    import { getFirestore } from "firebase/firestore";
    import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
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
                pastProjects: [
                    {
                        title: "",
                        description: "",
                    },
                ],
                services: "",
                website: "",
                reviews: [
                    {
                        description: "",
                        ratings: "",
                    },
                ],
                allServices: [
                    "Home Renovation and Interior Design",
                    "Living Room Renovation",
                    "Kitchen Renovation",
                    "Bathroom and Toilet",
                    "Bedroom",
                    "Exterior",
                    "Window",
                    "Roof Flooring and Tiling",
                    "Others",
                ],
            };
        },
        beforeMount() {
            const auth = getAuth();
            const user = auth.currentUser;
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.user = user;
                    this.uid = user.uid;
                    this.id_email = user.email;
                    console.log(this.id_email);
                    this.display(this.uid);
                    this.link = String(`folder/${this.id_email}.png`); //link to profile picture
                }
            });
        },
        methods: {
            // display current information in the fields of the form that can be editted
            async display(uid) {
                const db = getFirestore(firebaseApp);
                const docRef = doc(db, "users", String(uid)); //change
                let credentials = await getDoc(docRef);
                let cred = credentials.data();
                this.id_name = cred.name;
                this.id_email = cred.email;
                try { //check if a portfolio has already been created, then update the information
                    const docRef2 = doc(db, "portfolio", String(this.id_email)); //change
                    let credentials2 = await getDoc(docRef2);
                    let cred2 = credentials2.data();
                    this.description = cred2.description;
                    this.pastProjects = cred2.PastProjects;
                    this.website = cred2.website;
                    this.id_phone = cred2.phone;
                    this.services = cred2.services;
                    this.reviews = cred2.reviews;
                } catch { //no portfolio created
                    this.reviews = [
                        {
                            description: "",
                            ratings: "",
                        },
                    ];
                }
            },
            // function to upload photos
            upload: function () {
                console.log(this.link);
                const storageRef = ref(storage, this.link);
                console.log();
                uploadBytes(storageRef, this.$refs.myfile.files[0]).then(
                    (snapshot) => {
                        console.log("uploaded");
                    }
                );
            },
            // function to upload all changes into the firestore database
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
                //update the user collection if there is a change in name
                await updateDoc(doc(db, "users", String(this.uid)), {
                    name: id_name,
                });
                //update/add into portfolio collection
                await setDoc(doc(db, "portfolio", email), {
                    name: id_name,
                    email: email,
                    phone: phone,
                    description: desc,
                    PastProjects: pastProjs,
                    services: services,
                    website: website,
                    reviews: reviews,
                });
                document.getElementById("credForm").reset();
                this.$router.push({ name: "DisplayID2" }); //go back to display profile view
                console.log("UPLOADING CHANGE");
            },
            addProj() {
                this.pastProjects.push({
                    title: "",
                    description: "",
                });
            },
            deleteProj(counter) {
                this.pastProjects.splice(counter, 1);
            },
        },
        components: { CloudImage },
    };
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

    button {
        background-color: #6b3fc8;
        border: 2px solid #6b3fc8;
        color: white;
        transition-duration: 0.4s;
    }

    button:hover {
        background-color: white;
        color: black;
    }
</style>
