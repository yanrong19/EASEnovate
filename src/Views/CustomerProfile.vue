<template>
    <div class="mainContainer">
        <h2>Customer Profile</h2>
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
        padding-left: 2rem;
    }
</style>
