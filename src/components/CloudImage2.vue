<template>
    <img style="height: 40vh" :src="url" alt="" />
  </template>
  
  <script>
  import { storage } from "../firebase";
  import { ref, getDownloadURL } from "firebase/storage";
  
  export default {
    props: {
      path: String,
    },
    data: () => {
      return {
        url: "https://via.placeholder.com/50x50",
      };
    },
    async mounted() {
      console.log(this.path);
      console.log("mounted for cloud image");
    },
    watch: {
      path: async function (newVal, oldVal) {
        // watch it
        console.log("Prop changed: ", newVal, " | was: ", oldVal);
        console.log("in watch for cloud image");
        console.log("this is for " + newVal);
        await getDownloadURL(ref(storage, newVal)).then(
          (download_url) => (this.url = download_url)
        );
      },
    },
  };
  </script>