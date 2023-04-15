<script>
    import DisplayID2 from "../components/DisplayID2.vue";
    import SideBar2 from "../components/SideBar2.vue";

    export default {
        components: {
            SideBar2,
            DisplayID2,
        },
        created: function () {
            document.body.style.backgroundColor = "#c6eeec";
        },
        destroyed: function () {
            document.body.style.backgroundColor = null;
        },
        data() {
            return {
            };
        },

        beforeMount() {
            console.log("before mount in display id view");
        },
        mounted() {
        },

        //   methods: {
        //     links: function () {
        //       console.log("in links ");
        //       console.log(this.$route); // should work
        //     },
        //   },
    };
</script>
<template>
    <div class="mainContainer">
        <div class="sideBar">
            <SideBar2 />
            <!-- <div>Home testing</div> -->
            <div v-if="dataLoaded">
                <!-- <div>{{ name }}</div>
    <div>{{ usertype }}</div> -->
            </div>

            <div v-else>Loading</div>
            <div style="height: 100vh"></div>
            <div style="height: 100vh"></div>
        </div>
        <div class="displayID">
            <DisplayID2/>
        </div>
    </div>
</template>
<style scoped>
    .sidebar {
        display: grid;
        grid-row-start: 1;
        grid-row-start: 1;
        grid-column-end: 1;
        position: left;
    }

    .displayID {
        display: grid;
        grid-row-start: 2;
        grid-row-start: 2;
        position: center;
    }

    .mainContainer {
        display: grid;
    }
</style>
