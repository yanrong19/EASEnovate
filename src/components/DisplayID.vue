<template>
    <v-container align="center">
        <v-card
            position="absolute"
            elevation="10"
            style="top: 5vh; left: 10vw; right: 40vw; bottom: 64vh"
        >
            <v-avatar
                style="top: 2vh; left: -22vw; right: 40vw; bottom: 65vh"
                size="x-large"
            >
                <v-img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                ></v-img>
            </v-avatar>
            <v-card
                style="top: -6vh; left: 1vw"
                variant="outlined"
                max-width="40vw"
            >
                <v-card-title class="text-h4" align="left">{{
                    IDname
                }}</v-card-title>
                <v-card-subtitle class="text-h6" align="left"
                    >Interior Designer</v-card-subtitle
                >
            </v-card>
            <v-card style="top: -5vh; left: 0vw" max-width="48vw">
                <v-card-text class="text-h6" align="left">
                    <v-rating
                        v-model="rating"
                        color="orange"
                        readonly
                        align="left"
                    ></v-rating>
                    <span
                        style="
                            font-size: 16px;
                            position: absolute;
                            top: 4vh;
                            left: 15.5vw;
                        "
                        >({{ jobReq.length }})</span
                    >
                    <v-card-text class="text-h6" align="left">
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
                </v-card-text>
            </v-card>
        </v-card>
        <v-card
            position="absolute"
            elevation="5"
            style="top: 38vh; left: 10vw; right: 40vw"
        >
            <v-card height="40vh">
                <div class="pastProjects">
                    <div class="scroll_container">
                        <div class="pp">
                            <img src="/assets/room1.jpg" />
                        </div>
                        <div class="pp">
                            <img src="/assets/room2.jpg" />
                        </div>
                        <div class="pp">
                            <img src="/assets/room3.jpg" />
                        </div>
                        <div class="pp">
                            <img src="/assets/room4.jpg" />
                        </div>
                    </div>
                </div>
            </v-card>
            <v-card-title class="text-h4 my-3" align="left"
                ><strong>About Me</strong></v-card-title
            >
            <v-card-text class="text-h6 mx-3" align="left">{{
                desc
            }}</v-card-text>
            <br />
            <v-card-text class="text-h5" align="left"
                ><h4>Website</h4></v-card-text
            >
            <v-card-text class="text-h6" align="left"
                ><a :href="'//' + website">{{ website }}</a></v-card-text
            >
            <v-card-text class="text-h5" align="left"
                ><strong>Past Projects</strong></v-card-text
            >
            <v-card-text class="text-h6" align="left">
                <v-card v-for="(row, index) in pastProjects" :key="index">
                    <v-card-text class="text-h6" align="left"
                        ><h4>{{ row.title }}</h4></v-card-text
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
            <v-card elevation="5" class="mb-5">
                <h2 align="left" class="ma-3">Reviews</h2>
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
                                    ><span style="font-size: 18px">{{
                                        rev.Review
                                    }}</span></i
                                ></v-card-text
                            >
                        </v-card>
                    </div>
                </div>
            </v-card>
        </v-card>
        <br />

        <v-hover v-slot="{ isHovering, props }">
            <v-card
                position="fixed"
                rounded="xl"
                v-bind="props"
                :elevation="isHovering ? 15 : 6"
                style="top: 5vh; left: 60vw; right: 5vw"
            >
                <v-card-title class="text-h4">{{ IDname }}</v-card-title>
                <v-card-subtitle>Interior Designer</v-card-subtitle>
                <v-card-actions>
                    <v-row>
                        <v-col class="d-flex justify-start">
                            <v-expansion-panels>
                                <v-expansion-panel elevation="5" rounded="xl">
                                    <v-expansion-panel-title color="primary"
                                        >CONTACT ME</v-expansion-panel-title
                                    >
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
                        <v-col class="d-flex justify-end">
                            <v-btn
                                class="engage"
                                @click="goEdit"
                                rounded="xl"
                                elevation="4"
                                height="6vh"
                                tonal
                                v-if="this.useremail == this.currentEmail"
                                >Edit Your Portfolio</v-btn
                            >
                            <v-dialog
                                v-model="engageProj"
                                width="70vw"
                                v-if="this.useremail != this.currentEmail"
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
                                </template>
                                <v-card>
                                    <v-card-title class="text-h4" align="center"
                                        >Engage a Project with
                                        {{ IDname }}</v-card-title
                                    >
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
    const db = getFirestore(firebaseApp);

    export default {
        props: ["profile"],
        data() {
            return {
                user: false,
                currentEmail: "",
                useremail: "",
                uid: "",
                cusName: "",
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
                services: [
                    "Painting",
                    "Tiling",
                    "Furniture Layout",
                    "Hardware",
                    "Lighting Design",
                ],
                idservices: "",
                details: "",
            };
        },
        mounted() {
            const auth = getAuth();
            const user = auth.currentUser;
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.currentEmail = user.email;
                    if (this.profile !== undefined) {
                        this.useremail = JSON.parse(this.profile).email;
                        console.log(this.useremail);
                        this.display(this.useremail);
                    } else {
                        this.user = user;
                        this.useremail = user.email;
                        this.uid = user.uid;
                        this.display(this.useremail);
                    }
                }
            });
        },
        methods: {
            async display(useremail) {
                const db = getFirestore(firebaseApp);
                try {
                    const docRef = doc(db, "portfolio", String(useremail)); //check if portfolio already created
                    let credentials = await getDoc(docRef);
                    let cred = credentials.data();
                    this.IDname = cred.name;
                    this.IDemail = cred.email;
                    this.IDphone = cred.phone;
                    this.desc = cred.description;
                    this.pastProjects = cred.PastProjects;
                    this.website = cred.website;
                    this.jobReq = cred.requests;
                    this.services = cred.services;
                    this.show = new Array(this.pastProjects.length).fill(false);

                    let totalRating = 0;
                    for (let i = 0; i < this.jobReq.length; i++) {
                        let arr = [];
                        const docRef2 = doc(db, "Job Requests", this.jobReq[i]);
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
                        this.rating = 0;
                    }
                } catch {
                    //portfolio not created, can only display limited information
                    const docRef = doc(db, "users", String(this.uid));
                    let credentials = await getDoc(docRef);
                    let cred = credentials.data();
                    this.IDname = cred.name;
                    this.IDemail = cred.email;
                }
            },
            required(value) {
                if (value.length == 0) {
                    return "Required.";
                }
            },
            goEdit() {
                this.$router.push("/profile/edit");
            },
            async submitRequest() {
                //only customers can submit request
                const docRef = doc(db, "users", String(this.uid));
                let customerDoc = await getDoc(docRef);
                let customerData = customerDoc.data();
                this.cusName = customerData.name;
                let jr_col = collection(db, "Job Requests"); //count number of job requests
                const counts = await getCountFromServer(jr_col);
                let jrid = counts.data().count + 123153;
                console.log(jrid);
                await setDoc(doc(db, "Job Requests", jrid.toString()), {
                    ID: jrid,
                    DesignerEmail: this.IDemail,
                    DesignerName: this.IDname,
                    CustomerEmail: this.useremail,
                    CustomerName: this.cusName,
                    Services: this.idservices,
                    Details: this.details,
                    Status: "Pending",
                    Rating: null,
                    Review: null,
                });
                this.engageProj = false;
            },
        },
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
        overflow-x: scroll;
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
