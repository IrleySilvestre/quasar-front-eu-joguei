<template>
  <q-layout view="lHh Lpr fFf" shadow-2 rounded-borders>
    <q-header elevated>
      <q-toolbar class="bg-secondary">
        <q-btn
          v-if="!drawerLeft"
          flat
          @click="drawerLeft = !drawerLeft"
          round
          dense
          icon="menu"
        >
          <q-tooltip class="bg-secondary">Menu</q-tooltip>
        </q-btn>

        <q-space />

        <q-btn round flat class="q-mr-lg">
          <q-icon name="account_circle" size="2rem" />
          <q-tooltip class="bg-secondary text-bold">Perfil</q-tooltip>
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <div class="text-h6 q-mb-md">Perfil</div>

                <q-avatar size="75px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">
                  Irley Jose Silvestre
                </div>

                <q-separator inset class="q-mx-lg" />

                <div class="column">
                  <!-- <q-toggle v-model="mobileData" label="Use Mobile Data" />
                  <q-toggle v-model="bluetooth" label="Bluetooth" /> -->
                  <q-separator />
                </div>

                <q-btn
                  class="q-mt-md"
                  color="secondary"
                  icon="logout"
                  label="Sair"
                  push
                  size="sm"
                  v-close-popup
                  :to="{ name: 'signin' }"
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerLeft"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="230"
      :breakpoint="500"
      bordered
      class="bg-secondary text-teal-1 text-bold"
    >
      <q-list>
        <q-item clickable @click="drawerLeft = !drawerLeft" exact>
          <q-item-section avatar>
            <q-icon name="menu" />
          </q-item-section>
        </q-item>

        <q-separator />
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
    const drawerLeft = ref(true);
    const drawerRight = ref(true);

    return {
      menuLinks: MenuList,
      drawerLeft,
      miniState: ref(true),
      mobileData: ref(true),
      bluetooth: ref(false),
    };
  },
});
</script>
