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
          <q-tooltip>Menu</q-tooltip>
        </q-btn>

        <q-space />

        <q-btn round flat @click="drawerRight = !drawerRight" class="q-mr-lg">
          <q-icon name="account_circle" size="2rem" />
          <q-tooltip>Account</q-tooltip>
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

    <q-drawer v-model="drawerRight" side="right">
      <!-- drawer content -->
      <q-card class="my-card bg-secondary text-teal-1 text-bold" bordered>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>Irley Jose Silvestre</q-item-label>
            <q-item-label class="text-teal-1 text-bold" caption>
              irleysilvestre.mba@gmail.com
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item clickable :to="{ name: 'signin' }" exact>
          <q-item-section class="text-right">
            <!-- <q-item-label caption>Encerrar</q-item-label> -->
            <q-item-label caption class="text-teal-1 text-bold"
              >Sair</q-item-label
            >
          </q-item-section>
          <q-item-section avatar class="q-mr-lg">
            <q-icon name="logout" />
          </q-item-section>
        </q-item>
      </q-card>
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
      drawerRight,
      miniState: ref(true),
    };
  },
});
</script>
