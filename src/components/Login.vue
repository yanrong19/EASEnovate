<template>
  <div class="fullContainer">
    <v-form ref="loginForm" @submit.prevent="submitForm">
      <div class="container">
        <div>
          <div class="logincontainer">
            <div>
              <v-icon size="large" icon="mdi-login"></v-icon>
            </div>

            <div>
              <h1>Login</h1>
            </div>
          </div>
        </div>

        <label for="email-login"> Email</label>
        <input
          id="email-login"
          type="text"
          v-model="email"
          placeholder="Enter Email"
          required="true"
        />
        <label for="password-login">Password </label>
        <input
          id="password-login"
          type="password"
          v-model="password"
          placeholder="Enter password"
          required="true"
        />
      </div>
      <v-row>
        <v-btn block type="submit" color="primary">Login</v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import router from "../router/index.js";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    submitForm() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("signed in");
          this.$refs.loginForm.reset();
          this.$router.push("home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Invalid Email or Password");
        });
    },
  },
};
</script>

<style scoped>
form {
  border: 1px black solid;
  width: 20vw;
  height: 50vh;
  background-color: rgb(216, 223, 221);
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.16);
  overflow: scroll;
}
.logincontainer {
  display: flex;
  width: 20vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container {
  padding: 16px;
  background-color: rgb(216, 223, 221);
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

button {
  transition-duration: 0.4s;
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
  background: #f1f1f1;
  border-color: #4caf50;
  border: 2px solid #ccc;
  border-color: #106241;
}

.loginForm {
  margin-left: 10px;
}

h1 {
  color: rgb(34, 115, 88);
}
</style>
