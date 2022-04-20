<template>
  <div class="q-pa-md">
    <q-table
      :dense="$q.screen.lt.md"
      title="Users"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Pesquisar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";
const columns = [
  { align: "left", name: "id", label: "Codigo", field: "id", sortable: true },
  {
    name: "name",
    required: true,
    label: "Nome",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "email",
    align: "left",
    label: "Email",
    field: "email",
    sortable: true,
  },
  { align: "center", name: "action", label: "#", field: "action" },
];

const rows = [
  {
    id: 1,
    name: "irley",
    email: "irley@email.com",
    action: "btn1 btn2",
  },
  {
    id: 2,
    name: "joaquim",
    email: "irley@email.com",
    action: "btn1 btn2",
  },
  {
    id: 3,
    name: "jose",
    email: "irley@email.com",
    action: "btn1 btn2",
  },
  {
    id: 4,
    name: "irley",
    email: "irley@email.com",
    action: "btn1 btn2",
  },
  {
    id: 5,
    name: "irley",
    email: "irley@email.com",
    action: "btn1 btn2",
  },
  {
    id: 6,
    name: "irley",
    email: "irley@email.com",
    action: "btn1 btn2",
  },
  {
    id: 7,
    name: "lorena",
    email: "irley@email.com",
    action: "btn1 btn2",
  },
  {
    id: 8,
    name: "irley",
    email: "irley@email.com",
    action: "btn1 btn2",
  },
  {
    id: 9,
    name: "lidiane",
    email: "irley@email.com",
    action: "btn1 btn2",
  },
  {
    id: 10,
    name: "irley",
    email: "irley@email.com",
    action: "btn1 btn2",
  },
  {
    id: 11,
    name: "irley",
    email: "irley@email.com",
    action: "btn1 btn2",
  },
  {
    id: 12,
    name: "viviane",
    email: "irley@email.com",
    action: "btn1 btn2",
  },
  {
    id: 13,
    name: "irley",
    email: "irley@email.com",
    action: "btn1 btn2",
  },
  {
    id: 14,
    name: "irley",
    email: "irley@email.com",
    action: "btn1 btn2",
  },
  {
    id: 15,
    name: "pedro",
    email: "irley@email.com",
    action: "btn1 btn2",
  },
  {
    id: 16,
    name: "irley",
    email: "irley@email.com",
    action: "btn1 btn2",
  },
  {
    id: 17,
    name: "tiago",
    email: "irley@email.com",
    action: "btn1 btn2",
  },
];

export default {
  setup() {
    return {
      filter: ref(""),
      columns,
      rows,
    };
  },
};
</script>
