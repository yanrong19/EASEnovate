<template>
    <div class="mainContainer">
        <ReviewForm />
    </div>
</template>

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
    };
</script>

<style scoped></style>
