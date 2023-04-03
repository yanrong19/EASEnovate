<template>
    <v-btn @click.native="enter">Try me</v-btn>
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

<style scoped></style>
