<template>
    <v-card style="z-index: 99">
        <v-layout>
            <v-navigation-drawer expand-on-hover rail app>
                <v-list>
                    <v-list-item
                        prepend-avatar="https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"
                        :title="name"
                        :subtitle="email"
                    ></v-list-item>
                </v-list>

                <v-divider></v-divider>
                <!-- 
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :title="item.title"
          subtitle="..."
        ></v-list-item> -->

                <v-list density="default" nav>
                    <v-list-item
                        prepend-icon="mdi-account"
                        title="Profile"
                        value="profile"
                        href="/profile"
                    ></v-list-item>
                    <v-list-item
                        prepend-icon="mdi-home"
                        title="Home"
                        value="home"
                        href="/home"
                    ></v-list-item>
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
                        href="/login"
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
