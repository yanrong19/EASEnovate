<template>
  <div>
    <form ref="loginForm" @submit.prevent="submitForm">
      <div class="container">
        <h1>Login</h1>
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
      <div class="btn">
        <button type="submit" class="loginForm">Login</button>
      </div>
    </form>
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
  /* border-left: 2px black solid; */
  width: 30vw;

  /* border-radius: 7%; */
  height: 60vh;
  background-color: rgb(211, 222, 220);
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.16);
}
.container {
  padding: 16px;
  width: 10vw;
  /* display: flex; */
  /* align-items: center; */
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

button {
  transition-duration: 0.4s;
  width: 70px;
}

button:hover {
  background-color: #4caf50; /* Green */
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
