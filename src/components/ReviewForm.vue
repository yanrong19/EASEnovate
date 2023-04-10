<template>
    <div class="d-flex align-center flex-column">
        <v-card width="70%">
            <v-card-item>
                <h1>Leave a Review</h1>
            </v-card-item>
            <v-card-actions>
                <v-spacer />
                <v-img
                    src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                    alt="FUll"
                    max-width="40%"
                >
                </v-img>
                <v-spacer />
            </v-card-actions>
            <v-card-item>
                <v-card-title> Interior Designer </v-card-title>
                <v-card-subtitle> {{ idName }} </v-card-subtitle>
            </v-card-item>
            <v-card-item>
                <v-card-title> Description </v-card-title>
                <v-sheet rounded border="lg opacity-8" color="grey-lighten-3">
                    <p class="mb-8">
                        {{ description }}
                    </p>
                </v-sheet>
            </v-card-item>
            <v-card-item>
                <v-card-title> Service Provided </v-card-title>
                <div id="list">
                    <v-card-actions>
                        <v-chip
                            color="teal"
                            v-for="item in services"
                            size="large"
                        >
                            {{ item }}
                        </v-chip>
                    </v-card-actions>
                </div>
            </v-card-item>
            <v-form>
                <v-card-item>
                    <v-card-title> Ratings </v-card-title>
                </v-card-item>
                <v-card-actions>
                    <v-spacer />
                    <v-rating v-model="rating" hover color="orange"></v-rating>
                    <v-spacer />
                </v-card-actions>

                <v-card-item>
                    <v-card-title v-if="this.status == 'Completed'">
                        Write a review
                    </v-card-title>
                    <v-card-title v-else> Your Review </v-card-title>
                </v-card-item>
                <v-container>
                    <v-textarea
                        bg-color="grey-lighten-3"
                        v-model="review"
                        v-if="this.status == 'Completed'"
                    >
                    </v-textarea
                    ><v-sheet
                        rounded
                        border="lg opacity-8"
                        color="grey-lighten-3"
                        v-else
                    >
                        <p class="mb-8">
                            {{ description }}
                        </p>
                    </v-sheet>
                </v-container>
                <v-card-actions>
                    <v-spacer />
                    <v-btn
                        @click.native="updateReview"
                        v-if="this.status == 'Completed'"
                    >
                        Submit Review
                        <v-icon end icon="mdi-pencil-box-multiple"></v-icon
                    ></v-btn>
                    <v-btn @click.native="goRequest" v-else>
                        Back to Job Requests
                        <v-icon end icon="mdi-arrow-left"></v-icon
                    ></v-btn>
                    <v-spacer />
                </v-card-actions>
            </v-form>
        </v-card>
    </div>
</template>
<script>
    import firebaseApp from "../firebase.js";
    import { getFirestore } from "firebase/firestore";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import {
        collection,
        getDocs,
        doc,
        updateDoc,
        getDoc,
    } from "firebase/firestore";

    const db = getFirestore(firebaseApp);
    export default {
        props: ["requestID"],
        data() {
            return {
                jobID: "",
                custName: "",
                idName: "",
                idEmail: "",
                description: "",
                services: [],
                rating: 3,
                review: "",
                status: "",
                dataLoaded: false,
            };
        },
        methods: {
            goRequest() {
                this.$router.push("/jobrequest");
            },

            async updateReview() {
                await updateDoc(doc(db, "Job Requests", this.requestID), {
                    Rating: this.rating,
                    Review: this.review,
                    Status: "Reviewed",
                });
                this.goRequest();
            },

            async getJob() {
                const db = getFirestore(firebaseApp);
                const docRef = doc(db, "Job Requests", this.requestID);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log(docSnap.data());
                    this.description = docSnap.data().Details;
                    this.jobID = this.requestID;
                    this.idName = docSnap.data().DesignerName;
                    this.custName = docSnap.data().CustomerName;
                    this.services = docSnap.data().Services;
                    this.status = docSnap.data().Status;
                    this.idEmail = docSnap.data().DesignerEmail;
                }
            },
        },
        created() {
            console.log(this.requestID, "cREATED");
        },
        mounted() {
            console.log(this.requestID, "Mounted");
            this.getJob();
            this.dataLoaded = true;
        },
    };
</script>

<style scoped>
    v-text-area {
        width: 50%;
    }

    button {
        background-color: #3aafa9;
        border: 2px solid #3aafa9;
        transition-duration: 0.4s;
    }

    button:hover {
        background-color: white;
    }
</style>
