<template>
  <div class="table" v-if="props?.data?.length">
    <h4 class="table__name">Таблица {{ tableName }}</h4>

    <table class="table__content">
      <thead class="table__head">
        <tr>
          <th class="">№</th>
          <th class="">Фамилия</th>
          <th class="">Имя</th>
          <th v-if="tableName.includes('Врачи')" class="">Заведующий</th>
          <th class="">Отделение</th>
          <th class="table__actions">Действия</th>
        </tr>
      </thead>
      <tbody class="table__body">
        <TransitionGroup name="employee-list">
          <TableDefaultRow
            v-for="(item, index) in props.data"
            :key="item.id"
            :table-name="tableName"
            :doctor="item"
            :index="index"
            @edit="handleEdit"
            @delete="handleDelete"
            @redirect="goToEmployeePage"
          />
        </TransitionGroup>
      </tbody>
    </table>
  </div>

  <div v-else class="table__empty">
    <h3 class="table__name">В таблице {{ tableName }} нет записей</h3>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import TableDefaultRow from "@/components/UI/Table/TableDefaultRow.vue";

interface Doctor {
  id: number;
  lastname: string;
  name: string;
  department: string;
  head: string;
}

const props = defineProps<{
  data: Doctor[];
  tableName: string;
}>();

const emit = defineEmits<{
  (event: "edit", person: Doctor): void;
  (event: "delete", person: Doctor): void;
}>();

const router = useRouter();

const handleEdit = (person: Doctor) => {
  emit("edit", person);
};

const handleDelete = (person: Doctor) => {
  emit("delete", person);
};

const goToEmployeePage = (id: number) => {
  router.push(`/employee/${id}`);
};
</script>

<style lang="scss">
.table {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__content {
    width: 100%;
    padding: 5px 0;
    background: var(--white);
    border: 1px solid var(--medium-grey);
    border-radius: var(--border-radius);
    box-shadow: #63636333 0 2px 8px;
  }

  &__head {
    tr th {
      font-size: 14px;
      font-weight: bold;
      padding-bottom: 8px;
    }
  }

  &__body {
    tr:nth-child(odd) {
      background: var(--light-blue);
    }

    tr td {
      font-size: 14px;
      text-align: center;
      padding: 1px 4px;
    }
  }

  &__name {
    font-size: 14px;
  }

  &__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px;
  }

  .employee-list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .employee-list-enter-active,
  .employee-list-leave-active {
    transition: all 0.5s ease;
  }
  .employee-list-enter-from,
  .employee-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
  }
  .employee-list-move {
    transition: transform 0.5s ease;
  }
}

@media (max-width: 768px) {
  .table {
    padding-bottom: 20px;
    overflow: auto;

    &__head tr th {
      font-size: 12px;
    }

    &__body tr td {
      font-size: 12px;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 100px;
    }

    &__name {
      font-size: 12px;
    }
  }
}
</style>
