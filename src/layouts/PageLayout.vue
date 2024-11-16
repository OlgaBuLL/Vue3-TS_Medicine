<template>
  <main class="page main">
    <div class="page__heading">
      <PageTitle :title="title" :number="number" />

      <slot name="button">
        <BaseButton
          text="Добавить"
          icon="add"
          @click="isCreateDialogShown = true"
        />
      </slot>
    </div>

    <Loader v-if="props.isLoading" />

    <slot v-else name="content">
      <TableDefault
        :data="tableData"
        :table-name="`&quot;${title}&quot;`"
        @edit="openEditModal"
        @delete="onDelete"
      />

      <DialogModal
        v-if="isEditDialogShown"
        title="Редактировать"
        @close="closeModal"
      >
        <template #content>
          <DialogEditForm
            :employee="employee"
            @update:employee="updateEmployeeData"
            @close="closeModal"
          />
        </template>
      </DialogModal>

      <DialogModal
        v-if="isCreateDialogShown"
        title="Создать"
        @close="closeModal"
      >
        <template #content>
          <DialogEditForm
            @update:employee="createEmployeeData"
            @close="isCreateDialogShown = false"
          />
        </template>
      </DialogModal>

      <DialogConfirm
        v-if="isConfirmDialogShown"
        title="Удалить?"
        :employee="employee"
        @confirm="onConfirm"
        @close="closeModal"
        @cancel="closeModal"
      />
    </slot>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useEmployee } from "@/composables/useEmployee.js";
import PageTitle from "@/components/PageTitle.vue";
import TableDefault from "@/components/UI/Table/TableDefault.vue";
import DialogModal from "@/components/UI/Modal/DialogModal.vue";
import DialogEditForm from "@/components/UI/Modal/DialogEditForm.vue";
import DialogConfirm from "@/components/UI/Modal/DialogConfirm.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import Loader from "@/components/UI/Loader.vue";

interface Employee {
  id: number;
  name: string;
  lastname: string;
  department: string;
}

const props = defineProps<{
  title?: string;
  number?: number;
  tableData?: Employee[];
  isLoading?: boolean;
  localStorageKey?: string;
}>();

const { createEmployee, updateEmployee, deleteEmployee } = useEmployee();
const isEditDialogShown = ref(false);
const isCreateDialogShown = ref(false);
const isConfirmDialogShown = ref(false);
const isConfirmed = ref(false);
const employee = ref<Employee | null>(null);

const openEditModal = (person: Employee) => {
  isEditDialogShown.value = !isEditDialogShown.value;
  employee.value = person;
};

const closeModal = () => {
  if (isEditDialogShown.value) isEditDialogShown.value = false;
  if (isCreateDialogShown.value) isCreateDialogShown.value = false;
  if (isConfirmDialogShown.value) isConfirmDialogShown.value = false;
};

const onDelete = (person: Employee) => {
  isConfirmDialogShown.value = true;
  employee.value = person;
};

const onConfirm = (person: Employee) => {
  isConfirmed.value = true;

  if (isConfirmed.value) {
    deleteEmployee(
      person.id,
      props.tableData || [],
      closeModal,
      props.localStorageKey || ""
    );
  } else return;
};

const updateEmployeeData = (person: Employee) => {
  updateEmployee(person, props.tableData, closeModal, props.localStorageKey);
};

const createEmployeeData = (person: Employee) => {
  createEmployee(person, props.tableData, closeModal, props.localStorageKey);
};
</script>

<style lang="scss">
.page {
  height: 100%;
  padding: 30px 0;

  &__heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-bottom: 25px;

    .button {
      width: fit-content;
    }
  }
}

@media (max-width: 500px) {
  .page {
    &__heading {
      flex-wrap: wrap;
    }
  }
}
</style>
