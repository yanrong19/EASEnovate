<template>
    <!-- Landing Page for our Easenovate Application. Contains our website tagline and slogan
    as well as a button to be routed to the user authentication page for access to our website -->
    <body>
        <h1>Quality Renovations for lasting homes</h1>
        <hr />

        <div id="container3">
            <img src="/src/assets/landingpage.png" />
        </div>

        <h2>
            "It has been an amazing experience using Easenovate <br />
            I managed to find the best contractor and made my dream home <br />
            possible. Thank you Easenovate"
        </h2>
        <h3>Thomas, Easenovate Homeowner</h3>
        <div id="container4" class="text-center">
            <v-btn @click.native="enter" color="primary">Login</v-btn>
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
        created: function () {
            document.body.style.backgroundColor = "#c6eeec";
        },
        destroyed: function () {
            document.body.style.backgroundColor = null;
        },
    };
</script>

<style scoped>
    h1 {
        color: rgb(0, 13, 252);
        size: 300px;
        text-align: center;
    }
    #container3 img {
        display: block;
        margin: 0 auto;
    }
    #container4 {
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    h2 {
        color: rgba(7, 114, 94, 0.22);
        size: 100px;
        text-align: center;
    }
    h3 {
        color: rgba(7, 114, 94, 0.22);
        size: 100px;
        text-align: center;
        margin-bottom: 30px;
    }
    h4 {
        color: rgb(255, 100, 0);
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
