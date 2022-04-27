<template>
  <q-page class="row no-wrap justify-center items-center content-center">
    <q-page-container>
      <q-card class="card-form text-white">
        <q-card-section class="bg-secondary">
          <div class="text-h6 text-center text-bold">Cadastro</div>
        </q-card-section>
        <q-separator />
        <q-card-actions class="row justify-center q-pa-md q-gutter-md">
          <q-form @submit="onSubmit" @reset="onReset" class="row">
            <q-input
              class="col-12"
              outlined
              v-model="form.name"
              label="Nome:"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo Obrigatório']"
            />

            <q-input
              class="col-12"
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
              class="col-12"
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
              class="col-12"
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

            <q-separator color="secondary" class="q-mt-sm q-mb-md" />

            <q-btn
              class="col-12 q-mt-sm"
              rounded
              label="Gravar"
              type="submit"
              color="secondary"
            />

            <q-btn
              class="col-12 q-mt-sm"
              outline
              rounded
              label="Cancelar"
              color="secondary"
              :to="{ name: 'signin' }"
            />
            <q-btn
              class="col-12 q-mt-sm"
              label="Limpar"
              type="reset"
              color="secondary"
              flat
            />
          </q-form>
        </q-card-actions>
      </q-card>
    </q-page-container>
  </q-page>
</template>
<script>
import { useQuasar } from "quasar";
import { defineComponent, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import userServices from "../../services/userServices";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const $q = useQuasar();
    const isEmailValid = ref(true);
    const isConfirmPassword = ref(true);
    const isPwd = ref(true);
    const isPwd2 = ref(true);
    const { add } = userServices();
    const passwordConfirm = ref(null);
    const router = useRouter();
    const route = useRoute();
    const pageTitle = ref("Cadastrar Usuario");

    const form = ref({
      name: "",
      email: "",
      password: "",
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
        router.push({ name: "signin" });
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
      passwordConfirm,
      isEmailValid,
      isPwd,
      isPwd2,
      isConfirmPassword,
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
<style lang="sass" scoped>
.card-form
  width: 480px
  max-width: 380px
  border: 1px
  border-color: #ffff
</style>
