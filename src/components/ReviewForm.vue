<template>
    <div class="d-flex align-center flex-column">
        <v-card width="70%">
            <v-card-item>
                <h1>Leave a Review</h1>
            </v-card-item>
            <v-card-actions>
                <v-spacer />
                <v-img
                    src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                    alt="FUll"
                    max-width="40%"
                >
                </v-img>
                <v-spacer />
            </v-card-actions>
            <v-card-item>
                <v-card-title> Details </v-card-title>
                <v-sheet rounded border="lg opacity-12" color="grey-lighten-3">
                    <p class="mb-8">
                        This business determines the use of personal data
                        collectied on our media properties and across the
                        internet. We may collect data that you submit to us
                        directly or data that we collect automatically including
                        from cookies (such as device information or IP address).
                    </p></v-sheet
                >
            </v-card-item>
            <v-form>
                <v-card-item>
                    <v-card-title> Ratings </v-card-title>
                </v-card-item>
                <v-card-actions>
                    <v-spacer />
                    <v-rating v-model="rating" hover color="orange"></v-rating>
                    <v-spacer />
                </v-card-actions>

                <v-card-item>
                    <v-card-title> Write a review: </v-card-title>
                </v-card-item>
                <v-container>
                    <v-textarea bg-color="grey-lighten-3"> </v-textarea
                ></v-container>
                <v-card-actions>
                    <v-spacer />
                    <v-btn @click.native="goProfile">
                        Submit Review
                        <v-icon end icon="mdi-pencil-box-multiple"></v-icon
                    ></v-btn>
                    <v-spacer />
                </v-card-actions>
            </v-form>
        </v-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                jobID: "",
                uID: "",
                cID: "",
                description: "",
                status: "",
                rating: 3,
                review: "",
            };
        },
        methods: {
            goProfile() {
                this.$router.push("/profile");
            },
        },
    };
</script>

<style scoped>
    v-text-area {
        width: 50%;
    }

    button {
        background-color: #3aafa9;
        border: 2px solid #3aafa9;
        transition-duration: 0.4s;
    }

    button:hover {
        background-color: white;
    }
</style>
