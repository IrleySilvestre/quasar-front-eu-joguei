<template>
  <div class="row">
    <q-table
      class="col-xs-12 col-sm-10 col-lg-8"
      :rows="users"
      :columns="columns"
      row-key="id"
      :filter="filter"
      binary-state-sort
      no-data-label="Não ha usuários cadastrados"
      no-results-label="Nenhum registro localizado"
    >
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn
              size="sm"
              class="glossy"
              round
              color="secondary"
              icon="edit"
              @click="editUser(props.row.id)"
            />
            <q-btn
              size="sm"
              class="glossy"
              round
              color="negative"
              icon="delete"
              @click="removeUser(props.row)"
            />
          </div>

          <div class="my-table-details">
            {{ props.row.details }}
          </div>
        </q-td>
      </template>
      <template v-slot:top>
        <q-btn
          color="secondary"
          icon="add_circle"
          label="Adicionar"
          :to="{ name: 'userAdd' }"
        />
        <q-space />
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
import { defineComponent, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import userServices from "../../services/userServices";

import { useRouter } from "vue-router";

export default defineComponent({
  name: "UserListTeste",
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
        label: "Nome",
        field: "name",
        sortable: true,
        align: "left",
      },
      {
        name: "email",
        label: "Email",
        field: "email",
        sortable: true,
        align: "left",
      },

      { name: "action", label: "#", field: "action", align: "right" },
    ];
    const router = useRouter();
    const users = ref([]);
    const $q = useQuasar();

    const { listAll, remove } = userServices();

    const getUsers = async () => {
      const notroles = false;
      try {
        users.value = await listAll(notroles);
      } catch (error) {
        $q.notify({
          type: "negative",
          message: "Erro ao consultar",
        });
      }
    };

    const removeUser = async (row) => {
      $q.dialog({
        title: "Exclusão",
        message: "Confirma exclusão",
        cancel: true,
      })
        .onOk(async () => {
          try {
            const form = { id: row.id, name: row.name, email: row.email };
            await remove(form.id);
            $q.notify({
              message: "Sucesso",
              type: "positive",
              position: "top-right",
            });
            getUsers();
          } catch (error) {
            $q.notify({
              type: "negative",
              message: "Erro ao excluir",
              position: "top-right",
            });
          }
        })
        .onCancel(() => {
          $q.notify({
            message: "Operação Cancelada",
            type: "positive",
            position: "top-right",
          });
        });
    };

    const editUser = (id) => {
      router.push({ name: "userEdit", params: { id } });
    };

    onMounted(() => {
      getUsers();
    });

    return {
      filter: ref(""),
      columns,
      users,
      removeUser,
      editUser,
      router,
    };
  },
});
</script>
