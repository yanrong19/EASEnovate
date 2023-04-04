<template>
  <div>
    <form ref="registerForm" @submit.prevent="submitForm">
      <div class="container">
        <div>
          <div class="registercontainer">
            <div>
              <v-icon size="large" icon="mdi-account-edit"></v-icon>
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
      <br />
      <v-row>
        <v-btn block type="submit" color="primary">Register</v-btn>
      </v-row>
    </form>
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
    };
  },
  methods: {
    submitForm() {
      const db = getFirestore(firebaseApp);
      const auth = getAuth();
      console.log(this.email);
      console.log(this.password);
      console.log(this.usertype);
      console.log("form submitted");

      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const userDoc = doc(db, "users", auth.currentUser.uid);
          setDoc(userDoc, {
            name: this.name,
            email: this.email,
            usertype: this.usertype,
          });
          const user = userCredential.user;
          console.log(user);
          console.log("Registered");
          this.$refs.registerForm.reset();
        })
        .catch((error) => {
          console.log(error);
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
  overflow: scroll;
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
