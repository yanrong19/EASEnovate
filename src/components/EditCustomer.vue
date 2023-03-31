<template>
    <div class="d-flex align-center flex-column">
        <h1>Update your Profile</h1>
        <v-card width="50%" class="mx-auto">
            <v-card-actions>
                <v-spacer />
                <v-avatar color="info" size="100">
                    <v-icon icon="mdi-account-circle" size="100"> </v-icon>
                </v-avatar>
                <v-spacer />
            </v-card-actions>
            <v-sheet class="mx-auto">
                <v-form fast-fail ref="form">
                    <v-text-field
                        v-model="name"
                        label="Profile Name"
                        :rules="nameRules"
                    ></v-text-field>
                    <v-text-field
                        v-model="contact"
                        type="number"
                        label="Contact Number"
                        :rules="contactRules"
                    ></v-text-field>
                    <v-select
                        v-model="services"
                        :items="allServices"
                        label="Select"
                        multiple
                        hint="Pick your preferred services"
                        persistent-hint
                    ></v-select>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn @click.native="enter">
                            Back <v-icon end icon="mdi-arrow-left"></v-icon
                        ></v-btn>
                        <v-btn @click.native="submit">
                            Save <v-icon end icon="mdi-account-check"></v-icon
                        ></v-btn>
                        <v-spacer /> </v-card-actions
                ></v-form>
            </v-sheet>
        </v-card>
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
                valid: true,
                name: "",
                usertype: "",
                services: [],
                email: "",
                contact: "",
                dataLoaded: false,
                nameRules: [
                    (value) => {
                        if (value?.length > 3) {
                            return true;
                        }
                        return "Profile Name must be atleast 3 Characters";
                    },
                ],
                contactRules: [
                    (value) => {
                        if (value?.length == 8) {
                            return true;
                        }
                        return "Contact Number must be Singaporean Number";
                    },
                ],
                allServices: [
                    "In-home Consultation",
                    "E-Design",
                    "Full-Service",
                    "Kitchen and Bathroom Design",
                    "Eco Design",
                    "Outdoor Living",
                    "Custom Furniture Design",
                    "Art Procurement and Curation",
                ],
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
            async submit() {
                const { valid } = await this.$refs.form.validate();
                if (valid) {
                    console.log("validated");
                    this.savetofs();
                } else {
                    console.log("notvalid");
                }
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
                    this.enter();
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
