<script>
    import DisplayID from "../components/DisplayID.vue";
    import SideBar2 from "../components/SideBar2.vue";
    import CloudImage from "../components/CloudImage.vue";
    import CloudImage2 from "../components/CloudImage2.vue";
    import ProjImage from "../components/ProjImage.vue";

    export default {
        components: {
            SideBar2,
            DisplayID,
            CloudImage,
            CloudImage2,
            ProjImage
        },
        data() {
            return {
                profile: [],
            };
        },
        mounted() {
            this.profile = this.$route.params.profile;
        },
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
