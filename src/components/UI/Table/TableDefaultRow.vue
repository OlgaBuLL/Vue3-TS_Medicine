<template>
  <tr class="table-row" @click="emit('redirect', doctor.id)">
    <td class="">{{ index + 1 }}</td>
    <td class="">{{ doctor.lastname }}</td>
    <td class="">{{ doctor.name }}</td>
    <td v-if="tableName?.includes('Врачи')" class="">{{ doctor.head }}</td>
    <td class="">{{ doctor.department }}</td>
    <td>
      <TableActions :doctor="props.doctor" @edit="onEdit" @delete="onDelete" />
    </td>
  </tr>
</template>

<script setup lang="ts">
import TableActions from "./TableActions.vue";

interface Doctor {
  id: number;
  lastname: string;
  name: string;
  department: string;
  head?: string;
}

const emit = defineEmits<{
  (event: "edit", person: Doctor): void;
  (event: "delete", person: Doctor): void;
  (event: "redirect", id: number): void;
}>();

const props = defineProps<{
  doctor: Doctor;
  index: number;
  tableName?: string;
}>();

const onEdit = (person: Doctor) => {
  emit("edit", person);
};

const onDelete = (person: Doctor) => {
  emit("delete", person);
};
</script>

<style lang="scss">
.table-row {
  transition: var(--transition-2);
  cursor: pointer;

  &:hover {
    background: var(--color-background-mute) !important;
  }
}
</style>
