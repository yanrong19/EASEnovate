<template>
    <div> <h2> Customer Profile Page </h2> </div>
    <div> Name: {{ name }} </div>
    <div> Type of User: {{ usertype }} </div>
    <div> Email Address: {{ email }} </div>
    <div> Contact Number: {{ contact }} </div>
    <div> Services Provided: </div>
    <li v-for="item in services"> {{ item }} </li>
    <br><br>
    <button @click="editDetails"> Edit Information </button>
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