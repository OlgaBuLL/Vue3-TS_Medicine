<template>
  <div class="modal">
    <div class="modal__content">
      <BaseButton
        class="modal__close"
        icon="cancel"
        title="Закрыть"
        @click="emit('close')"
      />
      <h3>{{ title }}</h3>

      <slot name="content" />

      <div class="modal__actions">
        <slot name="actions"> </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "../BaseButton.vue";

defineProps<{
  title?: string;
}>();

const emit = defineEmits<{
  (event: "close"): void;
}>();
</script>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: #5e5d5d8c;
  z-index: 1;

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 30px 40px;
    background: #fff;
    border-radius: var(--border-radius);
  }

  &__actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 50%;
    max-width: 25px;
    max-height: 25px;
    height: 100%;
    padding: 0;
    color: var(--grey);
    border: 1px solid var(--grey);
    background: transparent;
  }
}

@media (max-width: 500px) {
  .modal {
    &__actions {
      flex-wrap: wrap;
    }
  }
}
</style>
