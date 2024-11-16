<template>
  <input
    ref="textFieldEl"
    v-model="text"
    type="text"
    class="input"
    :class="{ readonly: props.readonly, invalid: props.invalid }"
    :placeholder="placeholder"
    :disabled="readonly"
  />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  modelValue?: string | number;
  placeholder?: string;
  readonly?: boolean;
  invalid?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const textFieldEl = ref<HTMLInputElement | null>(null);

const text = computed({
  get(): string | number {
    return props.modelValue !== undefined ? props.modelValue : "";
  },
  set(newValue: string | number) {
    if (!props.readonly) {
      emit("update:modelValue", newValue);
    }
  },
});
</script>

<style lang="scss">
.input {
  border: 1px solid var(--medium-grey);
  border-radius: var(--border-radius-sm);
  padding: 9px 12px;
  color: var(--color-text);
  outline: none;
  transition: var(--transition-4);

  &::placeholder {
    font-size: 14px;
    color: var(--medium-grey);
  }

  &:focus {
    border: 1px solid var(--primary);
  }

  &.readonly {
    cursor: not-allowed;
  }

  &.invalid {
    border: 1px solid var(--danger);
  }
}
</style>
