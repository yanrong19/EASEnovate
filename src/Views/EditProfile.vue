<template>
    <div class="mainContainer">
        <h2>Edit your Information</h2>
        <EditCustomer />
    </div>
</template>

<script>
    import EditCustomer from "../components/EditCustomer.vue";
    export default {
        components: { EditCustomer },
    };
</script>

<style scoped>
    h2 {
        padding-left: 2rem;
    }
</style>
