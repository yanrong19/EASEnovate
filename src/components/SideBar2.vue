<template>
  <v-card style = "z-index: 99;">
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>
        <!-- 
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :title="item.title"
          subtitle="..."
        ></v-list-item> -->

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

      <!-- <v-main style="height: 100vh"></v-main> -->
    </v-layout>
  </v-card>
</template>
