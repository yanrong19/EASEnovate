<template>
    <!-- SideBar for users to navigate to various pages in the application such as Profile, Home, Jobs and Logout
    Profile is conditionally rendered based on user type -->
    <v-card style="z-index: 99">
        <v-layout>
            <v-navigation-drawer expand-on-hover rail app>
                <v-list>
                    <v-list-item
                        prepend-avatar="https://www.lightsong.net/wp-content/uploads/2020/12/blank-profile-circle.png"
                        :title="name"
                        :subtitle="email"
                    ></v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list density="default" nav>
                    <!-- Directs to user to a different view depending on whether customer or interior designer
                Customer - DisplayCustomer component
                Interior Designer - DisplayID2 component -->
                    <v-list-item
                        prepend-icon="mdi-account"
                        title="Profile"
                        value="profile"
                        @click="shareProfile()"
                    ></v-list-item>
                    <v-list-item
                        prepend-icon="mdi-home"
                        title="Home"
                        value="home"
                        href="/home"
                    ></v-list-item>
                    <!-- Uses to firebase Auth to signout the user and routes them to the landing page -->
                    <v-list-item
                        prepend-icon="mdi-wrench"
                        title="Jobs"
                        value="jobs"
                        href="/jobrequest"
                    ></v-list-item>

                    <v-divider></v-divider>
                    <v-list-item
                        prepend-icon="mdi-logout"
                        title="Logout"
                        value="logout"
                        @click="logOut"
                    ></v-list-item>
                </v-list>
            </v-navigation-drawer>

            <!-- <v-main style="height: 100vh"></v-main> -->
        </v-layout>
    </v-card>
</template>

<script>
    import { getDoc, doc } from "@firebase/firestore";
    import firebaseApp from "../firebase";
    import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
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
            logOut() {
                const auth = getAuth();
                signOut(auth)
                    .then(() => {
                        this.$router.push("/");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            async shareProfile() {
                if (this.usertype == "Interior Designer") {
                    this.$router.push({ name: "DisplayID2" });
                } else {
                    this.$router.push({ name: "DisplayProfile" });
                }
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
