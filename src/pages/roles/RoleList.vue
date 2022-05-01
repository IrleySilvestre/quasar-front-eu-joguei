<template>
  <div class="row">
    <q-table
      class="col-xs-12 col-sm-10 col-lg-8"
      :rows="roles"
      :columns="columns"
      row-key="id"
      :filter="filter"
      binary-state-sort
      no-data-label="Nao ha grupo cadastrada"
    >
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
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn
              size="sm"
              class="glossy"
              round
              color="secondary"
              icon="edit"
              @click="editRole(props.row.id)"
            />
            <q-btn
              size="sm"
              round
              color="negative"
              icon="delete"
              @click="removeRole(props.row)"
            />
            <q-btn
              size="sm"
              round
              color="info"
              icon="loupe"
              @click="detailRole(props.row)"
            />
          </div>

          <div class="my-table-details">
            {{ props.row.details }}
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import roleServices from "../../services/roleServices";

export default defineComponent({
  name: "RoleList",
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const { listAll, remove, listById } = roleServices();
    const roles = ref([]);

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
        name: "description",
        label: "Descrição",
        field: "description",
        sortable: true,
        align: "left",
      },
      { name: "action", label: "#", field: "action", align: "right" },
    ];

    const getRoles = async () => {
      try {
        roles.value = await listAll();
      } catch (error) {
        $q.notify({
          type: "negative",
          message: "Erro ao consultar",
        });
      }
    };

    const detailRole = async (row) => {
      try {
        const form = {
          id: row.id,
          name: row.name,
          description: row.description,
        };
        roles.value = await listById(form.id);
        console.log("detalhar", form);
      } catch (error) {
        $q.notify({
          type: "negative",
          message: "Erro ao detalhar",
        });
      }
    };

    const editRole = (id) => {
      console.log("editando", id);
      // router.push({ name: "userEdit", params: { id } });
    };

    const removeRole = async (row) => {
      $q.dialog({
        title: "Exclusão",
        message: "Confirma exclusão",
        cancel: true,
      })
        .onOk(async () => {
          try {
            const form = {
              id: row.id,
              name: row.name,
              description: row.description,
            };
            await remove(form.id);

            $q.notify({
              message: "Sucesso",
              type: "positive",
              position: "top-right",
            });

            getRoles();
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

    onMounted(() => {
      getRoles();
    });

    return {
      filter: ref(""),
      columns,
      roles,
      router,
      editRole,
      removeRole,
      getRoles,
      detailRole,
    };
  },
});
</script>
