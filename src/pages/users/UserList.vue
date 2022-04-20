<template>
  <div class="q-pa-md">
    <q-table
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
          placeholder="Search"
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
    align: "center",
    label: "Email",
    field: "email",
    sortable: true,
  },
  { name: "id", label: "FId", field: "id", sortable: true },
  { name: "action", label: "#", field: "id" },
];

const rows = [
  {
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    id: 1,
    action: "BtnDt",
  },
  {
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    id: 1,
    action: "BtnDt",
  },
  {
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    id: 1,
    action: "BtnDt",
  },
  {
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    id: 1,
    action: "BtnDt",
  },
  {
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    id: 1,
    action: "BtnDt",
  },
  {
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    id: 1,
    action: "BtnDt",
  },
  {
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    id: 1,
    action: "BtnDt",
  },
  {
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    id: 1,
    action: "BtnDt",
  },
  {
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    id: 1,
    action: "BtnDt",
  },
  {
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    id: 1,
    action: "BtnDt",
  },
  {
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    id: 1,
    action: "BtnDt",
  },
  {
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    id: 1,
    action: "BtnDt",
  },
  {
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    id: 1,
    action: "BtnDt",
  },
  {
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    id: 1,
    action: "BtnDt",
  },
  {
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    id: 1,
    action: "BtnDt",
  },
  {
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    id: 1,
    action: "BtnDt",
  },
  {
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    id: 1,
    action: "BtnDt",
  },
  {
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    id: 1,
    action: "BtnDt",
  },
  {
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    id: 1,
    action: "BtnDt",
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
