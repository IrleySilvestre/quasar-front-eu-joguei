<template>
  <q-layout view="hHh lpR fFf">
    <q-page class="row no-wrap justify-center items-center content-center">
      <q-page-container>
        <q-card class="card-form text-white">
          <q-card-section class="bg-secondary">
            <div class="text-h6 text-center text-bold">Login</div>
          </q-card-section>
          <q-separator />

          <q-card-actions class="row justify-center q-pa-md q-gutter-md">
            <q-input
              outlined
              class="col-12"
              v-model="email"
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
              outlined
              class="col-12"
              v-model="password"
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

            <div>
              <q-btn label="Entrar" color="secondary" />
              <q-btn label="Reset" color="secondary" flat class="q-ml-sm" />
            </div>
          </q-card-actions>
        </q-card>
      </q-page-container>
    </q-page>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const email = ref(null);
    const password = ref(null);
    const isEmailValid = ref(true);
    const isPwd = ref(true);

    const validaEmail = () => {
      RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}").test(email.value)
        ? (isEmailValid.value = true)
        : (isEmailValid.value = false);
    };

    return {
      email,
      password,
      isEmailValid,
      isPwd,
      validaEmail,
    };
  },
});
</script>
<style lang="sass" scoped>
.card-form
  width: 480px
  max-width: 380px
</style>
