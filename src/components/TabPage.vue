<template>
  <div>
    <q-tabs v-model="tab" class="text-teal q-pa-md" align="left" inline-label>
      <q-tab name="user" icon="manage_accounts" label="Usuários" />
      <q-tab name="roles" icon="group_work" label="Grupos de Acesso" />
    </q-tabs>
    <q-separator />

    <q-tab-panels
      v-model="tab"
      animated
      transition-prev="jump-up"
      transition-next="jump-up"
    >
      <q-tab-panel name="user">
        <UserListTeste />
      </q-tab-panel>

      <q-tab-panel name="roles">
        <RoleList />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { ref } from "vue";
import UserListTeste from "src/pages/users/UserListTeste.vue";
import RoleList from "src/pages/roles/RoleList.vue";

export default {
  components: { UserListTeste, RoleList },
  setup() {
    return {
      tab: ref("user"),
      // splitterModel: ref(20),
    };
  },
};
</script>
