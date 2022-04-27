<template>
  <q-page-sticky position="top" expand class="bg-teal-4 text-bold text-teal-1">
    <q-toolbar>
      <q-toolbar-title>
        {{ title
        }}<span class="q-pl-sm"><q-icon :name="icon" size="32px" /></span
      ></q-toolbar-title>
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
