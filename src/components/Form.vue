<template>
    <div>
        <!-- Registration form for new users
        Allows for input of profile name, unique email address, password
        and type of user -->
        <form ref="registerForm" @submit.prevent="submitForm">
            <div class="container">
                <div>
                    <div class="registercontainer">
                        <div>
                            <v-icon
                                size="large"
                                icon="mdi-account-edit"
                            ></v-icon>
                        </div>

                        <div>
                            <h1>Register</h1>
                        </div>
                    </div>
                </div>

                <label for="name"> Name</label>
                <input
                    id="name"
                    type="text"
                    v-model="name"
                    placeholder="Enter name"
                    required="true"
                />
                <label for="email"> Email</label>
                <input
                    id="email"
                    type="text"
                    v-model="email"
                    placeholder="Enter Email"
                    required="true"
                />
                <label for="password">Password </label>
                <input
                    id="password"
                    type="password"
                    v-model="password"
                    placeholder="Enter password"
                    required="true"
                />
                <div>
                    <input
                        type="radio"
                        id="ID"
                        name="usertype"
                        value="Interior Designer"
                        v-model="usertype"
                    />
                    <label for="ID">Interior Designer</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="Customer"
                        name="usertype"
                        value="Customer"
                        v-model="usertype"
                    />
                    <label for="Customer">Customer</label>
                </div>
            </div>
            <!-- <div class="btn">
        <button type="submit" class="registerForm">Register</button>
      </div> -->
            <br />
            <!-- <br /> -->
            <!-- <v-row> -->
            <v-btn block type="submit" color="primary">Register</v-btn>
            <!-- </v-row> -->
        </form>
        <!-- Snackbar to display alert for registration outcome, be it
        successful or error message to inform user -->
        <v-snackbar v-model="snackbar">
            {{ snackbarText }}
            <template v-slot:actions>
                <v-btn color="pink" variant="text" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
    import firebaseApp from "../firebase.js";
    import { Firestore, getFirestore } from "@firebase/firestore";
    import {
        collection,
        getDocs,
        doc,
        deleteDoc,
        setDoc,
    } from "@firebase/firestore";
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    export default {
        data() {
            return {
                name: "",
                email: "",
                password: "",
                usertype: "Customer",
                snackbar: false,
                snackbarText: "",
            };
        },
        methods: {
            submitForm() {
                // Submits the contents of registration form to register a new user
                // Creates a new firebase document inside the users collection
                // Generates a unique uid for firebase document using in built firebase/auth API
                const db = getFirestore(firebaseApp);
                const auth = getAuth();
                console.log(this.email);
                console.log(this.password);
                console.log(this.usertype);
                console.log("form submitted");

                // Attempts to create a new user using email and password
                // Checks whether account successfully registered
                // If successful,
                //      Updates the snackbar text and displays account successfully registered
                // Else,
                //      Updates the snackbar text and displays reason for failed registration
                createUserWithEmailAndPassword(auth, this.email, this.password)
                    .then((userCredential) => {
                        const userDoc = doc(db, "users", auth.currentUser.uid);
                        setDoc(userDoc, {
                            name: this.name,
                            email: this.email.toLowerCase(),
                            usertype: this.usertype,
                        });
                        const user = userCredential.user;
                        console.log(user);
                        console.log("Registered");
                        this.snackbar = true;
                        this.snackbarText = "Account Successfully Registered";
                        this.$refs.registerForm.reset();
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        console.log(errorCode);
                        this.snackbar = true;
                        // Updates snackbarText depending on auth error code
                        if (errorCode == "auth/weak-password") {
                            this.snackbarText =
                                "Password has to be longer than 6 characters";
                        } else if (errorCode == "auth/invalid-email") {
                            this.snackbarText = "Email Address is Invalid";
                        } else if (errorCode == "auth/email-already-in-use") {
                            this.snackbarText =
                                "Email Address is already in use";
                        }
                    });
            },
        },
    };
</script>

<style scoped>
    .registercontainer {
        display: flex;
        /* width: 30vw; */
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    h1 {
        color: rgb(34, 115, 88);
    }
    form {
        border: 1px black solid;
        width: 400px;
        /* border-radius: 7%; */
        height: 570px;
        background-color: rgb(216, 223, 221);
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.16);
        /* overflow: scroll; */
    }
    .container {
        padding: 16px;
        width: 400px;
    }

    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
    }

    button {
        transition-duration: 0.4s;
        /* width: 70px;
  height: 30px;
  border-style: solid;
  border-width: 1px;
  background-color: rgb(131, 131, 220); */
    }

    button:hover {
        color: white;
    }
    /* Full-width input fields */
    input[type="text"],
    input[type="password"] {
        width: 100%;
        padding: 15px;
        margin: 5px 0 22px 0;
        display: inline-block;
        border: 2px solid #ccc;
        border-color: #106241;
        background: #f1f1f1;
    }

    .registerForm {
        margin-left: 10px;
    }
</style>
