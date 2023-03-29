<template>
    <div class="mainContainer">
        <DisplayCustomer />
    </div>
</template>

<script>
    import DisplayCustomer from "../components/DisplayCustomer.vue";
    export default {
        components: { DisplayCustomer },
        created: function () {
            document.body.style.backgroundColor = "#c6eeec";
        },
        destroyed: function () {
            document.body.style.backgroundColor = null;
        },
    };
</script>

<style scoped></style>
