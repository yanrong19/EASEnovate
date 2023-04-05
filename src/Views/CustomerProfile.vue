<template>
    <SideBar2 />
    <div class="mainContainer">
        <DisplayCustomer />
    </div>
</template>

<script>
    import DisplayCustomer from "../components/DisplayCustomer.vue";
    import SideBar2 from "../components/SideBar2.vue";
    export default {
        components: { SideBar2, DisplayCustomer },
        created: function () {
            document.body.style.backgroundColor = "#c6eeec";
        },
        destroyed: function () {
            document.body.style.backgroundColor = null;
        },
    };
</script>

<style scoped></style>
