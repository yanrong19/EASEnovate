<template>
    <!--
    <div class="card">
        <div class="container">
            <p>{{ profile.companyName }}</p>
        </div>
    </div>
-->
    <div class="card">
        <v-card class="mx-auto" max-width="400" max-height="50%">
            <v-img class="align-end text-white" height="100%" cover>
                <CloudImage3 :path="this.idemailforprojpic" />
            </v-img>
            <v-card-title>{{ profile.name }}</v-card-title>
            <v-rating
                v-model="profile.rating"
                color="orange"
                readonly
                half-increments
            ></v-rating>

            <v-card-subtitle class="pt-4">
                {{ profile.email }}
            </v-card-subtitle>

            <v-card-text>
                <div>{{ profile.description }}</div>

                <div>
                    <v-chip
                        class="ma-1 mt-4"
                        color="secondary"
                        v-for="serv in profile.services"
                        :key="serv"
                    >
                        {{ serv }}
                    </v-chip>
                </div>
            </v-card-text>

            <v-card-actions>
                <v-btn
                    @click="shareProfile(profile)"
                    color="rgba(65, 117, 107, 1)"
                >
                    View More
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import CloudImage3 from "./CloudImage3.vue";
    export default {
        data() {
            return {
                idemailforprojpic: "",
            };
        },
        components: { CloudImage3 },
        props: ["profile"],
        mounted() {
            this.idemailforprojpic = String(
                `folder/${this.profile.email}_project.png`
            );
            console.log(this.idemailforprojpic);
        },
        methods: {
            shareProfile(companyProfile) {
                console.log("going to this company");
                console.log(JSON.stringify(companyProfile));
                this.$router.push({
                    name: "DisplayIDView",
                    params: { profile: JSON.stringify(companyProfile) },
                });
            },
        },
    };
</script>

<style scoped>
    .card {
        padding-left: 1vw;
        padding-right: 1vw;
        padding-top: 1vh;
        padding-bottom: 1vh;
        width: 30vw;
    }
</style>
