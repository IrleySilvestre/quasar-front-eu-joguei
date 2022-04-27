<template>
  <q-page class="row no-wrap justify-center items-center content-center">
    <q-page-container>
      <q-card class="card-form text-white">
        <q-card-section class="bg-secondary">
          <div class="text-h6 text-center text-bold">Recuperar Senha</div>
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

          <q-btn
            label="Enviar"
            rounded
            color="secondary"
            class="col-12"
            :to="{ name: 'register' }"
          />
          <q-btn
            class="col-12 q-mt-md"
            outline
            rounded
            label="Cancelar"
            color="secondary"
            :to="{ name: 'signin' }"
          />
        </q-card-actions>
      </q-card>
    </q-page-container>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ForgotPasswordPage",
  setup() {
    const email = ref(null);
    const isEmailValid = ref(true);

    const validaEmail = () => {
      RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}").test(email.value)
        ? (isEmailValid.value = true)
        : (isEmailValid.value = false);
    };

    return {
      email,
      isEmailValid,
      validaEmail,
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
