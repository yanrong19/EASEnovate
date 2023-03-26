<template>
    <div class="mainContainer">
        <h2>Profile</h2>
        <DisplayCustomer />
    </div>
</template>

<script>
    import DisplayCustomer from "../components/DisplayCustomer.vue";
    export default {
        components: { DisplayCustomer },
    };
</script>

<style scoped>
    h2 {
        padding-left: 1rem;
    }

    .mainContainer {
        background-color: #a8e7e3;
        padding-bottom: 10px;
    }
</style>
