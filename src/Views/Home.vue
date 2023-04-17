<template>
    <!--Home page of application that holds TopScreen and ProfileCards, shows a list of card views
    of all the interior designers in our database -->
    <div>Loading</div>
    <div v-if="dataLoaded">
        <div class="home">
            <v-app>
                <TopScreen />
                <div class="profile">
                    <ProfileCards />
                </div>
            </v-app>
        </div>
    </div>
</template>

<script>
    import { getDoc, doc } from "@firebase/firestore";
    import firebaseApp from "../firebase";
    import { getAuth, onAuthStateChanged } from "@firebase/auth";
    import { getFirestore } from "@firebase/firestore";
    import TopScreen from "../components/TopScreen.vue";
    import ProfileCards from "../components/ProfileCards.vue";
    import SideBar2 from "../components/SideBar2.vue";

    export default {
        components: { TopScreen, ProfileCards, TopScreen, SideBar2 },
        data() {
            return {
                name: "",
                usertype: "",
                dataLoaded: false,
            };
        },
        methods: {
            async getUserData(docRef) {
                const docSnap = await getDoc(docRef);
                return docSnap;
            },
            goCustomer() {
                this.$router.push("profile");
            },
        },
        beforeCreate() {
            console.log("beforecreate");
        },
        created() {
            console.log("created");
        },
        beforeMount() {
            // Function to instantiate the UserID to populate the views
            console.log("before mount");
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
                    this.dataLoaded = true;
                });
            });
        },
        mounted() {
            console.log("mounted in home");
        },
        unmounted() {
            console.log("unmounted");
        },
    };
</script>

<style scoped>
    .home {
        background-color: #f1f2f3;
    }
    .profile {
        padding-top: 7vw;
    }
</style>
