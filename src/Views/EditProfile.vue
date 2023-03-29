<template>
    <EditCustomer />
</template>

<script>
    import EditCustomer from "../components/EditCustomer.vue";
    export default {
        components: { EditCustomer },
        created: function () {
            document.body.style.backgroundColor = "#c6eeec";
        },
        destroyed: function () {
            document.body.style.backgroundColor = null;
        },
    };
</script>

<style scoped>
    body {
        background-color: #c6eeec;
    }
</style>
