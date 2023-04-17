<template>
    <!-- Landing page for users -->
    <body>
        <p style="color: secondary">Easenovate</p>
        <hr />

        <div id="container3">
            <img src="/src/assets/landingpage.png" />
        </div>
        <h3>Stressed with your house renovation?</h3>

        <h2>There's a better way to renovate <br /></h2>
        <div id="container4" class="text-center">
            <!-- Routes users to the login/registration page -->
            <v-btn @click.native="enter" color="secondary"
                >Try Easenovate</v-btn
            >
        </div>
    </body>
</template>

<script>
    export default {
        methods: {
            enter() {
                this.$router.push({ name: "Start" });
            },
        },
    };
</script>

<style scoped>
    p {
        background-color: #7addcb;
        font-style: italic;
        font-family: "Times New Roman", Times, serif;
        font-size: 40px;
        text-shadow: 2px 2px #7addcb;
        text-align: center;
    }
    #container3 img {
        display: block;
        margin: 0 auto;
    }
    #container4 {
        margin-top: 60px;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    body {
        background-color: #f6f6f6;
        width: 100vw;
        height: 100vh;
    }
    h2 {
        margin-top: 20px;
        size: 100px;
        text-align: center;
        font-style: italic;
        text-decoration: underline;
    }
    h3 {
        margin-top: 20px;
        size: 100px;
        text-align: center;
        margin-bottom: 30px;
    }
    h4 {
        margin-top: 20px;
        size: 100px;
        text-align: center;
    }
    h5 {
        color: rgb(7, 0, 0);
        size: 300px;
        text-align: left;
    }
    h6 {
        color: rgb(7, 0, 0);
        size: 100px;
        text-align: left;
    }
</style>
