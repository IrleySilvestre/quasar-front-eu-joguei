<template>
  <q-page-sticky position="top" expand class="bg-blue-3 text-bold text-black">
    <q-toolbar>
      <q-icon :name="icon" size="32px" />
      <q-toolbar-title>{{ title }}</q-toolbar-title>
    </q-toolbar>
  </q-page-sticky>
</template>
<script>
export default {
  name: "TitlePage",
  props: {
    title: { type: String, require: true, default: "Title Page" },
    icon: { type: String, require: false },
  },
};
</script>
<style></style>
