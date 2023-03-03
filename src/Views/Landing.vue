<template>
  <button v-on:click="enter">Try me</button>
</template>

<script>
export default {
  methods: {
    enter() {
      this.$router.push({ name: "Start" });
    },
  },
};
</script>

<style></style>
