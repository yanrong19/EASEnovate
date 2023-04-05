<template>
  <div>
    <!-- <div class="header">
      <div class="top">
        <img src="../assets/onlyLogo.png" alt="Logo" />
        <h2>EASENOVATE</h2>
      </div>
      <button class="nav-toggle">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
    <div class="image">
      <img src="../assets/homePageImg.png" alt="Full-width image" />
    </div> -->

    <v-app-bar color="secondary" class="flex-grow-0" app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>EASENOVATE</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer">
        <v-list dense nav>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-account"
            title="Account"
            value="account"
            href="/profile"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-home"
            title="Home"
            value="home"
            href="/home"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-wrench"
            title="Job"
            value="job"
          ></v-list-item>

          <v-divider></v-divider>
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            value="logout"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer> 
  </div>
</template>

<script>
import SideBar2 from "../components/SideBar2.vue";
export default {
  components : {SideBar2},
  data: () => ({
    drawer: false,
  }),
};
</script>

<style>
.header {
  font-family: cursive;
  font-size: 15px;
  position: fixed;
  top: 0;
  left: 0;
  width: 98vw;
  height: 10vh;
  display: flex;
  background-image: linear-gradient(
    to bottom,
    rgba(122, 221, 203, 1),
    rgba(122, 221, 203, 0.3)
  );
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.top {
  display: flex;
  align-items: center;
  color: #ffffff;
}

.top img {
  width: 50px;
  margin-right: 1rem;
}

.nav-toggle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 3vh;
  width: 5vh;
  cursor: pointer;
  border: none;
  background-color: transparent;
}

.bar {
  width: 100%;
  height: 0.45vh;
  background-color: #ffffff;
  border-radius: 5px;
}

.image {
  width: 100%;
  padding-bottom: 5vh;
}
.image img {
  width: 100%;
}
</style>
