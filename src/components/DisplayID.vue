<!-- Component for a customer/interior designer to view the profile page of interior designers -->
<template>
    <v-container align="center" class="d-flex flex-row">
        <!-- card consisting of name, avatar, title, rating and services provided -->
        <v-card
        position="absolute"
            elevation="10"
            style="top: 5%; left: 10%; right: 40%"
        >
            <v-card
            
        >
            <v-avatar
                class="d-flex flex-column"
                style="top: 5vh; left: -44%; right: 40%; bottom: 45%"
                size="x-large"
            >
            <!-- Retrieve image from firebase storage through CloudImage Component -->
                <CloudImage :path="this.idemailforpic" />
            </v-avatar>
            <v-card
                style="top: -3vh; left: 1%"
                variant="outlined"
                max-width="40vw"
            >
                <v-card-title class="text-h4 d-flex flex-column" align="left">{{
                    IDname
                }}</v-card-title>
                <v-card-subtitle class="text-h6" align="left"
                    >Interior Designer</v-card-subtitle
                >
            </v-card>
            <v-card style="top: -1.5vh;" max-width="100%">
                <v-card-text class="text-h6" align="left">
                    <div class="text-h10 d-flex flex-row" style="position:sticky; top:10%">
                        <v-rating
                        v-model="rating"
                        color="orange"
                        readonly
                        half-increments
                        align="left"
                    >
                    </v-rating>
                    </div>
                    <!-- display serves that the interior designer offers -->
                    <div class="text-h10 d-flex">
                        <v-card-text class="text-h6 flex-col" align="left">
                        Services:
                        <v-chip
                            class="ma-2"
                            color="secondary"
                            v-for="serv in services"
                            :key="serv"
                        >
                            {{ serv }}</v-chip
                        >
                        </v-card-text>
                    </div>
                </v-card-text>
            </v-card>
        </v-card>
        <!-- card for portfolio, including featured project picture, self description, website, past projects and reviews -->
        <v-card
        >
            <v-card height="50vh">
                <div class="pastProjects">
                    <div class="scroll_container">
                        <CloudImage2 :path="this.idemailforprojpic" />
                    </div>
                </div>
            </v-card>
            <v-card-title class="text-h4 my-3 font-weight-bold" align="left "
                ><strong>About Me</strong></v-card-title
            >
            <v-card-text class="mx-3" align="left">
                <p class="text-h6 font-weight-light">
                    {{desc}}
                </p>
            </v-card-text>
            <br />
            <!-- <v-card-text class="text-h5 font-weight-light" align="left"
                ><h4>Website</h4></v-card-text
            > -->
            <v-card-text class="text-h6 mx-3" align="left"
                ><a :href="'//' + website">{{ website }}</a></v-card-text
            >
            <v-card-text class="text-h5 my-3 font-weight-meidum" align="left"
                ><strong>Past Projects</strong></v-card-text
            >
            <v-card-text class="text-h6" align="left">
                <v-card v-for="(row, index) in pastProjects" :key="index">
                    <v-card-text class="text-h6" align="left"
                        ><p class="font-weight-medium">{{ row.title }}</p></v-card-text
                    >
                    <v-btn
                        :icon="
                            show[index] ? 'mdi-chevron-up' : 'mdi-chevron-down'
                        "
                        @click="show[index] = !show[index]"
                        size="s"
                        class="ma-3"
                    ></v-btn>
                    <v-expand-transition>
                        <div v-show="show[index]">
                            <v-divider></v-divider>
                            <v-card-text>
                                {{ row.description }}
                            </v-card-text>
                        </div>
                    </v-expand-transition>
                </v-card>
            </v-card-text>
            <!-- iterate through all reviews and display -->
            <v-card elevation="5" class="mb-5">
                <h2 align="left" class="ma-3">Reviews <span>({{ jobReq.length }})</span></h2>
                <div class="checkreviews">
                    <div v-for="rev in reviews" :key="rev">
                        <v-card
                            width="46.6vw"
                            height="29.5vh"
                            align="left"
                            class="my-2"
                        >
                            <v-card-title
                                ><h3>{{ rev.CusName }}</h3></v-card-title
                            >
                            <v-rating
                                v-model="rev.Rating"
                                color="orange"
                                readonly
                            ></v-rating>
                            <v-card-text
                                ><i
                                    ><span class="text-wrap" style="font-size: 18px">{{
                                        rev.Review
                                    }}</span></i
                                ></v-card-text
                            >
                        </v-card>
                    </div>
                </div>
            </v-card>
        </v-card>
        </v-card>
        <br />
        <!-- card with fixed position containing contact details and option for customers to engage with the interior designer -->
        <v-hover v-slot="{ isHovering, props }">
            <v-card
                position="fixed"
                rounded="xl"
                v-bind="props"
                :elevation="isHovering ? 15 : 6"
                style="top: 5%; left: 61%; right: 5%"
            >
                <v-card-title class="text-h4">{{ IDname }}</v-card-title>
                <v-card-subtitle>Interior Designer</v-card-subtitle>
                <v-card-actions>
                    <v-row>
                        <v-col class="d-flex justify-start flex-column">
                            <v-expansion-panels >
                                <v-expansion-panel elevation="5" rounded="xl">
                                    <v-expansion-panel-title color="primary">
                                        CONTACT ME
                                    </v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        Email:
                                        {{ IDemail }}</v-expansion-panel-text
                                    >
                                    <v-expansion-panel-text>
                                        Phone:
                                        {{ IDphone }}</v-expansion-panel-text
                                    >
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-col>
                        <!-- only the interior designer themselves can edit their own portfolio -->
                        <v-col class="d-flex justify-end">
                            <v-btn
                                class="engage"
                                @click="goEdit"
                                rounded="xl"
                                elevation="4"
                                height="6vh"
                                tonal
                                v-if="this.IDemail == this.currentEmail"
                                >Edit Your Portfolio</v-btn
                            >
                            <v-dialog
                                v-model="engageProj"
                                width="70vw"
                                v-if="this.IDemail != this.currentEmail"
                            >
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                        v-bind="props"
                                        class="engage"
                                        rounded="xl"
                                        elevation="4"
                                        height="6vh"
                                        tonal
                                        >Engage a Project</v-btn
                                    >
                                    <br /><br />
                                    <!-- Opens a dialong when clicked -->
                                </template>
                                <v-card>
                                    <v-card-title class="text-h4" align="center"
                                        >Engage a Project with
                                        {{ IDname }}</v-card-title
                                    >
                                    <!-- form that takes in desired services by the customer and details of the project to be sent to the interior designer -->
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
                                                <v-col md="12">
                                                    <v-textarea
                                                        v-model="details"
                                                        label="Description"
                                                        clearable
                                                        no-resize
                                                        autogrow
                                                    ></v-textarea>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                    <v-card-actions>
                                        <v-btn
                                            color="primary"
                                            block
                                            @click="submitRequest"
                                            >Submit</v-btn
                                        >
                                    </v-card-actions>
                                    <v-card-actions>
                                        <v-btn
                                            color="primary"
                                            block
                                            @click="engageProj = false"
                                            >Close</v-btn
                                        >
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
    import firebaseApp from "../firebase.js";
    import { getFirestore } from "firebase/firestore";
    import {
        getDocs,
        getDoc,
        doc,
        setDoc,
        updateDoc,
        collection,
        getCountFromServer,
    } from "firebase/firestore";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import CloudImage from "./CloudImage.vue";
    import CloudImage2 from "./CloudImage2.vue";
    const db = getFirestore(firebaseApp);

    export default {
        // accepts a prop to ensure the credentials of the selected interior designer is displayed
        props: ["profile"],
        data() {
            return {
                idemailforpic: "",
                idemailforprojpic: "",
                currentEmail: "",
                user: false,
                useremail: "",
                uid: "",
                cusName: "",
                cusEmail:"",
                IDname: "",
                IDemail: "",
                IDphone: "",
                desc: "",
                expertise: "",
                pastProjects: [],
                website: "",
                rating: "",
                reviews: [],
                jobReq: [],
                show: [],
                engageProj: false,
                services: [ //some default services for an interior designer
                    "In-home Consultation",
                    "E-Design",
                    "Full-Service",
                    "Kitchen and Bathroom Design",
                    "Eco Design",
                    "Outdoor Living",
                    "Custom Furniture Design",
                    "Art Procurement and Curation",
                ],
                idservices: "",
                details: "",
            };
        },
        mounted() {
            console.log("mounted in in display id component");
            const auth = getAuth();
            const user = auth.currentUser;
            // this.useremail = JSON.parse(this.profile).email;
            // if (this.useremail !== undefined) {
            //     console.log('NXXXT')
            //     this.display(this.useremail); //
            // }
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.uid = user.uid;
                    this.currentEmail = user.email;
                }
            });
            // onAuthStateChanged(auth, (user) => {
            //   if (user) {
            //     if (this.profile !== undefined) {
            //     } else {
            //       this.user = user;
            //       this.useremail = user.email;
            //       this.uid = user.uid;
            //       this.display(this.useremail);
            //     }
            //   }
            // });
        },
        watch: { //watch for a change in props value. Once a prop is detected, data will be updated with new values from the prop
            profile: function (newVal, oldVal) {
                // watch it
                console.log("watcher for display id comp");
                console.log("Prop changed: ", newVal, " | was: ", oldVal);
                this.useremail = JSON.parse(this.profile).email;
                console.log(this.useremail);
                this.display(this.useremail);
            },
        },
        methods: {
            //display information of the interior designer
            async display(useremail) {
                const db = getFirestore(firebaseApp);
                try { //check if the interior designer has created their portfolio
                    const docRef = doc(db, "portfolio", String(useremail)); //retrieve portfolio information from firebase
                    let credentials = await getDoc(docRef);
                    let cred = credentials.data();
                    console.log(cred);
                    this.IDname = cred.name;
                    this.IDemail = cred.email;
                    this.IDphone = cred.phone;
                    this.desc = cred.description;
                    this.pastProjects = cred.PastProjects;
                    this.website = cred.website;
                    this.jobReq = cred.requests;
                    this.services = cred.services;
                    this.show = new Array(this.pastProjects.length).fill(false);
                    this.idemailforpic = String(`folder/${this.IDemail}.png`);
                    this.idemailforprojpic = String(
                        `folder/${this.IDemail}_project.png`
                    );
                    console.log(this.idemailforprojpic);
                    console.log(this.idemailforpic);

                    let totalRating = 0; //sum the ratings from job requests and display the average rating
                    for (let i = 0; i < this.jobReq.length; i++) {
                        let arr = [];
                        const docRef2 = doc(db, "Job Requests", this.jobReq[i]); //pull the rating and review information from job request collection to display
                        let jrs = await getDoc(docRef2);
                        let jr = jrs.data();
                        arr.Review = jr.Review;
                        arr.CusName = jr.CustomerName;
                        arr.Rating = jr.Rating;
                        totalRating += jr.Rating;
                        console.log(arr);
                        this.reviews.push(arr);
                    }
                    console.log(totalRating);
                    try {
                        this.rating = totalRating / this.jobReq.length;
                    } catch {
                        this.rating = 0; //no ratings at the moment
                    }
                } catch {
                    // portfolio not created, can only display limited information from user collection
                    console.log(this.IDemail);
                    this.jobReq = [];
                    const docRef = doc(db, "users", String(this.IDemail));
                    let credentials = await getDoc(docRef);
                    let cred = credentials.data();
                    this.IDname = cred.name;
                    this.IDemail = cred.email;
                }
            },
            required(value) { //requirement for fields when filling in the engage form
                if (value.length == 0) {
                    return "Required.";
                }
            },
            goEdit() {
                this.$router.push("/profile/edit");
            },
            //submit request to the interior designer by creating a new job request and storing it under job request collection
            async submitRequest() {
                const docRef = doc(db, "users", String(this.uid));
                let customerDoc = await getDoc(docRef);
                let customerData = customerDoc.data();
                this.cusName = customerData.name;
                this.cusEmail = customerData.email;
                let jr_col = collection(db, "Job Requests");
                const counts = await getCountFromServer(jr_col); //count the current number of job requests in the collection
                let jrid = counts.data().count + 123159; //arbitrary number to get the job request id
                console.log(this.cusEmail);
                //add the new job request into the collection
                await setDoc(doc(db, "Job Requests", jrid.toString()), {
                    ID: jrid,
                    DesignerEmail: this.IDemail,
                    DesignerName: this.IDname,
                    CustomerEmail: this.cusEmail,
                    CustomerName: this.cusName,
                    Services: this.idservices,
                    Details: this.details,
                    Status: "Pending",
                    Rating: null,
                    Review: null,
                });
                this.engageProj = false; //close the dialog after submitting job request
            },
        },
        components: { CloudImage, CloudImage2 },
    };
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
        height: 100%;
        max-width: 100vw;
        overflow-x: hidden;
        overflow-y: hidden;
        white-space: nowrap;
        background-color: rgb(168, 198, 224);
    }

    .checkreviews {
        height: 100%;
        max-height: 31.5vh;
        overflow-x: hidden;
        overflow-y: scroll;
        white-space: nowrap;
        background-color: rgb(168, 198, 224);
    }

    .pp {
        width: 30vw;
        height: 35vh;
        margin: 10px;
        cursor: pointer;
        background-color: rgb(251, 251, 251);
        display: inline-block;
    }

    img {
        width: 100%;
        height: 100%;
    }
</style>