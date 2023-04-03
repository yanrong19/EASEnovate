<template>
    <SideBar :menuList="menu" />
    <!-- <div>Home testing</div> -->
    <div v-if="dataLoaded">
        <div class="home">
            <div>
                <div><TopScreen /></div>
            </div>
            <div>
                <div><ProfileCards /></div>
            </div>
        </div>
        <v-btn variant="outlined" @click.native="goCustomer"
            >Profile Page</v-btn
        >
        <!-- <div>{{ name }}</div>
    <div>{{ usertype }}</div> -->
    </div>

    <div v-else>Loading</div>
    <div style="height: 100vh"></div>
    <div style="height: 100vh"></div>
</template>

<script>
    import { getDoc, doc } from "@firebase/firestore";
    import firebaseApp from "../firebase";
    import { getAuth, onAuthStateChanged } from "@firebase/auth";
    import { getFirestore } from "@firebase/firestore";
    import TopScreen from "../components/TopScreen.vue";
    import ProfileCards from "../components/ProfileCards.vue";
    import SideBar from "../components/SideBar.vue";

    export default {
        components: { TopScreen, ProfileCards, TopScreen, SideBar },
        data() {
            return {
                name: "",
                usertype: "",
                dataLoaded: false,
                menu: [
                    {
                        name: "Home",
                        url: "/",
                        id: 1,
                    },
                    {
                        name: "DisplayID",
                        url: "/displayid",
                        id: 2,
                    },
                ],
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
        unmounted() {
            console.log("unmounted");
        },
    };
</script>

<style scoped>
    .home {
        background-color: #f1f2f3;
    }
</style>
