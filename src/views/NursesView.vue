<template>
  <PageLayout
    title="Медсестры"
    local-storage-key="nursesData"
    :number="tableData.length"
    :table-data="tableData"
    :isLoading="isLoading"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useEmployee } from "@/composables/useEmployee";
import { Employee } from "@/types";
import DoctorsService from "@/services/doctors";
import PageLayout from "@/layouts/PageLayout.vue";

// const tableData = ref([
//   {
//     id: 21,
//     lastname: "Худякова",
//     name: "Ирина",
//     department: "кардиологическое",
//   },
//   {
//     id: 22,
//     lastname: "Андросова",
//     name: "Елизавета",
//     department: "хирургическое",
//   },
//   {
//     id: 23,
//     lastname: "Макарова",
//     name: "Алла",
//     department: "хирургическое",
//   },
//   {
//     id: 24,
//     lastname: "Крупанова",
//     name: "Светлана",
//     department: "кардиологическое",
//   },
//   {
//     id: 25,
//     lastname: "Державина",
//     name: "Мария",
//     department: "кардиологическое",
//   },
// ]);

// interface Employee {
//   id: number;
//   name: string;
// }

interface TableData {
  id: number;
  name: string;
  lastname: string;
  department: string;
  // head?: string;
}

const { saveToLocalStorage, loadFromLocalStorage } = useEmployee();
const isLoading = ref(false);
const tableData = ref<TableData[]>([]);

const loadEmployees = async () => {
  const savedData = loadFromLocalStorage("nursesData");

  if (savedData.length > 0) {
    tableData.value = savedData;
  } else {
    await getEmployee();
  }
};

const getEmployee = async () => {
  isLoading.value = true;

  const emoloyees: Employee[] = await DoctorsService.all();

  tableData.value = emoloyees.slice(5, 9).map((emp) => {
    const { id = 0, name = "" } = emp;

    const employeeName = name?.split(" ");
    const department = id % 2 === 0 ? "хирургическое" : "кардиологическое";

    return {
      id,
      name: employeeName[0],
      lastname: employeeName[1],
      department,
    };
  });

  saveToLocalStorage("nursesData", tableData.value);
  isLoading.value = false;
};

onMounted(() => {
  loadEmployees();
});
</script>

<style lang="scss"></style>
