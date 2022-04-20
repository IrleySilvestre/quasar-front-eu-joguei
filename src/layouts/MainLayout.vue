<template>
  <q-layout view="hHh Lpr fff" shadow-2 rounded-borders>
    <q-header elevated>
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :width="200"
      :breakpoint="500"
      bordered
      class="bg-grey-3"
    >
      <q-list>
        <MainMenu v-for="link in menuLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <FooterLayout />
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import MainMenu from "src/components/MainMenu.vue";
import FooterLayout from "./FooterLayout.vue";

const MenuList = [
  {
    title: "Home",
    icon: "home",
    caption: "Pagina Inicial",
    link: { name: "home" },
  },
  {
    title: "Usuários",
    icon: "person",
    caption: "Gerenciar Usuários",
    link: { name: "user" },
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    MainMenu,
    FooterLayout,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      drawer: ref(false),
      menuLinks: MenuList,
      leftDrawerOpen,
      miniState: ref(true),
    };
  },
});
</script>
