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
        async mounted() {
            this.requestID = this.$route.params.requestID;
            console.log(this.requestID, "View");
            this.dataLoaded = true;
        },
    };
</script>
<template>
    <div class="mainContainer" v-if="dataLoaded">
        <ReviewForm :requestID="requestID" />
    </div>
</template>

<style scoped></style>
