<template>
  <q-layout view="lHh Lpr fff" shadow-2 rounded-borders>
    <q-header elevated>
      <q-toolbar class="bg-secondary">
        <q-btn
          v-if="!drawerRight"
          flat
          @click="drawerRight = !drawerRight"
          round
          dense
          icon="menu"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerRight"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="230"
      :breakpoint="500"
      bordered
      class="bg-secondary text-teal-1 text-bold"
    >
      <q-list>
        <q-item clickable @click="drawerRight = !drawerRight" exact>
          <q-item-section avatar>
            <q-icon name="menu" />
          </q-item-section>
        </q-item>
        <q-separator />
        <MainMenu v-for="link in menuLinks" :key="link.title" v-bind="link" />
        <q-separator />

        <q-item clickable :to="{ name: 'signin' }" exact>
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sair</q-item-label>
            <q-item-label caption>Encerrar</q-item-label>
          </q-item-section>
        </q-item>
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
    link: { name: "dashboard" },
  },
  {
    title: "Segurança",
    icon: "admin_panel_settings",
    caption: "Controle de Acesso",
    link: { name: "admPage" },
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    MainMenu,
    FooterLayout,
  },

  setup() {
    const drawerRight = ref(true);

    return {
      menuLinks: MenuList,
      drawerRight,
      miniState: ref(true),
    };
  },
});
</script>
