<template>
  <q-page>
    <TitlePage :title="pageTitle" icon="description" />
    <q-page-container class="q-pa-md">
      <div class="q-pa-md q-mt-md shadow-box shadow-2" style="max-width: 480px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <span class="text-bold" v-if="isEdit">Codigo: {{ id }}</span>
          <q-input
            outlined
            v-model="form.name"
            label="Nome:"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo Obrigatório']"
          />

          <q-input
            outlined
            v-model="form.email"
            label="Email:"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Campo Obrigatório',
            ]"
            bottom-slots
            error-message="Email Inválido"
            :error="!isEmailValid"
            @blur="validaEmail"
          />
          <q-input
            v-if="!isEdit"
            outlined
            v-model="form.password"
            label="Senha:"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Campo Obrigatório',
              (val) => val.length >= 8 || 'Minimo 8 caracteres',
            ]"
            :type="isPwd ? 'password' : 'text'"
            ><template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              /> </template
          ></q-input>

          <q-input
            v-if="!isEdit"
            outlined
            v-model="passwordConfirm"
            label="Confirmação de senha:"
            bottom-slots
            error-message="Confirmação senha diferente"
            :error="!isConfirmPassword"
            @blur="validPassword"
            :type="isPwd2 ? 'password' : 'text'"
            ><template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd2 = !isPwd2"
              /> </template
          ></q-input>

          <div class="row justify-around">
            <q-btn label="Gravar" type="submit" color="secondary" />

            <q-btn
              label="Cancelar"
              outline
              color="secondary"
              class="q-ml-sm float-right"
              :to="{ name: 'user' }"
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
      </div>
    </q-page-container>
  </q-page>
</template>
<script>
import { useQuasar } from "quasar";
import { onMounted, defineComponent, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import userServices from "../../services/userServices";
import TitlePage from "src/layouts/TitlePage.vue";

export default defineComponent({
  name: "UserAdd",
  components: {
    TitlePage,
  },
  setup() {
    const $q = useQuasar();
    const id = ref(null);
    const isEmailValid = ref(true);
    const isConfirmPassword = ref(true);
    const isPwd = ref(true);
    const isPwd2 = ref(true);
    const { add, listById } = userServices();
    const passwordConfirm = ref(null);
    const isEdit = ref(false);
    const router = useRouter();
    const route = useRoute();
    const pageTitle = ref("Cadastrar Usuario");

    const form = ref({
      name: "",
      email: "",
      password: "",
    });

    onMounted(async () => {
      if (route.params.id) {
        pageTitle.value = "Editar Usuario";
        id.value = route.params.id;
        isEdit.value = true;
        const userEdit = await listById(route.params.id);
        form.value.name = userEdit[0].name;
        form.value.email = userEdit[0].email;
      }
    });

    const validaEmail = () => {
      const { email } = form.value;
      RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}").test(email)
        ? (isEmailValid.value = true)
        : (isEmailValid.value = false);
    };

    const validPassword = () => {
      const { password } = form.value;
      const confirm = passwordConfirm.value;

      password === confirm
        ? (isConfirmPassword.value = true)
        : (isConfirmPassword.value = false);
    };

    const addUser = async () => {
      try {
        await add(id.value, form.value);
        router.push({ name: "user" });
        $q.notify({
          type: "positive",
          message: `Sucesso`,
          position: "top-right",
        });
      } catch (error) {
        $q.notify({
          type: "positive",
          message: `${error}`,
          position: "top-right",
        });
      }
    };

    return {
      form,
      id,
      passwordConfirm,
      isEmailValid,
      isPwd,
      isPwd2,
      isConfirmPassword,
      isEdit,
      validaEmail,
      validPassword,
      addUser,
      route,
      router,
      pageTitle,

      onSubmit() {
        addUser();
      },

      onReset() {
        form.value.name = "";
        form.value.email = "";
        form.value.password = "";
        passwordConfirm.value = "";
        isEmailValid.value = true;
        isConfirmPassword.value = true;
      },
    };
  },
});
</script>
