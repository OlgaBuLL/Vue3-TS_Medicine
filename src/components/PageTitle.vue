<template>
  <div class="page-title">
    <h1 class="page-title__title">{{ title }}</h1>
    <span v-if="number !== undefined && number > 0" class="page-title__number"
      >({{ number }})</span
    >
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  number?: number;
}>();
</script>

<style lang="scss">
.page-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 768px) {
  .page-title {
    &__title {
      font-size: 22px;
    }
  }
}
</style>
