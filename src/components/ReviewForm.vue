<template>
    <v-container>
        <div class="d-flex align-center flex-column">
            <!-- Review form that accepts prop job request ID from parent Leave Review Component 
        requestID is used to access firebase document to populate the job details-->
            <v-card width="80%">
                <v-card-item>
                    <h1 align="center">Leave a Review</h1>
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
                    <v-container margin="0" padding="0" align="center">
                        <v-row
                            ><v-col
                                ><v-sheet>
                                    <v-card-title>
                                        Interior Designer
                                    </v-card-title>
                                    <v-card-subtitle>
                                        {{ idName }} <b>{{ idEmail }}</b>
                                    </v-card-subtitle>
                                </v-sheet></v-col
                            ><v-col>
                                <v-sheet>
                                    <v-card-title> Customer </v-card-title>
                                    <v-card-subtitle>
                                        {{ custName }} <b>{{ custEmail }}</b>
                                    </v-card-subtitle>
                                </v-sheet></v-col
                            ></v-row
                        ></v-container
                    >
                </v-card-item>
                <v-card-item>
                    <v-card-title> Description </v-card-title>
                    <v-sheet
                        rounded
                        border="lg opacity-8"
                        color="grey-lighten-3"
                    >
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
                        <v-rating
                            v-model="rating"
                            hover
                            color="orange"
                        ></v-rating>
                        <v-spacer />
                    </v-card-actions>

                    <!-- Conditionally renders form for customer to fill in review if no review 
                has been submitted or Displays the previously submitted review on the job by the customer -->
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
                                {{ review }}
                            </p>
                        </v-sheet>
                    </v-container>

                    <!-- Conditionally renders button to submit the review if no review submitted or
                go back to the job request page if a review was submitted previously -->
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
            </v-card></div
    ></v-container>
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
                custEmail: "",
                custName: "",
                idName: "",
                idEmail: "",
                description: "",
                services: [],
                rating: 3,
                review: "",
                status: "",
                jobs: [],
                averageRating: 0,
                dataLoaded: false,
            };
        },
        methods: {
            async goRequest() {
                this.$router.push("/jobrequest");
            },
            async updateRatings() {
                let totalRating = 0;
                for (let i = 0; i < this.jobs.length; i++) {
                    const docRef2 = doc(db, "Job Requests", this.jobs[i]);
                    let jrs = await getDoc(docRef2);
                    let jr = jrs.data();
                    totalRating += jr.Rating;
                }
                try {
                    this.averageRating = totalRating / this.jobs.length;
                } catch {
                    this.averageRating = 0;
                }
                console.log(this.averageRating);
            },

            // Function used to submit the contents of the form and update the firebase job document
            async updateReview() {
                // Updates the job request document with the new input of reviews and ratings
                await updateDoc(doc(db, "Job Requests", this.requestID), {
                    Rating: this.rating,
                    Review: this.review,
                    Status: "Reviewed",
                });
                // Updates the ID portfolio to add a new pointer to a completed review of a job request
                const docRef = doc(db, "portfolio", this.idEmail);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    this.jobs = docSnap.data().requests;
                    this.jobs.push(this.jobID);
                }
                await this.updateRatings();
                await updateDoc(doc(db, "portfolio", this.idEmail), {
                    requests: this.jobs,
                    rating: this.averageRating,
                });
                this.goRequest();
            },

            //Function used to populate the data of the component for display using the requestID by
            // Fetching requests from Firebase
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
                    this.custEmail = docSnap.data().CustomerEmail;
                    this.services = docSnap.data().Services;
                    this.status = docSnap.data().Status;
                    this.idEmail = docSnap.data().DesignerEmail;
                    if (this.status == "Reviewed") {
                        this.review = docSnap.data().Review;
                        this.rating = docSnap.data().Rating;
                    }
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
