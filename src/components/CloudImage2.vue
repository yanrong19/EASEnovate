<template>
    <img style="height: 100%; width:100%; border-radius:40% ;" :src="url" alt="" />
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
        console.log(this.profile)
        if (this.profile !== undefined) {
            this.email = JSON.parse(this.profile).email;
            this.link = String(`folder/${this.email}.png`);
            await getDownloadURL(ref(storage, this.link)).then(
                    (download_url) => (this.url = download_url)
                );
        }
        // onAuthStateChanged(auth, async (user) =>  {
        //     if (user) {
        //         if (this.profile !== undefined ) {

        //             console.log(this.link)
        //             console.log("heree")
        //             if (this.link !== undefined) {

        //             }

        //         }

        //     }
        // });
  
    },
  };
  </script>
  