<script>
    import DisplayID from "../components/DisplayID.vue";
    import SideBar2 from "../components/SideBar2.vue";

    export default {
        components: {
            SideBar2,
            DisplayID,
        },
        created: function () {
            document.body.style.backgroundColor = "#c6eeec";
        },
        destroyed: function () {
            document.body.style.backgroundColor = null;
        },
        data() {
            return {
                profile: [],
                dataLoaded: true,
            };
        },

        beforeMount() {
            console.log("before mount in display id view");
        },
        mounted() {
            console.log("mounted in display id view trying twice");
            console.log(this.$route);
            this.profile = this.$route.params.profile;
            console.log(this.profile);
            console.log("in display ID view");
        },
    };
</script>
<template>
    <!-- Used for ID Portfolio view, routed from the home page
    Passes props in to generate a view of the selected ID -->
    <div class="mainContainer">
        <div class="sideBar">
            <SideBar2 />
            <div v-if="dataLoaded"></div>

            <div v-else>Loading</div>
            <div style="height: 100vh"></div>
            <div style="height: 100vh"></div>
        </div>
        <div class="displayID">
            <!-- Prop is a JSON String object containing idname, idemail,ratings,reviews, requests
            past projects -->
            <DisplayID :profile="profile" />
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
