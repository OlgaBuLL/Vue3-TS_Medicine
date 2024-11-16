<template>
  <button class="button" type="button" :class="[props.class]">
    <SpriteIcon v-if="props.icon" :name="icon" class="button__icon" />
    <span v-if="props.text" class="button__text">{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
import SpriteIcon from "./SpriteIcon.vue";

interface ButtonProps {
  text?: string;
  icon?: string;
  class?: string;
}

const props = defineProps<ButtonProps>();
</script>

<style lang="scss">
.button {
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 9px 24px;
  border: none;
  border-radius: var(--border-radius-sm);
  color: var(--white);
  background: linear-gradient(
    60deg,
    #0a31aa 10%,
    #0035d7 50%,
    var(--primary) 100%
  );
  cursor: pointer;
  transition: var(--transition-4);

  &__icon {
    max-width: 24px;
    max-height: 24px;
  }

  &__text {
    font-family: var(--font-family);
    font-size: 12px;
    white-space: nowrap;
  }
}

.button__outline {
  background: transparent;
  color: var(--secondary);
  border: 1px solid var(--secondary);

  &:hover {
    background: var(--secondary-hover);
  }
}

.button__outline_danger {
  background: transparent;
  color: var(--danger);
  border: 1px solid var(--danger);

  &:hover {
    color: var(--white);
    background: var(--danger);
  }
}
</style>
