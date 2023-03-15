<template>
    <div class="mainContainer">
        <h2>Customer Profile</h2>
        <Information />
        <!--<div class="container"><Information /></div>-->
    </div>
</template>

<script>
    import Information from "../components/Information.vue";
    export default {
        components: { Information },
    };
</script>

<style scoped>
    .mainContainer {
        background-color: rgb(239, 243, 242);
        /*text-align: left; */
    }

    h2 {
        padding-left: 2rem;
    }
</style>
