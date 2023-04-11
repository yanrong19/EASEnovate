<template>
  <img style="height: 20vh" :src="url" alt="" />
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
    await getDownloadURL(ref(storage, this.path)).then(
      (download_url) => (this.url = download_url)
    );
  },
};
</script>
