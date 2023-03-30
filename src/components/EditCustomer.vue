<template>
    <div class="container">
        <h1>Edit your details</h1>
        <form id="myform">
            <div class="infoForm">
                <label for="name1">Displayed Name: </label>
                <input type="text" id="name1" required="" v-model="name" />
                <br /><br />
                <label for="contact1">Contact Number: </label>
                <input
                    type="number"
                    id="contact1"
                    required=""
                    v-model="contact"
                />
                <br />
                <br />
                Preferred Services:

                <div class="selectDiv">
                    <select id="multi-select" v-model="services" multiple>
                        <option value="Eco Design">Eco Design</option>
                        <option value="Outdoor Living">Outdoor Living</option>
                        <option value="Kitchen and Bathroom Design">
                            Kitchen and Bathroom Design
                        </option>
                        <option value="Custom Furniture Design">
                            Custom Furniture Design
                        </option>
                        <option value="Art Procurement and Curation">
                            Art Procurement and Curation
                        </option>
                    </select>
                </div>
            </div>
            <div class="save">
                <button @click="enter">Back</button>
                <button id="savebutton" type="button" @click="savetofs">
                    Save
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import { getDoc, doc, setDoc } from "@firebase/firestore";
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
            enter() {
                //this.$router.go(-1);
                this.$router.push("/profile");
            },
            async savetofs() {
                try {
                    const db = getFirestore(firebaseApp);
                    const docRef = await setDoc(doc(db, "users", this.user), {
                        contact: this.contact,
                        name: this.name,
                        email: this.email,
                        usertype: this.usertype,
                        Services: this.services,
                    });
                    alert("Profile Details Saved");
                    this.$router.go(-1);
                } catch (error) {
                    console.error("Error Adding document:", error);
                }
            },
        },
        beforeMount() {
            const auth = getAuth();
            // auth state listener to know if authentication changes and so that uid wont be undefined
            onAuthStateChanged(auth, (user) => {
                const uid = user.uid;
                this.user = user.uid;
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
    };
</script>

<style scoped>
    body {
        background-color: #c6eeec;
    }

    .infoForm {
        width: 55vw;
        height: auto;
        text-align: left;
        display: inline-block;
    }
    .save {
        margin-top: 1rem;
        text-align: auto;
    }

    button {
        margin: 0 2em 0 2em;
        background-color: #3aafa9;
        border: 2px solid #3aafa9;
        transition-duration: 0.4s;
    }

    button:hover {
        background-color: white;
    }

    .container {
        text-align: center;
        display: block;
    }

    input[type="number"] {
        width: 100%;
        padding: 15px;
        display: inline-block;
        background: #f1f1f1;
        border-color: #4caf50;
        border: 2px solid #ccc;
        border-color: #106241;
    }

    input[type="text"] {
        width: 100%;
        padding: 15px;
        display: inline-block;
        background: #f1f1f1;
        border-color: #4caf50;
        border: 2px solid #ccc;
        border-color: #106241;
    }

    select {
        width: 105%;
        padding: 15px;
        border-block-color: #106241;
        border-width: medium;
        display: grid;
        position: center;
    }
</style>
