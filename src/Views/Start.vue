<template>
  <div class="mainContainer">
    <!-- Insert our own icon -->
    <div class="logo">
      <!-- <h2>EASENOVATE</h2> -->
      <div><IconCommunity /></div>
    </div>
    <div class="container">
      <div class="form">
        <Form />
      </div>
      <div class="login">
        <Login />
      </div>
    </div>
  </div>
</template>

<script>
import IconCommunity from "../components/icons/IconCommunity.vue";
import Form from "../components/Form.vue";
import Login from "../components/Login.vue";
export default {
  components: { Form, Login, IconCommunity },
};
</script>

<style scoped>
.mainContainer {
  width: 100vw;
  height: 100vh;
  background-color: #3aafa9;
  /* display: flex; */
  /* align-items: center;
  justify-content: center; */
  position: relative;
}
.container {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  margin-right: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 40vw; */
  border-style: solid;
  border-width: 1px;
  padding: 2px;
  background-color: rgb(239, 243, 242);
}
.logo {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  margin-left: 100px;
}
</style>
