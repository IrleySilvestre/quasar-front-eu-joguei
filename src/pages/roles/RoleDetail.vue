<template>
  <div class="row">
    <div class="col-12 q-pb-md">
      <q-select
        outlined
        clearable
        v-model="modelRole"
        label="Grupo de Acesso:"
        use-input
        fill-input
        hide-selected
        input-debounce="0"
        :options="optionsRole"
        @filter="filterRoles"
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
        <div class="flex items-center">
          <q-select
            outlined
            clearable
            v-model="modelUser"
            label="Adicionar:"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="optionsUser"
            @filter="filterUsers"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">Sem resultado</q-item-section>
              </q-item>
            </template>
          </q-select>
          <div>
            <q-btn
              :disable="isUserSelected"
              size="md"
              dense
              round
              color="secondary"
              icon="add"
              class="q-ml-md"
              @click="addRoleUser()"
            />
          </div>
        </div>

        <q-separator spaced />

        <q-list bordered padding separator>
          <q-item>
            <q-item-section>
              <q-item-label header>Usuarios do Grupo</q-item-label>
            </q-item-section>
          </q-item>
          <div v-if="usersRole">
            <q-item v-for="(user, i) in usersRole" :key="i">
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
              </q-item-section>
              <q-item-section>{{ user.name }}</q-item-section>
              <q-item-section side>
                <q-btn
                  size="sm"
                  round
                  color="negative"
                  icon="delete"
                  @click="removeUserRole(user.id)"
                />
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { computed, onMounted, ref } from "vue";
import roleServices from "../../services/roleServices";
import userServices from "../../services/userServices";

export default {
  name: "RoleDetail",

  watch: {
    modelRole(ant, atual) {
      this.getUsersRole();
    },
  },
  setup() {
    const $q = useQuasar();
    const optionsRole = ref([]);
    const roles = ref([]);
    const listRoles = ref([]);
    const optionsUser = ref([]);
    const users = ref([]);
    const modelUser = ref(null);
    const listUsers = ref([]);
    const rolesPermissions = ref([]);
    const functionality = ref([]);
    const modelRole = ref(null);
    const usersRole = ref(null);
    const isUserSelected = computed(() => {
      if (modelRole.value && modelUser.value) {
        return false;
      } else return true;
    });

    const { listRolesPermissions, listAll } = roleServices();
    const { listUserByRole } = userServices();
    const addUser = userServices().add;
    const listUserById = userServices().listById;
    const listAllUsers = userServices().listAll;

    const getUsersRole = async () => {
      try {
        for (const item in listRoles.value) {
          if (modelRole.value === listRoles.value[item].name) {
            const usersWithRole = await listUserByRole(
              listRoles.value[item].id
            );
            usersRole.value = usersWithRole;
          }
        }
      } catch (error) {
        $q.notify({
          type: "negative",
          message: `Erro: ${error}`,
        });
      }
    };

    const getUsers = async () => {
      const notroles = true;
      try {
        const lUsers = await listAllUsers(notroles);
        lUsers.forEach((element) => {
          users.value.push(element.name);
        });
        listUsers.value = lUsers;
      } catch (error) {
        $q.notify({
          type: "negative",
          message: `Erro: ${error}`,
        });
      }
    };

    const getRoles = async () => {
      try {
        const lRoles = await listAll();
        lRoles.forEach((element) => {
          roles.value.push(element.name);
        });
        listRoles.value = lRoles;
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
      getUsers();

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
      modelRole,
      modelUser,
      ticked: ref(null),
      expanded: ref(null),
      roles,
      optionsRole,
      listRoles,
      users,
      optionsUser,
      listUsers,
      functionality,
      rolesPermissions,
      usersRole,
      isUserSelected,

      addUser,
      listAll,
      listAllUsers,
      listUserByRole,
      agruparFuncionalidade,
      listRolesPermissions,
      getRolesPermissions,
      getRoles,
      getUsersRole,
      listUserById,

      seleciona(target) {
        console.log(target);
      },

      filterRoles(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase();
          optionsRole.value = roles.value.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },

      async removeUserRole(id) {
        try {
          const user = await listUserById(id);
          user[0].id_role = null;
          await addUser(id, user[0]);
          optionsUser.value = [];
          users.value = [];
          getUsersRole();
          getUsers();
        } catch (error) {
          $q.notify({
            type: "negative",
            message: `Erro: ${error}`,
          });
        }
      },

      async addRoleUser() {
        const idUser = listUsers.value.find((elem) => {
          if (elem.name === this.modelUser) {
            return elem.id;
          }
        });
        const idRole = listRoles.value.find((elem) => {
          if (elem.name === this.modelRole) {
            return elem.id;
          }
        });

        try {
          const user = await listUserById(idUser.id);

          user[0].id_role = idRole.id;
          await addUser(idUser.id, user[0]);
          this.modelUser = null;
          optionsUser.value = [];
          users.value = [];
          getUsersRole();
          getUsers();
        } catch (error) {
          $q.notify({
            type: "negative",
            message: `Erro: ${error}`,
          });
        }
      },

      filterUsers(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase();
          optionsUser.value = users.value.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
};
</script>
