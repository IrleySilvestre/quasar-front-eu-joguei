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
        tick-strategy="leaf"
        @update:ticked="seleciona"
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
import userServices from "../../services/userServices";

export default {
  name: "RoleDetail",
  setup() {
    const $q = useQuasar();
    const options = ref([]);
    const roles = ref([]);
    const dbRoles = ref(null);
    const functionality = ref([]);
    const rolesPermissions = ref([]);

    const { listRolesPermissions, listAll } = roleServices();
    const { listUserByRole } = userServices();

    const getUsersRole = async (id_role) => {
      try {
        const usersRole = await listUserByRole(id_role);
        log(usersRole);
      } catch (error) {
        $q.notify({
          type: "negative",
          message: `Erro: ${error}`,
        });
      }
    };

    const getRoles = async () => {
      try {
        const listRoles = await listAll();
        dbRoles.value = listRoles;
        console.log(dbRoles.value[0].name);

        listRoles.forEach((element) => {
          roles.value.push(element.name);
        });
      } catch (error) {
        $q.notify({
          type: "negative",
          message: `Erro: ${error}`,
        });
      }
    };
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
      getRoles();

      getRolesPermissions();
      const lista = await listRolesPermissions();
      let novaLista = [];
      let numList = 0;

      let func = agruparFuncionalidade(lista, "funcionalidade");

      for (const key in func) {
        numList = numList + 1;
        if (Object.hasOwnProperty.call(func, key)) {
          let nameLabel = numList + " " + key;

          let item = { label: nameLabel, children: [] };
          const element = func[key];
          element.forEach((el, i) => {
            let nameChildren = numList + "." + (i + 1) + " " + el.acao;
            item.children[i] = { label: nameChildren, permissao: el.permissao };
          });
          novaLista.push(item);
        }
      }

      functionality.value = novaLista;
    });

    return {
      model: ref(null),
      roles,
      options,
      dbRoles,
      ticked: ref(null),
      expanded: ref(null),
      teal: ref(true),
      orange: ref(false),
      red: ref(true),
      cyan: ref(false),
      check1: ref(true),
      check2: ref(false),
      check3: ref(false),
      functionality,
      rolesPermissions,

      listAll,
      listUserByRole,
      agruparFuncionalidade,
      listRolesPermissions,
      getRolesPermissions,
      getRoles,
      getUsersRole,

      seleciona(target) {
        console.log(target);
      },

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
