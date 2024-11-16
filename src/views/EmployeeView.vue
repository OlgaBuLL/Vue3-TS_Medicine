<template>
  <PageLayout :title="employee?.name">
    <template #button>
      <BaseButton text="Удалить" icon="delete" class="button__outline_danger" />
    </template>

    <template #content>
      <form v-if="!isLoading" class="employee-info">
        <fieldset class="employee-info__group">
          <legend>Контакты</legend>
          <div class="employee-info__item">
            <strong>Email </strong>
            <p>{{ employee?.email || "-" }}</p>
          </div>
          <div class="employee-info__item">
            <strong>Телефон </strong>
            <p>{{ employee?.phone || "-" }}</p>
          </div>
        </fieldset>

        <fieldset class="employee-info__group">
          <legend>Адрес</legend>
          <div class="employee-info__item">
            <strong>Город </strong>
            <p>{{ employee?.address?.city || "-" }}</p>
          </div>
          <div class="employee-info__item">
            <strong>Улица </strong>
            <p>{{ employee?.address?.street || "-" }}</p>
          </div>
          <div class="employee-info__item">
            <strong>Квартира </strong>
            <p>{{ employee?.address?.suite || "-" }}</p>
          </div>
          <div class="employee-info__item">
            <strong>Код </strong>
            <p>{{ employee?.address?.zipcode || "-" }}</p>
          </div>
        </fieldset>

        <div class="employee-info__item">
          <strong>website </strong>
          <p>{{ employee?.website || "-" }}</p>
        </div>
        <div class="employee-info__item">
          <strong>Компания </strong>
          <p>{{ employee?.company?.name || "-" }}</p>
        </div>
      </form>

      <Loader v-else />
    </template>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import DoctorsService from "@/services/doctors";
import PageLayout from "@/layouts/PageLayout.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import Loader from "@/components/UI/Loader.vue";

interface Address {
  city: string;
  street: string;
  suite: string;
  zipcode: string;
}

interface Company {
  name: string;
}

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: Address;
  website?: string;
  company?: Company;
}

const route = useRoute();
const isLoading = ref(false);
const employee = ref<Employee | null>(null);

const getEmployee = async () => {
  isLoading.value = true;
  const response = await DoctorsService.show(route.params.id);

  employee.value = response;
  isLoading.value = false;
};

onMounted(async () => {
  await getEmployee();
});
</script>

<style lang="scss">
.employee-info {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__item {
    display: flex;
    align-items: center;
    gap: 15px;

    strong {
      color: var(--grey);
    }
  }

  &__group {
    border-radius: var(--border-radius);
    border: 1px solid var(--medium-grey);
  }
}
</style>
