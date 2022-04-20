<template>
  <div class="q-pa-md">
    <q-table
      ref="tableRef"
      :class="tableClass"
      tabindex="0"
      title="Usuarios"
      :rows="rows"
      :columns="columns"
      row-key="name"
      v-model:selected="selected"
      v-model:pagination="pagination"
      :filter="filter"
      @focusin="activateNavigation"
      @focusout="deactivateNavigation"
      @keydown="onKey"
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
import { ref, computed, nextTick } from "vue";

const columns = [
  { name: "id", label: "Codigo", field: "id" },
  {
    name: "name",
    required: true,
    label: "Nome",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },

  { name: "email", label: "Email", field: "email", sortable: true },
  { name: "action", label: "#", field: "action", sortable: true },
];

const rows = [
  {
    id: 1,
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    action: "ex",
  },
  {
    id: 2,
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    action: "ex",
  },
  {
    id: 3,
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    action: "ex",
  },
  {
    id: 4,
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    action: "ex",
  },
  {
    id: 5,
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    action: "ex",
  },
  {
    id: 6,
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    action: "ex",
  },
  {
    id: 7,
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    action: "ex",
  },
  {
    id: 8,
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    action: "ex",
  },
  {
    id: 9,
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    action: "ex",
  },
  {
    id: 10,
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    action: "ex",
  },
  {
    id: 11,
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    action: "ex",
  },
  {
    id: 12,
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    action: "ex",
  },
  {
    id: 13,
    name: "Viviane Yogurt",
    email: "frozen@email.com",
    action: "ex",
  },
  {
    id: 14,
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    action: "ex",
  },
  {
    id: 15,
    name: "Emily Yogurt",
    email: "frozen@email.com",
    action: "ex",
  },
  {
    id: 16,
    name: "Frozen Yogurt",
    email: "frozen@email.com",
    action: "ex",
  },
  {
    id: 17,
    name: "Irley Yogurt",
    email: "frozen@email.com",
    action: "ex",
  },
];

export default {
  setup() {
    const tableRef = ref(null);

    const navigationActive = ref(false);
    const pagination = ref({});
    const selected = ref([]);

    return {
      tableRef,

      navigationActive,
      filter: ref(""),
      selected,
      pagination,

      columns,
      rows,

      tableClass: computed(() =>
        navigationActive.value === true ? "shadow-8 no-outline" : null
      ),

      activateNavigation() {
        navigationActive.value = true;
      },

      deactivateNavigation() {
        navigationActive.value = false;
      },

      onKey(evt) {
        if (
          navigationActive.value !== true ||
          [33, 34, 35, 36, 38, 40].indexOf(evt.keyCode) === -1 ||
          tableRef.value === null
        ) {
          return;
        }

        evt.preventDefault();

        const { computedRowsNumber, computedRows } = tableRef.value;

        if (computedRows.length === 0) {
          return;
        }

        const currentIndex =
          selected.value.length > 0
            ? computedRows.indexOf(selected.value[0])
            : -1;
        const currentPage = pagination.value.page;
        const rowsPerPage =
          pagination.value.rowsPerPage === 0
            ? computedRowsNumber
            : pagination.value.rowsPerPage;
        const lastIndex = computedRows.length - 1;
        const lastPage = Math.ceil(computedRowsNumber / rowsPerPage);

        let index = currentIndex;
        let page = currentPage;

        switch (evt.keyCode) {
          case 36: // Home
            page = 1;
            index = 0;
            break;
          case 35: // End
            page = lastPage;
            index = rowsPerPage - 1;
            break;
          case 33: // PageUp
            page = currentPage <= 1 ? lastPage : currentPage - 1;
            if (index < 0) {
              index = 0;
            }
            break;
          case 34: // PageDown
            page = currentPage >= lastPage ? 1 : currentPage + 1;
            if (index < 0) {
              index = rowsPerPage - 1;
            }
            break;
          case 38: // ArrowUp
            if (currentIndex <= 0) {
              page = currentPage <= 1 ? lastPage : currentPage - 1;
              index = rowsPerPage - 1;
            } else {
              index = currentIndex - 1;
            }
            break;
          case 40: // ArrowDown
            if (currentIndex >= lastIndex) {
              page = currentPage >= lastPage ? 1 : currentPage + 1;
              index = 0;
            } else {
              index = currentIndex + 1;
            }
            break;
        }

        if (page !== pagination.value.page) {
          pagination.value.page = page;

          nextTick(() => {
            const { computedRows } = tableRef.value;
            selected.value = [
              computedRows[Math.min(index, computedRows.length - 1)],
            ];
          });
        } else {
          selected.value = [computedRows[index]];
        }
      },
    };
  },
};
</script>
