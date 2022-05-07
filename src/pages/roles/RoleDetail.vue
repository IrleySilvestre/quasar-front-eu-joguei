<template>
  <div class="row">
    <div class="col-12 q-pb-md">
      <q-select
        outlined
        clearable
        v-model="model"
        label="Grupo de Acesso:"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="options"
        @filter="filterFn"
        style="width: 480px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">Sem resultado</q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>

    <div class="col-12 col-sm-6 q-pa-md shadow-9">
      <div class="text-h6 q-mb-md text-secondary">Permissões</div>
      <q-tree
        :nodes="functionality"
        v-model:ticked="ticked"
        v-model:expanded="expanded"
        node-key="label"
        tick-strategy="leaf-filtered"
        default-expand-all
      />
    </div>

    <div class="col-12 col-sm-6 q-pa-md shadow-9">
      <div class="text-h6 color text-secondary">Usuários</div>
      <div>
        <div v-for="tick in ticked" :key="`ticked-${tick}`">
          {{ tick }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { onMounted, ref } from "vue";
import roleServices from "../../services/roleServices";

export default {
  name: "RoleDetail",
  setup() {
    const $q = useQuasar();
    const options = ref([]);
    const roles = ref(["Administrador", "Vendas", "Master", "Gerente Vendas"]);
    const functionality = ref([]);
    const rolesPermissions = ref([]);

    const { listRolesPermissions } = roleServices();

    const getRolesPermissions = async () => {
      try {
        rolesPermissions.value = await listRolesPermissions();
      } catch (error) {
        $q.notify({
          type: "negative",
          message: `Erro: ${error}`,
        });
      }
    };

    const agruparFuncionalidade = (objtoArray, prop) => {
      return objtoArray.reduce((acc, obj) => {
        let key = obj[prop];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
    };

    onMounted(async () => {
      getRolesPermissions();
      const lista = await listRolesPermissions();

      let groupRolePermission = agruparFuncionalidade(lista, "funcionalidade");

      for (let i in groupRolePermission) {
        console.log(Object.keys(groupRolePermission));
      }

      console.log(groupRolePermission);

      functionality.value = [
        {
          label: "1 Gerenciar Usuários",
          children: [
            { label: "1.1 Listar" },
            { label: "1.2 Adicionar" },
            { label: "1.3 Editar" },
            { label: "1.4 Excluir" },
          ],
        },
        {
          label: "2 Gerenciar Grupos de Acesso",
          children: [
            { label: "2.1 Listar" },
            { label: "2.2 Adicionar" },
            { label: "2.3 Editar" },
            { label: "2.4 Excluir" },
          ],
        },
        {
          label: "3 Gerenciar Permissões",
          children: [
            { label: "3.1 Listar" },
            { label: "3.2 Adicionar" },
            { label: "3.3 Editar" },
            { label: "3.4 Excluir" },
          ],
        },
      ];
    });

    return {
      model: ref(null),
      roles,
      options,
      ticked: ref(["Pleasant surroundings"]),
      expanded: ref(["Good service (disabled node)"]),
      teal: ref(true),
      orange: ref(false),
      red: ref(true),
      cyan: ref(false),
      check1: ref(true),
      check2: ref(false),
      check3: ref(false),
      functionality,
      rolesPermissions,

      agruparFuncionalidade,
      listRolesPermissions,
      getRolesPermissions,

      filterFn(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase();
          options.value = roles.value.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
};
</script>
