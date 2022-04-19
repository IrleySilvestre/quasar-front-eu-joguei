<template>
  <q-footer reveal class="text-white">
    <q-toolbar>
      <q-toolbar-title class="text-right q-mr-lg text-bold">
        <div>
          <span> {{ new Date().getFullYear() }}</span> - Eu Joguei
        </div>
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "FooterLayout",
});
</script>
