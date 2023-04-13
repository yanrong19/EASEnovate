<template>
  <!--
    <div class="card">
        <div class="container">
            <p>{{ profile.companyName }}</p>
        </div>
    </div>
-->
  <div class="card">
    <v-card class="mx-auto" max-width="400">
      <v-img
        class="align-end text-white"
        height="200"
        src="https://images-platform.99static.com//9w6j6Mz0QaUGaODZEd0S3Z7WkpY=/407x200:907x700/fit-in/500x500/99designs-contests-attachments/70/70543/attachment_70543787"
        cover
      >
        <v-card-title>{{ profile.name }}</v-card-title>
      </v-img>

      <v-card-subtitle class="pt-4">
        {{ profile.email }}
      </v-card-subtitle>

      <v-card-text>
        <div>{{ profile.description }}</div>

        <div>
          <v-chip
            class="ma-1 mt-4"
            color="secondary"
            v-for="serv in profile.services"
            :key="serv"
          >
            {{ serv }}
          </v-chip>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="shareProfile(profile)" color="rgba(65, 117, 107, 1)">
          View More
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["profile"],
  methods: {
    shareProfile(companyProfile) {
      console.log("going to this company");
      this.$router.push({
        name: "DisplayIDView",
        params: { profile: JSON.stringify(companyProfile) },
      });
    },
  },
};
</script>

<style>
.card {
  padding-left: 1vw;
  padding-right: 1vw;
  padding-top: 1vh;
  padding-bottom: 1vh;
  width: 30vw;
}
</style>
