<template>
    <v-container>
        <div class="d-flex align-center flex-column">
            <!-- Cardview to edit customer profile information
        Form only allows the customer to edit profile name, contact number
        and preferred services -->
            <v-card width="80%" class="mx-auto">
                <v-card-item>
                    <h1 align="center">Update Your Profile</h1>
                </v-card-item>
                <v-card-actions>
                    <v-spacer />
                    <v-avatar color="info" size="100">
                        <v-icon icon="mdi-account-circle" size="100"> </v-icon>
                    </v-avatar>
                    <v-spacer />
                </v-card-actions>
                <v-card-item>
                    <v-sheet class="mx-auto">
                        <v-form fast-fail ref="form">
                            <!-- Textfield has to be filled with minimum 3 characters to be a valid name -->
                            <v-text-field
                                v-model="name"
                                label="Profile Name"
                                :rules="nameRules"
                            ></v-text-field>
                            <!-- Textfield has to have input of 8 digits as we require a local Singaporean number -->
                            <v-text-field
                                v-model="contact"
                                type="number"
                                label="Contact Number"
                                :rules="contactRules"
                            ></v-text-field>
                            <!-- Multiselect for customers to indicate their current preferred services -->
                            <v-select
                                chips
                                v-model="services"
                                :items="allServices"
                                label="Select"
                                multiple
                                hint="Pick your preferred services"
                                persistent-hint
                            ></v-select>
                            <v-card-actions>
                                <v-spacer />
                                <!-- Button to go back to view profile view without modifying firebase collection -->
                                <v-btn @click.native="enter">
                                    Back
                                    <v-icon end icon="mdi-arrow-left"></v-icon
                                ></v-btn>
                                <!-- Button to submit the form and update the firebase collection with 
                                new customer profile data -->
                                <v-btn @click.native="submit">
                                    Save
                                    <v-icon
                                        end
                                        icon="mdi-account-check"
                                    ></v-icon
                                ></v-btn>
                                <v-spacer /> </v-card-actions
                        ></v-form>
                    </v-sheet>
                </v-card-item>
            </v-card>
        </div>
    </v-container>
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
                //requests: [],
                email: "",
                contact: "",
                dataLoaded: false,
                // Inbuilt rules for form submission for profile name and contact number
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
                    "Home Renovation and Interior Design",
                    "Living Room Renovation",
                    "Kitchen Renovation",
                    "Bathroom and Toilet",
                    "Bedroom",
                    "Exterior",
                    "Window",
                    "Roof Flooring and Tiling",
                    "Others",
                ],
            };
        },
        methods: {
            async getUserData(docRef) {
                const docSnap = await getDoc(docRef);
                return docSnap;
            },
            enter() {
                this.$router.push("/profile");
            },
            async submit() {
                // Function checks whether the form inputs are invalid
                // If valid, calls the savetofs() function which updates
                // the firebase collection
                const { valid } = await this.$refs.form.validate();
                if (valid) {
                    console.log("validated");
                    this.savetofs();
                } else {
                    console.log("notvalid");
                }
            },
            async savetofs() {
                // Function that attempts to update the firebase documents
                // with the new customer information
                try {
                    const db = getFirestore(firebaseApp);
                    const docRef = await setDoc(doc(db, "users", this.user), {
                        contact: this.contact,
                        name: this.name,
                        email: this.email,
                        usertype: this.usertype,
                        Services: this.services,
                        //Requests: this.requests,
                    });
                    alert("Profile Details Saved");
                    this.enter();
                } catch (error) {
                    console.error("Error Adding document:", error);
                }
            },
        },
        beforeMount() {
            // Before Mounting, website retrieves user authentication data from Firestore firebase
            // to populate the user data for data prop. Used to update the documents
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
                    //this.requests = data.data().Requests;
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
        background-color: #6b3fc8;
        border: 2px solid #6b3fc8;
        color: white;
        transition-duration: 0.4s;
    }

    button:hover {
        background-color: white;
        color: black;
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
