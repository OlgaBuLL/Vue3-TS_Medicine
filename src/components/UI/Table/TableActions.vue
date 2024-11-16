<template>
  <div class="actions">
    <div
      class="actions__button edit"
      title="Редактировать"
      @click.stop="onEdit"
    >
      <SpriteIcon name="edit" />
    </div>

    <div class="actions__button delete" title="Удалить" @click.stop="onDelete">
      <SpriteIcon name="delete" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SpriteIcon from "@/components/UI/SpriteIcon.vue";

interface Doctor {
  id: number;
  name: string;
  department: string;
}

const props = defineProps<{
  doctor: Doctor;
}>();

const emit = defineEmits<{
  (e: "edit", doctor: Doctor): void;
  (e: "delete", doctor: Doctor): void;
}>();

const onEdit = () => {
  emit("edit", props.doctor);
};

const onDelete = () => {
  emit("delete", props.doctor);
};
</script>

<style lang="scss">
.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 3px 0;

  &__button {
    max-width: 30px;
    max-height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: var(--border-radius-sm);
    transition: var(--transition-4);
    cursor: pointer;

    &.edit {
      border: 1px solid var(--medium-grey);

      &:hover {
        color: var(--secondary);
        background: var(--secondary-hover);
      }
    }

    &.delete {
      border: 1px solid var(--medium-grey);
      color: var(--danger);

      &:hover {
        background: var(--danger-hover);
      }
    }
  }
}
</style>
