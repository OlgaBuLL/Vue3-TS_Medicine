<template>
  <div class="form-edit">
    <TextField
      placeholder="Фамилия"
      v-model="employee.lastname"
      :invalid="!employee.lastname"
    />
    <TextField
      placeholder="Имя"
      v-model="employee.name"
      :invalid="!employee.name"
    />
    <TextField placeholder="Отделение" v-model="employee.department" />

    <div class="form-edit__actions">
      <BaseButton
        text="Закрыть"
        class="button__outline"
        @click="emit('close')"
      />
      <BaseButton text="Сохранить" @click="emit('update:employee', employee)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Employee } from "@/types";
import BaseButton from "@/components/UI/BaseButton.vue";
import TextField from "@/components/UI/Form/TextField.vue";

const props = defineProps<{
  employee?: Employee;
}>();

const emit = defineEmits<{
  (event: "update:employee", employee: Employee): void;
  (event: "close"): void;
}>();

const employee = ref<Employee>({ ...props.employee });
</script>

<style lang="scss">
.form-edit {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
  }
}
</style>
