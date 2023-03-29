<template>
    <center>
        <div class="mainContainer">
            <h2>Your Profile</h2>
            <div class="detailContainer">
                <h3>Name</h3>
            </div>
            <div class="userInfo">{{ name }}</div>
            <!-- <div class="detailContainer"><h3>Type of User</h3></div>
            <div class="userInfo">{{ usertype }}</div> -->
            <div class="detailContainer"><h3>Email Address</h3></div>
            <div class="userInfo">{{ email }}</div>
            <div class="detailContainer"><h3>Contact Number</h3></div>
            <div class="userInfo">{{ contact }}</div>
            <div class="detailContainer"><h3>Looking For</h3></div>
            <div class="userInfo">
                <ul>
                    <li v-for="item in services">{{ item }}</li>
                </ul>
            </div>
            <br /><br />
            <div class="buttonContainer">
                <button @click="editDetails">Edit Information</button>
            </div>
        </div>
    </center>
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

    h3 {
        margin: 0;
    }

    .detailContainer {
        padding: 15px;
    }

    .userInfo {
        padding-bottom: 10px;
        background-color: azure;
        text-align: center;
        border-radius: 5px;
        width: 20em;
        padding: 10px;
    }

    ul {
        margin: 0px;
        text-align: left;
        display: inline-block;
        padding: 0px;
    }
</style>
