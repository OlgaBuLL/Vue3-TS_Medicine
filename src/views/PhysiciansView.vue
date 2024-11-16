<template>
  <PageLayout
    title="Врачи"
    local-storage-key="doctorsData"
    :number="tableData.length"
    :table-data="tableData"
    :isLoading="isLoading"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useEmployee } from "@/composables/useEmployee";
import DoctorsService from "@/services/doctors";
import PageLayout from "@/layouts/PageLayout.vue";

interface Employee {
  id: number;
  name: string;
}

interface TableData {
  id: number;
  name: string;
  lastname: string;
  department: string;
  head: string;
}

const { saveToLocalStorage, loadFromLocalStorage } = useEmployee();
const isLoading = ref(false);
const tableData = ref<TableData[]>([]);

const loadEmployees = async () => {
  const savedData = loadFromLocalStorage("doctorsData");

  if (savedData.length > 0) {
    tableData.value = savedData;
  } else {
    await getEmployee();
  }
};

const getEmployee = async () => {
  isLoading.value = true;

  const emoloyees: Employee[] = await DoctorsService.all();

  tableData.value = emoloyees.map((emp) => {
    const { id, name } = emp;

    const employeeName = name.split(" ");
    const department = id % 2 === 0 ? "хирургическое" : "кардиологическое";
    const headOfDepartment = employeeName[1].length >= 8 ? "заведующий" : "-";

    return {
      id,
      name: employeeName[0],
      lastname: employeeName[1],
      department,
      head: headOfDepartment,
    };
  });

  saveToLocalStorage("doctorsData", tableData.value);
  isLoading.value = false;
};

onMounted(() => {
  loadEmployees();
});
</script>
