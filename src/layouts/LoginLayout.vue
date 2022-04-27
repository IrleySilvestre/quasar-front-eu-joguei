<template>
  <q-layout view="hHh lpR fFf">
    <q-page class="row no-wrap justify-center items-center content-center">
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-page>
  </q-layout>
</template>
<script>
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "loginLayout",
  setup() {
    const router = useRouter();

    onMounted(() => {
      router.push({ name: "signin" });
    });
    return {
      router,
    };
  },
});
</script>
