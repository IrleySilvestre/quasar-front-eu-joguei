<template>
  <div class="q-pa-md">
    <q-table
      :dense="$q.screen.lt.md"
      title="Users"
      :rows="users"
      :columns="columns"
      row-key="name"
      :filter="filter"
      no-data-label="Não ha usuários cadastrados"
      no-results-label="Nenhum registro localizado"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-weight-bold q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span> Opss... {{ message }} </span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";

export default {
  setup() {
    const columns = [
      {
        name: "id",
        label: "Código",
        field: "id",
        sortable: true,
        align: "left",
      },
      {
        name: "name",
        required: true,
        label: "Nome",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "email",
        align: "center",
        label: "Email",
        field: "email",
        sortable: true,
        align: "left",
      },

      { name: "action", label: "#", field: "action", align: "center" },
    ];
    const users = ref([]);
    const $q = useQuasar();
    $q.screen.setSizes({ sm: 300, md: 500, lg: 1000, xl: 2000 });

    const getUsers = async () => {
      try {
        const { data } = await api.get("/user/list");
        users.value = data.res;
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      getUsers();
    });

    return {
      filter: ref(""),
      columns,
      users,
    };
  },
};
</script>
<style>
.table-user {
  width: 780px;
  height: 380px;
}
</style>
