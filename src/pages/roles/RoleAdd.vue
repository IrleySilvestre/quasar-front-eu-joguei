<template>
  <q-page padding>
    <TitlePage :title="pageTitle" icon="description" />
    <q-page-container class="row">
      <q-form
        class="shadow-2 q-pa-sm col-md-4 col-sm-12"
        @submit.prevent="onSubmit"
        @reset="onReset"
      >
        <q-input
          v-model="form.name"
          label="Name:"
          outlined
          lazy-rules=""
          :rules="[
            (val) => (val && val.length > 0) || 'Campo Obrigatório',
            (val) => val.length > 3 || 'Campo deve ser maior que 3 caracteres',
          ]"
        />
        <q-input
          v-model="form.description"
          type="textarea"
          label="Descrição"
          outlined
          lazy-rules=""
          :rules="[
            (val) => (val && val.length > 0) || 'Campo Obrigatório',
            (val) => val.length > 6 || 'Campo deve ser maior que 3 caracteres',
          ]"
        />
        <div class="row justify-around">
          <q-btn label="Gravar" type="submit" color="secondary" />

          <q-btn
            label="Cancelar"
            outline
            color="secondary"
            class="q-ml-sm float-right"
            :to="{ name: 'admPage', params: { tabActive: 'roles' } }"
          />
          <q-btn
            label="Limpar"
            type="reset"
            color="secondary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </q-page-container>
  </q-page>
</template>
<script>
import { useQuasar } from "quasar";
import { defineComponent, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import TitlePage from "../../layouts/TitlePage.vue";
import roleService from "../../services/roleServices";

export default defineComponent({
  name: "RoleAdd",
  components: { TitlePage },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    const form = ref({ name: "", description: "" });
    const id = ref(null);
    const { add, findById } = roleService();
    const pageTitle = ref("Adicionar Grupo de Acesso");

    onMounted(async () => {
      if (route.params.id) {
        pageTitle.value = "Editar Grupo de Acesso";
        id.value = route.params.id;
        const roleEdit = await findById(route.params.id);
        form.value.name = roleEdit[0].name;
        form.value.description = roleEdit[0].description;
      }
    });

    const addRole = async () => {
      try {
        await add(id.value, form.value);
        router.push({ name: "admPage", params: { tabActive: "roles" } });
        $q.notify({
          type: "positive",
          message: `Sucesso`,
          position: "top-right",
        });
      } catch (error) {
        $q.notify({
          type: "negative",
          message: `${error}`,
          position: "top-right",
        });
      }
    };

    return {
      form,
      id,
      route,
      router,
      pageTitle,
      add,
      findById,
      addRole,

      onReset() {
        form.value.name = "";
        form.value.description = "";
      },
      onSubmit() {
        addRole();
      },
    };
  },
});
</script>
