<template>
  <q-page padding>
    <user-list />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import UserList from "./UserList.vue";

export default defineComponent({
  name: "UserPage",
  components: { UserList },
});
</script>
