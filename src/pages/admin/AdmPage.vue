<template>
  <TitlePage title="Controle de Acesso" icon="fa-solid fa-screwdriver-wrench" />
  <q-page padding>
    <div class="q-pa-md">
      <q-tabs
        no-caps
        v-model="tab"
        class="text-teal q-pa-md"
        align="left"
        inline-label
      >
        <q-tab no-caps name="user" icon="manage_accounts" label="Usuários" />
        <q-tab no-caps name="permissions" icon="lock_open" label="Permissões" />
        <q-tab no-caps name="roles" icon="group" label="Grupos de Acesso" />
      </q-tabs>
      <q-separator />

      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="jump-up"
        transition-next="jump-up"
      >
        <q-tab-panel name="user">
          <UserList />
        </q-tab-panel>
        <q-tab-panel name="permissions">
          <RoleDetail />
        </q-tab-panel>

        <q-tab-panel name="roles">
          <RoleList @detailRole="detailRole" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import UserList from "src/pages/users/UserList.vue";
import RoleList from "src/pages/roles/RoleList.vue";
import TitlePage from "src/layouts/TitlePage.vue";
import RoleDetail from "../roles/RoleDetail.vue";
import { useRoute } from "vue-router";

export default {
  name: "AdmPage",
  components: { UserList, RoleList, TitlePage, RoleDetail, RoleDetail },

  setup() {
    const route = useRoute();
    const tab = ref("user");
    const currentRole = ref(null);

    onMounted(() => {
      if (route.params.tabActive) {
        tab.value = route.params.tabActive;
      }
    });

    return {
      tab,
      route,
      currentRole,

      detailRole(n, id) {
        tab.value = n;
        currentRole.value = id;
      },
    };
  },
};
</script>
