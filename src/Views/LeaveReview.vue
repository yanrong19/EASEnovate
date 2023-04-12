<script>
    import ReviewForm from "../components/ReviewForm.vue";
    export default {
        components: { ReviewForm },
        created: function () {
            document.body.style.backgroundColor = "#c6eeec";
        },
        destroyed: function () {
            document.body.style.backgroundColor = null;
        },
        data() {
            return {
                requestID: "",
                dataLoaded: false,
            };
        },

        // Instantiates component data with prop data
        async mounted() {
            this.requestID = this.$route.params.requestID;
            console.log(this.requestID, "View");
            this.dataLoaded = true;
        },
    };
</script>
<template>
    <!-- Passes the Request ID prop to child Review Form to render the 
        review form for specific job request -->
    <div class="mainContainer" v-if="dataLoaded">
        <ReviewForm :requestID="requestID" />
    </div>
</template>

<style scoped></style>
