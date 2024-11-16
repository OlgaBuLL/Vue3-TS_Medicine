import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useEmployeesStore = defineStore("employees", () => {
  const employees = ref([]);

  return { employees };
});
