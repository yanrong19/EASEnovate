<template>
  <img style="height: 8%; width:15%; border-radius:40% ;" :src="url" alt="" />
</template>

<script>
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import {getAuth, onAuthStateChanged} from "firebase/auth"
export default {
  props:["profile"],
  data: () => {
    return {
      user:false,
      email:"",
      url: "https://via.placeholder.com/500x500",
      link:""

    };
  },
  async mounted() {
      const auth = getAuth();
      const user = auth.currentUser;
      onAuthStateChanged(auth, async (user) =>  {
          if (user) {
              console.log(this.profile)
              this.email = JSON.parse(this.profile).email;
              this.link = String(`folder/${this.email}.png`);
              await getDownloadURL(ref(storage, this.link)).then(
                  (download_url) => (this.url = download_url)
              );
          }
      });

  },
};
</script>
