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
        node-key="label"
        tick-strategy="leaf"
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
            tick-strategy="leaf"
            :ticked="ticked"
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
    async modelRole(ant, atual) {
      this.getUsersRole();

      if (!ant) {
        this.functionality = [];
        this.usersRole = [];
        this.ticked = [];
      } else {
        this.loadListPermissions();
      }
    },

    ticked(modificado, backup) {
      this.updatePermissions(modificado, backup);
    },
  },
  setup() {
    const $q = useQuasar();
    const optionsRole = ref([]);
    const ticked = ref([]);
    const roles = ref([]);
    const listRoles = ref([]);
    const optionsUser = ref([]);
    const users = ref([]);
    const modelUser = ref(null);
    const listUsers = ref([]);
    const functionality = ref([]);
    const modelRole = ref(null);
    const usersRole = ref(null);
    const isUserSelected = computed(() => {
      if (modelRole.value && modelUser.value) {
        return false;
      } else return true;
    });

    const { listRolesPermissions, listAll, updateRolesPermissions } =
      roleServices();
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

    const loadListPermissions = async () => {
      var idRole = "";
      listRoles.value.forEach((elem) => {
        if (elem.name == modelRole.value) {
          idRole = elem.id;
        }
      });
      const lista = await listRolesPermissions(idRole);

      let novaLista = [];

      let func = agruparFuncionalidade(lista, "funcionalidade");

      let arrayFunc = Object.entries(func);

      arrayFunc.forEach((elem) => {
        let item = { id: 0, label: "", children: [] };
        elem[1].forEach((el, key) => {
          if (item.id != el.idFuncionalidade) {
            item.label = el.idFuncionalidade + " " + el.funcionalidade;
          }
          item.children[key] = {
            label: `${el.idFuncionalidade} ${el.idAcao} ${el.acao}`,
          };
          if (el.permissao === 1) {
            ticked.value.push(`${el.idFuncionalidade} ${el.idAcao} ${el.acao}`);
          }
        });
        novaLista.push(item);
      });

      functionality.value = novaLista;
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

    const updatePermissions = async (modificado, backup) => {
      const filter1 = modificado.filter((elem) => {
        if (backup.indexOf(elem) == -1) {
          return elem;
        }
      });
      const filter2 = backup.filter((elem) => {
        if (modificado.indexOf(elem) == -1) {
          return elem;
        }
      });
      const toUpdate = filter1.concat(filter2);
      for (let i = 0; i < toUpdate.length; i++) {
        toUpdate[i] = toUpdate[i].split(" ").join("");
      }

      var roleId = "";
      listRoles.value.forEach((elem) => {
        if (elem.name == modelRole.value) {
          roleId = elem.id;
        }
      });

      if (modificado > backup) {
        for (let index = 0; index < toUpdate.length; index++) {
          const ids = toUpdate[index];
          await updateRolesPermissions(1, roleId, ids[1], ids[0]);
        }
      } else {
        for (let index = 0; index < toUpdate.length; index++) {
          const ids = toUpdate[index];
          await updateRolesPermissions(0, roleId, ids[1], ids[0]);
        }
      }
    };

    onMounted(async () => {
      getRoles();
      getUsers();
    });

    return {
      modelRole,
      modelUser,
      ticked,
      roles,
      optionsRole,
      listRoles,
      users,
      optionsUser,
      listUsers,
      functionality,
      usersRole,
      isUserSelected,

      addUser,
      listAll,
      listAllUsers,
      listUserByRole,
      agruparFuncionalidade,
      listRolesPermissions,
      loadListPermissions,
      updateRolesPermissions,
      getRoles,
      getUsersRole,
      listUserById,
      updatePermissions,

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
