<template>
  <SideBar :menuList="menu" />
  <!-- <div>Home testing</div> -->
  <div v-if="dataLoaded">
    <!-- <div>{{ name }}</div>
    <div>{{ usertype }}</div> -->
  </div>

  <div v-else>Loading</div>
  <div style="height: 100vh"></div>
  <div style="height: 100vh"></div>
</template>

<script>
import { getDoc, doc } from "@firebase/firestore";
import firebaseApp from "../firebase";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import SideBar from "../components/SideBar.vue";

export default {
  data() {
    return {
      name: "",
      usertype: "",
      dataLoaded: false,
      menu: [
        {
          name: "Home",
          url: "/",
          id: 1,
        },
        {
          name: "Home2",
          url: "/",
          id: 2,
        },
      ],
    };
  },
  methods: {
    async getUserData(docRef) {
      const docSnap = await getDoc(docRef);
      return docSnap;
    },
    goCustomer() {
      this.$router.push("profile");
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
        this.dataLoaded = true;
      });
    });
  },
  unmounted() {
    console.log("unmounted");
  },
  components: { SideBar },
};
</script>
