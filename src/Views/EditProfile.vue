<template>
    <div><SideBar2 /></div>
    <!-- View Conditionally renders customer or interior designer components
    for editing customer profile or interior designer portfolio.
    Determines whether user type data from mounting is customer or interior designer -->
    <div v-if="usertype == 'Customer'"><EditCustomer /></div>
    <div v-else-if="usertype == 'Interior Designer'"><EditID /></div>
</template>

<script>
    import EditCustomer from "../components/EditCustomer.vue";
    import EditID from "../components/EditID.vue";
    import { getDoc, doc } from "@firebase/firestore";
    import firebaseApp from "../firebase";
    import { getAuth, onAuthStateChanged } from "@firebase/auth";
    import { getFirestore } from "@firebase/firestore";
    import SideBar2 from "../components/SideBar2.vue";
    export default {
        components: { SideBar2, EditCustomer, EditID },
        created: function () {
            document.body.style.backgroundColor = "#c6eeec";
        },
        destroyed: function () {
            document.body.style.backgroundColor = null;
        },
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
            // Takes a documentSnapshot of Firebase document of user to be used to populate
            // data view
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
        beforeMount() {
            // Before Mounting, website retrieves user authentication data from Firestore firebase
            // to populate the user data for data prop. Used to conditionally render ID or customer view
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
                console.log(" User Type Test");
            });
        },
        unmounted() {
            console.log("unmounted");
        },
    };
</script>

<style scoped>
    body {
        background-color: #c6eeec;
    }
</style>
