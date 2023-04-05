<template>
    <div class="allContainer">
        <div
            style="
                 {
                    align-items: center;
                    justify-content: center;
                }
            "
        >
            <header>Easenovate</header>
            <p>Renovating with Ease</p>
        </div>

        <div class="mainContainer">
            <div class="container">
                <div class="login">
                    <Login />
                    <!-- <Login2 /> -->
                </div>
            </div>
            <div class="container">
                <div class="form">
                    <Form />
                </div>
            </div>
        </div>
        <br />
        <div>2023 All Rights Reserved</div>
    </div>
</template>

<script>
    import IconCommunity from "../components/icons/IconCommunity.vue";
    import Form from "../components/Form.vue";
    import Login from "../components/Login.vue";
    export default {
        components: { Form, Login, IconCommunity },
        created: function () {
            document.body.style.backgroundColor = "#c6eeec";
        },
        destroyed: function () {
            document.body.style.backgroundColor = null;
        },
    };
</script>

<style scoped>
    header {
        font-style: italic;
        font-family: "Times New Roman", Times, serif;
        font-size: 60px;
        text-shadow: 2px 2px #7addcb;
    }

    p {
        font-style: italic;
        font-family: "Times New Roman", Times, serif;
        font-size: 20px;
        margin-bottom: 20px;
    }
    .allContainer {
        width: 100vw;
        height: 100vh;
        background-color: #f6f6f6;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .mainContainer {
        background-color: #f6f6f6;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .logo {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
        margin-left: 100px;
    }
</style>
