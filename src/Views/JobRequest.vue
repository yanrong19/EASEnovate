<script>
    import JobRequest from "../components/JobRequest.vue";
    import SideBar2 from "../components/SideBar2.vue";
    export default {
        components: {
            SideBar2,
            JobRequest,
        },
        created: function () {
            document.body.style.backgroundColor = "#c6eeec";
        },
        destroyed: function () {
            document.body.style.backgroundColor = null;
        },
    };
</script>
<template>
    <!-- Renders the component to display the list of job requests pertaining to the user -->
    <div><SideBar2 /></div>
    <div>
        <JobRequest />
    </div>
</template>
<style scoped></style>
