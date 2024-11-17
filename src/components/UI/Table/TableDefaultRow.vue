<template>
  <tr class="table-row" @click="onRedirect">
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
import { Employee } from "@/types";
import TableActions from "./TableActions.vue";

const emit = defineEmits<{
  (event: "edit", person: Employee): void;
  (event: "delete", person: Employee): void;
  (event: "redirect", id: number): void;
}>();

const props = defineProps<{
  doctor: Employee;
  index: number;
  tableName?: string;
}>();

const onEdit = (person: Employee) => {
  emit("edit", person);
};

const onDelete = (person: Employee) => {
  emit("delete", person);
};

const onRedirect = () => {
  const doctorId = props.doctor.id;

  if (doctorId !== undefined) {
    emit("redirect", doctorId);
  }
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
