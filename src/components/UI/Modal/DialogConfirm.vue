<template>
  <DialogModal :title="title">
    <template #content>
      <div>
        <p>Вы действительно хотите удалить сотрудника</p>
        <p>"{{ employee?.lastname }} {{ employee?.name }}"</p>
      </div>
    </template>

    <template #actions
      ><BaseButton
        text="Отменить"
        class="button__outline"
        @click="emit('cancel')"
      />
      <BaseButton text="Подтвердить" @click="emit('confirm', employee)" />
    </template>
  </DialogModal>
</template>

<script setup lang="ts">
import { Employee } from "@/types";
import DialogModal from "./DialogModal.vue";
import BaseButton from "../BaseButton.vue";

defineProps({
  title: {
    type: String,
    default: "Подтвердите действие",
  },
  employee: {
    type: Object as () => Employee,
    default: () => null,
  },
});

const emit = defineEmits<{
  (event: "confirm", employee: Employee): void;
  (event: "cancel"): void;
}>();
</script>
