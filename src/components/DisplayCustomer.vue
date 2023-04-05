<template>
    <div class="d-flex align-center flex-column">
        <v-card width="70%" class="mx-auto">
            <v-card-item>
                <h1>Your Profile</h1>
            </v-card-item>
            <v-card-actions>
                <v-spacer />
                <v-avatar color="info" size="100">
                    <v-icon icon="mdi-account-circle" size="100"> </v-icon>
                </v-avatar>
                <v-spacer />
            </v-card-actions>
            <v-card-item>
                <v-card-title co> Name </v-card-title>
                <v-card-subtitle> {{ name }} </v-card-subtitle>
            </v-card-item>
            <v-card-item>
                <v-card-title> Email Address </v-card-title>
                <v-card-subtitle> {{ email }} </v-card-subtitle>
            </v-card-item>
            <v-card-item>
                <v-card-title> Contact Number </v-card-title>
                <v-card-subtitle> {{ contact }} </v-card-subtitle>
            </v-card-item>
            <v-card-item>
                <v-card-title> Service Preferences </v-card-title>
                <div id="list">
                    <!-- <v-hover>
                        <v-list
                            :items="services"
                            variant="outlined"
                            hover
                        ></v-list
                    ></v-hover>-->
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
            <v-card-actions>
                <v-spacer />
                <v-btn variant="outlined" @click.native="editDetails">
                    Update Profile
                    <v-icon end icon="mdi-account-edit"></v-icon>
                </v-btn>
                <v-spacer />
            </v-card-actions>
        </v-card>
        <v-btn variant="outlined" @click.native="goReview">Review Page</v-btn>
        <v-btn variant="outlined" @click.native="goRequests"
            >Requests Page</v-btn
        >
    </div>
</template>

<script>
    import { getDoc, doc } from "@firebase/firestore";
    import firebaseApp from "../firebase";
    import { getAuth, onAuthStateChanged } from "@firebase/auth";
    import { getFirestore } from "@firebase/firestore";

    export default {
        data() {
            return {
                name: "",
                usertype: "",
                services: [],
                email: "",
                contact: "",
                dataLoaded: false,
            };
        },
        methods: {
            async getUserData(docRef) {
                const docSnap = await getDoc(docRef);
                return docSnap;
            },
            editDetails() {
                this.$router.push("profile/edit");
            },
            goReview() {
                this.$router.push("/review");
            },
            goRequests() {
                this.$router.push("/profile/jobrequest");
            },
        },
        beforeCreate() {
            console.log("beforecreate");
        },
        created() {
            console.log("created");
        },
        beforeMount() {
            const auth = getAuth();
            // auth state listener to know if authentication changes and so that uid wont be undefined
            onAuthStateChanged(auth, (user) => {
                const uid = user.uid;
                const db = getFirestore(firebaseApp);
                const docRef = doc(db, "users", uid);
                const docSnap = this.getUserData(docRef);
                docSnap.then((data) => {
                    console.log(data.data());
                    this.name = data.data().name;
                    this.usertype = data.data().usertype;
                    this.email = data.data().email;
                    this.contact = data.data().contact;
                    this.services = data.data().Services;
                    this.dataLoaded = true;
                });
            });
        },
        unmounted() {
            console.log("unmounted");
        },
    };
</script>

<style scoped>
    h2 {
        padding-left: 1rem;
    }

    button {
        background-color: #3aafa9;
        border: 2px solid #3aafa9;
        transition-duration: 0.4s;
    }

    button:hover {
        background-color: white;
    }
    .detailContainer {
        padding: 15px;
    }
</style>
