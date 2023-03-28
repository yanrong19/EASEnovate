<template>
  <aside :class="expanded">
    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="toggleMenu">
        <span>
          <SideBarIcon />
        </span>
      </button>
    </div>

    <div :id="expanded" class="menu">
      <div class="link-to-page" v-for="item in menuList" :key="item.id">
        <router-link :to="item.url">
          <div>{{ item.name }}</div>
        </router-link>
      </div>
      <div class="bottom-aligner"></div>

      <div class="link-to-page logout">
        <router-link to="/">
          <div>Log out</div>
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script>
import SideBarIcon from "./icons/SideBarIcon.vue";
export default {
  name: "SideBar",
  data() {
    return {
      expanded: "not_expanded",
    };
  },
  methods: {
    toggleMenu() {
      console.log(this.expanded);
      if (this.expanded === "is_expanded") {
        this.expanded = "not_expanded";
      } else {
        this.expanded = "is_expanded";
      }
    },
  },
  props: ["menuList"],
  components: { SideBarIcon },
};
</script>

<style scoped>
button {
  border: none;
  cursor: pointer;
  background-image: url("../assets/menu.png");
  background-size: contain;
  width: 2rem;
  height: auto;
}
a {
  text-decoration: none;
}

.link-to-page:hover {
  background-color: #3aafa9;
}
.bottom-aligner {
  display: inline-block;
  height: 100%;
  vertical-align: bottom;
  width: 3px;
  background: red;
}

.is_expanded button {
  float: right;
  margin-left: 1px;
}
.menu-toggle-wrap {
  margin-left: 1rem;
  margin-top: 1rem;
}

.is_expanded {
  position: fixed;
  width: 10%;
  height: 100vh;
  background-color: #515a5a;
  transition: 0.5s ease-in-out;
}

.link-to-page {
  display: flex;
  margin-top: 3rem;
  background-color: aliceblue;
  border-right-color: #515a5a;
  border-right-width: 1px;
  border-right-style: solid;
  height: 2rem;
  text-align: center;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease-in-out;
  cursor: pointer;
}

/* .is_expanded > .menu {
  display: true;
} */

#not_expanded {
  display: none;
}
</style>
