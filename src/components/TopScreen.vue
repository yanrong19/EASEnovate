<template>
    <div>
        <!-- Component to render both sidebars and top navbars for home page
        Sidebar is basically SideBar2 and allows for navigation to profile, home, jobs page and logout -->
        <v-app-bar color="secondary" class="flex-grow-0" app dark>
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <v-app-bar-title>EASENOVATE</v-app-bar-title>
        </v-app-bar>
        <v-navigation-drawer app v-model="drawer">
            <v-list dense nav>
                <v-list-item
                    prepend-avatar="https://www.lightsong.net/wp-content/uploads/2020/12/blank-profile-circle.png"
                    :title="name"
                    :subtitle="email"
                ></v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list density="compact" nav>
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
    </div>
</template>

<script>
    import SideBar2 from "../components/SideBar2.vue";
    import { getDoc, doc } from "@firebase/firestore";
    import firebaseApp from "../firebase";
    import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
    import { getFirestore } from "@firebase/firestore";

    export default {
        components: { SideBar2 },
        data() {
            return {
                name: "",
                usertype: "",
                services: [],
                email: "",
                contact: "",
                dataLoaded: false,
                drawer: false,
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
            console.log("hi");
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

<style>
    .header {
        font-family: cursive;
        font-size: 15px;
        position: fixed;
        top: 0;
        left: 0;
        width: 98vw;
        height: 10vh;
        display: flex;
        background-image: linear-gradient(
            to bottom,
            rgba(122, 221, 203, 1),
            rgba(122, 221, 203, 0.3)
        );
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
    }

    .top {
        display: flex;
        align-items: center;
        color: #ffffff;
    }

    .top img {
        width: 50px;
        margin-right: 1rem;
    }

    .nav-toggle {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 3vh;
        width: 5vh;
        cursor: pointer;
        border: none;
        background-color: transparent;
    }

    .bar {
        width: 100%;
        height: 0.45vh;
        background-color: #ffffff;
        border-radius: 5px;
    }

    .image {
        width: 100%;
        padding-bottom: 5vh;
    }
    .image img {
        width: 100%;
    }
</style>
