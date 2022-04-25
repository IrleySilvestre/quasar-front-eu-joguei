<template>
  <q-page padding>
    <TitlePage title="Usuários Cadastrados" icon="group" />
    <q-page-container class="row">
      <q-table
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
            color="primary"
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
    </q-page-container>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import userServices from "../../services/userServices";
import TitlePage from "src/layouts/TitlePage.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    TitlePage,
  },
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
    $q.screen.setSizes({ sm: 300, md: 500, lg: 1000, xl: 2000 });

    const { listAll, remove } = userServices();

    const getUsers = async () => {
      try {
        users.value = await listAll();
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
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
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
