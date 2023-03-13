<template>
    <div class="mainContainer">
        <h2>Customer Profile</h2>
        <div class="container"><Information /></div>
    </div>
</template>

<script>
    import Information from "../components/Information.vue";
    export default {
        components: { Information },
    };
</script>

<style scoped>
    .container {
        right: 0;
        position: relative;
        background-color: rgb(239, 243, 242);
    }
</style>
