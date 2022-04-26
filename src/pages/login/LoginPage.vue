<template>
  <p>login</p>
  <q-btn label="Entrar" :to="{ name: 'dashboard' }" />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginPage",
  setup() {},
});
</script>
